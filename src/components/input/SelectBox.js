import React, { useState } from "react";

function SelectBox(props) {
  const {
    labelTitle,
    labelDescription,
    defaultValue,
    containerStyle,
    placeholder,
    labelStyle,
    options = [],
    name,
    updateFormValue,
  } = props;

  const [value, setValue] = useState(defaultValue || "");

  const updateValue = (e) => {
    updateFormValue(e);
    setValue(e.target.value);
  };

  return (
    <div className={`inline-block ${containerStyle}`}>
      <label className={`label  ${labelStyle}`}>
        <div className="label-text">{labelTitle}</div>
      </label>

      <select
        className="border p-2 w-full"
        value={value}
        name={name}
        onChange={updateValue}
      >
        <option value={""}>{placeholder}</option>
        {options?.map((o, k) => {
          return (
            <option value={o} key={o}>
              {o}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectBox;
