import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Items = styled.div`
  display: flex;
  gap: 10px;
`
const Item = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 17px 20px;
  background-color: #F7F8FC;
  border-radius: 6px;
  font-weight: 600;
  > p {
    margin-top: 2px;
  }  
  > div {
    cursor: pointer;
  }

  &:hover >div {
    opacity: .7;
  }
`

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  .text {
    color: rgba(0, 0, 0, 0.50);
    font-size: 38px;
    font-weight: 700;
  }
  background-color: #FAFAFA;
  padding: 16px;
  border-radius: 10px;
  width: 100%;
  > article {
    cursor: pointer;
  }
`

const Btn = styled.button`
  width: 100%;
  padding: 17px 20px;
  background-color: ${({ send }) => send ? "#216BF4" : "#F7F8FC"};
  color:  ${({ send }) => send ? "white" : "black"};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 1s;
  &:hover {
  background-color: ${({ send }) => send ? "#1a5cd5" : "#d1d1d1"};

  }
`

export { Main, Wrap, Items, Item, Card, Btn }