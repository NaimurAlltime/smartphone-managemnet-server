export const convertDate = (inputDate: string): string => {
  const date = new Date(inputDate);
  // Customize the date format based on your requirements
  const formattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  return formattedDate;
};
