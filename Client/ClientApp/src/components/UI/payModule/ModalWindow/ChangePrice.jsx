import React, { useState } from "react";
import cl from "../PayBtn.module.scss";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";

const ChangePrice = (props) => {
  const [changsum, setChangsum] = useState(0);

  function Minus() {
    if (changsum > 0 && props.checksum) {
      setChangsum(changsum - 1);
      props.setSum(props.sum - changsum * 5000);
    }
  }

  function Plus() {
    if (changsum < 10 && props.checksum) {
      setChangsum(changsum + 1);
      props.setSum(props.sum + (changsum + 1) * 5000);
    }
  }

  return (
    <div className={cl.changsumBlock}>
      <div className={cl.changsumBlockText}>
        <Button
          className={cl.sizeChangBtn}
          onClick={Minus}
          style={{ maxWidth: "20%", minWidth: "20%" }}
        >
          -
        </Button>
        <div>{changsum}</div>
        <Button
          className={cl.sizeChangBtn}
          onClick={Plus}
          style={{ maxWidth: "20%", minWidth: "20%" }}
        >
          +
        </Button>
      </div>
      <div>{5000} P</div>
    </div>
  );
};

export default ChangePrice;
