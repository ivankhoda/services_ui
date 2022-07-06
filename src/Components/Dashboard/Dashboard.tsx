import { Table } from "antd";

type Client = {
  name: string;
  surname: string;
  id: number;
};
type Clients = {
  clients: Client[];
};

import React, { useEffect, useState } from "react";
export const Dashboard = () => {
  const [clients, setClients] = useState<Clients | null>();

  useEffect(() => {
    const getData = async () => {
      const clients = await fetch("http://localhost:3000/clients", {
        method: "GET",
      });

      setClients(await clients.json());
    };

    getData();
  }, []);

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      surname: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      surname: "10 Downing Street",
    },
  ];
  console.log(clients?.clients);
  // clients?.forEach((e) => {
  //   console.log(e);
  // });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
  ];

  return (
    <>
      <div>
        Dashb, this is a dashboard component
        {dataSource ? <Table dataSource={clients?.clients} columns={columns} /> : <>Nothing</>}
      </div>
    </>
  );
};
