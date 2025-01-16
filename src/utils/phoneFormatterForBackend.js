export const formatPhoneNumberForBackend = (phoneNumber) => {
  // Telefon raqamidan faqat raqamlarni ajratib olish
  const cleanedNumber = phoneNumber.replace(/\D/g, "");

  // Country code
  const countryCode = cleanedNumber.substring(0, 3); // "998"

  // Area and local number
  const areaAndLocal = cleanedNumber.substring(3); // "978222427"

  // Return three formats
  return {
    phonePrefix: countryCode,
    phoneNumber: areaAndLocal,
    number: countryCode + areaAndLocal,
  };
};
