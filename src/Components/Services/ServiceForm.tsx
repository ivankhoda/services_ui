import { Button, Col, Input, Row, Select } from "antd";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Category } from "../Categories/CategoryForm";

export type Service = {
  title: string;
  category_title: string;
  id: number;
};
type TableProps = {
  id: number;
  title: string;
  categoryTitle: string;
  item: Service;
  editable: boolean;

  handleDelete: (item: Service) => void;
};

export const ServiceForm = (props: TableProps) => {
  const { id, title, categoryTitle, item, handleDelete, editable } = props;
  const [notEditable, setEditable] = useState(editable);
  const [serviceTitle, setServiceTitle] = useState(title);
  const [serviceCategoryTitle, setServiceCategoryTitle] = useState(categoryTitle);
  const [categories, setCategories] = useState<Category[]>([]);
  const { Option } = Select;
  const handleEdit = (notEditable: boolean) => {
    setEditable(!notEditable);
  };
  const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setServiceTitle(e.currentTarget.value);
  };

  useEffect(() => {
    const getData = async () => {
      const categories = await fetch("http://localhost:3000/categories", {
        method: "GET",
      });
      const data = await categories.json();
      setCategories(data.categories);
    };

    getData();
  }, []);

  const onSave = (clickedItem: Service) => {
    const serviceId = clickedItem.id;
    axios
      .patch(`http://localhost:3000/service/${serviceId}`, {
        service: { title: serviceTitle, service_category: serviceCategoryTitle },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setEditable(!notEditable);
  };
  const handleSelect = (value) => {
    setServiceCategoryTitle(value);
  };

  return (
    <Row>
      <Col span={6}>
        <Input
          type="text"
          readOnly={notEditable ? false : true}
          defaultValue={serviceTitle}
          onChange={handleNameInput}
        ></Input>
      </Col>
      <Col span={6}>
        <Select
          defaultValue={categoryTitle}
          style={{
            width: 120,
          }}
          disabled={!notEditable ? true : false}
          onChange={handleSelect}
        >
          {categories ? (
            categories.map((category, i) => {
              return (
                <Option key={i} value={category.title}>
                  {category.title}
                </Option>
              );
            })
          ) : (
            <>Nothing to display yet</>
          )}
        </Select>
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
