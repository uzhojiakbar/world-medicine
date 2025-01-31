import React from "react";
import BaseDoctor from "./BaseDoctor";
import BaseControl from "./analiktika/analiktikaPage";

const BaseChief = () => {
  return (
    <div>
      <BaseDoctor />
      <BaseControl />
    </div>
  );
};

export default BaseChief;
