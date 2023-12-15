import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { BuildOptions } from "./types/config";

export function buildPlugins(
    options: BuildOptions,
): webpack.Configuration["plugins"] {
    const { paths, apiUrl, project_env, mode, platform } = options;

    const isDev = mode === "development";
    const isProd = mode === "production";

    const plugins: webpack.Configuration["plugins"] = [
        // Встраиваем скрипты в файл шаблон
        new HtmlWebpackPlugin({
            template: paths.html,
            publicPath: "/", // Без этого ссылка на иконку косячит
            favicon: path.resolve(paths.public, "favicon.ico"),
        }),

        // Определяем глобальные константы, которые используются в коде
        // на этапе сборки
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __PLATFORM__: JSON.stringify(platform),
            __API__: JSON.stringify(apiUrl),
            __PROJECT_ENV__: JSON.stringify(project_env),
        }),
    ];

    // Плагины для режима Development
    if (isDev) {
        // Показываем прогресс сборки (не рекомендуется в Production, т.к. может сильно замедлять сборку)
        plugins.push(new webpack.ProgressPlugin());

        // Моментальные изменения при разработке без перезагрузки страницы
        plugins.push(new webpack.HotModuleReplacementPlugin());

        // Отдельный процесс на проверку типов
        // !!! Если использовать режим сборки, не забудь про флаг transpileOnly в лоадере ts-loader
        plugins.push(new ForkTsCheckerWebpackPlugin());

        // Плагин для обновления содержимого БЕЗ перезагрузки страницы
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    // Плагины для режима Production
    if (isProd) {
        // Генерим отдельно CSS для каждого TS-файла
        plugins.push(
            new MiniCssExtractPlugin({
                // Куда будут сохраняться файлы CSS и как будут называться
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[contenthash:8].css",
            }),
        );
        // Анализ бандла
        plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: true }));
    }

    return plugins;
}
