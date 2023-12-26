export type { Berth } from "@/entities/Berth/model/types/Berth";
export * from "./model/selectors/berthSelectors";
export { getBerth } from "./model/services/getBerth/getBerth";
export {
    berthDetailsActions,
    berthDetailsReducer,
} from "./model/slice/berthDetailsSlice";
export type { BerthDetailsSchema } from "./model/types/BerthDetailsSchema";
