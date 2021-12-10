import { MouseEventHandler } from "react";

export interface SquareProps {
  value: string;
  onClick: MouseEventHandler;
}

export default function Square(props: SquareProps) {
  function handleClick(e : any){
    if(props.value === " "){
      props.onClick(e)
    }
  }

  return (
    <button className="square" onClick={handleClick}>
        {props.value}
    </button>
  );
}
