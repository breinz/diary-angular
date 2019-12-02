import { Event } from '../event.model';

export default interface EventCategory {
    _id: string,
    name: string;
    icon: string;
    color: string;
    events: Event[];
}