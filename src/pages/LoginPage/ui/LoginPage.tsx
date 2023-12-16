import { ReduxStoreWithManager } from "@/app/providers/StoreProvider";
import { StateSchemaKey } from "@/app/providers/StoreProvider/config/StateSchema";
import { getUser } from "@/entities/User";
import { Authorization } from "@/features/auth";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Flex } from "antd";
import { memo, useEffect } from "react";
import { useSelector, useStore } from "react-redux";

export interface LoginPageProps {
    className?: string;
}

const LoginPage = (props: LoginPageProps) => {
    const dispatch = useAppDispatch();
    const store = useStore() as ReduxStoreWithManager;
    const auth = useSelector(getUser);

    // Удаляем все редюсеры кроме нужных
    useEffect(() => {
        if (!auth.id) {
            const mountedReducers = store.reducerManager.getReducerMap();
            Object.entries(mountedReducers).forEach(
                ([stateSchemaKey, reducer]) => {
                    if (
                        stateSchemaKey !== "authSchema" &&
                        stateSchemaKey !== "userSchema" &&
                        stateSchemaKey !== "ui"
                    ) {
                        store.reducerManager.remove(
                            stateSchemaKey as StateSchemaKey,
                        );
                        dispatch({
                            type: `@DESTROY ${stateSchemaKey} reducer`,
                        });
                    }
                },
            );
        }
    }, [auth, dispatch, store, store.reducerManager]);

    return (
        <Flex justify={"center"} align={"center"}>
            <Authorization />
        </Flex>
    );
};

export default memo(LoginPage);
