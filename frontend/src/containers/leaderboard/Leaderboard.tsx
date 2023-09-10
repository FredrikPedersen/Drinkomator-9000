import {useContext, useEffect, useMemo, useState} from "react";
import {OrderContext} from "@context/OrderContext.tsx";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";

type DrinkStats = {
    username: string,
    [key: string]: number
}

export function Leaderboard() {
    const {orders, drinks} = useContext(OrderContext);
    const [drinkStats, setDrinkStats] = useState<DrinkStats[]>([])

    //Foreach username, find the occurrence of each drink per username
    useEffect(() => {
        //Find unique usernames
        const usernames = [...new Set(orders.map(drinkOrder => drinkOrder.username))];

        const drinksPerUser = usernames.map(username => {
            const statsForUser: DrinkStats = {
                username: username,
            };

            orders.forEach(drinkOrder => {
                if (drinkOrder.username === username) {
                    drinks.forEach(drink => {
                        if (drink === drinkOrder.drinkName) {
                            const eksisterendeVerdi = statsForUser[drink];
                            if (eksisterendeVerdi) {
                                statsForUser[drink] += 1;
                            } else {
                                statsForUser[drink] = 1
                            }
                        }
                    })

                }
            })

            return statsForUser;
        })

        setDrinkStats(drinksPerUser)
    }, [orders, drinks])

    const hexColors = useMemo(() => {
        return [
            "#8884d8",
            "#82ca9d",
            "#ffc658",
            "#d88884",
            "#d884d4",
            "#82cac1",
            "#c182ca",
            "#d88884",
            "#91ff58",
            "#58e4ff"
        ]
    }, [])

    return (
        <ResponsiveContainer width={"100%"} height={500}>
            <BarChart
                width={500}
                height={300}
                data={drinkStats}
                margin={{
                    top: 20,
                    right: 40,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="username"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                {drinks.map((drink, index) => {
                    return (
                        <Bar dataKey={drink} stackId="a" fill={hexColors[index]} />
                    )
                })}
            </BarChart>
        </ResponsiveContainer>
    );
}