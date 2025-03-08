import styled from "styled-components";

const Container = styled.div`
  position: relative;
  transition: all 0.2s ease-in-out;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    user-select: none;
    gap: 20px;

    padding: 17px 20px;
    background-color: #f7f8fc;
    border-radius: 10px;

    > p {
        font-size: 16px;
        font-weight: 600;
    }

    .flexp {
        display: flex;
        font-size: 16px;
        font-weight: 600;
        justify-content: space-between;
        align-items: center;
    }

    .flexp2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .bigcontatindistrictandregion{
        display: flex;
        flex-direction: column;
        gap: 7px;
    }

    > div {
        font-size: 16px;
        font-weight: 500;
    }

    > .button > button:hover {
        transition: all 0.3s ease-in-out;
        opacity: 0.4;
    }

    > .button > button {
        border: none;
        cursor: pointer;
    }

    > .button {
        display: flex;
        gap: 20px;
    }
`;

export { Container, Wrapper, Details };
