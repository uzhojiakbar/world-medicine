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

const RegionTable = () => {



    const {translate} = useLanguage();

    return (<Container>
        {0 ? (<div className="loaderWindow">
            <div className="loader"></div>
        </div>) : ""}
    </Container>);
};

export default RegionTable;
