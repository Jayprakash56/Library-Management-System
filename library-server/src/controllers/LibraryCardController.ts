import { Request, Response } from "express";
import { registerLibraryCard, findLibraryCard } from "../services/LibraryCardService";

import { ILibraryCard } from "../models/LibraryCard";
import { LibraryCardDoesNotExistsError } from "../utils/LibraryErrors";

async function getLibraryCard(req:Request, res: Response) {
  const {cardId} = req.params;

  try {
    let libraryCard = await findLibraryCard(cardId);
    res.status(200).json({message: "retrieved the users card", libraryCard});
  } catch(error) {
    if(error instanceof LibraryCardDoesNotExistsError) {
      res.status(404).json({message: "The specified library card does not exists"});
    }
    else {
      res.status(500).json({message: "Unable to retrieve the library card", error});
    }
  }
}

async function createLibraryCard(req:Request, res:Response) {
  const card: ILibraryCard = req.body;

  try {
    let libraryCard = await registerLibraryCard(card);
    res.status(201).json({message:"Generated library card for the user", libraryCard});
  } catch (error) {
    res.status(500).json({message: "Unable to create library card at this time", error});
  }
}

export default {getLibraryCard, createLibraryCard};