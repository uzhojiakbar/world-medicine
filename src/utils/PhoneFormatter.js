export const formatPhoneNumber = (phoneNumber) => {
  phoneNumber = `${phoneNumber}`;
  if (phoneNumber.length) {
    const cleaned = phoneNumber.replace(/\D/g, "");

    const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);

    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`;
    }

    return phoneNumber;
  }
};

export function formatSum(number) {
  let cleanNumber = `${number}`.replace(/\D/g, ""); // Faqat raqamlarni saqlash
  return cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}