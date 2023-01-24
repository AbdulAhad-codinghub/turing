import React from "react";
import { Header } from "../Header/Header";
import { Table } from "../Table/Table";
import "./Body.css";

export const Body = () => {
  return (
    <div>
      <Header />
      <p className="techHeading"> Turing Technologies Frontend Test</p>
      <Table />
    </div>
  );
};
