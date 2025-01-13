import React from "react";
import { DrugsContainer, DrugsItem } from "./style";
import { drugs } from "../../mock/drugs";

const DrugsAnalictic = ({ data = [] }) => {
  console.log(data);

  return (
    <DrugsContainer>
      {data?.slice(0, 6).map((v) => {
        return (
          <DrugsItem key={v.id}>
            <div>{v.name}</div>
            <div>{v.quantity}шт.</div>
          </DrugsItem>
        );
      })}
    </DrugsContainer>
  );
};

export default DrugsAnalictic;
