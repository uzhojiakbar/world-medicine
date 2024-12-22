import { Table } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 47px;
`;

const Header = styled.div``;

const FiltrContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 24px;
  padding: 17px;

  background-color: white;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 17px;
  border-radius: 27px;
  background-color: white;
`;

export { Wrapper, Header, FiltrContainer, Form, TableWrapper };
