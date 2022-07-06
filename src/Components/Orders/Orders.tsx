import React, { useEffect, useState } from "react";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const orders = await fetch("http://localhost:3000/orders", {
        method: "GET",
      });

      setOrders(await orders.json());
    };

    getData();
  }, []);
  console.log(orders);

  return (
    <>
      <div>Here is main component</div>
    </>
  );
};
