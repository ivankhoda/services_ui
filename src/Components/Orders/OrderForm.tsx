import { Button, Col, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Assignee } from "../Assignees/AssigneeForm";
import { Client } from "../ClientsForm/ClientForm";

export type Service = {
  title: string;
  assigneeTitle: string;
  id: number;
};
export type Order = {
  id: number;
  attributes: OrderAttributes;
};
export type OrderAttributes = {
  id: number;
  client_name: string;
  services: Service[];
  assignee_name: string;
  price: number;
  client_id: number;
  assignee_id: number;
  editable: boolean;
  // item: Order;
  handleDelete: (item: Order) => void;
};
type TableProps = {
  id: number;
  title: string;
  assigneeTitle: string;
  item: Order;
  editable: boolean;

  handleDelete: (item: Order) => void;
};

export const OrderForm = (props: OrderAttributes) => {
  const { id, client_name, assignee_name, services, price, handleDelete, editable } = props;
  const [notEditable, setEditable] = useState(editable);
  // const [serviceTitle, setServiceTitle] = useState("title");
  const [customer, setCustomer] = useState(client_name);
  const [assignee, setAssignee] = useState(assignee_name);
  // const [assignees, setCategories] = useState<assignee[]>([]);
  // const [orders, setOrders] = useState<Order[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [genericService, setGenericServices] = useState<Service[]>([]);

  const { Option } = Select;
  const handleEdit = (notEditable: boolean) => {
    setEditable(!notEditable);
  };
  // const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
  //   setServiceTitle(e.currentTarget.value);
  // };

  // useEffect(() => {
  //   const getData = async () => {
  //     const orders = await fetch("http://localhost:3000/orders", {
  //       method: "GET",
  //     });
  //     const data = await orders.json();
  //     setOrders(data.data);
  //   };

  //   getData();
  // }, []);
  // useEffect(() => {
  //   const getData = async () => {
  //     const clients = await fetch("http://localhost:3000/clients", {
  //       method: "GET",
  //     });
  //     const data = await clients.json();
  //     setClients(data.clients);
  //   };

  //   getData();
  // }, []);
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
      // const assignees = await fetch("http://localhost:3000/assignees", {
      //   method: "GET",
      // });
      // const categoriesData = await assignees.json();
      // setCategories(categoriesData.assignees);

      const servicesData = await services.json();
      setGenericServices(servicesData.generic_services);
    };

    getData();
  }, []);

  const onSave = (clickedItem) => {
    const serviceId = clickedItem.id;
    console.log(clickedItem);
    // axios
    //   .patch(`http://localhost:3000/generic-service/${serviceId}`, {
    //     service: { title: serviceTitle, service_assignee: serviceassigneeTitle },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => console.log(err));
    setEditable(!notEditable);
  };
  const handleSelect = (value) => {
    // setServiceassigneeTitle(value);
    console.log(value);
  };
  // console.log(customer);

  console.log(services, "services");

  return (
    <Row>
      <Col span={4}>
        <Select
          defaultValue={customer}
          disabled={!notEditable ? true : false}
          style={{
            width: 160,
          }}
          // onChange={handleSelect}
        >
          {clients.map((client, i) => {
            return (
              <Option key={i} value={client.name}>
                {client.name} + {client.surname}
              </Option>
            );
          })}
        </Select>
      </Col>
      <Col span={4}>
        <Select
          defaultValue={assignee}
          disabled={!notEditable ? true : false}
          style={{
            width: 160,
          }}
          // onChange={handleSelect}
        >
          {assignees.map((assignee, i) => {
            return (
              <Option key={i} value={assignee.name}>
                {assignee.name} {assignee.surname}
              </Option>
            );
          })}
        </Select>
      </Col>
      <Col span={4}>
        {services.map((s, i) => {
          return (
            <Select
              key={i}
              defaultValue={s.title}
              disabled={!notEditable ? true : false}
              onChange={handleSelect}
              style={{
                width: 160,
              }}
            >
              {genericService.map((service, i) => {
                return (
                  <Option key={i} value={service.title}>
                    {service.title}
                  </Option>
                );
              })}
            </Select>
          );
        })}
      </Col>
      <Col span={4}>
        <Input
          type="text"
          readOnly={notEditable ? false : true}
          defaultValue={price}
          // onChange={handleNameInput}
        ></Input>
      </Col>

      <Col span="3">
        <Button type="primary" onClick={notEditable ? () => onSave("ss") : () => handleEdit(notEditable)}>
          {notEditable ? "Save" : "Edit"}
        </Button>

        <Button
          type="primary"
          // onClick={() => handleDelete(item)}
        >
          Delete
        </Button>
      </Col>
    </Row>
  );
};
