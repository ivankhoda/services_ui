import React, { useEffect, useState } from "react";

type WalletInfo = {
  opening: string;
  debit: string;
  credit: string;
  closing: string;
};
type CustomerProperties = {};
type CustomerInfo = {
  created: string;
  id: string;
  modified: string;
  number: string;
  properties: any[];
  registryId: string;
  state: string;
  type: string;
};
export const Wallet = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const services = await fetch("http://localhost:3000/services", {
        method: "GET",
      });
      const categories = await fetch("http://localhost:3000/categories", {
        method: "GET",
      });

      setServices(await services.json());
      setCategories(await categories.json());
    };

    getData();
  }, []);
  console.log(services);
  console.log(categories);
  return <></>;
};
