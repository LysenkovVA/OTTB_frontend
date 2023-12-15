import { IAuth } from "@/features/auth/model/types/IAuth";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import axios from "axios";

const $publicApi = axios.create({
    baseURL: __API__,
    // Чтобы куки цеплялись автоматически
    withCredentials: true,
});

const $api = axios.create({
    baseURL: __API__,
    // Чтобы куки цеплялись автоматически
    withCredentials: true,
});

/**
 * К каждому запросу добавляем авторизацию
 */
$api.interceptors.request.use(
    (config) => {
        const data = localStorage.getItem(USER_LOCALSTORAGE_KEY);

        if (data) {
            const accessToken = JSON.parse(data).accessToken;

            if (accessToken) {
                config.headers.set("Authorization", `Bearer ${accessToken}`);
                // console.log(
                //     "AXIOS (onFulfilled): Authorization header is set successfully!",
                // );
            }
        }

        return config;
    },
    (error) => {
        console.log("AXIOS onRejected: " + error);
        return Promise.reject(error);
    },
);

$api.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        // Исходный запрос, который надо повторить
        const originalRequest = error.config;

        // Если access токен закончился
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            // Чтобы не войти в бесконечный цикл
            // повторному запросу устанавливаем флаг
            originalRequest._isRetry = true;
            try {
                console.log("JWT Expired. Refreshing token...");

                // Обновляем access токен
                const response = await $publicApi.get<IAuth>("/auth/refresh");

                // Если токен обновился
                if (response.status === 200) {
                    // Записываем токен в локалсторадж
                    localStorage.setItem(
                        USER_LOCALSTORAGE_KEY,
                        JSON.stringify({
                            user: response.data.user,
                            accessToken: response.data.accessToken,
                        }),
                    );
                }

                // Повторяем наш запрос еще раз
                return await $api.request(originalRequest);
            } catch (e) {
                // Refresh токен умер!
                // Удаляем ключ из локалстораджа
                localStorage.removeItem(USER_LOCALSTORAGE_KEY);
                // Переходим на страницу авторизации
                window.location.href = RoutePath.login;
            }
        }

        // throw???
        return await Promise.reject(error);
    },
);

export { $api, $publicApi };
