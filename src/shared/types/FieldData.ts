/**
 * Поле формы
 */
export interface FieldData {
    name: string | number | Array<string | number>;
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}
