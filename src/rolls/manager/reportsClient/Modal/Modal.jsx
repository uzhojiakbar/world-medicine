
import { Title } from "../../../../root/style";
import { ModalOverlay, ModalContainer, FilterContainer, Select, StatsContainer, Stat, TableStyled, TableRow, CloseButton, Item, } from "./style"

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
  return (
    <ModalOverlay open={id}
      onOk={() => setId(false)}
      onCancel={() => setId(false)}
      footer={[]}
      centered>
      <ModalContainer>
        <div >

          <CloseButton onClick={() => setId(false)}>X</CloseButton>
          <Title size="24px">Поиск выписок по фильтрам</Title>

        </div>
        <FilterContainer>
          <Select>
            <option>Ф.И.О</option>
          </Select>
          <Select>
            <option>Район</option>
          </Select>
          <Select>
            <option>ЛПУ</option>
          </Select>
          <Select>
            <option>Специальность</option>
          </Select>
          <Select>
            <option>Выписано</option>
          </Select>
        </FilterContainer>

        <StatsContainer>
          <Stat>Продано 1000</Stat>
          <Stat active="true">Выписано 950</Stat>
          <Stat>Дозволено 90% (900)</Stat>
          <Stat>Оставлено 900 (90%)</Stat>
        </StatsContainer>

        <TableStyled>
          <thead>
            <tr>
              {thead.map((v, i) => (
                <th className={i == 0 ? "left" : ""} key={v}>
                  {v}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>

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
          </tbody>
        </TableStyled>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default UsloviyaModal;
