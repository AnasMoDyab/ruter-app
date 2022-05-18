import React from "react";
import style from "./style.module.css";

type InputProps = {
  name: string;
  type: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  value: string;
  class?: string;
  label: string;
  id: string;
};

const InputText = (props: InputProps) => {
  return (
    <div className={style.formControl}>
      <label className={style.label} htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        placeholder={props.placeholder}
        className={props.class}
      />
    </div>
  );
};

export default InputText;
