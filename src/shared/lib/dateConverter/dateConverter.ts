import dayjs from "dayjs";

export class DateConverter {
    static DATE_FORMATS: string[] = ["DD.MM.YYYY", "YYYY-MM-DD"];

    static toString(date: dayjs.Dayjs | null) {
        if (!date) {
            return "";
        }

        return date.toISOString();
        //return date.toLocaleDateString("ru-RU", { dateStyle: "short" });
    }

    static fromString(date: string | undefined) {
        if (!date) {
            return null;
        }

        return dayjs(date, this.DATE_FORMATS);
    }
}
