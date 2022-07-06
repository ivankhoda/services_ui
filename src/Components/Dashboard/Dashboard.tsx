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

  return (
    <>
      <div>Dashb, this is a dashboard component</div>
    </>
  );
};
