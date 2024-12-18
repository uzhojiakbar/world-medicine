export const SecretText = (password) => {
  if (typeof password !== "string" || password.length === 0) {
    return "";
  }
  return "*".repeat(password.length);
};
