import {useContext, useEffect, useMemo, useState} from "react";
import {OrderContext} from "@context/OrderContext.tsx";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Text} from "recharts";
import {DrinkOrder} from "@models/drinkOrder.ts";

type DrinkStats = {
    username: string,
    [key: string]: number
}

export function Leaderboard() {
    const {drinks} = useContext(OrderContext);
    const [drinkStats, setDrinkStats] = useState<DrinkStats[]>([])
    const chartHeight = useMemo(() => 500, [])

    //Foreach username, find the occurrence of each drink per username
    useEffect(() => {
        const amaretto = "Amaretto Sprites";
        const mule = "Moscow Mule";
        const radler = "Lemon Radler";
        const orders: DrinkOrder[] = [
            {
                username: "Thomas",
                drinkName: mule,
                createdDate: new Date()
            },{
                username: "Thomas",
                drinkName: amaretto,
                createdDate: new Date()
            },
            {
                username: "Thomas",
                drinkName: mule,
                createdDate: new Date()
            },
            {
                username: "Jokke",
                drinkName: radler,
                createdDate: new Date()
            },
            {
                username: "Jokke",
                drinkName: mule,
                createdDate: new Date()
            },
            {
                username: "Andreas",
                drinkName: mule,
                createdDate: new Date()
            },
            {
                username: "Andreas",
                drinkName: mule,
                createdDate: new Date()
            },
            {
                username: "Fredrik",
                drinkName: mule,
                createdDate: new Date()
            },
            {
                username: "Mina",
                drinkName: mule,
                createdDate: new Date()
            },
            {
                username: "Ronja",
                drinkName: mule,
                createdDate: new Date()
            },
            {
                username: "Chris",
                drinkName: mule,
                createdDate: new Date()
            },
            {
                username: "Martina",
                drinkName: mule,
                createdDate: new Date()
            }
        ]

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
    }, [drinks])

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
        <ResponsiveContainer width={"100%"} height={chartHeight}>
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
                <XAxis
                    dataKey="username"
                    angle={90}
                    dy={30}
                    dx={5}
                />
                <YAxis/>
                <Tooltip/>
                <Legend wrapperStyle={{top: chartHeight, left: 25}}/>
                {drinks.map((drink, index) => {
                    return (
                        <Bar dataKey={drink} stackId="a" fill={hexColors[index]} />
                    )
                })}
            </BarChart>
        </ResponsiveContainer>
    );
}