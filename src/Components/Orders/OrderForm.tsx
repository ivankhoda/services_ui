import { Button, Col, Input, Row, Select } from "antd";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
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
  client_surname: string;
  services: Service[];
  item: OrderAttributes;
  assignee_name?: string;
  assignee_surname: string;
  price: number;
  client_id: number;
  assignee_id: number;
  editable: boolean;

  handleDelete: (item: OrderAttributes) => void;
};

export const OrderForm = (props: OrderAttributes) => {
  const {
    id,
    client_name,
    client_surname,
    client_id,
    assignee_name,
    assignee_surname,
    assignee_id,
    services,
    price,
    item,
    handleDelete,
    editable,
  } = props;
  const [notEditable, setEditable] = useState(editable);
  const [customer, setCustomer] = useState({ client_name, client_surname, client_id });
  const [assignee, setAssignee] = useState({ assignee_name, assignee_surname, assignee_id });
  const [amount, setAmount] = useState(price);
  const [orderServices, setOrderService] = useState(services);

  const [orders, setOrders] = useState<Order[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [genericService, setGenericServices] = useState<Service[]>([]);

  const { Option } = Select;
  const handleEdit = (notEditable: boolean) => {
    setEditable(!notEditable);
  };
  const handlePriceInput = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.currentTarget.value));
  };

  useEffect(() => {
    const getData = async () => {
      const assignees = await fetch("http://localhost:3000/assignees", {
        method: "GET",
      });
      const services = await fetch("http://localhost:3000/generic-services", {
        method: "GET",
      });
      const clients = await fetch("http://localhost:3000/clients", {
        method: "GET",
      });
      const orders = await fetch("http://localhost:3000/orders", {
        method: "GET",
      });
      const data = await assignees.json();
      setAssignees(data.assignees);
      const servicesData = await services.json();
      setGenericServices(servicesData.generic_services);
      const clientsData = await clients.json();
      setClients(clientsData.clients);
      const orderData = await orders.json();
      setOrders(orderData.data);
    };

    getData();
  }, []);

  const onSave = (clickedItem) => {
    const newCustomer = clients.find((c) => c.id === customer.client_id);
    const newAssignee = assignees.find((a) => a.id === assignee.assignee_id);
    const orderId = clickedItem.id;
    const clientName = `${newCustomer!.name} ${newCustomer!.surname}`;
    const assigneeName = `${newAssignee!.name} ${newAssignee!.surname}`;
    console.log(orderServices);
    axios
      .patch(`http://localhost:3000/order/${orderId}`, {
        order: {
          client_name: clientName,
          assignee_name: assigneeName,
          price: amount,
          client_id: newCustomer?.id,
          assignee_id: newAssignee?.id,
          positions: orderServices,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setEditable(!notEditable);
  };
  const handleSelectCustomer = (value) => {
    const newCustomer = clients.find((client) => client.id === value);

    setCustomer({ client_name: newCustomer!.name, client_surname: newCustomer!.surname, client_id: newCustomer!.id });
  };

  const handleSelectAssignee = (value) => {
    const newAssignee = assignees.find((assignee) => assignee.id === value);

    setAssignee({
      assignee_name: newAssignee!.name,
      assignee_surname: newAssignee!.surname,
      assignee_id: newAssignee!.id,
    });
  };
  const handleSelectService = (value) => {
    console.log(orderServices);
    console.log(value);

    // const selectedServices: Service[] = [];s
    const newService = genericService.find((service) => service.id === value);
    console.log(newService);
    console.log(orderServices);
    orderServices.find((orderService) => {
      console.log(orderService.title, newService!.title);
    });

    // newService ? selectedServices.push(newService) : null;
    // setOrderService([...orderServices, ...selectedServices]);
  };

  return (
    <Row>
      <Col span={6}>
        <Select
          defaultValue={customer.client_name}
          disabled={!notEditable ? true : false}
          style={{
            width: 160,
          }}
          onChange={handleSelectCustomer}
        >
          {clients.map((client, i) => {
            return (
              <Option key={i} value={client.id}>
                {client.name} {client.surname}
              </Option>
            );
          })}
        </Select>
      </Col>
      <Col span={6}>
        <Select
          defaultValue={assignee.assignee_name}
          disabled={!notEditable ? true : false}
          style={{
            width: 160,
          }}
          onChange={handleSelectAssignee}
        >
          {assignees.map((assignee, i) => {
            return (
              <Option key={i} value={assignee.id}>
                {assignee.name} {assignee.surname}
              </Option>
            );
          })}
        </Select>
      </Col>
      <Col span={4}>
        {orderServices?.map((s, i) => {
          return (
            <Select
              key={i}
              defaultValue={s.title}
              disabled={!notEditable ? true : false}
              onChange={handleSelectService}
              style={{
                width: 160,
              }}
            >
              {genericService.map((service, i) => {
                return (
                  <Option key={i} value={service.id}>
                    {service.title}
                  </Option>
                );
              })}
            </Select>
          );
        })}
      </Col>
      <Col span={3}>
        <Input
          type="text"
          readOnly={notEditable ? false : true}
          defaultValue={amount}
          onChange={handlePriceInput}
        ></Input>
      </Col>

      <Col span={3}>
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
