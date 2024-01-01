export type { CertificateType } from "@/entities/CertificateType/model/types/CertificateType";
export * from "./model/selectors/certificateTypeSelectors";
export { getCertificateType } from "./model/services/getCertificateType/getCertificateType";
export {
    certificateTypeDetailsActions,
    certificateTypeDetailsReducer,
} from "./model/slice/certificateTypeDetailsSlice";
export type { CertificateTypeDetailsSchema } from "./model/types/CertificateTypeDetailsSchema";
