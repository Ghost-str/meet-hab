import { IUser } from "../entities/user.entity";


export class NullUser implements IUser {
    id: string;
    login: string;
    password: string;
}