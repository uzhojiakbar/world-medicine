export const transformRegionsForSelect = (regions = [], lang = "eng") => {
  return regions.map((region) => ({
    value: (function name(params) {
      if (lang === "ru") return region?.nameRussian;
      else if (lang === "en") return region?.name;
      else if (lang === "uz") return region?.nameUzLatin;
      else return region?.nameRussian;
    })(),
    label: region.name,
    id: region?.id,
    districts: region.districts.map((district) => ({
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

// {language === "en" ? row?.districtName?.name : ""}
// {language === "ru" ? row?.districtName?.nameRussian : ""}
// {language === "uz" ? row?.districtName?.nameUzLatin : ""}
