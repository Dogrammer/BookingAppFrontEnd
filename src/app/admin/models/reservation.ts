import { IApartment } from 'src/app/apartment/models/apartment';
import { IUser } from 'src/app/auth/models/user';

export interface IReservation {
    id: number;
    name: string;
    dateFrom: Date;
    dateTo: Date;
    reservationStatusId: number;
    totalPrice: number;
    userId: number;
    user: IUser;
    apartmentId: number;
    apartment: IApartment;
    countryId: number;
}