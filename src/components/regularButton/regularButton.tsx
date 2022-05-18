import React from 'react';
import style from './style.module.css'

type ButtonProps = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disapled?: boolean;
};


const RegularButton = (props: ButtonProps) => {
    

    return (
        <button  onClick={props.onClick} disabled={props.disapled}  className={props.className ? props.className : style.regularButton }>
            {props.text}
        </button>

    )
}


export default RegularButton;