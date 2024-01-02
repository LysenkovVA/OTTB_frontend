import {
    getInspectionDetails,
    getInspectionDetailsError,
    getInspectionDetailsIsInitialized,
    getInspectionDetailsIsLoading,
} from "@/entities/Inspection/model/selectors/inspectionDetailsSelectors";
import { getInspection } from "@/entities/Inspection/model/services/getInspection/getInspection";
import {
    inspectionDetailsActions,
    inspectionDetailsReducer,
} from "@/entities/Inspection/model/slice/inspectionDetailsSlice";
import { EditInspection } from "@/features/Inspections/editInspection";
import { removeInspection } from "@/features/Inspections/inspectionsInfiniteList/model/services/removeInspection/removeInspection";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { ErrorInfo } from "@/shared/ui/ErrorInfo/ErrorInfo";
import { ViewWrapper } from "@/shared/ui/ViewWrapper";
import { InspectionDetailsView } from "@/widgets/InspectionDetails/ui/InspectionDetailsView/InspectionDetailsView";
import { Skeleton } from "antd";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export interface InspectionDetailsProps {
    className?: string;
}

const reducers: ReducersList = {
    inspectionDetailsSchema: inspectionDetailsReducer,
};

export const InspectionDetails = memo((props: InspectionDetailsProps) => {
    const { className } = props;

    const { id: inspectionId } = useParams<{ id: string }>();

    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getInspectionDetailsIsLoading);
    const error = useSelector(getInspectionDetailsError);
    const isInitialized = useSelector(getInspectionDetailsIsInitialized);
    const inspectionDetails = useSelector(getInspectionDetails);

    useInitialEffect(() => {
        if (!isInitialized && !isLoading && inspectionId) {
            dispatch(getInspection({ id: inspectionId }));
        }
    });

    const onCancel = useCallback(() => {
        if (inspectionDetails) {
            dispatch(inspectionDetailsActions.setFormData(inspectionDetails));
        }

        setIsEditMode(false);
    }, [dispatch, inspectionDetails]);

    const onDelete = useCallback(() => {
        if (inspectionId) {
            try {
                dispatch(removeInspection({ id: inspectionId }));
                navigate(-1);
            } catch {}
        }
    }, [dispatch, navigate, inspectionId]);

    const skeletonContent = <Skeleton active />;

    const errorContent = (
        <ErrorInfo status={"error"} title={error} subtitle={""} />
    );

    const viewContent = inspectionDetails ? (
        <ViewWrapper
            title={`${inspectionDetails?.date?.toDateString()}`}
            deleteText={`Удалить ${inspectionDetails?.date?.toDateString()}?`}
            onEditClick={() => {
                setIsEditMode(true);
            }}
            onDeleteClick={onDelete}
        >
            <InspectionDetailsView inspection={inspectionDetails} />
        </ViewWrapper>
    ) : null;

    const editContent = (
        <EditInspection
            onUpdated={() => {
                setIsEditMode(false);
                navigate(-1);
            }}
            onCanceled={onCancel}
        />
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            {isLoading
                ? skeletonContent
                : error
                ? errorContent
                : isEditMode
                ? editContent
                : viewContent}
        </DynamicModuleLoader>
    );
});
