import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import {ErrorMessage} from "@components/errormessage/ErrorMessage.tsx";
import "./Login.css"
import {useNavigate} from "react-router-dom";

type Inputs = {
    username: string,
}

export function Login() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors},
        setError
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (data.username && data.username.trim() !== "") {
            localStorage.setItem("user", JSON.stringify({username: data.username}))
            navigate("/order")
        } else {
            setError("username", {type: "manual", message: "Brukernavnet kan ikke være tomt!"})
        }
    }

    return (
        <Form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Control className={"mt-1"} placeholder="Navn..." {...register("username", {required: true, minLength: 1})} />
                {errors.username && <ErrorMessage text={"Du må skrive inn noe her da, løk"} size={"h6"}/>}
                <Button className={"mt-2 login-button"} variant="primary" type="submit">Logg Inn</Button>
            </Form.Group>
        </Form>
    )
}