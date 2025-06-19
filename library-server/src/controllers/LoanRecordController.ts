import { Request, Response } from "express";
import { findAllRecords, generateRecod, modifyRecord, queryRecords } from "../services/LoanRecordService";
import { LoanRecordDoesNotExistError } from "../utils/LibraryErrors";

async function createRecord(req: Request, res: Response) {
  let record = req.body;

  try {
    let createdRecord = await generateRecod(record);
    res.status(200).json({message:"New record generated", record: createdRecord});
  } catch(error) {
    res.status(500).json({message: "Something went wrong", error});
  }
}


async function updateRecord(req: Request, res: Response) {
  let record = req.body;

  try {
    let createdRecord = await modifyRecord(record);
    res.status(200).json({message:"record updated successfully", record: createdRecord});
  } catch(error) {
    if(error instanceof LoanRecordDoesNotExistError) {
      res.status(404).json({message:"Unable to modify record", error});
    } else {
      res.status(500).json({message: "Something went wrong", error});
    }
  }
}

async function getAllRecord(req: Request, res: Response) {
  try {
    let createdRecord = await findAllRecords();
    res.status(200).json({message:"Retrieved all record", record: createdRecord});
  } catch(error) {
    res.status(500).json({message: "Unable to retrieve records at this time", error});
  }
}


async function getRecordByProperty(req: Request, res: Response) {
  let param = req.body;

  try {
    let records = await queryRecords(param);
    res.status(200).json({message:"Retrieved record from your query", records});
  } catch(error) {
    res.status(500).json({message: "Unable to retrieve records at this time", error});
  }
}


export default {createRecord, updateRecord, getAllRecord, getRecordByProperty};