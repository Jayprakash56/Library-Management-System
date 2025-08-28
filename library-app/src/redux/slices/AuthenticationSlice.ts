import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { FetchUserPayload, LoginUserPayload, RegisterUserPayload, User } from '../../models/User';


const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

interface AuthenticationSliceState {
  loggedInUser: User | undefined;
  profileUser: User | undefined;
  libraryCard: string;
  loading: boolean;
  error: boolean;
  registerSuccess: boolean;
}

const initialState: AuthenticationSliceState = {
  loggedInUser: undefined,
  profileUser: undefined,
  libraryCard: '',
  loading: false,
  error: false,
  registerSuccess: false,
};

// ✅ Async Thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (user: LoginUserPayload, thunkAPI) => {
    try {
      const res = await API.post('/auth/login', user);
      return res.data.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (user: RegisterUserPayload, thunkAPI) => {
    try {
      const res = await API.post('/auth/register', user);
      return res.data.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetch',
  async (payload: FetchUserPayload, thunkAPI) => {
    try {
      const res = await API.get(`/users/${payload.userId}`);
      return {
        user: res.data.user,
        property: payload.property,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/update',
  async (payload: User, thunkAPI) => {
    try {
      const res = await API.put('/users', payload);
      return res.data.updatedUser;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const getLibraryCard = createAsyncThunk(
  'auth/libraryCard',
  async (userId: string, thunkAPI) => {
    try {
      const res = await API.post('/card/', { user: userId });
      return res.data.libraryCard;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// ✅ Slice
export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    resetRegisterSuccess(state) {
      state.registerSuccess = false;
    },
    resetUser(state, action: PayloadAction<string>) {
      (state as any)[action.payload] = undefined;
    },
  },
  extraReducers: (builder) => {
    const setPending = (state: AuthenticationSliceState) => {
      state.loading = true;
      state.error = false;
    };
    const setRejected = (state: AuthenticationSliceState) => {
      state.loading = false;
      state.error = true;
    };

    builder
      // ✅ Pending states
      .addCase(loginUser.pending, setPending)
      .addCase(registerUser.pending, setPending)
      .addCase(fetchUser.pending, setPending)
      .addCase(updateUser.pending, setPending)
      .addCase(getLibraryCard.pending, setPending)

      // ✅ Fulfilled states
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registerSuccess = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        (state as any)[action.payload.property] = action.payload.user;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
        state.profileUser = action.payload;
      })
      .addCase(getLibraryCard.fulfilled, (state, action) => {
        state.loading = false;
        state.libraryCard = action.payload._id;
      })

      // ✅ Rejected states
      .addCase(loginUser.rejected, setRejected)
      .addCase(registerUser.rejected, setRejected)
      .addCase(fetchUser.rejected, setRejected)
      .addCase(updateUser.rejected, setRejected)
      .addCase(getLibraryCard.rejected, setRejected);
  },
});

export const { resetRegisterSuccess, resetUser } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
