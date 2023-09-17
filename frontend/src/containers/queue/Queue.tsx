import {Table} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {DrinkOrder} from "@models/drinkOrder.ts";

export function Queue() {
    const {orders} = useContext(OrderContext);
    const [sortedOrders, setSortedOrders] = useState<Array<DrinkOrder>>();

    useEffect(() => {
        const sorted = orders.sort((a, b) => {
            return a.createdDate.getTime() - b.createdDate.getTime()
        });

        setSortedOrders(sorted)

    }, [orders]);

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Brukernavn</th>
                <th>Drink</th>
            </tr>
            </thead>
            <tbody>
            {sortedOrders && sortedOrders.map((queueRow, index) => {
                return (
                    <tr key={queueRow.username + index}>
                        <td>{index + 1}</td>
                        <td>{queueRow.username}</td>
                        <td>{queueRow.drinkName}</td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    )
}