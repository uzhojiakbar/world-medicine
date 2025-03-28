import React, {useState} from "react";
import {Input} from "antd";
import {EditOutlined, CheckOutlined} from "@ant-design/icons";
import {Container, IconButton, StaticText} from "./style";
import {formatPhoneNumber} from "../../../utils/PhoneFormatter";

const EditableInput = ({
                           initialValue = "",
                           isEditable = false,
                           isInput = 1,
                           inputType = "text",
                           phoneFormat = false,
                           JustPassword,
                           icon,
                           brdr,
                           isPhoneNumber = false,
                           onSave = () => {
                           },
                       }) => {
    const [value, setValue] = useState(
        phoneFormat ? formatPhoneNumber(initialValue) : initialValue
    ); // Input qiymati
    const [editing, setEditing] = useState(isEditable); // Tahrirlash rejimi
    const [passHidden, setPassHidden] = useState(false); // Tahrirlash rejimi

    // Qiymatni o'zgartirish funksiyasi
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    // Tahrirlash rejimini o'zgartirish
    const toggleEditing = () => {
        if (editing) {
            onSave(value); // Saqlash funksiyasi chaqiriladi
        }
        setEditing(!editing); // Rejim o'zgartiriladi
    };

    if (JustPassword) {
        return (
            <Container brdr={brdr} rightIcon={true}>
                <StaticText>{value}</StaticText>
                <div className="rightIcon">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M2.91858 6.60514C2.70062 6.09833 2.11327 5.86373 1.60603 6.08112C1.0984 6.29867 0.863613 6.88739 1.08117 7.39502L1.0816 7.39602L1.08267 7.39851L1.08566 7.40539L1.09505 7.42667C1.10282 7.44415 1.11363 7.46814 1.12752 7.49821C1.15529 7.55832 1.19539 7.64284 1.2481 7.74826C1.35345 7.95894 1.5096 8.25406 1.71879 8.60549C2.12772 9.2925 2.74529 10.2048 3.59029 11.1246L2.79285 11.922C2.40232 12.3125 2.40232 12.9457 2.79285 13.3362C3.18337 13.7267 3.81654 13.7267 4.20706 13.3362L5.04746 12.4958C5.61245 12.952 6.24405 13.3819 6.94417 13.7524L6.16177 14.9549C5.86056 15.4178 5.99165 16.0372 6.45457 16.3385C6.91748 16.6397 7.53693 16.5086 7.83814 16.0457L8.82334 14.5315C9.50014 14.7391 10.2253 14.8869 11 14.9561V16.5003C11 17.0526 11.4477 17.5003 12 17.5003V13.0003C9.25227 13.0003 7.18102 11.8017 5.69633 10.4114C5.68823 10.4036 5.68003 10.3959 5.67173 10.3883C5.47324 10.2014 5.28532 10.011 5.10775 9.81981C4.35439 9.0085 3.80137 8.19404 3.43737 7.58253C3.25594 7.27771 3.12302 7.02595 3.03696 6.85383C2.99397 6.76784 2.96278 6.70196 2.94319 6.65954C2.93339 6.63834 2.92651 6.62302 2.9225 6.61401L2.91858 6.60514ZM1.08117 7.39502L1.99995 7.00026C1.08081 7.39418 1.08117 7.39502 1.08117 7.39502Z"
                            fill="#10193A"
                        />
                        <path
                            opacity="0.5"
                            d="M15.2209 12.3984C14.2784 12.7694 13.209 13.0002 12 13.0002V17.5002C12.5523 17.5002 13 17.0525 13 16.5002V14.9559C13.772 14.8867 14.4974 14.7392 15.1764 14.5311L16.1618 16.0456C16.463 16.5085 17.0825 16.6396 17.5454 16.3384C18.0083 16.0372 18.1394 15.4177 17.8382 14.9548L17.0558 13.7524C17.757 13.3816 18.3885 12.9517 18.9527 12.496L19.7929 13.3361C20.1834 13.7267 20.8166 13.7267 21.2071 13.3361C21.5976 12.9456 21.5976 12.3124 21.2071 11.9219L20.4097 11.1245C21.1521 10.3164 21.7181 9.51502 22.1207 8.86887C22.384 8.44627 22.5799 8.08609 22.7116 7.82793C22.7775 7.69874 22.8274 7.59476 22.8619 7.5209C22.8791 7.48397 22.8924 7.45453 22.902 7.4332L22.9134 7.40736L22.917 7.39913L22.9191 7.39411C23.1367 6.88648 22.9015 6.2986 22.3939 6.08105C21.8864 5.86355 21.2985 6.09892 21.0809 6.60627L21.0759 6.61747C21.0706 6.62926 21.0617 6.6489 21.0492 6.6758C21.0241 6.72962 20.9844 6.81235 20.9299 6.91928C20.8207 7.13337 20.6526 7.4431 20.4233 7.81119C19.9628 8.55023 19.2652 9.50857 18.3156 10.3999C17.4746 11.1893 16.4469 11.9158 15.2209 12.3984Z"
                            fill="#10193A"
                        />
                    </svg>
                </div>
            </Container>
        );
    }

    return isInput ? (
        <Container onDoubleClick={toggleEditing}  brdr={brdr}>
            {editing ? (
                <Input
                    onKeyPress={(e) => e.key === "Enter" ? toggleEditing() : {}}
                    value={value}
                    className="input"
                    onChange={handleChange}
                    placeholder="Введите значение"
                    style={{
                        background: "#f7f8fc",
                        borderRadius: "67px",
                        fontFamily: "Vela Sans GX"
                    }}
                />
            ) : (
                <StaticText>{isPhoneNumber ? formatPhoneNumber(value) : value}</StaticText>
            )}
            <IconButton onClick={toggleEditing}>
                {editing ? (
                    <CheckOutlined/>
                ) : (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            opacity="0.5"
                            d="M20.8487 8.71306C22.3844 7.17735 22.3844 4.68748 20.8487 3.15178C19.313 1.61607 16.8231 1.61607 15.2874 3.15178L14.4004 4.03882C14.4125 4.0755 14.4251 4.11268 14.4382 4.15035C14.7633 5.0875 15.3768 6.31601 16.5308 7.47002C17.6848 8.62403 18.9133 9.23749 19.8505 9.56262C19.888 9.57563 19.925 9.58817 19.9615 9.60026L20.8487 8.71306Z"
                            fill="#216BF4"
                        />
                        <path
                            d="M14.4386 4L14.4004 4.03819C14.4125 4.07487 14.4251 4.11206 14.4382 4.14973C14.7633 5.08687 15.3768 6.31538 16.5308 7.4694C17.6848 8.62341 18.9133 9.23686 19.8505 9.56199C19.8876 9.57489 19.9243 9.58733 19.9606 9.59933L11.4001 18.1598C10.823 18.7369 10.5343 19.0255 10.2162 19.2737C9.84082 19.5665 9.43469 19.8175 9.00498 20.0223C8.6407 20.1959 8.25351 20.3249 7.47918 20.583L3.39584 21.9442C3.01478 22.0712 2.59466 21.972 2.31063 21.688C2.0266 21.4039 1.92743 20.9838 2.05445 20.6028L3.41556 16.5194C3.67368 15.7451 3.80273 15.3579 3.97634 14.9936C4.18114 14.5639 4.43213 14.1578 4.7249 13.7824C4.97307 13.4643 5.26165 13.1757 5.83874 12.5986L14.4386 4Z"
                            fill="#216BF4"
                        />
                    </svg>
                )}
            </IconButton>
        </Container>
    ) : (
        <Container brdr={brdr}>
            <StaticText>
                {value}
                {icon ? icon : ""}
            </StaticText>
        </Container>
    );
};

export default EditableInput;
