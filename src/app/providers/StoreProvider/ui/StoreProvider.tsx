import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { createReduxStore } from "@/app/providers/StoreProvider/config/store";
import { ReducersMapObject } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { Provider } from "react-redux";

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: StateSchema;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState, asyncReducers } = props;

    const store = createReduxStore(
        initialState,
        asyncReducers as ReducersMapObject<StateSchema>,
    );

    return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
