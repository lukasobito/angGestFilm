export interface Event{
    id: number;
    name: string;
    film: string;
    dateEvent: Date;
    isFilmValid: boolean;
    isDateValid: boolean;
    groupId: number;
}