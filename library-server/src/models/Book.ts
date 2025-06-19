import { ILoanRecord } from "./loanRecords";

export interface IBook {
  barcode: string;
  cover: string;
  title: string;
  authors: string[];
  description: string;
  subjects: string[];
  publicationDate: Date;
  publisher: string;
  pages: number;
  genre: string;
  records: ILoanRecord[]
}