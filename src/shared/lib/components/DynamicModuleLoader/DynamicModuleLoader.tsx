import { ReduxStoreWithManager } from "@/app/providers/StoreProvider";
import { StateSchemaKey } from "@/app/providers/StoreProvider/config/StateSchema";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Reducer } from "@reduxjs/toolkit";
import { FC, ReactNode, useEffect } from "react";
import { useStore } from "react-redux";

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer;
};

// Для итерации по массиву, т.к. первый параметр стринговый
type ReducersListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
    children?: ReactNode;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const { children, reducers, removeAfterUnmount = true } = props;

    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useAppDispatch();

    useEffect(() => {
        const mountedReducers = store.reducerManager.getReducerMap();

        Object.entries(reducers).forEach(([stateSchemaKey, reducer]) => {
            const mounted = mountedReducers[stateSchemaKey as StateSchemaKey];

            // Если редюсер еще не вмонтирован, тогда добавляем
            if (!mounted) {
                store.reducerManager.add(
                    stateSchemaKey as StateSchemaKey,
                    reducer,
                );
                dispatch({ type: `@INIT ${stateSchemaKey} reducer` });
            }
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(
                    ([stateSchemaKey, reducer]) => {
                        store.reducerManager.remove(
                            stateSchemaKey as StateSchemaKey,
                        );
                        dispatch({
                            type: `@DESTROY ${stateSchemaKey} reducer`,
                        });
                    },
                );
            }
        };
    }, [dispatch, reducers, removeAfterUnmount, store.reducerManager]);

    return <>{children}</>;
};
