import React, { useState } from "react";
import { CardContainer } from "../Generic/StaticButton/style";
import StaticButton from "../Generic/StaticButton/StaticButton";
import { information } from "../../mock/information";

const Information = ({ admin = 0, active, setActive }) => {
  return (
    <CardContainer admin={admin}>
      {information.map((v) => {
        return (
          <StaticButton
            onClick={() => {
              active !== v.id ? setActive(v.id) : "";
            }}
            active={active === v.id}
            admin={admin}
            key={v.id}
            title={v.title}
            value={v.count}
          />
        );
      })}
    </CardContainer>
  );
};

export default Information;
