export const transformRegionsForSelect = (regions = [], lang = "eng") => {
    return regions?.map((region) => ({
        value: (function name(params) {
            if (lang === "ru") return region?.nameRussian;
            else if (lang === "en") return region?.name;
            else if (lang === "uz") return region?.nameUzLatin;
            else return region?.nameRussian;
        })(),
        label: region.name,
        id: region?.id,
        districts: region?.districts?.map((district) => ({
            value: (function name(params) {
                if (lang === "ru") return district?.nameRussian;
                else if (lang === "en") return district?.name;
                else if (lang === "uz") return district?.nameUzLatin;
                else return district?.nameRussian;
            })(),
            label: district.name,
            id: district?.districtId,
        })),
    }));
};
export const transformDistrictsForSelect = (districts = [], lang = "eng") => {
    return districts?.map((dstrc) => ({
        value: (function name(params) {
            if (lang === "ru") return dstrc?.nameRussian;
            else if (lang === "en") return dstrc?.name;
            else if (lang === "uz") return dstrc?.nameUzLatin;
            else return dstrc?.nameRussian;
        })(),
        label: dstrc.name,
        districtId: dstrc?.districtId,
    }));
};
export const transformWorkplacesForSelect = (wrkplc = [], lang = "eng") => {
    return wrkplc.map((region) => ({
        value: region?.name,
        label: region.name,
        id: region.id,
    }));
};
export const transformDrugsForSelect = (drugs = [], lang = "eng") => {
    return drugs.map((region) => ({
        value: region?.name,
        label: region.name,
        id: region.id,
    }));
};


export const TransformInsitutation = (data = [], lang, translate = () => {
}) => {
    return data.map((v) => {
        return {
            id: v.id,
            value: translate(v?.value),
            label: translate(v?.label),
            key: v?.label,
        }
    })
}

export const TransformMnns = (data = [], lang, translate = () => {
}) => {
    return data.map((v) => {
        return {
            id: v.id,
            value: v?.name,
            label: v?.name,
            key: v?.name,
        }
    })
}


export const TransFormUsersForSelect = (data = [], lang, translate = () => {
}) => {
    return data.map((v) => {
        return {
            id: v?.userId,
            value: v?.firstName + v?.lastName,
            label: v?.userId,
            key: v?.userId,
            dto:{
                ...v
            }
        }
    })
}


// {language === "en" ? row?.districtName?.name : ""}
// {language === "ru" ? row?.districtName?.nameRussian : ""}
// {language === "uz" ? row?.districtName?.nameUzLatin : ""}
