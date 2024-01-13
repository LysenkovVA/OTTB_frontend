import {
    Workspace,
    WorkspaceForm,
    createWorkspace,
    fetchWorkspace,
    getWorkspaceDetailsForm,
    updateWorkspace,
    workspaceDetailsReducer,
} from "@/entities/Workspace";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { DropdownSelector } from "@/shared/ui/DropdownSelector/DropdownSelector";
import { ModalFormWrapper } from "@/shared/ui/ModalFormWrapper";
import { SelectProps } from "antd";
import { useForm } from "antd/es/form/Form";
import { memo, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
    getAllWorkspaces,
    getAllWorkspacesError,
    getAllWorkspacesIsInitialized,
    getAllWorkspacesIsLoading,
} from "../../model/selectors/allWorkspacesSelectors";
import { fetchAllWorkspaces } from "../../model/services/fetchAllWorkspaces/fetchAllWorkspaces";
import { allWorkspacesReducer } from "../../model/slice/allWorkspacesSlice";
import cls from "./WorkspaceSelector.module.scss";

type DDSelectorProps = Omit<
    SelectProps,
    "options" | "children" | "value" | "className"
>;

interface WorkspaceSelectorProps extends DDSelectorProps {
    className?: string;
    value: Workspace | undefined;
    onValueChanged: (value: Workspace | undefined) => void;
}

const reducers: ReducersList = {
    allWorkspacesSchema: allWorkspacesReducer,
};

const reducersModal: ReducersList = {
    workspaceDetailsSchema: workspaceDetailsReducer,
};

const convertWorkspaceToSelectObject = (item: Workspace | undefined) => {
    if (!item) {
        return [];
    }
    return [{ label: item.name, value: item.id }];
};

export const WorkspaceSelector = memo((props: WorkspaceSelectorProps) => {
    const { className, onValueChanged, value, ...otherProps } = props;

    const [form] = useForm();
    const [modalOpen, setModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const isInitialized = useSelector(getAllWorkspacesIsInitialized);
    const isLoading = useSelector(getAllWorkspacesIsLoading);
    const error = useSelector(getAllWorkspacesError);
    const workspaces = useSelector(getAllWorkspaces.selectAll);
    const workspaceDetails = useSelector(getWorkspaceDetailsForm);

    // Список
    const options = useMemo(() => {
        return workspaces.map((item) => {
            return { label: item.name, value: item.id };
        });
    }, [workspaces]);

    // Инициализация значений
    useInitialEffect(() => {
        if (!isInitialized) {
            dispatch(
                fetchAllWorkspaces({
                    replaceData: true,
                }),
            );
        }
    });

    // Изменение значений селектора
    const onChanged = useCallback(
        (id: string | undefined) => {
            if (!id) {
                onValueChanged(undefined);
            }

            const item = workspaces.find((item) => item.id === id);

            if (item) {
                // Пробрасываем наверх значение
                onValueChanged(item);
            }
        },
        [workspaces, onValueChanged],
    );

    const onAdd = useCallback(() => {
        setModalOpen(true);
    }, []);

    const onEdit = useCallback(() => {
        if (value?.id) {
            dispatch(fetchWorkspace({ id: value?.id }));
            setModalOpen(true);
        } else {
            alert("Рабочее пространство не выбрано!");
        }
    }, [dispatch, value?.id]);

    const onSave = useCallback(async () => {
        if (workspaceDetails) {
            if (!workspaceDetails.id) {
                // Создаем новую организацию
                const res = await dispatch(
                    createWorkspace({
                        data: workspaceDetails,
                    }),
                ).unwrap();

                // Устанавливаем в качестве нового значения
                onValueChanged?.(res);
            } else {
                // Обновляем
                await dispatch(
                    updateWorkspace({
                        id: workspaceDetails.id,
                        data: workspaceDetails,
                    }),
                );
            }

            // Закрываем окно
            setModalOpen(false);
        }
    }, [dispatch, onValueChanged, workspaceDetails]);

    return (
        <div className={classNames(cls.WorkspaceSelector, {}, [className])}>
            <ModalFormWrapper
                form={form}
                title={
                    workspaceDetails?.id
                        ? `${workspaceDetails.name}`
                        : "Новое рабочее пространство"
                }
                isVisible={modalOpen}
                onCancel={() => setModalOpen(false)}
                onSave={onSave}
            >
                <DynamicModuleLoader reducers={reducersModal}>
                    <WorkspaceForm form={form} />
                </DynamicModuleLoader>
            </ModalFormWrapper>
            <DropdownSelector
                reducers={reducers}
                value={convertWorkspaceToSelectObject(value)}
                isLoading={isLoading}
                onValueChanged={onChanged}
                options={options}
                error={error}
                // onAdd={onAdd}
                onEdit={onEdit}
                disabled={isLoading || !!error}
                {...otherProps}
            />
        </div>
    );
});
