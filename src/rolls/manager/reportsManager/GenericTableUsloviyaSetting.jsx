import styled from "styled-components";
import {useEffect, useState} from "react";
import PenIcon from "../../../assets/svg/penIcon";
import {Input, message} from "antd";
import UsloviyaModal from "./Modal/Modal.jsx";
import log from "eslint-plugin-react/lib/util/log.js";
import {
    useGetDTOForReports, useGetProfileInfo,
    useSaveReportManager
} from "../../../utils/server/server.js";
import {useQueryClient} from "@tanstack/react-query";
import {useLanguage} from "../../../context/LanguageContext.jsx";
import {formatPhoneNumberForBackend} from "../../../utils/phoneFormatterForBackend.js";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    //   justify-content: space-between;
    gap: 20px;
    padding-bottom: 100px;
`;

const TableStyled = styled.table`
    width: 100%;
    border-collapse: separate;

    border-spacing: 0 10px;

    th {
        text-align: center;
        padding: 8px;
    }

    .left {
        padding-left: 10px;
        text-align: left;
    }

    th {
        text-align: center;
        color: #00000080;
    }

    .isOpen {
        padding: 0 7px;
        width: 138px;
        padding-right: 10px;
    }

    @media (max-width: 760px) {
        th {
            font-size: 12px;
            padding: 6px;
        }
    }

    @media (max-width: 424px) {
        th {
            font-size: 10px;
            padding: 4px;
        }
    }
`;

const TableRow = styled.tr`
    height: 60px;
    background-color: ${({background}) =>
            background === "warning" ? "#FFDB43" :
                    background === "red" ? "#FB3748" : "#F7F8FC"};

    td:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    td:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
`;

const IsOpen = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 8px 0;
    border-radius: 4px;
    transition: all 0.3s;
    background: ${({color}) => color == "red" ? "rgba(255, 255, 255, 0.50)" : "#FFF"};

    &:hover {
        background: ${({color}) => color == "red" ? "rgb(255,171,171)" : "#eaeaea"};
        cursor: ${({btn}) => !btn && "pointer"};
    }

    @media (max-width: 424px) {
        padding: 3px;
    }
    max-width: 138px;
`;

const Button = styled.button`
    gap: 10px;
    border-radius: 5px;
    width: ${({wdth}) => (wdth ? "100%" : "138px")};
    height: ${({wdth}) => (wdth ? "63px" : "40px")};
    border: none;
    border-radius: 3px;
    background-color: ${({btn}) => (btn ? "white" : "#f7f8fc")};
    color: black;
    transition: all 0.2s;

    /* color: #fff; */

    font-size: ${({wdth}) => (wdth ? "24px" : "")};
    font-weight: ${({wdth}) => (wdth ? "400" : "")};

    &:hover {
        cursor: pointer;
        background-color: #e9e9e9;
    }

    @media (max-width: 760px) {
        width: 100px;
        height: 35px;
        font-size: 14px;
    }

    @media (max-width: 424px) {
        width: 50px;
        height: 30px;
        font-size: 10px;
    }
`;

const SendButton = styled(Button)`
    background-color: ${({send}) => (!send ? "#F7F8FC" : "#216BF4")};
    color: ${({send}) => (!send ? "#00000080 " : "white")};
    border-radius: 7px;

    &:hover {
        background-color: ${({send}) => (!send ? "#e5e5e5" : "#1f5dd1")};
    }

    width: 100%;
    @media (max-width: 760px) {
        height: 35px;
        font-size: 14px;
    }

    @media (max-width: 424px) {
        height: 30px;
        font-size: 8px;
    }
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 17px;

    position: fixed;
    bottom: 20px;
    left: 5vw;

    width: 90vw;
    background: #F7F8FC;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    @media (max-width: 760px) {
        gap: 10px;
    }
`;

const Item = styled.td`
    text-align: center;
    padding: 17px 20px;
    color: ${({color, statusParent}) => statusParent === "red" ? "white" : color === "red" ? "red" : "black"};
    width: 350px;

    @media (max-width: 760px) {
        font-size: 12px;
        padding: 6px;
        width: 200px;
    }
    @media (max-width: 424px) {
        font-size: 10px;
        padding: 4px;
        width: 1500px;
    }
`;

const GenericTable = ({thead = [], tableData = []}) => {
    const [loading, setLoading] = useState(0);
    const [selectedRowId, setSelectedRow] = useState(null);


    const [jsonData, setJsonData] = useState([]);

    const [fitter, setFitter] = useState({
        districtId: null, workplaceId: null, fieldname: null
        , query: null
    });

    const queryClient = useQueryClient(); // Initialize queryClient
    const {data: info, isLoading} = useGetProfileInfo();



    const {translate} = useLanguage()

    const onclose = async () => {
        setSelectedRow(null);
        await queryClient.invalidateQueries(["DrugsWithReports"]);
        await queryClient.invalidateQueries(["useGetDTOForReports"]);
    }

    const mutation = useSaveReportManager();

    const SendReports = () => {
        setLoading(1)
        const date = new Date(); // Hozirgi sana
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const requestData = {
            "startDate": startDate.toISOString().split("T")[0],
            "endDate": endDate.toISOString().split("T")[0],
            "regionId": info?.regionDistrictDTO?.regionId,
            "salesReportDTOS": jsonData
        };


        mutation.mutate({
            requestData: requestData,
            onSuccess: () => {
                message.success(translate("reports_sended"));
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            },
            onError: (err) => {
                console.log("erre", err);
                setLoading(false);

                message.error(translate("reports_not_sended"));
                console.log(1);
            },
        });
    }


    return (
        <Wrapper>
            {loading ? (
                <div className="loaderFixed">
                    <div className="loader"></div>
                </div>
            ) : (
                ""
            )}
            <UsloviyaModal
                onclose={onclose}
                filter={fitter}
                setFilter={setFitter}
                selectedID={selectedRowId}
                setJsonData={setJsonData}
                jsonData={jsonData}
                thead={["Ф.И.О", "Район", "ЛПУ", "Специальность", "Телефон", "Выписано", "Коррекция", "Процент"]}
            />

            <TableStyled>
                <thead>
                <tr>
                    {thead?.map((v, i) => (
                        <th className={i == 0 ? "left" : ""} key={v}>
                            {v}
                        </th>
                    ))}
                    <th>Открыть</th>
                </tr>
                </thead>
                <tbody>
                {tableData?.map((row) => {
                    return (
                        <TableRow key={row?.id} background={row?.statusParent}>
                            {row?.data.map((v, i) => {
                                return (
                                    <Item className={i == 0 ? "left" : ""} key={i} color={v?.status}
                                          statusParent={row?.statusParent}>
                                        {v?.name}
                                    </Item>
                                );
                            })}
                            <td className="isOpen">
                                {
                                    <IsOpen
                                        color={row.statusParent}
                                        onClick={() => {
                                            setSelectedRow(row?.id)
                                        }}
                                    >
                                        <PenIcon
                                            color={row.statusParent}
                                        />
                                    </IsOpen>
                                }
                            </td>
                        </TableRow>
                    );
                })}
                </tbody>
            </TableStyled>


            <Footer>
                <SendButton wdth="true" onClick={() => SendReports()}>
                    {translate("Отправить_счет")}
                </SendButton>
            </Footer>
        </Wrapper>
    );
};

export default GenericTable;