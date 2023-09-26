import {createContext, ReactElement, useReducer} from "react";
import {Drink} from "@models/drink.ts";

type DrinkState = {
    drinks: Drink[]
}

const initState: DrinkState = {
    drinks: [
        {name: "Amaretto Sprites", hexColor: "#8884d8"},
        {name: "White Russian", hexColor: "#82ca9d"},
        {name: "Lemon Radler", hexColor: "#ffc658"},
        {name: "Moscow Mule", hexColor: "#d88884"},
        {name: "Gin & Tonic", hexColor: "#d884d4"},
        {name: "Minttu Shot", hexColor: "#82cac1"}
    ]
}

enum ACTION_TYPE {
}

type Action = {
    type: ACTION_TYPE,
}

const reducer = (state: DrinkState, action: Action): DrinkState => {
    switch (action.type) {
        default:
            return state;
    }
};

const useDrinkContext = (initState: DrinkState) => {
    const [orderState] = useReducer(reducer, initState);

    const drinks = orderState.drinks;

    return {drinks}
}

type UseDrinkContextType = ReturnType<typeof useDrinkContext>;

const initContextState: UseDrinkContextType = {
    drinks: initState.drinks,
}

export const DrinkContext = createContext<UseDrinkContextType>(initContextState);

type ChildrenType = {
    children?: ReactElement | ReactElement[] | undefined
}

export const DrinkProvider = ({children} : ChildrenType) => {
    return (
        <DrinkContext.Provider value={useDrinkContext(initState)}>
            {children}
        </DrinkContext.Provider>
    )
}