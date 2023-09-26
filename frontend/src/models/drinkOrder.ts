import {FirebaseEntity} from "@models/firebaseEntity.ts";

type DrinkOrderProperties = {
    username: string,
    drinkName: string,
    isDone: boolean
};

export type DrinkOrder = FirebaseEntity & DrinkOrderProperties