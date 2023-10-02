import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import cl from "../PayBtn.module.scss";
import Text from "./Text";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { yellow } from "@mui/material/colors";
import Btn from "./Btn";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import PersonIcon from "@mui/icons-material/Person";
import StarsIcon from "@mui/icons-material/Stars";

const Content = () => {
  const [sum, setSum] = useState(49900);
  const [checksum0, checkSum0] = useState(false);
  const [checksum1, checkSum1] = useState(false);
  const [checksum2, checkSum2] = useState(false);
  const [checksum3, checkSum3] = useState(false);

  function addSum0() {
    setSum(sum);
    checkSum0(!checksum1);
  }

  function addSum1() {
    setSum(sum);
    checkSum1(!checksum1);
  }
  function addSum2() {
    setSum(sum);
    checkSum2(!checksum2);
  }
  function addSum3() {
    setSum(sum);
    checkSum3(!checksum3);
  }

  return (
    <div className={cl.contentBox}>
      <header className={cl.headerText}>
        <div className={cl.gradColor}>
          Premium <StarsIcon sx={{ color: yellow[500] }} />
        </div>
        <div className={cl.basePrice}>
          <div>
            {" "}
            49 900 <CurrencyRubleIcon />{" "}
          </div>
          <div>
            {" "}
            5 <PersonIcon />
          </div>
        </div>
      </header>
      <div className={cl.text_past_point}>
        {" "}
        Уникальная подписка для корпоротивных клиентов!{" "}
      </div>
      <Text
        sum={sum}
        setSum={setSum}
        addSum1={addSum1}
        addSum2={addSum2}
        addSum3={addSum3}
        checksum1={checksum1}
        checksum2={checksum2}
        checksum3={checksum3}
      />
      <div className={cl.text_past_point}>
        {" "}
        При покупке 1 месяца + 3 бесплатных 3D модели
      </div>
      <Btn sum={sum} />
    </div>
  );
};

export default Content;
