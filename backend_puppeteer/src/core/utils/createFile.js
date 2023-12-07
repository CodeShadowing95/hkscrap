module.exports.createCSVFile = () => {
  const text = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let idFile = "";

  for(let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * text.length);
    idFile += text.charAt(randomIndex);
  }

  return `hkscrape_${idFile}`;
}