
// import { Title } from "../../../../root/style";
import { ModalOverlay, ModalContainer, FilterContainer, Select, StatsContainer, Stat, TableStyled, TableRow, CloseButton, Item, Title } from "./style"
import PrimarySelect from "../../../../components/Generic/Select/Select"
import { useLanguage } from "../../../../context/LanguageContext";
import { useState } from "react";
import Input2 from "../../../../components/Generic/Input/Input2";
import { Tumanlar } from "../../../../mock/data";
const tableData = [
  {
    id: 1,
    data: ["Ампициллин таб. 5/10мг №30", "1000", "900", "1700"],
    highlight: true,
    colors: {
      iconcolor: "#FB3748",
      textcolor: "black",
    },
  },
  {
    id: 1,
    data: ["Ампициллин таб. 5/10мг №30", "1000", "900", "1700"],
    highlight: true,
    colors: {
      bgcolorr: "#FFDB43",
      textcolor: "black",
      iconcolor: "#216BF4",
    },
  },
  {
    id: 1,
    data: ["Артрокол р-р д/ин амп.10мг/2мл №5", "XX", "XX", "XX"],
    highlight: true,
    colors: {
      bgcolorr: "#FB3748",
      iconbgcolor: "#e1858d",
      iconcolor: "white",
      textcolor: "white",
    },
  },
];

const UsloviyaModal = ({ setId = () => { }, id = 0, thead = [], data = [] }) => {
  if (data.length) {
    data = tableData
  }

  const { translate } = useLanguage();
  const [filterData, setFilterData] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData((filterData) => ({
      ...filterData,
      [name]: value, // formData ichidagi qiymatni yangilash
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleSelectChange = ([name, value]) => {
    setFilterData((filterData) => ({
      ...filterData,
      [name]: value, // select uchun tanlangan qiymatni saqlash
    }));


  };
  console.log(filterData);


  return (
    <ModalOverlay open={id}
      onOk={() => setId(false)}
      onCancel={() => setId(false)}
      footer={[]}
      centered>
      <ModalContainer>
        <div >
          <Title size="24px">{translate("Поиск выписок по фильтрам")}</Title>
          <CloseButton onClick={() => setId(false)}>
            <svg width="48" height="48" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.5" d="M28.3337 16.4993C28.3337 23.3108 22.8118 28.8327 16.0003 28.8327C9.18881 28.8327 3.66699 23.3108 3.66699 16.4993C3.66699 9.68783 9.18881 4.16602 16.0003 4.16602C22.8118 4.16602 28.3337 9.68784 28.3337 16.4993Z" stroke="#808080" stroke-width="2" />
              <path d="M11.9599 12.4589C12.3504 12.0684 12.9836 12.0684 13.3741 12.4589L16.0003 15.0852L18.6266 12.4589C19.0171 12.0684 19.6502 12.0684 20.0407 12.4589C20.4313 12.8495 20.4313 13.4826 20.0407 13.8732L17.4146 16.4993L20.0407 19.1255C20.4313 19.516 20.4313 20.1492 20.0407 20.5397C19.6502 20.9303 19.017 20.9303 18.6265 20.5397L16.0003 17.9136L13.3742 20.5397C12.9836 20.9303 12.3504 20.9303 11.9599 20.5397C11.5694 20.1492 11.5694 19.5161 11.9599 19.1256L14.5862 16.4993L11.9599 13.8731C11.5694 13.4826 11.5694 12.8494 11.9599 12.4589Z" fill="#808080" />
            </svg>

          </CloseButton>
        </div>
        <FilterContainer>
          <Input2
            type={"text"}
            placeholder={translate("Ф.И.О")}
            onChange={handleChange}
            name="fullName"
          />
          <PrimarySelect
            def={translate("Район")}
            options={Tumanlar["Наманган"]}
            onValueChange={(value) => handleSelectChange(["city", value])}
          />
          <PrimarySelect
            def={translate("ЛПУ")}
            options={Tumanlar["Наманган"]}
            onValueChange={(value) => handleSelectChange(["ЛПУ", value])}
          />
          <PrimarySelect
            def={translate("Специальность")}
            options={Tumanlar["Наманган"]}
            onValueChange={(value) => handleSelectChange(["city", value])}
          />


        </FilterContainer>

        <StatsContainer>
          <Stat>
            <p>Дозволено</p>
            <p>900</p>
          </Stat>
          <Stat>
            <p>Выписано</p>
            <p >900</p>
          </Stat>
          <CloseButton onClick={() => setId(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="3 0 40 40" fill="none">
              <path opacity="0.5" d="M43 24C43 34.4933 34.4933 43 24 43C13.5066 43 5 34.4933 5 24C5 13.5066 13.5066 5 24 5C34.4933 5 43 13.5066 43 24Z" stroke="#808080" stroke-width="2" />
              <path d="M17.9393 17.9393C18.5251 17.3536 19.4749 17.3536 20.0606 17.9393L24 21.8788L27.9394 17.9394C28.5252 17.3536 29.4748 17.3536 30.0606 17.9394C30.6464 18.5252 30.6464 19.4749 30.0606 20.0608L26.1214 24L30.0606 27.9392C30.6464 28.525 30.6464 29.4748 30.0606 30.0606C29.4748 30.6464 28.525 30.6464 27.9392 30.0606L24 26.1214L20.0608 30.0606C19.4749 30.6464 18.5252 30.6464 17.9394 30.0606C17.3536 29.4748 17.3536 28.5252 17.9394 27.9394L21.8788 24L17.9393 20.0606C17.3536 19.4749 17.3536 18.5251 17.9393 17.9393Z" fill="#808080" />
            </svg>

          </CloseButton>
        </StatsContainer>

        <TableStyled>
          {/* <thead> */}
          <tr>
            {thead.map((v, i) => (
              <th className={i == 0 ? "left" : ""} key={v}>
                {v}
              </th>
            ))}
          </tr>
          {/* </thead> */}
          {/* <tbody> */}

          {data.map((row, index) => {
            let col = row?.colors?.bgcolorr;
            let k = row?.data?.length + 1

            return (
              <TableRow key={index} background={col}>
                {row?.data?.map((v, i) => {
                  k++
                  const colors = row.colors;
                  return (
                    <Item {...colors} className={i == 0 ? "left" : ""} key={k}>

                      {v}

                    </Item>
                  );
                })}

              </TableRow>
            );
          })}
          {/* </tbody> */}
        </TableStyled>
      </ModalContainer>
    </ModalOverlay >
  );
};

export default UsloviyaModal;
