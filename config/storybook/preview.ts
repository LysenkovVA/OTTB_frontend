import { StyleDecorator } from "@/shared/config/storybook/StyleDecorator/StyleDecorator";
import type { Preview } from "@storybook/react";

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    // Декораторы для всех историй
    decorators: [
        // Стили
        (Story) => StyleDecorator(Story),
    ],
};

export default preview;
