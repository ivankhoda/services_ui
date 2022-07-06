import { Table } from "antd";

import React, { useEffect, useState } from "react";
export const Dashboard = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const clients = await fetch("http://localhost:3000/clients", {
        method: "GET",
      });

      setClients(await clients.json());
    };

    getData();
  }, []);
  console.log(clients);
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <>
      <div>
        Dashb, this is a dashboard component
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </>
  );
};
