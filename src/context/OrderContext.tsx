import {DrinkOrder} from "../models/drinkOrder.ts";
import {createContext, ReactElement, useCallback, useReducer} from "react";

type OrderState = {
    orders: DrinkOrder[]
}

const initState: OrderState = {
    orders: [],
}

enum ACTION_TYPE {
    ADD_ORDER = "ADD_ORDER",
}

type Action = {
    type: ACTION_TYPE,
    payload: DrinkOrder
}

const reducer = (state: OrderState, action: Action): OrderState => {
    switch (action.type) {
        case ACTION_TYPE.ADD_ORDER:
            return {
                ...state,
                orders: [action.payload, ...state.orders]
            }
        default:
            return state;
    }
};

const useOrderContext = (initState: OrderState) => {
    const [orderState, dispatch] = useReducer(reducer, initState);

    const addOrder = useCallback((newOrder: DrinkOrder) => {
        dispatch({
            type: ACTION_TYPE.ADD_ORDER,
            payload: newOrder
        })
    }, [])

    const orders = orderState.orders

    return {orders, addOrder}
}

type UseOrderContextType = ReturnType<typeof useOrderContext>;

const initContextState: UseOrderContextType = {
    orders: initState.orders,
    addOrder: () => {}
}

export const OrderContext = createContext<UseOrderContextType>(initContextState);

type ChildrenType = {
    children?: ReactElement | ReactElement[] | undefined
}

export const OrderProvider = ({children} : ChildrenType) => {
    return (
        <OrderContext.Provider value={useOrderContext(initState)}>
            {children}
        </OrderContext.Provider>
    )
}