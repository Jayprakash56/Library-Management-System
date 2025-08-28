import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Book, CheckinBookPayload, CheckoutBookPayload } from "../../models/Book";
import type { PageInfo } from "../../models/page";


const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

interface BookSliceState {
  loading: boolean;
  error: boolean;
  books: Book[];
  currentBook: Book | undefined;
  pagingInformation: PageInfo | null;
}

const initialState: BookSliceState = {
  loading: true,
  error: false,
  books: [],
  currentBook: undefined,
  pagingInformation: null,
};

// ✅ Async Thunks
export const fetchAllBooks = createAsyncThunk("book/all", async (_, thunkAPI) => {
  try {
    const res = await API.get("/book/");
    return res.data.books;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const queryBooks = createAsyncThunk("book/query", async (payload: string, thunkAPI) => {
  try {
    const res = await API.get(`/book/query${payload}`);
    return res.data.page;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const checkOutBook = createAsyncThunk(
  "book/checkout",
  async (payload: CheckoutBookPayload, thunkAPI) => {
    try {
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 14);

      const getPatron = await API.get(`/card/${payload.libraryCard}`);
      const patronId = getPatron?.data?.libraryCard?._id;

      const record = {
        status: "LOANED",
        loanedDate: new Date(),
        dueDate: returnDate,
        patron: patronId,
        employeeOut: payload.employee._id,
        item: payload.book._id,
      };

      const loanReq = await API.post("/loan", record);
      return loanReq.data.record;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const checkinBook = createAsyncThunk(
  "book/checkin",
  async (payload: CheckinBookPayload, thunkAPI) => {
    try {
      const record = payload.book.records[0];
      const updatedRecord = {
        ...record,
        status: "AVAILABLE",
        returnDate: new Date(),
        employeeIn: payload.employee._id,
      };

      const res = await API.put("/loan/", updatedRecord);
      return res.data.record;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const loadBookByBarcode = createAsyncThunk(
  "book/id",
  async (payload: string, thunkAPI) => {
    try {
      const res = await API.get(`/book/query?barcode=${payload}`);
      const book = res.data.page.items[0];

      if (!book || book.barcode !== payload) {
        throw new Error("Book not found");
      }

      return book;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// ✅ Slice
export const BookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setCurrentBook(state, action: PayloadAction<Book | undefined>) {
      state.currentBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    const setPending = (state: BookSliceState) => {
      state.loading = true;
      state.error = false;
    };
    const setRejected = (state: BookSliceState) => {
      state.loading = false;
      state.error = true;
    };

    builder
      // ✅ Pending states
      .addCase(fetchAllBooks.pending, setPending)
      .addCase(queryBooks.pending, setPending)
      .addCase(checkOutBook.pending, setPending)
      .addCase(checkinBook.pending, setPending)
      .addCase(loadBookByBarcode.pending, setPending)

      // ✅ Fulfilled states
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(queryBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.items;
        state.pagingInformation = {
          totalCount: action.payload.totalCount,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          limit: action.payload.limit,
          pageCount: action.payload.pageCount,
        };
      })
      .addCase(checkOutBook.fulfilled, (state, action) => {
        const updatedBooks = state.books.map((book) => {
          if (book._id === action.payload.item) {
            return { ...book, records: [action.payload, ...book.records] };
          }
          return book;
        });
        state.loading = false;
        state.books = updatedBooks;
      })
      .addCase(checkinBook.fulfilled, (state, action) => {
        const updatedBooks = state.books.map((book) => {
          if (book._id === action.payload.item) {
            const newRecords = [...book.records];
            newRecords[0] = action.payload;
            return { ...book, records: newRecords };
          }
          return book;
        });
        state.loading = false;
        state.books = updatedBooks;
      })
      .addCase(loadBookByBarcode.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBook = action.payload;
      })

      // ✅ Rejected states
      .addCase(fetchAllBooks.rejected, setRejected)
      .addCase(queryBooks.rejected, setRejected)
      .addCase(checkOutBook.rejected, setRejected)
      .addCase(checkinBook.rejected, setRejected)
      .addCase(loadBookByBarcode.rejected, setRejected);
  },
});

export const { setCurrentBook } = BookSlice.actions;
export default BookSlice.reducer;
