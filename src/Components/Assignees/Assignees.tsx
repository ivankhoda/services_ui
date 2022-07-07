import { Button, Input, Modal } from "antd";
import axios from "axios";
import React, { ChangeEvent, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { Assignee, AssigneeForm } from "./AssigneeForm";
interface PaperProps {
  children: ReactElement;
}
const Paper: React.FC<PropsWithChildren<PaperProps>> = ({ children }) => {
  return <div className="paper">{children}</div>;
};

export const Assignees = () => {
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Please input assignee name and surname");

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
      const assignees = await fetch("http://localhost:3000/assignees", {
        method: "GET",
      });
      const data = await assignees.json();
      setAssignees(data.assignees);
    };

    getData();
  }, []);

  const onDelete = (clickedItem: Assignee) => {
    const assigneeId = clickedItem.id;
    axios
      .delete(`http://localhost:3000/assignee/${assigneeId}`)
      .then((res) => {})
      .catch((err) => console.log(err));
    const newArray = assignees?.filter((item) => item.id !== clickedItem.id);
    setAssignees(newArray);
  };

  const onSubmit = () => {
    axios
      .post(`http://localhost:3000/assignee/`, { assignee: { name: firstName, surname: lastName } })
      .then((res) => {
        const newAssignee: Assignee = res.data.message;
        setAssignees([...assignees, newAssignee]);
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
                Create new Assignee
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
            {assignees ? (
              assignees?.map((client) => (
                <AssigneeForm
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
