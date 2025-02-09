import React from "react";
import Filter from "./filter/Filter";
import MainTable from "./Table";
import { useLanguage } from "../../../context/LanguageContext";
import styled from "styled-components";
import { media } from "../../../utils/media";

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
> div {
  font-size: ${({ size }) => (size ? size : "36px")};
  font-weight: 800;
  
  font-family: "Vela Sans GX", sans-serif;
}
/* justify-content: space-between; */

${media.mobileL} {
  font-size: 28px;
}

>p{
  font-size: 20px;
  font-weight: 600;
  margin-top: 5px;
  color: #7C7C7E;
}
`;
const Arxiv = () => {
  const { translate } = useLanguage();


  return (
    <>
      <Filter id={0} />
      <Title>
        <div>
          {translate("Договоры")}
        </div>
        <p>(200 Вр)</p>
      </Title>
      <MainTable title="rahmadjon" data={[]} />
    </>
  );
};

export default Arxiv;
