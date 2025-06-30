import { iconStyleSize, iconVarStyles, type iconInterface } from "./iconInterface";

export function AllIcon(props : iconInterface){
    const classes = iconStyleSize[props.size] + iconVarStyles[props.variant]
    return <svg
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  viewBox="0 0 24 24"
  className={classes}
>
  <polyline points="2,5 4,7 7,3" />
  <line x1="10" y1="5" x2="22" y2="5" />

  <polyline points="2,11 4,13 7,9" />
  <line x1="10" y1="11" x2="22" y2="11" />

  <polyline points="2,17 4,19 7,15" />
  <line x1="10" y1="17" x2="22" y2="17" />
</svg>


}