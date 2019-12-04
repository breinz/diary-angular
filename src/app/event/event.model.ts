import EventCategory from './category/eventCategory.model';

export interface Event {
    _id: string;
    title: string;
    date: Date;
    category: string | EventCategory;
    categories?: EventCategory[];
    deleted: boolean;
    total?: number;
}