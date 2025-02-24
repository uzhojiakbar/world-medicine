import React, {useEffect, useState} from "react";
import {TitleSmall, WhiteWrapper} from "../../../root/style";
import {
    PaginationButtonsWrapper, ResponsiveTableAdmin,
} from "../../../components/ResizeTable/ResizeTableAdmin/style";
import LeftArrow from "../../../assets/svg/LeftArrow";
import RightArrow from "../../../assets/svg/RightArrow";
import styled from "styled-components";
import {useLanguage} from "../../../context/LanguageContext";
import Input from "../../../components/Generic/Input/Input"; // Import your Input component
import {Container, Details, Wrapper} from "./TableStyle";
import Edit from "../../../assets/svg/Edit.jsx";
import DeleteIcon from "../../../assets/svg/DeleteIcon.jsx";
import DeleteIconBig from "../../../assets/svg/DeleteIconBig.jsx";
import {message} from "antd";
import {useDeleteWorkplace, useGetWorkplacesById} from "../../../utils/server/server.js";
import {useQueryClient} from "@tanstack/react-query";
import ModalEditLpu from "./Modal.jsx";

const Table = ({
                   data = [], loading = true, setLoading = () => {
    }
               }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [editId, setEditId] = useState("");
    const [selectedWk, setSelectedWk] = useState(null)
    const [curData, setCurData] = useState(data)
    const deleteLpu = useDeleteWorkplace();
    const {data: wk, isLoading: loadingWk} = useGetWorkplacesById(editId)

    const itemsPerPage = 10;
    const totalPages = Math.ceil(curData.length / itemsPerPage);

    useEffect(() => {
        if (data.length > 0) {
            setCurData(data);
        }
    }, [data]);
    useEffect(() => {
        if (wk?.id) {
            setSelectedWk(wk)
        }
    }, [wk]);

    const queryClient = useQueryClient();
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
    const currentData = curData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    const {translate} = useLanguage();
    const handleEditClick = async (id) => {
        setEditId(id);
        setSelectedWk(await wk)
    }
    const handleDelete = (id) => {
        deleteLpu.mutate(id, {
            onError: (error) => {
                console.error(translate("workplace_delete_err"), error);
                message.error(translate("workplace_delete_err"));
                setLoading(0);
            }, onSuccess: () => {
                message.success(translate("workplace_deleted"));
                setLoading(0);
            },
        });
        queryClient.invalidateQueries(["getWorkplacec"]); // Ma'lumotlarni qayta yuklash
        setLoading(1);
    };
    return (<Container>
        {loading  ? (<div className="loaderParent">
            <div className="loader"></div>
        </div>) : ""}
        <ModalEditLpu setData={setSelectedWk} data={selectedWk}/>
        <WhiteWrapper>
            <Wrapper>
                {currentData?.map((row, i) => {
                    return (<Details key={i}>
                        <p>{row?.name}</p>
                        <div>{row?.regionDistrictDTO?.regionName + ", " + row?.regionDistrictDTO?.districtName}</div>
                        <div className="button">
                            <button
                                style={{background: "transparent", padding: "0"}}
                                className="Viewbutton"
                                onClick={() => handleEditClick(row.id)}
                            >
                                <Edit/>
                            </button>
                            <button
                                style={{background: "transparent", padding: "0"}}
                                className="Viewbutton"
                                onClick={() => handleDelete(row.id)}
                            >
                                <DeleteIconBig/>
                            </button>
                        </div>
                    </Details>);
                })}
            </Wrapper>
            <PaginationButtonsWrapper>
                <button onClick={handlePrevious} disabled={currentPage === 0}>
                    <LeftArrow/>
                </button>
                <span>
                        {currentPage + 1} {translate("from")} {totalPages}
                </span>
                <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
                    <RightArrow/>
                </button>
            </PaginationButtonsWrapper>
        </WhiteWrapper>
    </Container>);
};

export default Table;
