import { Button, Col, Input, Row } from "antd";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
export type Category = {
  title: string;

  id: number;
};
type TableProps = {
  id: number;
  title: string;
  item: Category;
  editable: boolean;

  handleDelete: (item: Category) => void;
};

export const CategoryForm = (props: TableProps) => {
  const { id, title, item, handleDelete, editable } = props;
  const [notEditable, setEditable] = useState(editable);
  const [categoryName, setCategoryName] = useState(title);

  const handleEdit = (notEditable: boolean) => {
    setEditable(!notEditable);
  };
  const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.currentTarget.value);
  };

  const onSave = (clickedItem: Category) => {
    const categoryId = clickedItem.id;
    axios
      .patch(`http://localhost:3000/category/${categoryId}`, { category: { title: categoryName } })
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
          defaultValue={categoryName}
          onChange={handleNameInput}
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
