import {CoreLayout} from "./containers/corelayout/CoreLayout.tsx";
import NotFound from "./containers/notfound/NotFound.tsx";
import {RouteObject} from "react-router/dist/lib/context";
import {Leaderboard} from "./containers/leaderboard/Leaderboard.tsx";
import {Login} from "./containers/login/Login.tsx";
import {Order} from "./containers/order/Order.tsx";
import {Queue} from "./containers/queue/Queue.tsx";

export enum ROUTES {
    ROOT= "/",
    ORDER = "/order",
    QUEUE = "/queue",
    LEADERBOARD = "/leaderboard",
    LOGIN = "/login"
}

export const Routes: RouteObject[] = [
    {
        path: ROUTES.ROOT,
        element: <CoreLayout/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: ROUTES.ORDER,
                element: <Order/>
            },
            {
                path: ROUTES.QUEUE,
                element: <Queue/>,
            },
            {
                path: ROUTES.LEADERBOARD,
                element: <Leaderboard/>
            },
            {
                path: ROUTES.LOGIN,
                element: <Login/>
            }
        ]
    },
]