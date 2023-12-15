import * as path from "path";
import * as webpack from "webpack";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import {
    BuildMode,
    BuildPaths,
    EnvVariables,
} from "./config/build/types/config"; //to access built-in plugins

function getApiUrl(mode: BuildMode, apiUrl?: string) {
    if (apiUrl) {
        return apiUrl;
    }
    if (mode === "production") {
        return "/api";
    }

    // Backend
    return "http://localhost:5001/api/";
}

// Чтобы получать переменные окружения из скриптов возвращаем
// не сам конфиг, а функцию, которая возвращает конфиг
export default (env: EnvVariables): webpack.Configuration => {
    // Основные пути
    const paths: BuildPaths = {
        // Точка входа в приложение
        entry: path.resolve(__dirname, "src", "index.tsx"),
        // Куда происходит сборка
        build: path.resolve(__dirname, "dist"),
        html: path.resolve(__dirname, "public", "index.html"),
        public: path.resolve(__dirname, "public"),
        src: path.resolve(__dirname, "src"),
        node_modules: path.resolve(__dirname, "node_modules"),
    };

    return buildWebpackConfig({
        mode: env?.mode ?? "development",
        platform: env?.platform ?? "desktop",
        port: env?.port ?? 3000,
        paths,
        apiUrl: getApiUrl(env?.mode ?? "development", env?.apiUrl),
        project_env: "frontend",
    });
};
