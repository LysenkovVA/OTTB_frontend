export type BuildMode = "development" | "production";
export type BuildPlatform = "mobile" | "desktop";

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    public: string;
    src: string;
    node_modules: string;
}

export interface EnvVariables {
    mode?: BuildMode;
    port?: number;
    apiUrl?: string;
    platform?: BuildPlatform;
}

export interface BuildOptions {
    mode: BuildMode;
    platform: BuildPlatform;
    paths: BuildPaths;
    port: number;
    apiUrl: string;
    // Переменная для настройки конкретной среды
    project_env: "frontend" | "storybook" | "jest";
}
