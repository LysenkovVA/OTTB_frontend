import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildSassLoader(isDev: boolean) {
    return {
        test: /\.(sc|sa|c)ss$/,
        use: [
            // Генерируем файлы CSS отдельно для для Production
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            {
                loader: "css-loader",
                options: {
                    esModule: true,
                    // Включаем изоляцию модулей для CSS стилей
                    modules: {
                        // auto: (resPath: string) =>
                        //     Boolean(resPath.includes(".module.")),

                        // auto: true,
                        // Имена стилей для разных режимов сборки:
                        localIdentName: isDev
                            ? "[path][name]__[local]--[hash:base64:5]" // Dev - понятное имя
                            : "[hash:base64:8]", // Prod - Хеш
                    },
                },
            },
            // Compiles Sass to CSS
            "sass-loader",
        ],
    };
}
