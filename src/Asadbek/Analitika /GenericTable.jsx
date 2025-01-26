import React, { useState } from "react";
import { TitleSmall, WhiteWrapper } from "../../root/style";
import {
  PaginationButtonsWrapper,
  ResponsiveTableAdmin,
} from "../../components/ResizeTable/ResizeTableAdmin/style";
import LeftArrow from "../../assets/svg/LeftArrow";
import RightArrow from "../../assets/svg/RightArrow";
import styled from "styled-components";
import { useLanguage } from "../../context/LanguageContext";

const Container = styled.div`
  position: relative;

  transition: all 0.2s ease-in-out;
`;

const GenericAnalitikaTable = ({ title = "", data = {} }) => {
  const [loading, setLoading] = useState(0);

  const { translate } = useLanguage();
  console.log(data);

  return (
    <Container>
      {loading ? (
        <div className="loaderParent">
          <div class="loader"></div>
        </div>
      ) : (
        ""
      )}

      <WhiteWrapper>
        <TitleSmall>{title}</TitleSmall>
        <ResponsiveTableAdmin>
          <table>
            <thead>
              <tr>
                {data?.thead > 0 &&
                  Object.values(data?.thead).map((v) => {
                    return <th>{v}</th>;
                  })}
              </tr>
            </thead>
            <tbody>
              {data?.tbody > 0 ? (
                data?.tbody.map((row) => (
                  <tr key={row?.id}>
                    {Object.keys(data?.thead).map((v) => {
                      <td>{row[v]}</td>;
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="empty"
                    colSpan="6"
                    style={{ textAlign: "center" }}
                  >
                    {translate("notInformation")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ResponsiveTableAdmin>
      </WhiteWrapper>
    </Container>
  );
};

export default GenericAnalitikaTable;
