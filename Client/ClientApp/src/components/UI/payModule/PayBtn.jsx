import React, { useState } from "react";
import cl from "./PayBtn.module.scss";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";
import Content from "./ModalWindow/Content";
import { Link } from "react-router-dom";

const PayModule = () => {
  const [modal, setModal] = useState(false);

  function showPayModal() {
    setModal(!modal);
  }

  return (
    <div className={cl.btn}>
      <Modal open={modal} onClose={showPayModal} className={cl.window}>
        <Content />
      </Modal>

      {/* <Button
        className={cl.btn__sub}
        variant="outlined"
        startIcon={"Подписка"}
        onClick={showPayModal}
      /> */}
      <span className={cl.btn__sub} onClick={showPayModal}>
        Подписка
      </span>
    </div>
  );
};

export default PayModule;
