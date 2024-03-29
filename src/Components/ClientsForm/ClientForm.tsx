import { Button, Col, Input, Row } from "antd";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
export type Client = {
  name: string;
  surname: string;
  id: number;
};
type TableProps = {
  id: number;
  name: string;
  surname: string;
  item: Client;
  editable: boolean;

  handleDelete: (item: Client) => void;
};

export const ClientForm = (props: TableProps) => {
  const { id, name, surname, item, handleDelete, editable } = props;
  const [notEditable, setEditable] = useState(editable);
  const [firstName, setFirstName] = useState(name);
  const [lastName, setLastName] = useState(surname);

  const handleEdit = (notEditable: boolean) => {
    setEditable(!notEditable);
  };
  const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value);
  };
  const handleSurnameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.currentTarget.value);
  };
  const onSave = (clickedItem: Client) => {
    const clientId = clickedItem.id;
    axios
      .patch(`${process.env.BASE_URL}/client/${clientId}`, { client: { name: firstName, surname: lastName } })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setEditable(!notEditable);
  };

  return (
    <Row>
      <Col span={6}>
        <Input
          type="text"
          readOnly={notEditable ? false : true}
          defaultValue={firstName}
          onChange={handleNameInput}
        ></Input>
      </Col>
      <Col span={6}>
        <Input
          type="text"
          readOnly={notEditable ? false : true}
          defaultValue={lastName}
          onChange={handleSurnameInput}
        ></Input>
      </Col>
      <Col span="3">
        <Button type="primary" onClick={notEditable ? () => onSave(item) : () => handleEdit(notEditable)}>
          {notEditable ? "Save" : "Edit"}
        </Button>

        <Button type="primary" onClick={() => handleDelete(item)}>
          Delete
        </Button>
      </Col>
    </Row>
  );
};
