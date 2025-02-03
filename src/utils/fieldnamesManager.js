import React from "react";
import { useLanguage } from "../context/LanguageContext";

// Mutaxassisliklar ro'yxati
const specializations = [
  { id: 2, value: "NEUROLOGIST", label: "NEUROLOGIST" },
  { id: 3, value: "SURGEON", label: "SURGEON" },
  { id: 4, value: "PEDIATRICIAN", label: "PEDIATRICIAN" },
  { id: 5, value: "OPHTHALMOLOGIST", label: "OPHTHALMOLOGIST" },
  { id: 6, value: "DERMATOLOGIST", label: "DERMATOLOGIST" },
  { id: 7, value: "ENDOCRINOLOGIST", label: "ENDOCRINOLOGIST" },
  { id: 8, value: "GASTROENTEROLOGIST", label: "GASTROENTEROLOGIST" },
  { id: 9, value: "TRAUMATOLOGIST", label: "TRAUMATOLOGIST" },
  // { id: 10, value: "NONE", label: "NONE" },
];

const FieldnamesManager = () => {
  const { translate } = useLanguage();

  // Tarjima qilingan mutaxassisliklar ro'yxati
  const translatedSpecializations = specializations.map((spec) => ({
    ...spec,
    value: translate(spec.label), // Har bir label ni tarjima qilish
  }));

  return translatedSpecializations;
};
export { specializations };
export default FieldnamesManager;
