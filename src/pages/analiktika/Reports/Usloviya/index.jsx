import React, { useState } from "react";
import {
  ButtonWrapper,
  Container,
  Info,
  InfoCard,
  InfoWrapper,
  Input,
  Item,
  MiniItem,
  MiniItemWrapper,
  Wrap,
} from "./style";
import { Title, TitleSmall } from "../../../../root/style";
import Button from "../../../../components/Generic/Button/Button";
import IconPlus from "../../../../assets/svg/IconPlus";
import { useLanguage } from "../../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "../../../../components/Generic/DataRangePicker/DataRangePicker";
import IconPlusChange from "../../../../assets/svg/IconPlusChange";
import ModalUsloviyaPrescription from "./ModalUsloviya";
import ModalDogovor from "./ModalDogovor";

const Usloviya = () => {
  const titleChange = 1;
  const { translate } = useLanguage();
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("Рецепт");
  const [mavjudFoizlar, setMavjudFoizlar] = useState([
    { first: "<=60%", second: "30%" },
    { first: "<=60%" },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [isInput, setIsInput] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);

  const information = {
    title: translate("Условия"),
    titles: [
      translate("Рецепт"),
      translate("СУ"),
      translate("СБ"),
      translate("ГЗ"),
      translate("Кабинет вакцинации"),
    ],
    kvota: translate("Квота"),
    infoTitles: [
      { title: translate("Доступный %СУ"), value: "30%" },
      { title: translate("Доступный %СБ"), value: "30%" },
      { title: translate("Доступный %ГЗ"), value: "30%" },
    ],
    time: translate("Срок сдачи"),
    subtitle: translate("Доступный процент суммы"),
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const [values, setValues] = useState(
    information.infoTitles.map((item) => item.value)
  );

  const handleChange = (e, index) => {
    let inputValue = e.target.value;

    // Agar % belgi yo'q bo'lsa, uni oxirida qo'shib qo'yamiz
    if (!inputValue.includes("%") && inputValue.length > 1) {
      inputValue += "%";
    }

    const updatedValues = [...values];
    updatedValues[index] = inputValue;
    setValues(updatedValues);
  };

  const handleClickOutside = (e) => {
    if (e.target.tagName == "P" || e.target.tagName === "INPUT") {
      // Boshqa joy bosilganda tahrirni tugatadi
    } else setEditingIndex(null);
  };

  React.useEffect(() => {
    // Hodisani faollashtirish
    document.addEventListener("click", handleClickOutside);

    return () => {
      // Hodisani tozalash
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <ModalDogovor id={openModal} setId={setOpenModal} />

      <Title className="titlee">
        {information.title}
        <Button onClick={() => nav("../")} icon={<IconPlus />}>
          {translate("Загрузить_базу_менеджеров")}
        </Button>
      </Title>

      <ButtonWrapper>
        {information.titles.map((tab) => (
          <Item
            key={tab}
            active={activeTab === tab ? "true" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Item>
        ))}
      </ButtonWrapper>

      <Wrap>
        <InfoWrapper>
          <DateRangePicker />
          <Info>
            <p>{information.kvota}:</p>
            <p>56.000</p>
          </Info>
        </InfoWrapper>
        <InfoWrapper>
          {information.infoTitles.map((v, index) => {
            return (
              <InfoCard>
                <p>{v.title}</p>
                {editingIndex === index && titleChange ? (
                  <Input
                    type="text"
                    value={values[index]}
                    onChange={(e) => handleChange(e, index)}
                    autoFocus
                    required
                  />
                ) : (
                  <p onClick={() => handleEdit(index)}>{values[index]}</p>
                )}
              </InfoCard>
            );
          })}
          <InfoCard>
            <p>{information.time}</p>
            <DateRangePicker />
          </InfoCard>
        </InfoWrapper>
      </Wrap>

      <Wrap>
        <TitleSmall>{information.subtitle}</TitleSmall>
        <InfoWrapper>
          {mavjudFoizlar?.map((v, i) => {
            if (mavjudFoizlar.length - 1 == i && !v.second) {
              return (
                <MiniItemWrapper>
                  <MiniItem>{v?.first}</MiniItem>
                  <MiniItem
                    btn="true"
                    onClick={() => {
                      setOpenModal(1);
                    }}
                  >
                    <IconPlusChange />
                  </MiniItem>
                </MiniItemWrapper>
              );
            } else
              return (
                <MiniItemWrapper key={i}>
                  <MiniItem>{v?.first}</MiniItem>
                  <MiniItem>{v?.second}</MiniItem>
                </MiniItemWrapper>
              );
          })}
          {mavjudFoizlar[mavjudFoizlar.length - 1].first &&
          mavjudFoizlar[mavjudFoizlar.length - 1].second ? (
            <MiniItemWrapper>
              <MiniItem
                btn="true"
                onClick={() => {
                  setOpenModal(1);
                }}
              >
                <IconPlusChange />
              </MiniItem>
            </MiniItemWrapper>
          ) : (
            ""
          )}
        </InfoWrapper>
      </Wrap>
    </Container>
  );
};

export default Usloviya;
