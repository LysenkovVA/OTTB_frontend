export * from "./model/selectors/berthTypeSelectors";
export { getBerthType } from "./model/services/getBerthType/getBerthType";
export {
    berthTypeDetailsActions,
    berthTypeDetailsReducer,
} from "./model/slice/berthTypeDetailsSlice";
export type { BerthType } from "./model/types/BerthType";
export type { BerthTypeDetailsSchema } from "./model/types/BerthTypeDetailsSchema";
