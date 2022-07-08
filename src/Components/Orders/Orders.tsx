import { Button, Input, Modal, Select, Table } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Assignee } from "../Assignees/AssigneeForm";
import { Category } from "../Categories/CategoryForm";
import { Client } from "../ClientsForm/ClientForm";
import { Order, OrderAttributes, OrderForm } from "./OrderForm";
type Service = {
  category_id: number;

  title: "Durable durabls";
};

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceCategoryTitle, setServiceCategoryTitle] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Please input service title");
  const [clients, setClients] = useState<Client[]>([]);
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { Option } = Select;
  useEffect(() => {
    const getData = async () => {
      const orders = await fetch("http://localhost:3000/orders", {
        method: "GET",
      });
      const data = await orders.json();
      setOrders(data.data);
    };

    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      const clients = await fetch("http://localhost:3000/clients", {
        method: "GET",
      });
      const data = await clients.json();
      setClients(data.clients);
    };

    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      const assignees = await fetch("http://localhost:3000/assignees", {
        method: "GET",
      });
      const data = await assignees.json();
      setAssignees(data.assignees);
    };

    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      const services = await fetch("http://localhost:3000/generic-services", {
        method: "GET",
      });
      const categories = await fetch("http://localhost:3000/categories", {
        method: "GET",
      });
      const categoriesData = await categories.json();
      setCategories(categoriesData.categories);

      const servicesData = await services.json();
      setServices(servicesData.generic_services);
    };

    getData();
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleServiceTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setServiceTitle(e.currentTarget.value);
  };

  const columns = [
    Table.EXPAND_COLUMN,
    {
      title: "Client name",
      dataIndex: "client_name",
    },
    {
      title: "Assignee name",
      dataIndex: "assignee_name",
    },
    {
      title: "Total sum",
      dataIndex: "price",
    },
  ];
  let content: OrderAttributes[] = [];
  orders.forEach((order) => content.push(order.attributes));

  const onSubmit = () => {
    setVisible(false);
  };

  const handleSelect = (value) => {
    setServiceCategoryTitle(value);
  };

  return (
    <>
      <>
        <Button type="primary" onClick={showModal}>
          Create new Order
        </Button>
        <Modal
          title="Add new Order"
          visible={visible}
          onOk={onSubmit}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>

          <Input
            required
            minLength={1}
            maxLength={20}
            placeholder="Input name..."
            defaultValue={serviceTitle}
            onChange={handleServiceTitleInput}
          ></Input>

          <Select
            defaultValue={serviceCategoryTitle}
            style={{
              width: 120,
            }}
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
        </Modal>
      </>

      {content ? (
        content.map((order, i) => (
          <OrderForm
            key={i}
            id={1}
            client_name={order.client_name}
            assignee_name={order.assignee_name}
            services={order.services}
            price={order.price}
            // item={order}
            client_id={0}
            assignee_id={0}
            editable={false}
            handleDelete={() => console.log("some")}
          />
        ))
      ) : (
        <>Hello</>
      )}
    </>
  );
};
