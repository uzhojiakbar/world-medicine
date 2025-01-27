import React, { useRef, useState, useEffect } from "react";
import {
  ModalWrapper,
  ModalHeader,
  CloseButton,
  ModalContent,
  NotificationItem,
  NotificationList,
} from "./stylenot";
import { BellBtn, BellBtnContainer } from "./style";

const NotificationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 100, right: 20 });
  const buttonRef = useRef(null);
  const modalRef = useRef(null);

  const handleButtonClick = () => {
    // if (buttonRef.current) {
    //   const rect = buttonRef.current.getBoundingClientRect();
    //   setModalPosition({
    //     top: rect.bottom + window.scrollY + 10,
    //     right: 40,
    //   });
    // }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <BellBtnContainer ref={buttonRef} onClick={handleButtonClick}>
        <BellBtn />
      </BellBtnContainer>

      {isOpen && (
        <ModalWrapper
          ref={modalRef}
          style={{ top: modalPosition.top, right: modalPosition.right }}
        >
          <ModalHeader>
            <h4>Уведомления</h4>
            {/* <CloseButton onClick={() => setIsOpen(false)}>&times;</CloseButton> */}
            <div onClick={() => setIsOpen(false)} className="closeIcon">
              <svg
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.5"
                  d="M28.3333 16.4993C28.3333 23.3108 22.8114 28.8327 16 28.8327C9.18845 28.8327 3.66663 23.3108 3.66663 16.4993C3.66663 9.68783 9.18844 4.16602 16 4.16602C22.8114 4.16602 28.3333 9.68784 28.3333 16.4993Z"
                  stroke="#808080"
                  stroke-width="2"
                />
                <path
                  d="M11.9595 12.4589C12.35 12.0684 12.9832 12.0684 13.3737 12.4589L16 15.0852L18.6262 12.4589C19.0168 12.0684 19.6498 12.0684 20.0404 12.4589C20.4309 12.8495 20.4309 13.4826 20.0404 13.8732L17.4142 16.4993L20.0404 19.1255C20.4309 19.516 20.4309 20.1492 20.0404 20.5397C19.6498 20.9303 19.0166 20.9303 18.6261 20.5397L16 17.9136L13.3738 20.5397C12.9832 20.9303 12.3501 20.9303 11.9595 20.5397C11.569 20.1492 11.569 19.5161 11.9595 19.1256L14.5858 16.4993L11.9595 13.8731C11.569 13.4826 11.569 12.8494 11.9595 12.4589Z"
                  fill="#808080"
                />
              </svg>
            </div>
          </ModalHeader>
          <ModalContent>
            <NotificationList>
              <NotificationItem>Новая цель</NotificationItem>
              <NotificationItem>
                Григорьев Алексей Ильич
                <br />
                <span>Ташкент, Мирзо-Улугбекский район</span>
              </NotificationItem>
              <NotificationItem>
                Петров Сергей Александрович
                <br />
                <span>Ташкент, Шайхантахурский район</span>
              </NotificationItem>
              <NotificationItem>
                Смирнова Ольга Павловна
                <br />
                <span>Ташкент, Сергелийский район</span>
              </NotificationItem>
              <NotificationItem>
                Козлов Игорь Николаевич
                <br />
                <span>Ташкент, Чиланзарский район</span>
              </NotificationItem>
            </NotificationList>
          </ModalContent>
        </ModalWrapper>
      )}
    </div>
  );
};

export default NotificationModal;
