import styled from "styled-components";

const Container = styled.div`
    margin: 30px 100px;
`
const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: red;
    div{
        display: flex;
        gap: 10px;
    }
`
const Icon = styled.div`
    background: white;
    padding: 16px 20px;
    border-radius: 20px;
`
const Section = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 20px;
    margin-top: 40px;
    background-color: white;
    padding: 20px;
    border-radius: 30px;

    div{
        background-color: #F7F8FC;
        padding: 17px 20px;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
    }
    margin-bottom: 50px;
    div span p {
        margin-top: 6px;
    }
`

const Tablecontainer = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 30px;

`
const TableHeader = styled.div`
    padding: 20px;
    border-radius: 20px;
    background-color: #F7F8FC ;
    h1{
        font-size: 16px;
    }

    div{
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    }


`
const Select = styled.select`
    background-color: #FFFFFF;
    padding: 14px 20px;
    border-radius: 10px;
    width: 200px;
    color: #000000;
    font-weight: bold;
    border: none;
`

const Check = styled.span`
background-color: #FFFFFF;
    padding: 14px 20px;
    border-radius: 10px;
    width: 200px;
    color: #000000;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span{
        display: flex;
        align-items: center;
        gap: 4px;
    }


`
const DataTime = styled(Check)`

`


export {
    Container, Title,
    Icon, Section, Tablecontainer, TableHeader, Select,
    Check, DataTime
};