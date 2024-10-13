import React, { useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import Button from "@mui/material/Button";

const QuantityBox = ({sendDataToParent}) => {
  const [inputVal, setInputVal] = useState(1);
  const minus = () => {
    if(inputVal>1){
      setInputVal((i) => i - 1);
    }
  };
  
  const plus = () => {
    if(product.stock==inputVal){
      return;
    }
    setInputVal((i) => i + 1);
  };
  sendDataToParent(inputVal);
  return (
    <>
      <div className="quantityDrop d-flex align-items-center">
        <Button style={{ outline: "none" }} onClick={minus}>
          <FaMinus />
        </Button>
        <input type="text" value={inputVal} />
        <Button style={{ outline: "none" }} onClick={plus}>
          <FaPlus />
        </Button>
      </div>

    </>
  );
};

export default QuantityBox;
