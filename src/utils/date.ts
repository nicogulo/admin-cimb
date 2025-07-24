/* eslint-disable import/prefer-default-export */
import dayjs, { Dayjs } from "dayjs";
import localeData from "dayjs/plugin/localeData";

import "dayjs/locale/id";
import { LanguagesCode } from "@/config/i18n";

export const formatDate = (
  date: number | Date | string | Dayjs | null,
  format: string,
  locale: LanguagesCode = "en"
): string => {
  dayjs.extend(localeData);

  if (typeof date === "number") {
    const { length } = date.toString();

    if (length === 10) {
      return dayjs.unix(date).format(format);
    }
  }

  return dayjs(date).locale(locale).format(format);
};

export const FormatDateTime = (datetimeString: string): string => {
  if (datetimeString === "" || datetimeString === null) {
    return "";
  }
  const date = new Date(datetimeString);

  // Convert date to 'Asia/Jakarta' time zone manually
  const jakartaDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  );

  // Extract components from the date
  const year = jakartaDate.getFullYear();
  const month = (jakartaDate.getMonth() + 1).toString().padStart(2, "0");
  const day = jakartaDate.getDate().toString().padStart(2, "0");
  const hours = jakartaDate.getHours().toString().padStart(2, "0");
  const minutes = jakartaDate.getMinutes().toString().padStart(2, "0");
  const seconds = jakartaDate.getSeconds().toString().padStart(2, "0");

  // Format the date and time
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} WIB`;
};
