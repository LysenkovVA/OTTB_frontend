export * from "./model/selectors/inspectionTypeSelectors";
export { getInspectionType } from "./model/services/getInspectionType/getInspectionType";
export {
    inspectionTypeDetailsActions,
    inspectionTypeDetailsReducer,
} from "./model/slice/inspectionTypeDetailsSlice";
export type { InspectionType } from "./model/types/InspectionType";
export type { InspectionTypeDetailsSchema } from "./model/types/InspectionTypeDetailsSchema";
