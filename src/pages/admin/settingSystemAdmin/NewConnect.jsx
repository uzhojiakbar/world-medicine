import React, { useEffect, useState } from "react";
import { message } from "antd";
import styled from "styled-components";
import { TitleSmall, WhiteWrapper } from "../../../root/style";
import {
  PaginationButtonsWrapper,
  ResponsiveTableAdmin,
} from "../../../components/ResizeTable/ResizeTableAdmin/style";
import { formatPhoneNumber } from "../../../utils/PhoneFormatter";
import LeftArrow from "../../../assets/svg/LeftArrow";
import RightArrow from "../../../assets/svg/RightArrow";
import CancelIcon from "../../../assets/svg/CancelIcon";
import ReceptIcon from "../../../assets/svg/ReceptIcon";
import { useLanguage } from "../../../context/LanguageContext";
import Server from "../../../utils/server/server";

const Container = styled.div`
  position: relative;

  transition: all 0.2s ease-in-out;
`;

const NewConnect = ({ title = "" }) => {
  const { translate } = useLanguage();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await Server.getNewConnect();
        setData(data?.content); // olingan ma'lumotni saqlaymiz
      } catch (err) {
        // setError("Error fetching posts.");
        return;
      } finally {
        console.log("FINAl");
      }
    };

    fetchPosts();
  }, []);
  console.log(data);

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const currentData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const onPrinyat = () => {
    setLoading(1);
    setTimeout(() => {
      setLoading(0);
      message.success("Принять");
    }, 1000);
  };
  const onOtk = () => {
    setLoading(1);
    setTimeout(() => {
      setLoading(0);
      message.error("Отклонить");
    }, 1000);
  };

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
                <th>№</th>
                <th className="idfixed">{translate("Fullname_doctor")}</th>
                <th>{translate("region")}</th>
                <th>{translate("phone_number")}</th>
                <th>{translate("pod_dogovor")}</th>
                <th>{translate("Разрешение")}</th>
              </tr>
            </thead>
            <tbody>
              {currentData?.length > 0 ? (
                currentData?.map((row) => (
                  <tr key={row?.userId}>
                    <td>№{row?.id}</td>
                    <td className="idfixed">{row?.name}</td>
                    <td>{row?.location}</td>
                    <td>{formatPhoneNumber(row?.phone)}</td>
                    <td>{row?.contract}</td>

                    <td className="buttons">
                      <button onClick={() => onPrinyat()}>
                        <ReceptIcon />
                        {translate("accept")}
                      </button>
                      <button onClick={() => onOtk()}>
                        <CancelIcon />
                        {translate("reject")}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="empty"
                    colSpan="7"
                    style={{ textAlign: "center" }}
                  >
                    {translate("notInformation")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ResponsiveTableAdmin>

        <PaginationButtonsWrapper>
          <button onClick={handlePrevious} disabled={currentPage === 0}>
            <LeftArrow />
          </button>
          <span>
            {currentPage + 1} {translate("from")} {""}
            {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
            <RightArrow />
          </button>
        </PaginationButtonsWrapper>
      </WhiteWrapper>
    </Container>
  );
};

export default NewConnect;
