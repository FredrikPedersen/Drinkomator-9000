import {Timestamp} from '@firebase/firestore-types';

export type DrinkOrder = {
    username: string,
    drinkName: string,
    createdDate: Timestamp
};