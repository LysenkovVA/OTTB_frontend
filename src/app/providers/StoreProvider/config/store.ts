import { userReducer } from "@/entities/User/model/slice/userSlice";
import { UIReducer } from "@/features/UI";
import { $api } from "@/shared/api/axios";
import {
    CombinedState,
    Reducer,
    ReducersMapObject,
    configureStore,
} from "@reduxjs/toolkit";
import { StateSchema, ThunkExtraArg } from "./StateSchema";
import { createReducerManager } from "./reducerManager";

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        userSchema: userReducer,
        ui: UIReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    // TODO:  убрал тут дженерик configureStore<StateSchema> чтобы не ругалось на middleware
    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        // Отключаем devtools для production
        devTools: __IS_DEV__,
        preloadedState: initialState,
        // Чтобы использовать аргумент extra в thunkApi
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
                serializableCheck: {
                    // Исправление ошибки в консоли, значение было
                    // not serializable
                    ignoredActionPaths: ["meta.arg", "payload"],
                },
            }),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

// Типизированные dispatch и getState
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
export type RootState = ReturnType<typeof createReduxStore>["getState"];
