import { DownloadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Input, Modal, Row, Select } from "antd";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Assignee } from "../Assignees/AssigneeForm";
import { Category } from "../Categories/CategoryForm";
import { Client } from "../ClientsForm/ClientForm";
import { Service } from "../Services/ServiceForm";
import { OrderFilters } from "./OrderFilters";
import { Order, OrderAttributes, OrderForm } from "./OrderForm";
export type GenericService = {
  id: number;
  title: string;
  category_title: string;
  category_id: string;
};

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Please input service title");
  const [clients, setClients] = useState<Client[]>([]);
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { Option } = Select;

  const [customer, setCustomer] = useState<Client>();
  const [assignee, setAssignee] = useState<Assignee>();
  const [amount, setAmount] = useState<Number>();
  const [orderServices, setOrderService] = useState<Service[]>([]);

  const [genericService, setGenericServices] = useState<GenericService[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const getData = async () => {
      const orders = await fetch(`${process.env.BASE_URL}/orders?search_term=${searchTerm}`, {
        method: "GET",
      });
      const data = await orders.json();
      setOrders(data.data);
    };
    getData();
  }, [searchTerm]);

  useEffect(() => {
    const getData = async () => {
      const clients = await fetch(`${process.env.BASE_URL}/clients`, {
        method: "GET",
      });
      const clientsData = await clients.json();
      setClients(clientsData.clients);

      const assignees = await fetch(`${process.env.BASE_URL}/assignees`, {
        method: "GET",
      });
      const assigneeData = await assignees.json();
      setAssignees(assigneeData.assignees);
      const services = await fetch(`${process.env.BASE_URL}/generic-services`, {
        method: "GET",
      });
      const categories = await fetch(`${process.env.BASE_URL}/categories`, {
        method: "GET",
      });
      const categoriesData = await categories.json();
      setCategories(categoriesData.categories);

      const servicesData = await services.json();
      setGenericServices(servicesData.generic_services);
    };

    getData();
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  let content: OrderAttributes[] = [];
  orders.forEach((order) => content.push(order.attributes));

  const onSubmit = () => {
    const newCustomer = clients.find((c) => c.id === customer!.id);
    const newAssignee = assignees.find((a) => a.id === assignee!.id);

    const clientName = `${newCustomer!.name} ${newCustomer!.surname}`;
    const assigneeName = `${newAssignee!.name} ${newAssignee!.surname}`;
    console.log(orderServices);
    axios
      .post(`${process.env.BASE_URL}/order/`, {
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
        const order = res.data;

        setOrders([...orders, order.data]);
      })
      .catch((err) => console.log(err));

    setVisible(false);
  };

  const handleSelectCustomer = (value) => {
    const newCustomer = clients.find((client) => client.id === value);

    setCustomer({ name: newCustomer!.name, surname: newCustomer!.surname, id: newCustomer!.id });
  };

  const handleSelectAssignee = (value) => {
    const newAssignee = assignees.find((assignee) => assignee.id === value);

    setAssignee({
      name: newAssignee!.name,
      surname: newAssignee!.surname,
      id: newAssignee!.id,
    });
  };
  const handleSelectService = (value) => {
    const selectedServices: GenericService[] = [];
    value.forEach((element) => {
      const item = genericService.find((genericService) => genericService.id === element);
      item ? selectedServices.push(item) : null;
    });
    setOrderService(selectedServices);
  };

  const handlePriceInput = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const onDelete = (clickedItem: OrderAttributes) => {
    const orderId = clickedItem.id;
    axios
      .delete(`${process.env.BASE_URL}/order/${orderId}`)
      .then((res) => {})
      .catch((err) => console.log(err));
    orders.forEach((o) => console.log(typeof o.id, typeof clickedItem.id));
    const newArray = orders?.filter((order) => Number(order.id) !== clickedItem.id);

    setOrders(newArray);
  };

  const sortingData = ["Empty", "Client", "Assignee", "Category"];

  const sortings = {
    Empty: [],
    Client: clients,
    Assignee: assignees,
    Category: categories,
  };

  const [sortingElements, setSortingElements] = useState(sortings[sortingData[0]]);
  const [secondSortingElements, setSecondSortingElements] = useState("");
  const [searchingElement, setSearchElement] = useState<string | undefined>("");

  const makeQueryParams = (value) => {
    switch (value) {
      case "client":
        return "client_id";
      case "assignee":
        return "assignee_id";
      case "category":
        return "category_id";
    }
  };

  const handlesortingChange = (value) => {
    setSortingElements(sortings[value]);
    const queryRequest = makeQueryParams(value.toLowerCase());
    setSearchElement(queryRequest);
  };

  const onSecondSortingChange = (value) => {
    setSecondSortingElements(value);
  };

  const onApplyFilters = () => {
    setSearchTerm(`${searchingElement}=${secondSortingElements}`);
  };

  const onDownload = () => {
    function download(blob, filename) {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;

      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
    const getData = async () => {
      fetch(`${process.env.BASE_URL}/orders/export?search_term=${searchTerm}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/vnd.ms-excel",
        },
      })
        .then((response) => response.blob())
        .then((blob) => download(blob, "data.xlsx"));
    };

    getData();
  };

  return (
    <>
      <OrderFilters />
      <div>
        Sort orders by
        <Select
          defaultValue={sortingData[0]}
          style={{
            width: 120,
          }}
          onChange={handlesortingChange}
        >
          {sortingData.map((sorting) => (
            <Option key={sorting}>{sorting}</Option>
          ))}
        </Select>
        <Select
          style={{
            width: 120,
          }}
          value={secondSortingElements}
          onChange={onSecondSortingChange}
        >
          {sortingElements.map((element) =>
            element.name ? (
              <Option key={element.id}>
                {element.name} {element.surname}
              </Option>
            ) : (
              <Option key={element.id}>{element.title}</Option>
            )
          )}
        </Select>
        <Button type="primary" onClick={onApplyFilters}>
          Apply filters
        </Button>
        <Button
          type="primary"
          shape="round"
          download={"/data.xlsx"}
          icon={<DownloadOutlined />}
          size={"middle"}
          onClick={onDownload}
        >
          Download
        </Button>
      </div>

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
          width={1000}
        >
          <p>{modalText}</p>
          <Row>
            <Col span={6}>
              <Select
                defaultValue={""}
                placeholder={"Select customer"}
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
                defaultValue={""}
                placeholder={"Select assignee"}
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
              <Checkbox.Group
                style={{
                  width: "100%",
                }}
                onChange={handleSelectService}
              >
                <Col>
                  {genericService.map((service, i) => {
                    return (
                      <Col span={8}>
                        <Checkbox key={i} value={service.id}>
                          {service.title}
                        </Checkbox>
                      </Col>
                    );
                  })}
                </Col>
              </Checkbox.Group>
            </Col>

            <Col span={3}>
              <Input type="number" placeholder="Enter price" defaultValue={0} onChange={handlePriceInput}></Input>
            </Col>
          </Row>
        </Modal>
      </>
      {content.map((order, i) => (
        <OrderForm
          key={order.id}
          id={order.id}
          client_name={order.client_name}
          client_surname={order.client_surname}
          assignee_name={order.assignee_name}
          assignee_surname={order.assignee_surname}
          services={order.services}
          price={order.price}
          item={order}
          client_id={order.client_id}
          assignee_id={order.assignee_id}
          editable={false}
          handleDelete={onDelete}
        />
      ))}
    </>
  );
};
