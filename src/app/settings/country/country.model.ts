import { People } from 'src/app/people/people.model';

export class Country {
    _id: string;
    public name: string;
    peoples?: People[]
}