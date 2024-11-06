import React from "react";
import { DrugsContainer, DrugsItem } from "./style";
import { drugs } from "../../mock/drugs";

const DrugsAnalictic = () => {
  return (
    <DrugsContainer>
      {drugs.slice(0, 6).map((v) => {
        return (
          <DrugsItem key={v.id}>
            <div>{v.title}</div>
            <div>{v.count}шт.</div>
          </DrugsItem>
        );
      })}
    </DrugsContainer>
  );
};

export default DrugsAnalictic;
