import { Button, Input, Modal, Select } from "antd";
import axios from "axios";
import React, { ChangeEvent, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { Category } from "../Categories/CategoryForm";
import { Service, ServiceForm } from "./ServiceForm";
interface PaperProps {
  children: ReactElement;
}
const Paper: React.FC<PropsWithChildren<PaperProps>> = ({ children }) => {
  return <div className="paper">{children}</div>;
};

export const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceCategoryTitle, setServiceCategoryTitle] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Please input service title");
  const [categories, setCategories] = useState<Category[]>([]);
  const { Option } = Select;
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleServiceTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setServiceTitle(e.currentTarget.value);
  };

  useEffect(() => {
    const getData = async () => {
      const services = await fetch(`${process.env.BASE_URL}/generic-services`, {
        method: "GET",
      });
      const categories = await fetch(`${process.env.BASE_URL}/categories`, {
        method: "GET",
      });
      const categoriesData = await categories.json();
      setCategories(categoriesData.categories);

      const servicesData = await services.json();
      setServices(servicesData.generic_services);
    };

    getData();
  }, []);

  const onDelete = (clickedItem: Service) => {
    const serviceId = clickedItem.id;
    axios
      .delete(`${process.env.BASE_URL}/generic-service/${serviceId}`)
      .then((res) => {})
      .catch((err) => console.log(err));
    const newArray = services?.filter((item) => item.id !== clickedItem.id);
    setServices(newArray);
  };

  const onSubmit = () => {
    axios
      .post(`${process.env.BASE_URL}/generic-service/`, {
        service: { title: serviceTitle, service_category: serviceCategoryTitle },
      })
      .then((res) => {
        const newService: Service = res.data.service;

        setServices([...services, newService]);
      })
      .catch((err) => console.log(err));
    setVisible(false);
  };

  const handleSelect = (value) => {
    setServiceCategoryTitle(value);
  };

  return (
    <>
      <div>
        <Paper>
          <div>
            <>
              <Button type="primary" onClick={showModal}>
                Create new Service
              </Button>
              <Modal
                title="Add new service"
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
                  defaultValue={serviceTitle}
                  onChange={handleServiceTitleInput}
                ></Input>

                <Select
                  defaultValue={serviceCategoryTitle}
                  style={{
                    width: 120,
                  }}
                  onChange={handleSelect}
                >
                  {categories ? (
                    categories.map((category, i) => {
                      return (
                        <Option key={i} value={category.title}>
                          {category.title}
                        </Option>
                      );
                    })
                  ) : (
                    <>Nothing to display yet</>
                  )}
                </Select>
              </Modal>
            </>
            {services ? (
              services?.map((service) => (
                <ServiceForm
                  key={service.id}
                  id={service.id}
                  title={service.title}
                  categoryTitle={service.category_title}
                  item={service}
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
