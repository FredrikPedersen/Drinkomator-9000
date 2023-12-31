import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import "./Order.css";
import {useContext} from "react";
import {DrinkContext} from "@context/DrinkContext.tsx";
import {DrinkOrder} from "@models/drinkOrder.ts";
import {getUsername} from "@utilities/userUtilities.ts";
import {useNavigate} from "react-router-dom";
import {orderCollection} from "@/config/firebase.ts";
import {addDoc} from "firebase/firestore";
import {ROUTES} from "@/Routes.tsx";

type Inputs = {
    drink: string,
}

export function Order() {
    const navigate = useNavigate()
    const {drinks} = useContext(DrinkContext)

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (formData) => {
        const drinkOrder: DrinkOrder = {
            username: getUsername(),
            drinkName: formData.drink,
            isDone: false,
            createdDate: new Date().getTime()
        }

        addDoc(orderCollection, drinkOrder).then(() => {
            navigate(ROUTES.QUEUE)
        })
    }

    return (
        <Form className="order-form" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Select className={"mt-1"} placeholder="Navn..." {...register("drink")}>
                    {drinks.map(drink => <option key={drink.name}>{drink.name}</option>)}
                </Form.Select>
                <Button className={"mt-2 order-button"} variant="primary" type="submit">Bestill</Button>
            </Form.Group>
        </Form>
    )
}