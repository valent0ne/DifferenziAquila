
//Models
import {Calendar} from '../models/calendar.model';

export interface CalendarPersistanceInterface {

    save(days: Calendar[]): Promise<any>;

    get(): Promise<Calendar[]>;

    remove(): Promise<any>;

}
