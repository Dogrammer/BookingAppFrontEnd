import { ICountry } from './country';

export interface ICity {
    id: number;
    name: string;
    description: string;
    country: ICountry;
    countryId: number;
}