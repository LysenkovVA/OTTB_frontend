import ReactRefreshTypeScript from "react-refresh-typescript";
import { BuildOptions } from "../types/config";

export function buildTypeScriptLoader({ mode }: BuildOptions) {
    const isDev = mode === "development";

    return {
        test: /\.tsx?$/,
        use: [
            {
                loader: "ts-loader",
                options: {
                    // Опция для HMR, чтобы не обновлялась страница
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(
                            Boolean,
                        ),
                    }),
                    transpileOnly: isDev, // ускорение сборки
                },
            },
        ],
        exclude: /node_modules/,
    };
}
