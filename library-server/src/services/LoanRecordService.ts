import LoanRecordDao, {ILoanRecordModel} from "../daos/LoanRecordDao";
import { ILoanRecord } from "../models/loanRecords";
import { LoanRecordDoesNotExistError } from "../utils/LibraryErrors";
import { findBookById, modifyBook } from "./BookService";
//
import mongoose from "mongoose";



export async function generateRecod(record:ILoanRecord): Promise<ILoanRecordModel> {
  try {
    let createdRecord = new LoanRecordDao(record);
    createdRecord = await createdRecord.save();

    let book = await findBookById(record.item);
    let records = book.records;

    records = [createdRecord, ...records];
    book.records = records;

    await modifyBook(book);

    return createdRecord;
  } catch(error) {
    throw error;
  }
}


export async function modifyRecord(record: ILoanRecordModel): Promise<ILoanRecordModel> {
  try {
    let updatedRecord = await LoanRecordDao.findOneAndUpdate({_id : record._id}, record, {new: true});

    if(updatedRecord) {
      let book = await findBookById(record.item);
      let records = book.records;
      records[0] = updatedRecord;
      book.records = records;

      await modifyBook(book);

      return updatedRecord;
    }

    throw new LoanRecordDoesNotExistError("The Record does not exists");
  } catch(error) {
    throw error;
  }
}

export async function findAllRecords(): Promise<ILoanRecordModel[]> {
  try {
    return await LoanRecordDao.find();
  } catch(error) {
    throw error;
  }
}

export async function queryRecords(params:{property: string, value: string | Date}):Promise<ILoanRecordModel[]> {
  try {
    console.log(params);
    if(!mongoose.Types.ObjectId(params.value)) {
      throw new Error('Invalid object ID');
    } else {
      console.log('done');
    }
    return await LoanRecordDao.find({[params.property]:  new mongoose.Types.ObjectId(params.value)}).populate("item").sort("-loanedDate");
  } catch(error) {
    throw error;
  }
}
