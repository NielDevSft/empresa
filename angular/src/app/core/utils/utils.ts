import { Md5 } from "ts-md5";

export const Utils = () => {
  const encrypt = (value: string) => {
    const md5 = new Md5();
    md5.appendStr(value);
    return md5.end()?.toString() || "";
  };
  return { encrypt };
};
