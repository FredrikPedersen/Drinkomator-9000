type Props = {
    text: string,
    size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export function ErrorMessage(props: Props) {
    return <p className={`${props.size ? props.size : "h3"} text-danger`}>{props.text}</p>
}