import { ICity } from 'src/app/admin/models/city';

export interface IApartment {
    id: number;
    name: string;
    description: string;
    size: number;
    capacity: number;
    images: Array<string>;
    apartmentTypeId: number;
    apartmentGroupId: number;
    cityId: number;
    city: ICity;
    fullAddress: string;
    numberOfBedrooms: number;
    climateControl: boolean;
    wifi: boolean;
    kitchenTool: boolean;
    bbqTools: boolean;
    workSpace: boolean;
    sportTool: boolean;
    closestBeachDistance: number;
    closestMarketDistance: number;
}