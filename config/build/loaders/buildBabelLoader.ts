import { BuildOptions } from "../types/config";

export function buildBabelLoader({ mode }: BuildOptions) {
    const isDev = mode === "development";

    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                // Все настройки пресетов можно указывать прям здесь, без
                // использования конфигурационных файлов, поскольку используется
                // webpack
                presets: [
                    "@babel/preset-env",
                    [
                        "@babel/preset-react",
                        {
                            runtime: isDev ? "automatic" : "classic",
                        },
                    ],
                    "@babel/preset-typescript",
                ],
            },
        },
    };
}
