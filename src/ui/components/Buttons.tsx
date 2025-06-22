export interface ButtonProps{
    variant : "primary" | "secondary",
    size : "sm" | "md" | "lg",
    onClick ?: (...args : any[]) => void ,
    text : string,
    startIcon ?: any, 
    endIcon ?: any, 
}
const varStyle = {
    "primary" : "bg-primary-900 text-primary-300 ",
    "secondary" : "bg-primary-700 text-primary-900 " 
}
const sizeStyle = {
    "sm" : "py-1 px-2 text-sm gap-1 ",
    "md" : "py-2 px-4 text-md gap-1 ",
    "lg" : "py-3 px-7 text-xl gap-2 ",
}
export const Button = (props : ButtonProps) => {
    // console.log(props.startIcon)
    const classes = "cursor-pointer h-fit whitespace-nowrap cursor-pointer rounded-md flex items-center justify-center " + varStyle[props.variant] + sizeStyle[props.size]
    return <button onClick = {props.onClick} className = {classes} >
        {props.startIcon}{props.text}{props.endIcon}
    </button>
}