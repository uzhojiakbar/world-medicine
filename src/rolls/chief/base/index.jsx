import React from "react";
import BaseDoctor from "./BaseDoctor";
import BaseControl from "./analiktika/analiktikaPage";

const BaseChief = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column",gap: 40 }}>
      <BaseDoctor />
      <BaseControl />
    </div>
  );
};

export default BaseChief;
