import React, { useState } from "react";
import { Button } from "antd";
import Modal1 from "./Modal1";
import Modal2 from "./Modal2";
// import Modal3 from "./Modal3";
// import Modal4 from "./Modal4";
// import Modal5 from "./Modal5";

const Rahmadjon = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalId) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Button type="primary" onClick={() => openModal(1)}>
        Modal 1
      </Button>
       <Button type="primary" onClick={() => openModal(2)}>
        Modal 2
      </Button>
      
      {/*<Button type="primary" onClick={() => openModal(3)}>
        Modal 3
      </Button>
      <Button type="primary" onClick={() => openModal(4)}>
        Modal 4
      </Button>
      <Button type="primary" onClick={() => openModal(5)}>
        Modal 5
      </Button> */}

      {/* Har bir modalni shart asosida render qilamiz */}
      {activeModal === 1 && <Modal1 isOpen={true} onClose={closeModal} />}
      {activeModal === 2 && <Modal2 isOpen={true} onClose={closeModal} />}
     {/*  {activeModal === 3 && <Modal3 isOpen={true} onClose={closeModal} />}
      {activeModal === 4 && <Modal4 isOpen={true} onClose={closeModal} />}
      {activeModal === 5 && <Modal5 isOpen={true} onClose={closeModal} />} */}
    </div>
  );
};

export default Rahmadjon;
