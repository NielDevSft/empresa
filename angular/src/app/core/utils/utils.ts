import { Md5 } from "ts-md5";

export const Utils = () => {
  const encrypt = (value: string) => {
    const md5 = new Md5();
    md5.appendStr(value);
    return md5.end()?.toString() || "";
  };
  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
  };

  // Função para criar um objeto Date a partir de uma string no formato "yyyy/MM/dd"
  const createDateFromString = (dateString: string): Date | null => {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return new Date(year, month, day);
      }
    }
    return null;
  };

  return { encrypt, formatDateToString, createDateFromString };
};
