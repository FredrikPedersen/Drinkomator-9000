import {useContext, useEffect, useMemo, useState} from "react";
import {DrinkContext} from "@context/DrinkContext.tsx";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Text} from "recharts";
import {DrinkOrder} from "@models/drinkOrder.ts";
import {getDocs} from "firebase/firestore";
import {orderCollection} from "@/config/firebase.ts";
import {mapDocumentData} from "@utilities/firebaseUtilities.ts";

const hexColors = [
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
];

interface DynamicModel<T> {
    [key: string]: T
}

type DrinkStats = DynamicModel<number> & {
    username: string
}

export function Leaderboard() {
    const {drinks} = useContext(DrinkContext);
    const [drinkStats, setDrinkStats] = useState<DrinkStats[]>([])
    const chartHeight = useMemo(() => 500, [])

    //Foreach username, find the occurrence of each drink per username
    useEffect(() => {
        const getOrders = async () => {
            const orderQuery = await getDocs(orderCollection);
            return mapDocumentData<DrinkOrder>(orderQuery);
        }

        getOrders().then(orders => {
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
                                const existingValue = statsForUser[drink];
                                if (existingValue) {
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
        })
    }, [drinks])

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
                        <Bar dataKey={drink} stackId="a" fill={hexColors[index]}/>
                    )
                })}
            </BarChart>
        </ResponsiveContainer>
    );
}