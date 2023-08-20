import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import "./Order.css";
import {useContext} from "react";
import {OrderContext} from "../../context/OrderContext.tsx";
import {DrinkOrder} from "../../models/drinkOrder.ts";
import {getUsername} from "../../utilities/userUtilities.ts";
import {useNavigate} from "react-router-dom";

type Inputs = {
    drink: string,
}

export function Order() {
    const navigate = useNavigate()
    const {addOrder, drinks} = useContext(OrderContext)

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const drinkOrder: DrinkOrder = {
            username: getUsername(),
            drinkName: data.drink,
            createdDate: new Date()
        }

        addOrder(drinkOrder)
        navigate("/queue")
    }

    return (
        <Form className="order-form" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Select className={"mt-1"} placeholder="Navn..." {...register("drink")}>
                    {drinks.map(drink => <option key={drink}>{drink}</option>)}
                </Form.Select>
                <Button className={"mt-2 order-button"} variant="primary" type="submit">Bestill</Button>
            </Form.Group>
        </Form>
    )
}