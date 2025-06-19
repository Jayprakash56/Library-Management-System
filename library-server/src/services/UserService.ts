import bcrypt from "bcrypt";

import { config } from "../config";

import userDao, {IuserModel} from "../daos/userDao";
import { IUser } from "../models/User";
import { UnableToSaveUserError, InvalidUsernameOrPassword, UserDoesNotExistError } from "../utils/LibraryErrors";

export async function register(user: IUser):Promise<IuserModel> {
  const ROUNDS = config.server.rounds;
  try {
    const hashedPassword = await bcrypt.hash(user.password, ROUNDS);

    const saved = new userDao({...user, password: hashedPassword});

    return await saved.save();
  }
  catch (error: any) {
    throw new UnableToSaveUserError(error.message);1
  }
}

export async function login(credentials: {email: string, password: string}):Promise<IuserModel> {
  const {email, password} = credentials;
  try {
    const user = await userDao.findOne({email});
    if(!user) {
      throw new InvalidUsernameOrPassword("Invalid username or password");
    } else {
      const validPassword: boolean = await bcrypt.compare(password, user.password);

      if(validPassword) {
        return user;
      } else {
        throw new InvalidUsernameOrPassword("Invalid username or password");
      }
    }
  } catch (error: any) {
    throw error;
  }
}


export async function findAllUsers(): Promise<IuserModel[]> {
  try {
    const users = await userDao.find();
    return users;
  } catch(error) {
    return [];
  }
}

export async function findUserByID(userId: string): Promise<IuserModel> {
  try {
    const user = await userDao.findById(userId);
    if(user) return user;
    throw new UserDoesNotExistError("User does not exists with this ID");
  } catch(error: any) {
    throw error;
  }
}


export async function modifyUser(user: IuserModel): Promise<IuserModel> {
  try {
    let id = await userDao.findByIdAndUpdate(user._id, user, {new: true});
    if(!id) throw new UserDoesNotExistError("User does not exits with this ID");
    return user;
  } catch(error: any) {
    throw error;
  }
}

export async function removeUser(userId: string): Promise<string> {
  try {
    let deleted = await userDao.findByIdAndDelete(userId);
    if(!deleted) throw new UserDoesNotExistError("User does not exits with this ID");
    return "User deleted successfully";
  } catch(error) {
    throw error;
  }
}