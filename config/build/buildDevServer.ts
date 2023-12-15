import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/config";

// ПРИ ИЗМЕНЕНИИ КОНФИГА - ПЕРЕЗАГРУЖАЙ СЕРВАК!

/**
 * Ребилд при изменении в коде
 * @param options
 */
export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    // Другие опции:
    // https://github.com/webpack/webpack-dev-server

    return {
        port: options.port ?? 3000,
        // Открывает в браузере страницу с приложением
        open: true,
        // Allows to proxy requests through a specified index page (by default 'index.html'),
        // useful for Single Page Applications that utilise the HTML5 History API.
        historyApiFallback: true,
        // Обновление страницы при изменении в коде
        hot: true,
    };
}
