export interface ILoanRecord {
  status: 'AVAILABLE' | 'LOANED';
  loanedDate: Date;
  dueDate: Date;
  returnDate: Date;
  patron: string;
  employeeOut: string;
  employeeIn?: string;
  item: string;
}
