export interface iconInterface {
    size : "sm" | "md" | "lg" | "xl",
    variant : "primary" | "secondary" | "card-options" | "title"
}
export const iconVarStyles = {
    "primary" : "stroke-primary-300 fill-primary-300 ",
    "secondary" : "stroke-primary-900 fill-primary-900 ",
    "card-options" : "stroke-neutral-400 fill-white stroke-2 " ,
    "title" : "stroke-neutral-900 fill-white stroke-2 " 
}
export const iconStyleSize = {
    "sm" : "size-4 ",
    "md" : "size-5 ",
    "lg" : "size-6 ",
    "xl" : "size-8 "
}