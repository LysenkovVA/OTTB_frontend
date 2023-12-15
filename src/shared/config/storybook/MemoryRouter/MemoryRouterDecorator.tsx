import { MemoryRouter, Route, Routes } from "react-router-dom";

export const MemoryRouterDecorator = (
    initialEntry: string,
    path: string,
    Story: any,
) => (
    <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
            <Route path={path} element={<Story />} />
        </Routes>
    </MemoryRouter>
);
