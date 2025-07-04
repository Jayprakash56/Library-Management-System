import type { Book } from "./Book";

export type LoanRecord = {
  _id: string;
  status: "LOANED" | "AVAILABLE";
  loanedDate: Date;
  dueDate: Date;
  returnedDate?: Date;
  patron: string;
  employeeOut: string;
  employeein?: string;
  item: Book;
  createdAt: Date;
  updatedAt: Date;
}