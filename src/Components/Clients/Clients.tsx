import axios from "axios";
import React, { ChangeEvent, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { Client, ClientForm } from "../ClientsForm/ClientForm";
import { Popup } from "./Popup";
interface PaperProps {
  children: ReactElement;
}
const Paper: React.FC<PropsWithChildren<PaperProps>> = ({ children }) => {
  return <div className="paper">{children}</div>;
};
export type Clients = {
  clients: Client[] | undefined;
};

export const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [visible, setVisible] = useState(false);

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

  const onDelete = (clickedItem: Client) => {
    const clientId = clickedItem.id;

    axios
      .delete(`http://localhost:3000/client/${clientId}`)
      .then((res) => {})
      .catch((err) => console.log(err));

    const newArray = clients?.filter((item) => item.id !== clickedItem.id);

    setClients(newArray);
  };
  const handleSubmit = () => {
    console.log(firstName, lastName);
    // axios
    //   .post(`http://localhost:3000/client/`, { client: { name: firstName, surname: lastName } })
    //   .then((res) => {})
    //   .catch((err) => console.log(err));
    setVisible(false);
  };

  const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value);
  };
  const handleSurnameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.currentTarget.value);
  };

  return (
    <>
      <div>
        <Paper>
          <div>
            <Popup
              firstName={firstName}
              lastName={lastName}
              // handleNameInput={() => handleNameInput}
              // handleSurnameInput={() => handleSurnameInput}
              onSubmit={handleSubmit}
              open={visible}
            />
            {clients ? (
              clients?.map((client) => (
                <ClientForm
                  key={client.id}
                  id={client.id}
                  name={client.name}
                  surname={client.surname}
                  item={client}
                  editable={false}
                  handleDelete={onDelete}
                />
              ))
            ) : (
              <>Nothing to display yet</>
            )}
          </div>
        </Paper>
      </div>
    </>
  );
};
