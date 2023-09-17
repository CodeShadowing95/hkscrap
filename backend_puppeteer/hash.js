import bcrypt from "bcrypt";

export const hashPassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

export const generateSalt = async () => {
  return await bcrypt.genSalt();
};

export const validatePassword = async (enteredPassword, savedPassword) => {
  return await bcrypt.compare(enteredPassword, savedPassword);
};
