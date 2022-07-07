import { Button, Input, Modal } from "antd";
import axios from "axios";
import React, { ChangeEvent, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { Client, ClientForm } from "../ClientsForm/ClientForm";
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
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Please input customer name and surname");

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value);
  };
  const handleSurnameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.currentTarget.value);
  };

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

  const onSubmit = () => {
    axios
      .post(`http://localhost:3000/client/`, { client: { name: firstName, surname: lastName } })
      .then((res) => {
        const newClient: Client = res.data.message;
        setClients([...clients, newClient]);
      })
      .catch((err) => console.log(err));
    setVisible(false);
  };

  return (
    <>
      <div>
        <Paper>
          <div>
            <>
              <Button type="primary" onClick={showModal}>
                Create new Client
              </Button>
              <Modal
                title="Add new customer"
                visible={visible}
                onOk={onSubmit}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <p>{modalText}</p>

                <Input
                  required
                  minLength={1}
                  maxLength={20}
                  placeholder="Input name..."
                  defaultValue={firstName}
                  onChange={handleNameInput}
                ></Input>
                <Input
                  required
                  minLength={1}
                  maxLength={20}
                  placeholder="Input surname..."
                  defaultValue={lastName}
                  onChange={handleSurnameInput}
                ></Input>
              </Modal>
            </>
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
