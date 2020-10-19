import { IUser } from './user';

export interface IApartmentGroup {
    id: number;
    name: string;
    description: string;
    user: IUser;
    imageFilePath: string;

}