import dayjs from "dayjs";

export class DateConverter {
    static DATE_FORMATS: string[] = ["DD.MM.YYYY", "YYYY-MM-DD"];

    static toString(date: Date | undefined) {
        if (!date) {
            return "";
        }

        return date.toLocaleDateString("ru-RU", { dateStyle: "short" });
    }

    static fromString(date: string) {
        if (!date) {
            return 0;
        }

        return dayjs(date, this.DATE_FORMATS).format("DD.MM.YYYY");
    }
}
