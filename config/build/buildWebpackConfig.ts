import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/config";

export function buildWebpackConfig(
    options: BuildOptions,
): webpack.Configuration {
    const { mode, paths } = options;

    const isDev = mode === "development";

    return {
        mode,
        entry: paths.entry,
        module: {
            strictExportPresence: true,
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        output: {
            // Кешируем изменения
            filename: "[name].[contenthash].js",
            path: paths.build,
            // Очистка папки от файлов во время сборки
            clean: true,
            // Чтобы не грузились в качестве пути всевозможные
            // чанки и прочая хрень
            publicPath: "/",
        },
        // Карты исходного кода (source-map), нужно для дебага
        devtool: isDev ? "eval-cheap-source-map" : "source-map",
        // Dev server
        devServer: isDev ? buildDevServer(options) : undefined,
        plugins: buildPlugins(options),
        // TODO: Эта опция включена, чтобы не было предупреждения в модуле sass
        // Там какой-то глюк с совместимостью
        ignoreWarnings: [() => true],
    };
}
