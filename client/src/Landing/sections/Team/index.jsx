import React from "react";
import SectionContainer from "../../components/SectionContainer";
import SectionHead from "../../components/SectionHead";
import TeamBlock from "./TeamBlock";

const Team = () => {
  return (
    <SectionContainer id={"doctors"} secName={"team-sec"}>
      <SectionHead
        head={"Doctors"}
        text={
          "Our Expert Consultants"
        }
      />
      <TeamBlock />
    </SectionContainer>
  );
};

export default Team;
