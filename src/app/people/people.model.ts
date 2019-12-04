import { Country } from '../settings/country/country.model';

export class People {
    _id: string;
    firstName: string;
    lastName: string;
    sexe: boolean;
    met_at: Date;
    metIn: string;
    from: Country;
    deleted: boolean;
    date?: string;
}