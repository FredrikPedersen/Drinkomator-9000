import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {useContext} from "react";
import {OrderContext} from "../../context/OrderContext.tsx";

export function Leaderboard() {
    const {orders, drinks} = useContext(OrderContext);

    //Find unique usernames
    const usernames = orders.map(drinkOrder => drinkOrder.username);

    //Foreach username, find the occurrence of each drink per username
/*    usernames.forEach(username => {
        const drinkForUsername = orders.map(drinkOrder => {
            if (drinkOrder.username === username) {

            }
        })

        console.log(drinkForUsername)
    })*/


    return (
        <>
            <BarChart width={300} height={500} data={orders}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
        </>
    )
}