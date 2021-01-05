import React from "react";
import css from "../header/header.module.css";

export default function headerInput(props) {
  const handleInputChange = (event) => {
    props.onChangeInput(event.target.value);
  };

  const { name } = props;
  return (
    <div className={css.flexRow}>
      <label>{name}</label>
      <br />
      <input
        style={{ width: "90%" }}
        type="number"
        name="inputAuxiliar"
        onChange={handleInputChange}
      />
    </div>
  );
}
