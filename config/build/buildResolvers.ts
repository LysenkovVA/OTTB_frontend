import webpack from "webpack";
import { BuildOptions } from "./types/config";

export function buildResolvers(
    options: BuildOptions,
): webpack.Configuration["resolve"] {
    return {
        // Расширения, которые не добавляются при импорте
        // ВНИМАНИЕ! ПОРЯДОК В МАССИВЕ ВАЖЕН!
        extensions: [".tsx", ".ts", ".js"],
        preferAbsolute: true,
        modules: [options.paths.src, "node_modules"],
        // Главный файл для модуля
        mainFiles: ["index"],
        // Алиас для замены пути к папке src
        alias: { "@": options.paths.src },
    };
}
