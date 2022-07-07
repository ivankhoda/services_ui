import { Button, Input, Modal } from "antd";
import axios from "axios";
import React, { ChangeEvent, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { Category, CategoryForm } from "./CategoryForm";
interface PaperProps {
  children: ReactElement;
}
const Paper: React.FC<PropsWithChildren<PaperProps>> = ({ children }) => {
  return <div className="paper">{children}</div>;
};

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Please input category title.");

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  useEffect(() => {
    const getData = async () => {
      const categories = await fetch("http://localhost:3000/categories", {
        method: "GET",
      });
      const data = await categories.json();
      setCategories(data.categories);
    };

    getData();
  }, []);

  const onDelete = (clickedItem: Category) => {
    const categoryId = clickedItem.id;
    axios
      .delete(`http://localhost:3000/category/${categoryId}`)
      .then((res) => {})
      .catch((err) => console.log(err));
    const newArray = categories?.filter((item) => item.id !== clickedItem.id);
    setCategories(newArray);
  };

  const onSubmit = () => {
    axios
      .post(`http://localhost:3000/category/`, { category: { title: title } })
      .then((res) => {
        const newCategory: Category = res.data.message;
        setCategories([...categories, newCategory]);
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
                Create new Category
              </Button>
              <Modal
                title="Add new category"
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
                  placeholder="Input title..."
                  defaultValue={title}
                  onChange={handleNameInput}
                ></Input>
              </Modal>
            </>
            {categories ? (
              categories?.map((category) => (
                <CategoryForm
                  key={category.id}
                  id={category.id}
                  title={category.title}
                  item={category}
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
