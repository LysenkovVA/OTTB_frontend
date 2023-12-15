import { BuildOptions } from "../types/config";

export function buildFileLoader(options: BuildOptions) {
    return {
        // SVG тут не обрабатывать!
        test: /\.(png|jpe?g|gif|ico)$/i,
        use: [
            {
                loader: "file-loader",
            },
        ],
    };
}
