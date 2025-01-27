import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "antd";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    padding: 24px;
    width: 900px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #000000;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    margin: 0;
    color: #000000;
    font-size: 24px;
    font-weight: 700;
  }
`;

const Subtext = styled.span`
  background-color: #F7F8FC;
  padding: 17px 20px;
  border-radius: 57px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Btn = styled.button`
  background-color: #216BF4;
  width: 218px;
  outline: none;
  border-radius: 10px;
  padding: 14px 20px;
  color: #FFFFFF;
  font-size: 18px;
  border: none;
  font-weight: bold;
`;

const PackageList = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    background-color: #FFFFFF;
    padding: 17px 20px;
    border-radius: 10px;

    .rename {
      display: flex;
      align-items: center;
      gap: 10px;
      input{
        outline: none;
      }
    }

  }
`;

const GridItem = styled.div`
  background: #F7F8FC;
  border-radius: 10px;
  padding: 16px;
  margin-top: ${({ mt }) => mt && `${mt}px`};
  p {
    color: #000000;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 5px;
  }

  div {
    background: white;
    padding: 17px 20px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
  }
`;

const Fotercontainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    text-align: center;
    font-size: 24px;
  }
`;

const FooterButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;

  button {
    padding: 17px 20px;
    border: none;
    width: 200px;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;

    &.accept {
      background-color: #62FFAC;
    }

    &.reject {
      background-color: #F7F8FC;
    }
  }
`;

const HR = styled.div`
  background: #2426371A;
  height: 1px;
`;

const Modal1 = ({ isOpen, onClose }) => {
  const [packages, setPackages] = useState([
    { name: "Алтикам", amount: 100 },
    { name: "Ампилин", amount: 0 },
    { name: "Артокол мазь", amount: 23 },
    { name: "Артокол уколы", amount: 200 },
  ]);

  const [editingPackage, setEditingPackage] = useState(null);
  const [newAmount, setNewAmount] = useState("");

  const handleDelete = (index) => {
    setPackages(packages.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditingPackage(index);
    setNewAmount(packages[index].amount);
  };

  const handleSaveEdit = () => {
    const updatedPackages = [...packages];
    updatedPackages[editingPackage].amount = newAmount;
    setPackages(updatedPackages);
    setEditingPackage(null);
    setNewAmount("");
  };

  const data = {
    doctorName: "Евгений Александрович Усачев",
    workplace: "Ташкент, Салар, MClinic",
    registrationDate: "12.11.2021",
    contact: "+998 (97) 123 12 21",
    condition: "СУ",
    period: "С 29/11/2024 по 02/12/2024",
    goal: "Шаг",
    km: `1.740.000`,
  };

  return (
    <Modal title="Modal 1" open={isOpen} onOk={onClose} onCancel={onClose} footer={null}>
      <StyledModal title={null} open={isOpen} onCancel={onClose} footer={null} width={800}>
        <Container>
          <Header>Запрос на договор</Header>

          <Grid>
            <Field>
              <p>Врач</p>
              <Subtext>{data.doctorName}</Subtext>
            </Field>
            <Field>
              <p>Место работы</p>
              <Subtext>{data.workplace} <i className="fa-solid fa-pen"></i></Subtext>
            </Field>
            <Field>
              <p>Дата регистрации</p>
              <Subtext>{data.registrationDate}</Subtext>
            </Field>
            <Field>
              <p>Контакты врача</p>
              <Subtext>{data.contact} <i className="fa-solid fa-pen"></i></Subtext>
            </Field>
          </Grid>

          <HR />

          <Btn>Условие работы {data.condition}</Btn>

          <Grid>
            <GridItem>
              <p>Подключенный пакет</p>
              <PackageList>
                {packages.map((pkg, index) => (
                  <li key={index}>
                    <span>
                      <span
                        style={{ color: 'red', marginRight: "10px", cursor: 'pointer' }}
                        onClick={() => handleDelete(index)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </span>
                      {pkg.name}
                    </span>
                    <span className="rename">
                      {editingPackage === index ? (
                        <input
                          type="text"
                          value={newAmount}
                          onChange={(e) => setNewAmount(e.target.value)}
                          style={{ width: '60px' }}
                        />
                      ) : (
                        pkg.amount
                      )}
                      <i
                        className="fa-solid fa-pen"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleEdit(index)}
                      ></i>
                    </span>
                  </li>
                ))}
              </PackageList>
            </GridItem>

            <div>
              <GridItem>
                <p>Период выполнения</p>
                <div>{data.period}</div>
              </GridItem>
              <GridItem mt={12}>
                <p>Цель:</p>
                <div><span>{data.goal}</span> {data.km}</div>
              </GridItem>
            </div>
          </Grid>

          <HR />
          <Fotercontainer>
            <h2>Управление запросом</h2>
            <FooterButtons>
              <button className="reject" onClick={onClose}>
                <span><i className="fa-regular fa-circle-xmark"></i></span>
                Отклонить
              </button>
              <button className="accept" onClick={handleSaveEdit}>
                <span><i className="fa-solid fa-check"></i></span>
                Принять
              </button>
            </FooterButtons>
          </Fotercontainer>
        </Container>
      </StyledModal>
    </Modal>
  );
};

export default Modal1;
