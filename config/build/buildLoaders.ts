import webpack from "webpack";
import { buildBabelLoader } from "./loaders/buildBabelLoader";
import { buildFileLoader } from "./loaders/buildFileLoader";
import { buildSassLoader } from "./loaders/buildSassLoader";
import { buildSvgLoader } from "./loaders/buildSvgLoader";
import { buildTypeScriptLoader } from "./loaders/buildTypeScriptLoader";
import { BuildOptions } from "./types/config";

export function buildLoaders(
    options: BuildOptions,
): webpack.ModuleOptions["rules"] {
    const isDev = options.mode === "development";

    // Лоадер для SVG
    const svgLoader = buildSvgLoader(options);

    // Лоадер для файлов
    const fileLoader = buildFileLoader(options);

    // Лоадер для scss
    const sassLoader = buildSassLoader(isDev);

    // Babel лоадер
    const babelLoader = buildBabelLoader(options);

    const typeScriptLoader = buildTypeScriptLoader(options);

    /**
     * ВНИМАНИЕ! ПОРЯДОК ЛОАДЕРОВ ВАЖЕН!
     * Идем по цепочке снизу вверх
     */
    return [
        svgLoader,
        fileLoader,
        sassLoader,
        // typeScriptLoader,
        babelLoader,
    ];
}
