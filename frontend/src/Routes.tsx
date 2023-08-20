import {CoreLayout} from "../../src/containers/corelayout/CoreLayout.tsx";
import NotFound from "../../src/containers/notfound/NotFound.tsx";
import {RouteObject} from "react-router/dist/lib/context";
import {Leaderboard} from "../../src/containers/leaderboard/Leaderboard.tsx";
import {Login} from "../../src/containers/login/Login.tsx";
import {Order} from "../../src/containers/order/Order.tsx";
import {Queue} from "../../src/containers/queue/Queue.tsx";

export const Routes: RouteObject[] = [
    {
        path: "/",
        element: <CoreLayout/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: "/order",
                element: <Order/>
            },
            {
                path: "/queue",
                element: <Queue/>,
            },
            {
                path: "/leaderboard",
                element: <Leaderboard/>
            },
            {
                path: "/login",
                element: <Login/>
            }
        ]
    },
]