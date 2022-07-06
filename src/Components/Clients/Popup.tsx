import React, { useState } from "react";

import { Button, Input, Modal } from "antd";

type PopupProps = {
  firstName: string;
  lastName: string;
  // handleNameInput: () => void;
  // handleSurnameInput: () => void;
  onSubmit: () => void;
  open: boolean;
};
export const Popup = (props: PopupProps) => {
  const { onSubmit, open, firstName, lastName } = props;
  const [visible, setVisible] = useState(open);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Please input customer name and surname");
  console.log(visible);
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  console.log(firstName, lastName);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create new Client
      </Button>
      <Modal
        title="Add new customer"
        visible={visible}
        onOk={onSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>

        <Input required maxLength={20} placeholder="Input name..." defaultValue={firstName}></Input>
        <Input required maxLength={20} placeholder="Input surname..." defaultValue={lastName}></Input>
      </Modal>
    </>
  );
};
