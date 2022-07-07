import React, { useEffect, useState } from "react";
export type Order = {
  clientName: string;
  positions: string[];
  assignee_name: string;
  price: number;
  client_id: number;
  assignee_id: number;
};

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getData = async () => {
      const orders = await fetch("http://localhost:3000/orders", {
        method: "GET",
      });
      const data = await orders.json();
      setOrders(data.orders);
    };

    getData();
  }, []);
  console.log(orders);
  orders.forEach((o) => {
    console.log(o.positions);
  });
  return (
    <>
      <div>Here is main component</div>
    </>
  );
};
