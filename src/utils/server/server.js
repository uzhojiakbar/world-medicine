import Cookie from "js-cookie";
import Instance from "../Instance";
import {jwtDecode} from "jwt-decode";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useLanguage} from "../../context/LanguageContext";
import {message} from "antd";

const Server = {
    getNewConnect: async () => {
        try {
            const response = await Instance.get(
                `/v1/admin/doctors/not-declined-not-enabled?page=0&size=10`
            );
            return response?.data;
            // const data = [
            //   {
            //     id: 1,
            //     name: "Иванов Дмитрий Евгеньевич",
            //     location: "Ташкент, Яшнабадский район",
            //     phone: "+998981111111",
            //     contract: "Нет",
            //   },
            //   {
            //     id: 2,
            //     name: "Григорьев Алексей Ильич",
            //     location: "Ташкент, Мирзо-Улугбекский район",
            //     phone: "+998981111111",
            //     contract: "Договор №144",
            //   },
            //   {
            //     id: 3,
            //     name: "Петров Сергей Александрович",
            //     location: "Ташкент, Шайхантахурский район",
            //     phone: "+998981111111",
            //     contract: "Нет",
            //   },
            //   {
            //     id: 4,
            //     name: "Смирнова Ольга Павловна",
            //     location: "Ташкент, Сергелийский район",
            //     phone: "+998981111111",
            //     contract: "Нет",
            //   },
            //   {
            //     id: 5,
            //     name: "Козлов Игорь Николаевич",
            //     location: "Ташкент, Чиланзарский район",
            //     phone: "+998981111111",
            //     contract: "Договор №2",
            //   },
            //   {
            //     id: 6,
            //     name: "Иванов Дмитрий Евгеньевич",
            //     location: "Ташкент, Яшнабадский район",
            //     phone: "+998981111111",
            //     contract: "Нет",
            //   },
            //   {
            //     id: 7,
            //     name: "Григорьев Алексей Ильич",
            //     location: "Ташкент, Мирзо-Улугбекский район",
            //     phone: "+998981111111",
            //     contract: "Договор №144",
            //   },
            //   {
            //     id: 8,
            //     name: "Петров Сергей Александрович",
            //     location: "Ташкент, Шайхантахурский район",
            //     phone: "+998981111111",
            //     contract: "Нет",
            //   },
            //   {
            //     id: 9,
            //     name: "Смирнова Ольга Павловна",
            //     location: "Ташкент, Сергелийский район",
            //     phone: "+998981111111",
            //     contract: "Нет",
            //   },
            //   {
            //     id: 10,
            //     name: "Козлов Игорь Николаевич",
            //     location: "Ташкент, Чиланзарский район",
            //     phone: "+998981111111",
            //     contract: "Договор №2",
            //   },
            // ];
            // return {
            //   content: data,
            // };
        } catch (error) {
            console.log(error);
        }
    },
    getUserInfo: async (tokeen) => {
        const token = tokeen || Cookie.get("access_token");

        const sub = jwtDecode(token)?.sub; // To'g'ri ishlatilmoqda

        try {
            const response = await Instance.get(`/v1/user/${sub}`);
            console.log("RESPONSE USER INFO", response);

            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getDogovor: async (tokeen) => {
        const token = tokeen || Cookie.get("access_token");

        const sub = jwtDecode(token)?.sub; // To'g'ri ishlatilmoqda

        const mock = [
            {
                id: 1,
                Препарат: "Нурофен таблетки 200 мг",
                Квота60: "10",
                Квота90: "10",
                Спецусловия: "18",
                Спецбал: "8",
                Госзакуп: "6",
                Кабвакцинации: "3",
            },
            {
                id: 2,
                Препарат: "Амоксиклав суспензия 250 мг",
                Квота60: "15",
                Квота90: "20",
                Спецусловия: "23",
                Спецбал: "9",
                Госзакуп: "10",
                Кабвакцинации: "4",
            },
            {
                id: 3,
                Препарат: "Цефтриаксон инъекции 1 г",
                Квота60: "10",
                Квота90: "20",
                Спецусловия: "26",
                Спецбал: "12",
                Госзакуп: "15",
                Кабвакцинации: "9",
            },
            {
                id: 4,
                Препарат: "Диклофенак мазь 5%",
                Квота60: "10",
                Квота90: "14",
                Спецусловия: "16",
                Спецбал: "10",
                Госзакуп: "13",
                Кабвакцинации: "7",
            },
            {
                id: 5,
                Препарат: "Лазолван сироп 100 мл",
                Квота60: "10",
                Квота90: "10",
                Спецусловия: "18",
                Спецбал: "8",
                Госзакуп: "6",
                Кабвакцинации: "3",
            },
            {
                id: 6,
                Препарат: "Аспирин кардио 100 мг",
                Квота60: "10",
                Квота90: "10",
                Спецусловия: "18",
                Спецбал: "8",
                Госзакуп: "6",
                Кабвакцинации: "3",
            },
            {
                id: 7,
                Препарат: "Глюкоза раствор 5%",
                Квота60: "10",
                Квота90: "10",
                Спецусловия: "18",
                Спецбал: "8",
                Госзакуп: "6",
                Кабвакцинации: "3",
            },
            {
                id: 8,
                Препарат: "Парацетамол таблетки 500 мг",
                Квота60: "10",
                Квота90: "10",
                Спецусловия: "18",
                Спецбал: "8",
                Госзакуп: "6",
                Кабвакцинации: "3",
            },
            {
                id: 9,
                Препарат: "Флуконазол капсулы 150 мг",
                Квота60: "10",
                Квота90: "10",
                Спецусловия: "18",
                Спецбал: "8",
                Госзакуп: "6",
                Кабвакцинации: "3",
            },
            {
                id: 10,
                Препарат: "Лоперамид капсулы 2 мг",
                Квота60: "10",
                Квота90: "10",
                Спецусловия: "18",
                Спецбал: "8",
                Госзакуп: "6",
                Кабвакцинации: "3",
            },
            {
                id: 11,
                Препарат: "Ренни жевательные таблетки",
                Квота60: "10",
                Квота90: "10",
                Спецусловия: "18",
                Спецбал: "8",
                Госзакуп: "6",
                Кабвакцинации: "3",
            },
            {
                id: 12,
                Препарат: "Супрастин таблетки 25 мг",
                Квота60: "10",
                Квота90: "10",
                Спецусловия: "18",
                Спецбал: "8",
                Госзакуп: "6",
                Кабвакцинации: "3",
            },
            {
                id: 13,
                Препарат: "Кетанов таблетки 10 мг",
                Квота60: "10",
                Квота90: "10",
                Спецусловия: "18",
                Спецбал: "8",
                Госзакуп: "6",
                Кабвакцинации: "3",
            },
            {
                id: 14,
                Препарат: "Актовегин ампулы 5 мл",
                Квота60: "10",
                Квота90: "10",
                Спецусловия: "18",
                Спецбал: "8",
                Госзакуп: "6",
                Кабвакцинации: "3",
            },
            {
                id: 15,
                Препарат: "Амиксин таблетки 125 мг",
                Квота60: "10",
                Квота90: "10",
                Спецусловия: "18",
                Спецбал: "8",
                Госзакуп: "6",
                Кабвакцинации: "3",
            },
        ];


        try {
            // const response = await Instance.get(`/user/${sub}`);
            // console.log("RESPONSE USER INFO", response);

            return mock;
        } catch (error) {
            console.log(error);
        }
    },
    getProdaji: async (tokeen) => {
        const token = tokeen || Cookie.get("access_token");

        const sub = jwtDecode(token)?.sub; // To'g'ri ishlatilmoqda

        const mock = [
            {
                id: 1,
                name: 'Препарат 1',
                prodaj: 157,
                kvota: 468,
                '%': '67%',
                'Таш': 10,
                'Сам': 49,
                'Бух': 7,
                'Анж': 8,
                'Фер': 13,
                'Нам': 44,
                'Каш': 17,
                'Сур': 49,
                'Джи': 16,
                'Сыр': 27,
                'Таш_об': 9,
                'Хор': 12
            },
            {
                id: 2,
                name: 'Препарат 2',
                prodaj: 288,
                kvota: 496,
                '%': '79%',
                'Таш': 28,
                'Сам': 38,
                'Бух': 33,
                'Анж': 21,
                'Фер': 50,
                'Нам': 27,
                'Каш': 28,
                'Сур': 8,
                'Джи': 13,
                'Сыр': 10,
                'Таш_об': 12,
                'Хор': 49
            },
            {
                id: 3,
                name: 'Препарат 3',
                prodaj: 434,
                kvota: 435,
                '%': '42%',
                'Таш': 4,
                'Сам': 29,
                'Бух': 18,
                'Анж': 1,
                'Фер': 5,
                'Нам': 7,
                'Каш': 20,
                'Сур': 37,
                'Джи': 28,
                'Сыр': 48,
                'Таш_об': 2,
                'Хор': 42
            },
            {
                id: 4,
                name: 'Препарат 4',
                prodaj: 287,
                kvota: 405,
                '%': '27%',
                'Таш': 19,
                'Сам': 20,
                'Бух': 50,
                'Анж': 17,
                'Фер': 16,
                'Нам': 35,
                'Каш': 49,
                'Сур': 3,
                'Джи': 49,
                'Сыр': 47,
                'Таш_об': 39,
                'Хор': 32
            },
            {
                id: 5,
                name: 'Препарат 5',
                prodaj: 186,
                kvota: 432,
                '%': '1%',
                'Таш': 30,
                'Сам': 1,
                'Бух': 26,
                'Анж': 19,
                'Фер': 22,
                'Нам': 14,
                'Каш': 35,
                'Сур': 33,
                'Джи': 43,
                'Сыр': 43,
                'Таш_об': 34,
                'Хор': 31
            },
            {
                id: 6,
                name: 'Препарат 6',
                prodaj: 201,
                kvota: 186,
                '%': '82%',
                'Таш': 26,
                'Сам': 47,
                'Бух': 32,
                'Анж': 24,
                'Фер': 23,
                'Нам': 30,
                'Каш': 40,
                'Сур': 5,
                'Джи': 44,
                'Сыр': 31,
                'Таш_об': 4,
                'Хор': 27
            },
            {
                id: 7,
                name: 'Препарат 7',
                prodaj: 381,
                kvota: 254,
                '%': '30%',
                'Таш': 30,
                'Сам': 28,
                'Бух': 15,
                'Анж': 2,
                'Фер': 40,
                'Нам': 1,
                'Каш': 22,
                'Сур': 2,
                'Джи': 35,
                'Сыр': 32,
                'Таш_об': 46,
                'Хор': 39
            },
            {
                id: 8,
                name: 'Препарат 8',
                prodaj: 379,
                kvota: 466,
                '%': '18%',
                'Таш': 41,
                'Сам': 22,
                'Бух': 24,
                'Анж': 26,
                'Фер': 44,
                'Нам': 34,
                'Каш': 1,
                'Сур': 11,
                'Джи': 30,
                'Сыр': 48,
                'Таш_об': 4,
                'Хор': 42
            },
            {
                id: 9,
                name: 'Препарат 9',
                prodaj: 392,
                kvota: 467,
                '%': '79%',
                'Таш': 23,
                'Сам': 10,
                'Бух': 46,
                'Анж': 5,
                'Фер': 17,
                'Нам': 29,
                'Каш': 26,
                'Сур': 13,
                'Джи': 50,
                'Сыр': 7,
                'Таш_об': 2,
                'Хор': 19
            },
            {
                id: 10,
                name: 'Препарат 10',
                prodaj: 87,
                kvota: 119,
                '%': '97%',
                'Таш': 36,
                'Сам': 26,
                'Бух': 12,
                'Анж': 16,
                'Фер': 34,
                'Нам': 14,
                'Каш': 35,
                'Сур': 3,
                'Джи': 19,
                'Сыр': 44,
                'Таш_об': 16,
                'Хор': 15
            },
            {
                id: 11,
                name: 'Препарат 11',
                prodaj: 403,
                kvota: 53,
                '%': '60%',
                'Таш': 11,
                'Сам': 33,
                'Бух': 15,
                'Анж': 21,
                'Фер': 28,
                'Нам': 37,
                'Каш': 9,
                'Сур': 45,
                'Джи': 13,
                'Сыр': 24,
                'Таш_об': 7,
                'Хор': 1
            },
            {
                id: 12,
                name: 'Препарат 12',
                prodaj: 506,
                kvota: 101,
                '%': '36%',
                'Таш': 34,
                'Сам': 40,
                'Бух': 36,
                'Анж': 6,
                'Фер': 9,
                'Нам': 36,
                'Каш': 26,
                'Сур': 37,
                'Джи': 29,
                'Сыр': 19,
                'Таш_об': 41,
                'Хор': 46
            },
            {
                id: 13,
                name: 'Препарат 13',
                prodaj: 87,
                kvota: 81,
                '%': '15%',
                'Таш': 48,
                'Сам': 19,
                'Бух': 29,
                'Анж': 31,
                'Фер': 37,
                'Нам': 10,
                'Каш': 41,
                'Сур': 6,
                'Джи': 22,
                'Сыр': 13,
                'Таш_об': 1,
                'Хор': 28
            },
            {
                id: 14,
                name: 'Препарат 14',
                prodaj: 244,
                kvota: 495,
                '%': '66%',
                'Таш': 2,
                'Сам': 16,
                'Бух': 40,
                'Анж': 34,
                'Фер': 28,
                'Нам': 29,
                'Каш': 45,
                'Сур': 45,
                'Джи': 31,
                'Сыр': 9,
                'Таш_об': 10,
                'Хор': 45
            },
            {
                id: 15,
                name: 'Препарат 15',
                prodaj: 460,
                kvota: 400,
                '%': '63%',
                'Таш': 20,
                'Сам': 49,
                'Бух': 32,
                'Анж': 37,
                'Фер': 2,
                'Нам': 8,
                'Каш': 11,
                'Сур': 12,
                'Джи': 46,
                'Сыр': 35,
                'Таш_об': 34,
                'Хор': 42
            },
            {
                id: 16,
                name: 'Препарат 16',
                prodaj: 57,
                kvota: 520,
                '%': '21%',
                'Таш': 14,
                'Сам': 49,
                'Бух': 22,
                'Анж': 10,
                'Фер': 27,
                'Нам': 11,
                'Каш': 36,
                'Сур': 49,
                'Джи': 37,
                'Сыр': 9,
                'Таш_об': 49,
                'Хор': 13
            },
            {
                id: 17,
                name: 'Препарат 17',
                prodaj: 529,
                kvota: 142,
                '%': '15%',
                'Таш': 5,
                'Сам': 15,
                'Бух': 33,
                'Анж': 20,
                'Фер': 18,
                'Нам': 49,
                'Каш': 16,
                'Сур': 9,
                'Джи': 34,
                'Сыр': 26,
                'Таш_об': 33,
                'Хор': 30
            },
            {
                id: 18,
                name: 'Препарат 18',
                prodaj: 443,
                kvota: 302,
                '%': '52%',
                'Таш': 45,
                'Сам': 29,
                'Бух': 13,
                'Анж': 20,
                'Фер': 47,
                'Нам': 14,
                'Каш': 9,
                'Сур': 34,
                'Джи': 20,
                'Сыр': 19,
                'Таш_об': 50,
                'Хор': 10
            },
            {
                id: 19,
                name: 'Препарат 19',
                prodaj: 209,
                kvota: 58,
                '%': '57%',
                'Таш': 6,
                'Сам': 14,
                'Бух': 9,
                'Анж': 19,
                'Фер': 10,
                'Нам': 2,
                'Каш': 34,
                'Сур': 22,
                'Джи': 1,
                'Сыр': 48,
                'Таш_об': 30,
                'Хор': 45
            },
            {
                id: 20,
                name: 'Препарат 20',
                prodaj: 108,
                kvota: 509,
                '%': '17%',
                'Таш': 26,
                'Сам': 48,
                'Бух': 20,
                'Анж': 26,
                'Фер': 19,
                'Нам': 1,
                'Каш': 48,
                'Сур': 3,
                'Джи': 20,
                'Сыр': 30,
                'Таш_об': 29,
                'Хор': 42
            },
            {
                id: 21,
                name: 'Препарат 21',
                prodaj: 317,
                kvota: 166,
                '%': '63%',
                'Таш': 41,
                'Сам': 46,
                'Бух': 38,
                'Анж': 18,
                'Фер': 25,
                'Нам': 18,
                'Каш': 17,
                'Сур': 4,
                'Джи': 7,
                'Сыр': 47,
                'Таш_об': 9,
                'Хор': 31
            },
            {
                id: 22,
                name: 'Препарат 22',
                prodaj: 335,
                kvota: 417,
                '%': '74%',
                'Таш': 36,
                'Сам': 23,
                'Бух': 38,
                'Анж': 43,
                'Фер': 15,
                'Нам': 27,
                'Каш': 33,
                'Сур': 31,
                'Джи': 46,
                'Сыр': 18,
                'Таш_об': 44,
                'Хор': 22
            },
            {
                id: 23,
                name: 'Препарат 23',
                prodaj: 373,
                kvota: 530,
                '%': '40%',
                'Таш': 19,
                'Сам': 13,
                'Бух': 1,
                'Анж': 14,
                'Фер': 18,
                'Нам': 5,
                'Каш': 29,
                'Сур': 29,
                'Джи': 45,
                'Сыр': 29,
                'Таш_об': 30,
                'Хор': 50
            },
            {
                id: 24,
                name: 'Препарат 24',
                prodaj: 201,
                kvota: 158,
                '%': '2%',
                'Таш': 44,
                'Сам': 4,
                'Бух': 43,
                'Анж': 30,
                'Фер': 23,
                'Нам': 23,
                'Каш': 11,
                'Сур': 25,
                'Джи': 50,
                'Сыр': 25,
                'Таш_об': 27,
                'Хор': 1
            },
            {
                id: 25,
                name: 'Препарат 25',
                prodaj: 425,
                kvota: 231,
                '%': '86%',
                'Таш': 14,
                'Сам': 20,
                'Бух': 8,
                'Анж': 38,
                'Фер': 35,
                'Нам': 3,
                'Каш': 31,
                'Сур': 10,
                'Джи': 21,
                'Сыр': 12,
                'Таш_об': 39,
                'Хор': 10
            },
            {
                id: 26,
                name: 'Препарат 26',
                prodaj: 161,
                kvota: 90,
                '%': '46%',
                'Таш': 29,
                'Сам': 33,
                'Бух': 49,
                'Анж': 43,
                'Фер': 22,
                'Нам': 47,
                'Каш': 7,
                'Сур': 32,
                'Джи': 8,
                'Сыр': 39,
                'Таш_об': 13,
                'Хор': 4
            },
            {
                id: 27,
                name: 'Препарат 27',
                prodaj: 425,
                kvota: 61,
                '%': '45%',
                'Таш': 20,
                'Сам': 23,
                'Бух': 45,
                'Анж': 7,
                'Фер': 50,
                'Нам': 45,
                'Каш': 39,
                'Сур': 40,
                'Джи': 47,
                'Сыр': 20,
                'Таш_об': 35,
                'Хор': 36
            },
            {
                id: 28,
                name: 'Препарат 28',
                prodaj: 329,
                kvota: 282,
                '%': '66%',
                'Таш': 21,
                'Сам': 38,
                'Бух': 35,
                'Анж': 36,
                'Фер': 46,
                'Нам': 29,
                'Каш': 43,
                'Сур': 32,
                'Джи': 30,
                'Сыр': 10,
                'Таш_об': 30,
                'Хор': 11
            },
            {
                id: 29,
                name: 'Препарат 29',
                prodaj: 508,
                kvota: 212,
                '%': '95%',
                'Таш': 8,
                'Сам': 26,
                'Бух': 50,
                'Анж': 16,
                'Фер': 38,
                'Нам': 43,
                'Каш': 29,
                'Сур': 25,
                'Джи': 22,
                'Сыр': 46,
                'Таш_об': 21,
                'Хор': 11
            },
            {
                id: 30,
                name: 'Препарат 30',
                prodaj: 204,
                kvota: 525,
                '%': '17%',
                'Таш': 24,
                'Сам': 31,
                'Бух': 16,
                'Анж': 22,
                'Фер': 14,
                'Нам': 12,
                'Каш': 27,
                'Сур': 37,
                'Джи': 45,
                'Сыр': 24,
                'Таш_об': 16,
                'Хор': 48
            }

        ];

        try {
            // const response = await Instance.get(`/user/${sub}`);
            // console.log("RESPONSE USER INFO", response);

            return mock;
        } catch (error) {
            console.log(error);
        }
    },
    getPreparat: async (tokeen) => {
        const token = tokeen || Cookie.get("access_token");

        const sub = jwtDecode(token)?.sub; // To'g'ri ishlatilmoqda

        const mock = [
            {
                id: 1,
                name: "Амините таблеткалар",
                dosage: "5/10 мг",
                quantity: "30 шт",
                price: "12000 Сум",
                Рецептурник: "7",
                СУ11: "11%",
                СУ12: "5",
                СБ1: "5",
                СБ2: "3",
                ГЗ1: "6%",
                ГЗ2: "10",
                КВ1: "6%",
                КВ2: "10",
            },
            {
                id: 2,
                name: "Амините таблеткалар",
                dosage: "5/10 мг",
                quantity: "30 шт",
                price: "12000 Сум",
                Рецептурник: "7",
                СУ11: "11%",
                СУ12: "5",
                СБ1: "5",
                СБ2: "3",
                ГЗ1: "6%",
                ГЗ2: "10",
                КВ1: "6%",
                КВ2: "10",
            },
            {
                id: 3,
                name: "Амините таблеткалар",
                dosage: "5/10 мг",
                quantity: "30 шт",
                price: "12000 Сум",
                Рецептурник: "7",
                СУ11: "11%",
                СУ12: "5",
                СБ1: "5",
                СБ2: "3",
                ГЗ1: "6%",
                ГЗ2: "10",
                КВ1: "6%",
                КВ2: "10",
            },
        ];

        try {
            // const response = await Instance.get(`/user/${sub}`);
            // console.log("RESPONSE USER INFO", response);

            return mock;
        } catch (error) {
            console.log(error);
        }
    },
    getMestaRabotaya: async (tokeen) => {
        const token = tokeen || Cookie.get("access_token");

        const sub = jwtDecode(token)?.sub; // To'g'ri ishlatilmoqda

        const mock = [
            {
                id: 1,
                "Ф.И.О. Врача": "1 Городская общественная больница",
                Город: "Ташкент",
                Район: "Шайхантахурский район",
            },
            {
                id: 2,
                "Ф.И.О. Врача": "Онкологический центр",
                Город: "Ташкент",
                Район: "Чиланзарский район",
            },
            {
                id: 3,
                "Ф.И.О. Врача": "Медецинский центр MClinic",
                Город: "Ташкент",
                Район: "Чиланзарский район",
            },
        ];

        try {
            // const response = await Instance.get(`/user/${sub}`);
            // console.log("RESPONSE USER INFO", response);

            return mock;
        } catch (error) {
            console.log(error);
        }
    },
};


const fetchDistrict = async (districtId) => {
    try {
        if (districtId) {
            const response = await Instance.get(
                `/v1/auth/district?districtId=${districtId}`
            );
        }
        return response?.data; // Region nomini qaytaradi
    } catch (error) {
        console.error("Error fetching region data", error);
        return null;
    }
};

const fetchRegion = async (regionId) => {
    try {
        if (regionId) {
            const response = await Instance.get(`/v1/auth/region?regionId=${regionId}`);
            return response?.data; // Region nomini qaytaradi

        }
    } catch (error) {
        console.error("Error fetching region data", error);
        return null;
    }
};

export const useGetNewConnecting = (page) => {
    return useQuery({
        queryKey: ["newConnecting", page], // 'page' qiymatini kuzatish uchun 'queryKey' dinamik qilingan
        queryFn: async () => {
            try {
                const data = await Instance.get(
                    `/v1/admin/doctors/not-declined-not-enabled?page=${page}&size=10`
                );

                const content = await Promise.all(
                    data?.data?.content.map(async (doctor) => {
                        const districtInfo = await fetchDistrict(doctor?.districtId);
                        const fetchRegionInfo = await fetchRegion(districtInfo?.regionId);

                        return {...doctor, districtInfo, regioninfo: fetchRegionInfo}; // Region nomini doctorga qo'shamiz
                    })
                );

                return {...data?.data, content: content};
            } catch (error) {
                console.error("Error fetching data", error);
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useGetContract = (page, status = "PENDING_REVIEW") => {
    return useQuery({
        queryKey: ["Contract", page, status], // 'page' qiymatini kuzatish uchun 'queryKey' dinamik qilingan
        queryFn: async () => {
            try {
                const data = await Instance.get(
                    `/v1/admin/doctor/contracts/status?goalStatus=${status}&page=${page}&size=10`
                );

                const content = await Promise.all(
                    data?.data?.content.map(async (doctor) => {
                        const districtInfo = await fetchDistrict(doctor?.districtId);
                        const fetchRegionInfo = await fetchRegion(districtInfo?.regionId);

                        return {...doctor, districtInfo, regioninfo: fetchRegionInfo}; // Region nomini doctorga qo'shamiz
                    })
                );

                return {...data?.data, content: content};
            } catch (error) {
                console.error("Error fetching data", error);
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useGetAllContract = (page=0) => {
    return useQuery({
        queryKey: ["ContractsAll", page], // 'page' qiymatini kuzatish uchun 'queryKey' dinamik qilingan
        queryFn: async () => {
            try {
                const data = await Instance.get(
                    `/v1/db/contracts?page=${page}&size=10`
                );

                return {...data?.data};
            } catch (error) {
                console.error("Error fetching data", error);
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useGetWorkPlaces = (page) => {
    return useQuery({
        queryKey: ["newConnecting", page], // 'page' qiymatini kuzatish uchun 'queryKey' dinamik qilingan
        queryFn: async () => {
            try {
                const data = await Instance.get(`/v1/auth/workplaces`);

                // const content = await Promise.all(
                //   data?.data?.content.map(async (doctor) => {
                //     const districtInfo = await fetchDistrict(doctor?.districtId);
                //     const fetchRegionInfo = await fetchRegion(districtInfo?.regionId);

                //     return { ...doctor, districtInfo, regioninfo: fetchRegionInfo }; // Region nomini doctorga qo'shamiz
                //   })
                // );

                return data?.data;
                // return {};
            } catch (error) {
                console.error("Error fetching data", error);
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useGetProfileInfo = (userId) => {
    return useQuery({
        queryKey: ["ProfileInfo", Cookie.get("access_token")],
        queryFn: async () => {
            try {
                const token = Cookie.get("access_token") || "";

                const userId = jwtDecode(token)?.sub; // To'g'ri ishlatilmoqda
                const data = await Instance.get(`/v1/user/${userId}`);
                console.log(data);

                return data?.data;
            } catch (error) {
                console.error("Error fetching data", error);
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useGetUserInfo = (userId) => {
    return useQuery({
        queryKey: ["ProfileInfo", userId],
        queryFn: async () => {
            try {
                if (userId) {

                    const data = await Instance.get(`/v1/user/${userId}`);
                    console.log("userId", userId);
                    console.log("UserData", data);
                    return data?.data;
                }
                return null;
            } catch (error) {
                console.error("Error fetching data", error);
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useGetDrugs = () => {
    return useQuery({
        queryKey: ["Drugs"],
        queryFn: async () => {
            try {
                const data = await Instance.get(`/v1/db/medicines`);
                return data?.data;
            } catch (error) {
                console.error("Error fetching data", error);
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useGetDrugsWithReports = (regionId) => {
    return useQuery({
        queryKey: ["DrugsWithReports"],
        queryFn: async () => {
            try {
                // Dorilarni olish
                const {data: medicines} = await Instance.get(`/v1/db/medicines`);

                if (!medicines || !Array.isArray(medicines)) {
                    throw new Error("Invalid medicines data");
                }

                console.log("medicines", medicines);

                // Har bir dorining ID sini ishlatib report ma'lumotlarini olish
                const reports = await Promise.all(
                    medicines.map(async (medicine) => {
                        const {data: report} = await Instance.get(`/v1/report/${medicine.id}?regionId=${regionId}`);

                        // Agar written, allowed va writtenInFact hammasi 0 bo‘lsa, null qaytaramiz
                        if (report.written === 0 && report.allowed === 0 && report.writtenInFact === 0) {
                            return null;
                        }

                        return {
                            id: medicine.id,
                            data: [
                                {
                                    name: `${medicine.name}. ${medicine.prescription} ${medicine.volume}. №${medicine.id}`,
                                    CIP: medicine.cip,
                                    status: ""
                                },
                                {name: report.written.toString(), status: ""},
                                {name: report.allowed.toString(), status: ""},
                                {
                                    name: report.writtenInFact.toString(),
                                    status: getStatus(report.written, report.allowed, report.writtenInFact)
                                },
                            ],
                            statusParent: getStatusParent(report.written, report.allowed, report.writtenInFact)
                        };
                    })
                );

// Null bo'lgan elementlarni filter qilib tashlaymiz
                return reports.filter(report => report !== null);

            } catch (error) {
                console.error("Error fetching drug reports", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};
export const useGetDTOForReports = (id, {districtId, workplaceId, fieldName, query}) => {
    return useQuery({
        queryKey: ["useGetDTOForReports", id, districtId, workplaceId, fieldName, query], // Filterlar kiritildi
        queryFn: async () => {
            try {
                if (!id) {
                    return null;
                }
                console.log("ID3", id);

                const {data: report} = await Instance.get(`/v1/report/${id}`, {
                    params: {
                        districtId,
                        workplaceId,
                        fieldName,
                        query, // Qo‘shimcha query parametrlar bo‘lsa qo‘shiladi
                    }
                });

                console.log("ID4", report);
                return report;
            } catch (error) {
                console.log("ID5", id);
                console.error("Error fetching drug reports", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

// `status` maydonini hisoblash uchun funksiya
const getStatus = (written, allowed, writtenInFact) => {
    if (written > allowed * 1.3) {
        return "red"; // 30% dan ko'p bo‘lsa qizil
    }
    if (written > allowed) {
        return "warning"; // Written allowed dan ko‘p lekin 30% oshmagan bo‘lsa sariq
    }
    return "";
};

// `statusParent` maydonini hisoblash uchun funksiya
const getStatusParent = (written, allowed, writtenInFact) => {
    if (writtenInFact > allowed * 1.5) {
        return "red"; // 50% dan ko‘p bo‘lsa qizil
    }
    if (writtenInFact > allowed * 1.3) {
        return "warning"; // 30% dan ko‘p lekin 50% dan kam bo‘lsa sariq
    }
    return "done";
};

export const useDeleteDrug = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            try {
                await Instance.delete(`/v1/db/medicine/${id}`);
            } catch (error) {
                console.error("Error deleting drug", error);
                throw error; // Xatolikni qaytarish
            }
        },
        onSuccess: () => {
            // Dori o‘chirildi, endi dorilar ro‘yxatini yangilaymiz
            queryClient.invalidateQueries(["Drugs"]);
        },
    });
};

export const useDeleteDistrcit = () => {
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: async (id) => {
            try {
                await Instance.delete(`/v1/db/districts/delete/${id}`);
            } catch (error) {
                console.error("Error deleting district", error);
                throw error; // Xatolikni qaytarish
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["Regions"]);
        },
    });
};

export const useEnableDoctor = () => {
    const {translate} = useLanguage();

    return useMutation(async (userId = 0) => {
        try {
            const response = await Instance.patch(`/v1/admin/${userId}/enable`);

            message.success(`${userId} ${translate("Успешно_получено")}`);
            return response.data;
        } catch (error) {
            console.error("Error enabling user", error.response || error);
            message.error(translate("произошла_ошибка"));
            throw error; // Bu yerda xatolikni qaytarish, `isError` ni qaytarish uchun
        }
    });
};

// NOTE Get managers
export const useGetWorkplaces = (filters = {}) => {

    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value != null) {
            // menga kelgan qiymatlarni qo'shdim (null yoki undefined bu yerda qoshilmaydi)
            acc[key] = value;
        }
        return acc;
    }, {});

    const hasFilters = Object.keys(cleanFilters).length > 0;

    return useQuery({
        queryKey: ["getWorkplacec", cleanFilters],
        queryFn: async () => {
            const queryParameters = new URLSearchParams(cleanFilters).toString(); // Converts the clean filters object into a query string
            const url = `/v1/db/workplaces${hasFilters ? "?" + queryParameters : ""}`; // Ap
            try {
                const {data} = await Instance.get(url);
                return data;
            } catch (error) {
                console.error("Error fetching data", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};
export const useGetWorkplacesDb = (
    {
        regionId,
        districtId,
    }
) => {
    return useQuery({
        queryKey: ["getWorkplacec", regionId,
            districtId,],
        queryFn: async () => {
            try {
                const {data} = await Instance.get("/v1/db/workplaces", {
                    params: {
                        regionId,
                        districtId,
                    },
                });
                return data;
            } catch (error) {
                console.error("Error fetching data", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};
export const useUpdateWorkplace = () => {
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: async (uptWkData) => {
                console.log("asdasdasd", uptWkData)
                if (!uptWkData?.requestData?.id) throw new Error("ID majburiy");
                const {data} = await Instance.put(`/v1/db/workplaces/${uptWkData?.requestData?.id}`, uptWkData?.requestData?.uptData);
                return;
            },
            onSuccess: (data, variables) => {
                variables.onSuccess();
                queryClient.invalidateQueries(["getWorkplacec", variables.id]);
                queryClient.invalidateQueries(["workplace", variables.id]);
            },
            onError: (error) => {
                console.error("Xatolik yuz berdi:", error);
            },
        });
};

export const useDeleteWorkplace = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            try {
                await Instance.delete(`/v1/db/workplaces/${id}`);
            } catch (error) {
                console.error("Error deleting drug", error);
                throw error; // Xatolikni qaytarish
            }
        },
        onSuccess: () => {
            // Dori o‘chirildi, endi dorilar ro‘yxatini yangilaymiz
            queryClient.invalidateQueries(["Drugs"]);
        },
    });
};
// NOTE GET DISTRICTS BY REGION ID
export const useGetWorkplaceById = () => {
    return useMutation(async (lpuId) => {
        try {
            if (lpuId) {
                const {data} = await Instance.get(
                    `/v1/db/workplaces/${lpuId}`
                );
                return data;
            }
        } catch (error) {
            console.error("Error fetching districts data", error);
            throw error;
        }
    });
};

export const useGetWorkplaceOne = (id) => {
    return useQuery({
        queryKey: ["workplace", id || null],
        queryFn: async () => {
            try {
                if (id) {
                    const url = `/v1/db/workplaces/${id}`; // Ap
                    const {data} = await Instance.get(url);
                    return data;
                }
            } catch (error) {
                console.error("Error fetching data", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};


export const useGetWorkplaceStats = (id) => {
    return useQuery({
        queryKey: ["workplacesStat", id || null],
        queryFn: async () => {
            try {
                if (id) {
                    const url = `/v1/db/workplaces/statistics/${id}`; // Ap
                    const {data} = await Instance.get(url);
                    return data;
                }
            } catch (error) {
                console.error("Error fetching data", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useGetDistrcitById = (id = null) => {
    return useQuery({
        queryKey: ["getWorkplacec", id],
        queryFn: async () => {
            try {
                const {data} = await Instance.get(
                    `v1/auth/district?districtId=${id}`
                );
                console.log(data);

                return data;
            } catch (error) {
                console.error("Error fetching data", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useGetWorkplacesFilter = () => {
    return useQuery({
        queryKey: ["getWorkplacec"],
        queryFn: async () => {
            try {
                const {data} = await Instance.get("/v1/auth/workplaces", {});
                return data;
            } catch (error) {
                console.error("Error fetching data", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};
export const useGetWorkplacesById = (id) => {
    return useQuery({
        queryKey: ["workplace", id],
        queryFn: async () => {
            try {
                if (id) {
                    const {data} = await Instance.get(`/v1/db/workplaces/${id}`, {});
                    return data;
                }
            } catch (error) {
                console.error("Error fetching data", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};
// NOTE Get managers
export const useGetManagers = ({
                                   creatorId, countryId,
                                   regionId,
                                   districtId,
                                   nameQuery,
                               }) => {
    return useQuery({
        queryKey: [
            "GetManagers",
            creatorId,
            countryId,
            regionId,
            districtId,
            nameQuery,
        ],
        queryFn: async () => {
            try {
                const {data} = await Instance.get("/v1/user/managers", {
                    params: {
                        creatorId,
                        countryId,
                        regionId,
                        districtId,
                        nameQuery,
                    },
                });
                return data;
            } catch (error) {
                console.error("Error fetching data", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};


export const useGetMedAgents = ({
                                    creatorId,
                                    countryId,
                                    regionId,
                                    workplaceId,
                                    nameQuery,
                                    districtId
                                }) => {
    return useQuery({
        queryKey: [
            "GetMedAgents",
            creatorId,
            countryId,
            regionId,
            districtId,
            nameQuery,
            districtId
        ],
        queryFn: async () => {
            try {
                const {data} = await Instance.get("/v1/user/medagents", {
                    params: {
                        creatorId,
                        countryId,
                        regionId,
                        workplaceId,
                        nameQuery,
                        districtId
                    },
                });
                return data;
            } catch (error) {
                console.error("Error fetching data", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useGetAdmins = ({
                                 creatorId,
                                 countryId,
                                 regionId,
                                 workplaceId,
                                 nameQuery,
                                 districtId
                             }) => {
    return useQuery({
        queryKey: [
            "getAdmins",
            creatorId,
            regionId,
            districtId,
            workplaceId,
            nameQuery,
        ],
        queryFn: async () => {
            try {
                const {data} = await Instance.get("/v1/user/admins", {
                    params: {
                        creatorId,
                        regionId,
                        workplaceId,
                        nameQuery,
                        districtId
                    },
                });
                return data;
            } catch (error) {
                console.error("Error fetching data", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useGetDoctorsFilter = ({
                                        creatorId,
                                        countryId,
                                        regionId,
                                        workplaceId,
                                        nameQuery,
                                        districtId
                                    }) => {
    return useQuery({
        queryKey: [
            "GetDoctorsFilter",
            creatorId,
            countryId,
            regionId,
            workplaceId,
            nameQuery,
            districtId
        ],
        queryFn: async () => {
            try {
                const {data} = await Instance.get("/v1/user/doctors", {
                    params: {
                        creatorId,
                        countryId,
                        regionId,
                        workplaceId,
                        nameQuery,
                        districtId
                    },
                });
                return data;
            } catch (error) {
                console.error("Error fetching data", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

// NOTE GET DISTRICTS BY REGION ID
export const useGetDistrictsByRegionId = () => {
    return useMutation(async (regionId) => {
        try {
            const {data} = await Instance.get(
                `/v1/auth/districts?regionId=${regionId}`
            );

            console.log("DAATA", data);
            return data;
        } catch (error) {
            console.error("Error fetching districts data", error);
            throw error;
        }
    });
};

// NOTE GET DISTRICT BY REGION ID  AND DISTRICT ID
export const useGetDistrictById = () => {
    const {
        mutate: getDistricts,
        isLoading,
        isError,
    } = useGetDistrictsByRegionId();

    return useMutation(async ({regionId, districtId}) => {
        // Region bo'yicha districtlarni olish
        const districts = await getDistricts(1); // regionIdni yuborib districtlarni olish

        // Districtni topish
        const district = districts.find(
            (district) => district.districtId === districtId
        );
        if (!district) throw new Error("District not found");

        return district;
    });
};

// NOTE MANAGERS WITH DISTRICT NAME
export const useGetManagersWithDistrictName = () => {
    const regionId = 1; // Region 1 bo'ladi
    const {data: districts, isLoading: isDistrictsLoading} =
        useGetDistrictsByRegionId(regionId);

    return useQuery({
        queryKey: ["GetManagersWithDistrictName"], // queryKey - bu ham array bo'lishi kerak
        queryFn: async () => {
            if (isDistrictsLoading || !districts) return []; // Agar districtlar yuklanayotgan bo'lsa yoki ma'lumotlar yo'q bo'lsa, bo'sh array qaytarish

            const {data: managers} = await Instance.get(`/v1/user/managers`);

            // Districtlarni managerlar bilan birlashtirish
            const managersWithDistricts = managers.map((manager) => {
                const district = districts.find(
                    (d) => d?.districtId === manager?.districtId
                );
                return {
                    ...manager,
                    districtName: district ? district.name : "Unknown District",
                };
            });

            return managersWithDistricts;
        },
        staleTime: 1000 * 60 * 10, // Ma'lumotlar eskirish vaqti
    });
};

// NOTE ADD MANAGER
export const useRegisterManager = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (managerData) => {
            console.log("managerData", managerData);
            const response = await Instance.post(
                "/v1/user/register-manager",
                managerData?.requestData
            );
            await queryClient.invalidateQueries(["GetManagers"]);
            return response.data;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess();
        },
        onError: (error, variables) => {
            variables.onError();
        },
    });
};

// <ModalBodyHeader gridC={1}>
//   <ModalBodySection>
//     <MiniTitleSmall
//         mgn={"0 auto"}
//     >
//       {translate("adding_lpu")}
//     </MiniTitleSmall>
//     <DeleteBtn
//         bgcolor={"#216BF4"}
//         onClick={SendData}
//     >
//       {translate("add_lpu")}
//     </DeleteBtn>
//   </ModalBodySection>
// </ModalBodyHeader>
export const useRegisterFieldForce = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (managerData) => {
            console.log("managerData", managerData);
            const response = await Instance.post(
                "/v1/user/register-admin",
                managerData?.requestData
            );
            await queryClient.invalidateQueries(["getAdmins"]);

            return response.data;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess();
        },
        onError: (error, variables) => {
            variables.onError();
        },
    });
};

export const useAddWorkplace = () => {
    return useMutation({
        mutationFn: async (wkData) => {
            console.log("wkData", wkData);
            const response = await Instance.post(
                "/v1/db/workplaces/add",
                wkData?.requestData
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess();
        },
        onError: (error, variables) => {
            variables.onError();
        },
    });
};

export const useResetPasswordWithoutOldPassword = () => {
    return useMutation({
        mutationFn: async (resetPassData) => {
            console.log("resetPassData", resetPassData);
            const response = await Instance.post(
                "/v1/admin/reset-password",
                resetPassData?.requestData
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess();
        },
        onError: (error, variables) => {
            variables.onError();
        },
    });
};

// NOTE ADD MANAGER
export const useRegisterDoctor = () => {
    return useMutation({
        mutationFn: async (medagentdata) => {
            console.log("DoctorData", medagentdata);
            const response = await Instance.post(
                "/v1/user/register-doctor",
                medagentdata?.requestData
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess();
        },
        onError: (error, variables) => {
            variables.onError();
        },
    });
};
// NOTE ADD MedAgent
export const useUploadDoctor = () => {
    const queryClient = useQueryClient();

    return useMutation({
        // GetDoctorsFilter
        mutationFn: async (medagentdata) => {
            const response = await Instance.post(
                "/v1/user/upload-doctors",
                medagentdata?.requestData
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["GetDoctorsFilter"]);
            variables.onSuccess(data);
        },
        onError: (error, variables) => {
            queryClient.invalidateQueries(["GetDoctorsFilter"]);
            variables.onError(error);
        },
    });
};
// NOTE ADD MedAgent

export const useUploadManager = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (medagentdata) => {
            const response = await Instance.post(
                "/v1/user/upload-managers",
                medagentdata?.requestData
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["GetManagers"]);

            variables.onSuccess(data);
        },
        onError: (error, variables) => {
            queryClient.invalidateQueries(["GetManagers"]);
            variables.onError(error);
        },
    });
};
// NOTE ADD MedAgent

export const useUploadDrugs = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (medagentdata) => {
            const response = await Instance.post(
                "/v1/db/medicine/add-bulk",
                medagentdata?.requestData
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["Drugs"]);

            variables.onSuccess(data);
        },
        onError: (error, variables) => {
            queryClient.invalidateQueries(["Drugs"]);
            variables.onError(error);
        },
    });
};

export const useUploadMedAgents = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (medagentdata) => {
            const response = await Instance.post(
                "/v1/user/upload-medagents",
                medagentdata?.requestData
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["GetMedAgents"]);
            variables.onSuccess(data);
        },
        onError: (error, variables) => {
            queryClient.invalidateQueries(["GetMedAgents"]);
            variables.onError(error);
        },
    });
};
// NOTE ADD MedAgent

export const useUploadFieldForce = () => {
    return useMutation({
        mutationFn: async (medagentdata) => {
            const response = await Instance.post(
                "/v1/user/upload-admins",
                medagentdata?.requestData
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess(data);
        },
        onError: (error, variables) => {
            variables.onError(error);
        },
    });
};
// NOTE ADD MedAgent

export const useRegisterMedAgent = () => {
    return useMutation({
        mutationFn: async (medagentdata) => {
            console.log("medagentdata", medagentdata);
            const response = await Instance.post(
                "/v1/user/register-medagent",
                medagentdata?.requestData
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess();
        },
        onError: (error, variables) => {
            variables.onError();
        },
    });
};

export const useGetRegions = () => {
    return useQuery({
        queryKey: ["Regions"],
        queryFn: async () => {
            try {
                const data = await Instance.get(`/v1/auth/regions`);
                return data?.data;
            } catch (error) {
                console.error("Error fetching data", error);
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useGetDoctors = (filters = {}) => {
    // Filterlarni tozladim: null yoki undefined qiymatlarni olib tashladim
    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value != null) {
            // menga kelgan qiymatlarni qo'shdim (null yoki undefined bu yerda qoshilmaydi)
            acc[key] = value;
        }
        return acc;
    }, {});

    const hasFilters = Object.keys(cleanFilters).length > 0;

    return useQuery({
        queryKey: ["Doctors", cleanFilters], // Cache key
        queryFn: async () => {
            const queryParameters = new URLSearchParams(cleanFilters).toString(); // Converts the clean filters object into a query string
            const url = `/v1/user/doctors${hasFilters ? "?" + queryParameters : ""}`; // Append the query string to the URL
            try {
                const {data} = await Instance.get(url);
                return data;
            } catch (error) {
                console.error("Error fetching doctors:", error);
                throw error; // Continue throwing the error to handle it in the component
            }
        },
        enabled: hasFilters, // Faqat cleanFilters mavjud bo'lganda so'rov yuboriladi
        staleTime: 1000 * 60 * 10, // Optionally adjust the cache time as necessary
    });
};

export const useGetDistricts = (regionId = null) => {
    return useQuery({
        queryKey: ["Districts", regionId],
        queryFn: async () => {
            try {
                if (regionId) {
                    const data = await Instance.get(
                        `/v1/auth/districts?regionId=${regionId}`
                    );
                    return data?.data;
                } else {
                    return [];
                }
            } catch (error) {
                console.error("Error fetching data", error);
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useAddAdminManagerGoal = () => {
    return useMutation({
        mutationFn: async (managerGoalData) => {
            console.log("AddAdminManagerGoal", managerGoalData);
            const response = await Instance.post(
                "/v1/admin/manager/new-goal",
                managerGoalData?.requestData
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess();
        },
        onError: (error, variables) => {
            variables.onError(error);
        },
    });
};

export const useAddAdminDoctorGoal = () => {
    return useMutation({
        mutationFn: async (doctorGoalData) => {
            console.log("AddAdminManagerGoal", doctorGoalData);
            const response = await Instance.post(
                "/v1/med-agent/doctor/new-contract",
                doctorGoalData?.requestData
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess();
        },
        onError: (error, variables) => {
            variables.onError(error);
        },
    });
};

export const useAddAdminMedAgentGoal = () => {
    return useMutation({
        mutationFn: async (medAgentGoalData) => {
            console.log("AddAdminManagerGoal", medAgentGoalData);
            const response = await Instance.post(
                "/v1/admin/med-agent/new-goal",
                medAgentGoalData?.requestData
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess();
        },
        onError: (error, variables) => {
            console.log("error", error);

            variables.onError(error);
        },
    });
};

export const useGetManagerGoalId = (id) => {
    // Filterlarni tozalash: null yoki undefined qiymatlarni olib tashlash
    return useQuery({
        queryKey: ["useGetManagerGoalId", id], // Cache key
        queryFn: async () => {
            const url = `/v1/admin/manager/goal/manager-id/${id}`; // Append the query string to the URL
            try {
                const {data} = await Instance.get(url);

                return data;
            } catch (error) {
                console.error("Error fetching doctors:", error);
                return {}
                throw error; // Continue throwing the error to handle it in the component
            }
        },
        staleTime: 1000 * 60 * 10, // Optionally adjust the cache time as necessary
    });
};

export const useUploadSales = ({}) => {
    return useMutation({
        // startDate=2025-02-01&endDate=2025-03-01&page=0&size=10
        mutationFn: async (uploadData) => {
            console.log("managerData", uploadData);
            const response = await Instance.post(
                "/v1/db/sales/load-data",
                uploadData?.uploadData
            );
            console.log("UPLOAD SUCCES: ", response.data)
            return response.data;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess(data);
        },
        onError: (error, variables) => {
            variables.onError(error);
        },
    });
};
// NOTE ADD MedAgent

const fetchSalesData = async (page) => {
    try {
        const response = await Instance.get(`/v1/db/sales/data?page=${page}&size=10`);
        return response.data;
    } catch (error) {
        console.error("Error fetching sales data:", error);
        throw new Error("Failed to fetch sales data");
    }
};

export const useGetSalesData = ({
                                    page = 0,
                                    size = 10
                                }) => {
    return useQuery({
        queryKey: ["salesData", page], // 'page' qiymatini kuzatish uchun 'queryKey' dinamik qilingan
        queryFn: async () => {
            const date = new Date(); // Hozirgi sana
            const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
            const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            try {
                const {data} = await Instance.get(`/v1/db/sales/data`, {
                    params: {
                        page,
                        size,
                    }
                });

                console.log("SAAAAAAAALES", data)
                return data;
            } catch (error) {
                console.error("Error fetching sales data:", error);
                throw new Error("Failed to fetch sales data");
            }
        },
        staleTime: 1000 * 60 * 5, // 5 minutgacha yangilanmaydi
        keepPreviousData: true, // Sahifalar o'zgarganda eski ma'lumotni ushlab turadi
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (DeleteUser) => {
            console.log("DeleteUser", DeleteUser);
            const response = await Instance.delete(
                "/v1/user/" + DeleteUser?.requestData?.userId
            );
            return response.data;
        },
        onSuccess: async (data, variables) => {

            queryClient.invalidateQueries(["GetDoctorsFilter"]);
            queryClient.invalidateQueries(["getAdmins"]);
            queryClient.invalidateQueries(["GetMedAgents"]);
            variables.onSuccess();
        },
        onError: (error, variables) => {

            queryClient.invalidateQueries(["GetDoctorsFilter"]);
            queryClient.invalidateQueries(["getAdmins"]);
            queryClient.invalidateQueries(["GetMedAgents"]);
            variables.onError();
        },
    });
};

// GET STATICTS
export const useGetStaticticsMedAgent = (id) => {
    return useQuery({
        queryKey: ["useGetStaticticsMedAgent", id], // Cache key
        queryFn: async () => {
            const url = `v1/med-agent/statistics/${id}`; // Append the query string to the URL
            try {
                const {data} = await Instance.get(url);
                return data;
            } catch (error) {
                console.error("Error fetching doctors:", error);
                throw error; // Continue throwing the error to handle it in the component
            }
        },
        staleTime: 1000 * 60 * 10, // Optionally adjust the cache time as necessary
    });

};
// NOTE ADD MedAgent


export const useGetRecepiesFilter = ({
                                         regionId,
                                         districtId,
                                         medicineId,
                                         doctorField,
                                         page = 0,
                                         size = 10
                                     }) => {
    return useQuery({
        queryKey: [
            "GetMedAgents",
            regionId,
            districtId,
            medicineId,
            doctorField,
            page,
            size
        ],
        queryFn: async () => {
            try {
                const {data} = await Instance.get("/v1/db/recipes", {
                    params: {
                        regionId,
                        districtId,
                        medicineId,
                        doctorField,
                        page,
                        size
                    },
                });
                return data;
            } catch (error) {
                console.error("Error fetching data", error);
                return {}
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useUpdateSale = () => {
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: async (uptWkData) => {
                console.log("asdasdasd", uptWkData)
                if (!uptWkData?.requestData?.id) throw new Error("ID majburiy");
                const {data} = await Instance.put(`v1/db/sales/${uptWkData?.requestData?.id}`, uptWkData?.requestData);
                return data;
            },
            onSuccess: (data, variables) => {
                variables.onSuccess();
                queryClient.invalidateQueries(["salesData"]);
            },
            onError: (error, variables) => {
                variables.onError();
                console.error("Xatolik yuz berdi:", error);
            },
        });
};


export const useGetDashboard = ({

                                    regionId,
                                    districtId,
                                    medicineId,
                                    doctorField,
                                    page = 0,
                                    size = 10
                                }) => {
    return useQuery({
        queryKey: [
            "GetMedAgents",
            regionId,
            districtId,
            medicineId,
            doctorField,
            page,
            size
        ],
        queryFn: async () => {
            try {
                const {data} = await Instance.get("/v1/dashboard/filter", {
                    params: {
                        regionId,
                        districtId,
                        medicineId,
                        doctorField,
                        page,
                        size
                    },
                });
                return data;
            } catch (error) {
                console.error("Error fetching data", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};


export const useGetAllReportsWithDrugs = () => {
    return useQuery({
        queryKey: ["DrugsWithReportsAll"],
        queryFn: async () => {
            try {
                const {data: medicines} = await Instance.get(`/v1/db/medicines`);

                if (!medicines || !Array.isArray(medicines)) {
                    throw new Error("Invalid medicines data");
                }

                console.log("medicines", medicines);

                const reports = await Promise.all(
                    medicines.map(async (medicine) => {
                        try {
                            const {data} = await Instance.get(`/v1/report/admin/${medicine.id}`);
                            return {
                                ...data,
                                medicine
                            }
                        } catch (error) {
                            return null; // false emas, null yoki undefined bo‘lishi kerak
                        }
                    })
                );
                return reports.filter(Boolean);
            } catch (error) {
                console.error("Error fetching drug reports", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useGetAllReportsWithDrugsAdmin = () => {
    return useQuery({
        queryKey: ["DrugsWithReportsAll"],
        queryFn: async () => {
            try {
                const {data: medicines} = await Instance.get(`/v1/db/medicines`);

                if (!medicines || !Array.isArray(medicines)) {
                    throw new Error("Invalid medicines data");
                }

                console.log("medicines", medicines);

                const reports = await Promise.all(
                    medicines.map(async (medicine) => {
                        try {
                            const {data} = await Instance.get(`/v1/report/admin/${medicine.id}`);
                            return data;
                        } catch (error) {
                            return null; // false emas, null yoki undefined bo‘lishi kerak
                        }
                    })
                );
                return reports.filter(Boolean);
            } catch (error) {
                console.error("Error fetching drug reports", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useGetManagerGoalWithManagerId = (managerID = null) => {
    return useQuery({
        queryKey: ["useGetManagerGoalWithManagerId", managerID],
        queryFn: async () => {
            try {
                if (managerID) {
                    const data = await Instance.get(
                        `v1/admin/manager/goal/manager-id/${managerID}`
                    );
                    return data?.data;
                } else {
                    return [];
                }
            } catch (error) {
                console.error("Error fetching data", error);
                return [];

                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useSaveReportManager = () => {
    return useMutation({
        mutationFn: async (reportdata) => {
            console.log("reportdata", reportdata);
            const response = await Instance.post(
                "/v1/report/save",
                reportdata?.requestData // Ma'lumot body ichida ketadi
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess(data);
        },
        onError: (error, variables) => {
            variables.onError(error);
        },
    });
};

export const useAddRegion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (reportdata) => {
            console.log("reportdata", reportdata);
            const response = await Instance.post(
                "v1/db/regions/add",
                reportdata?.requestData // Ma'lumot body ichida ketadi
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess(data);
            queryClient.invalidateQueries(["Regions"]);
        },
        onError: (error, variables) => {
            variables.onError(error);
        },
    });
};


export const useAddDistrict = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (reportdata) => {
            console.log("reportdata", reportdata);
            const response = await Instance.post(
                "v1/db/districts/add",
                reportdata?.requestData // Ma'lumot body ichida ketadi
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess(data);
            queryClient.invalidateQueries(["Regions"]);
        },
        onError: (error, variables) => {
            variables.onError(error);
        },
    });
};


export const useGetMnns = () => {
    return useQuery({
        queryKey: ["Districts"],
        queryFn: async () => {
            try {
                const data = await Instance.get(
                    `/v1/db/mnn/list`
                );
                return data?.data;
            } catch (error) {
                console.error("Error fetching data", error);
                return []
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};


export const useAddDrugs = () => {
    return useMutation({
        mutationFn: async (medicineDara) => {
            console.log("medicineDara", medicineDara);
            const response = await Instance.post(
                "v1/db/medicine",
                {...medicineDara?.requestData, "status": "ACTIVE",}
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess();
        },
        onError: (error, variables) => {
            variables.onError();
        },
    });
};


export const useGetConditions = () => {
    return useQuery({
        queryKey: [
            "useGetConditons"
        ],
        queryFn: async () => {
            try {
                const {data} = await Instance.get("/v1/db/conditions");
                return data[0];
            } catch (error) {
                console.error("Error fetching data", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useUpdateCondition = () => {
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: async (uptWkData) => {
                console.log("asdasdasd", uptWkData)
                const {data} = await Instance.put(`v1/db/conditions/${uptWkData?.requestData?.id}`, uptWkData?.requestData);
                return data;
            },
            onSuccess: (data, variables) => {
                variables.onSuccess();
                queryClient.invalidateQueries(["useGetConditons"]);
            },
            onError: (error, variables) => {
                variables.onError();
                console.error("Xatolik yuz berdi:", error);
            },
        });
};


export default Server;
