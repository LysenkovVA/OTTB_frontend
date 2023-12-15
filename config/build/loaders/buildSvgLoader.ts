import { BuildOptions } from "../types/config";

export function buildSvgLoader(options: BuildOptions) {
    return {
        test: /\.svg$/,
        use: [
            {
                loader: "@svgr/webpack",
                options: {
                    icon: true, // Позволяет работать как с иконками (например, менять размеры)
                    // Чтобы работать с изменением цветов иконки
                    svgoConfig: {
                        plugins: [
                            {
                                name: "convertColors",
                                params: {
                                    currentColor: true,
                                },
                            },
                        ],
                    },
                },
            },
        ],
    };
}
