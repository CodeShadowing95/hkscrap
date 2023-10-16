const bcrypt = require("bcrypt");

module.exports.hashPassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.generateSalt = async () => {
  return await bcrypt.genSalt();
}

module.exports.validatePassword = async (enteredPassword, savedPassword) => {
  return await bcrypt.compare(enteredPassword, savedPassword);
  // const hashedPassword = await hashPassword(enteredPassword, 10);
  // return await bcrypt.compare(hashedPassword, savedPassword);
};

module.exports.generateTempId = () => {
  const text = "abcdefghijklmnopqrstuvwxyz0123456789";
  let tempId = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * text.length);
    tempId += text.charAt(randomIndex);
  }

  return tempId;
}