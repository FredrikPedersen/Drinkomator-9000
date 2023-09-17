import {createContext, ReactElement, useReducer} from "react";

type DrinkState = {
    drinks: string[]
}

const initState: DrinkState = {
    drinks: ["Amaretto Sprites", "White Russian", "Lemon Radler", "Moscow Mule"]
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