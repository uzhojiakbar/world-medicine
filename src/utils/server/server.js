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
                Препарат: "Амлипин таблетки и +3",
                Квота: "1",
                Выписано: "1",
                Рецептурник: "1",
                СУ: "1",
                СБ: "1",
                ГЗ: "1",
                КВ: "1",
            }, {
                id: 2,
                Препарат: "Амлипин таблетки и +3",
                Квота: "1",
                Выписано: "1",
                Рецептурник: "1",
                СУ: "1",
                СБ: "1",
                ГЗ: "1",
                КВ: "1",
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
                name: "Амлипин таблетки",
                prodaj: 200,
                Таш: 20,
                Сам: 15,
                Бух: 25,
                Анж: 30,
                Фер: 10,
                Нам: 5,
                Каш: 20,
                Сур: 10,
                Джи: 5,
                Сыр: 15,
                Таш_об: 10,
                Хор: 5,
            },
            // {
            //   id: 2,
            //   name: "Нурокс таблетки",
            //   prodaj: 150,
            //   Таш: 10,
            //   Сам: 30,
            //   Бух: 20,
            //   Анж: 25,
            //   Фер: 8,
            //   Нам: 3,
            //   Каш: 15,
            //   Сур: 5,
            //   Джи: 3,
            //   Сыр: 10,
            //   Таш_об: 8,
            //   Хор: 4,
            // },
            // {
            //   id: 3,
            //   name: "Панадол капсулы",
            //   prodaj: 100,
            //   Таш: 8,
            //   Сам: 25,
            //   Бух: 18,
            //   Анж: 20,
            //   Фер: 5,
            //   Нам: 2,
            //   Каш: 10,
            //   Сур: 3,
            //   Джи: 2,
            //   Сыр: 8,
            //   Таш_об: 6,
            //   Хор: 3,
            // },
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
        const response = await Instance.get(
            `/v1/auth/district?districtId=${districtId}`
        );
        return response?.data; // Region nomini qaytaradi
    } catch (error) {
        console.error("Error fetching region data", error);
        return null;
    }
};

const fetchRegion = async (regionId) => {
    try {
        const response = await Instance.get(`/v1/auth/region?regionId=${regionId}`);
        return response?.data; // Region nomini qaytaradi
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

export const useGetNewContract = (page) => {
    return useQuery({
        queryKey: ["newContract", page], // 'page' qiymatini kuzatish uchun 'queryKey' dinamik qilingan
        queryFn: async () => {
            try {
                // const data = await Instance.get(
                //   `v1/admin/contracts/pending-review?page=${page}&size=10`
                // );
                // const data = {};

                // const content = await Promise.all(
                //   data?.data?.content?.map(async (doctor) => {
                //     const districtInfo = await fetchDistrict(doctor?.districtId);
                //     const fetchRegionInfo = await fetchRegion(districtInfo?.regionId);

                //     return { ...doctor, districtInfo, regioninfo: fetchRegionInfo }; // Region nomini doctorga qo'shamiz
                //   })
                // );

                return {};
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
                const data = await Instance.get(`/v1/user/${userId}`);
                console.log("userId", userId);
                console.log("UserData", data);

                return data?.data;
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
export const useGetWorkplaces = () => {
    return useQuery({
        queryKey: ["getWorkplacec"],
        queryFn: async () => {
            try {
                const {data} = await Instance.get("/v1/auth/workplaces");
                return data;
            } catch (error) {
                console.error("Error fetching data", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};
export const useGetWorkplacesDb = () => {
    return useQuery({
        queryKey: ["getWorkplacec"],
        queryFn: async () => {
            try {
                const {data} = await Instance.get("/v1/db/workplaces");
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
                console.log("asdasdasd",uptWkData)
                if (!uptWkData?.requestData?.id) throw new Error("ID majburiy");
                const { data } = await Instance.put(`/v1/db/workplaces/${uptWkData?.requestData?.id}`, uptWkData?.requestData?.uptData);
                return;
            },
            onSuccess: (data, variables) => {
                variables.onSuccess();
                queryClient.invalidateQueries(["getWorkplacec", variables.id]);
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
            const {data} = await Instance.get(
                `/v1/db/workplaces/${lpuId}`
            );

            console.log("DAATA", data);
            return data;
        } catch (error) {
            console.error("Error fetching districts data", error);
            throw error;
        }
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
                                   workplaceId,
                                   nameQuery,
                               }) => {
    return useQuery({
        queryKey: [
            "GetManagers",
            creatorId,
            countryId,
            regionId,
            workplaceId,
            nameQuery,
        ],
        queryFn: async () => {
            try {
                const {data} = await Instance.get("/v1/user/managers", {
                    params: {
                        creatorId,
                        countryId,
                        regionId,
                        workplaceId,
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
            workplaceId,
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
            "GetMedAgents",
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
    return useMutation({
        mutationFn: async (managerData) => {
            console.log("managerData", managerData);
            const response = await Instance.post(
                "/v1/user/register-manager",
                managerData?.requestData
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
                throw error; // Continue throwing the error to handle it in the component
            }
        },
        staleTime: 1000 * 60 * 10, // Optionally adjust the cache time as necessary
    });
};

export const useUploadSales = () => {
    return useMutation({
        mutationFn: async (uploadData) => {
            console.log("managerData", uploadData);
            const response = await Instance.post(
                "/v1/db/sales/load-data",
                uploadData?.uploadData
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

const fetchSalesData = async (page) => {
    try {
        const response = await Instance.get(`/v1/db/sales/data?page=${page}&size=10`);
        return response.data;
    } catch (error) {
        console.error("Error fetching sales data:", error);
        throw new Error("Failed to fetch sales data");
    }
};

export const useGetSalesData = (page) => {
    return useQuery({
        queryKey: ["salesData", page], // 'page' qiymatini kuzatish uchun 'queryKey' dinamik qilingan
        queryFn: async () => {
            try {
                const {data} = await Instance.get(`/v1/db/sales/data?page=${page}&size=10`);

                // const content = await Promise.all(
                //     data.content.map(async (sale) => {
                //       const districtInfo = sale?.regionDTO?.districtId
                //           ? await fetchDistrict(sale.regionDTO.districtId)
                //           : null;
                //
                //       const regionInfo = districtInfo?.regionId
                //           ? await fetchRegion(districtInfo.regionId)
                //           : null;
                //
                //       return { ...sale, districtInfo, regionInfo };
                //     })
                // );

                return {...data};
            } catch (error) {
                console.error("Error fetching sales data:", error);
                throw new Error("Failed to fetch sales data");
            }
        },
        staleTime: 1000 * 60 * 5, // 5 minutgacha yangilanmaydi
        keepPreviousData: true, // Sahifalar o'zgarganda eski ma'lumotni ushlab turadi
    });
};

export default Server;
