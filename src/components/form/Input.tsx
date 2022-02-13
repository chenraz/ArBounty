type InputProps = {
    name: string
    type?: string
    min?: string
    className?: string
    required?: boolean
    pattern?: string
    onChange?: (e: any) => void
}
const Input = ({name, type, min, className, required, pattern, onChange}: InputProps) => {
    return (
        <input
            id={name}
            type={type || "text"}
            {...{name, required, pattern, min, onChange, className}}
        />
    )
}

export default Input