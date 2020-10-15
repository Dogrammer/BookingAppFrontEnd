import { IApartment } from 'src/app/apartment/models/apartment';
import { IUser } from 'src/app/auth/models/user';
import { IReservationStatus } from './reservation-status';

export interface IReservation {
    id: number;
    name: string;
    dateFrom: Date;
    dateTo: Date;
    reservationStatusId: number;
    reservationStatus: IReservationStatus;
    totalPrice: number;
    userId: number;
    user: IUser;
    apartmentId: number;
    apartment: IApartment;
    countryId: number;
}