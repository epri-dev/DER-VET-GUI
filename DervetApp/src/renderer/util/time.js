export const getCurrentYear = () => new Date().getFullYear();

export const pullDateFromDateTime = (text) => {
  const yearList = text.match(/\d{4}-\d{2}-\d{2}/g);
  if (yearList.length) {
    return yearList[0];
  }
  return 0;
};
