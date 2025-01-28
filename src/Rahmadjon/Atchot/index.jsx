import React from 'react'
import { Container, Title, Icon, Section, Tablecontainer, TableHeader, Select, Check, DataTime } from './style'
import Table from './Table'

function Atchot() {

    const data1 = [
        {
            name: 'Продажа (уп)',
            kvota: "Квота (уп)",
            procent: "% выполнения",
            price: 45000,
            price1: 75000,
            procent1: '65%'
        },
        {
            name: 'Продажа (сумма)',
            kvota: "Инвестиции (сумма)",
            procent: "% инвестиций от продаж",
            price: 500000000,
            price1: 420000000,
            procent1: '85%'
        }
    ]
    return (
        <Container>
            <Title>
                <h1>Отчеты</h1>
                <div>
                    <Icon>1</Icon>
                    <Icon>2</Icon>
                </div>
            </Title>

            <Section>
                {data1.map((item, index) => (
                    <div key={index}>
                        <span>
                            <p>{item.name}</p>
                            <p>{item.kvota}</p>
                            <p>{item.procent}</p>
                        </span>
                        <span>
                            <p>{item.price}</p>
                            <p>{item.price1}</p>
                            <p>{item.procent1}</p>
                        </span>
                    </div>
                ))}
            </Section>

            <Tablecontainer>
                <TableHeader>
                    <h1>Поиск по фильтрам</h1>
                    <div>
                        <Select>
                            <option value="Ташкент">Ташкент</option>
                        </Select>
                        <Select>
                            <option value="Район">Район</option>
                        </Select>
                        <Select>
                            <option value="ЛПУ">ЛПУ</option>
                        </Select>
                        <Select>
                            <option value="Специальность">Специальность</option>

                        </Select>

                        <Check>
                            <p>По цвету </p>
                            <span>
                                <p>Все</p>
                            <input type="radio" />
                            </span>
                        </Check>
                        <DataTime>
                            <input style={{width:'100%',border:'none'}} type="date" />
                        </DataTime>
                    </div>
                </TableHeader>

                <Table/>

            </Tablecontainer>
        </Container>
    )
}

export default Atchot