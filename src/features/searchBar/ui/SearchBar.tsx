import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";
import { Input } from "antd";
import { memo, useCallback } from "react";

interface SearchBarProps<T> {
    className?: string;
    placeholder?: string;
    currentSearchQuery: T;
    onChangeValue: (value: T) => void;
    searchCallbackForDebounce: (...args: any[]) => void;
}

const DEBOUNCE_DELAY = 1000;

export const SearchBar = memo((props: SearchBarProps<string>) => {
    const {
        className,
        currentSearchQuery,
        onChangeValue,
        placeholder,
        searchCallbackForDebounce,
    } = props;

    const debouncedFetchData = useDebounce(
        searchCallbackForDebounce,
        DEBOUNCE_DELAY,
    );

    const onChange = useCallback(
        (value: string) => {
            onChangeValue?.(value);
            debouncedFetchData();
        },
        [debouncedFetchData, onChangeValue],
    );

    return (
        <Input
            autoFocus
            allowClear
            id={"searchBarInput"}
            placeholder={placeholder ?? "Поиск..."}
            value={currentSearchQuery}
            onChange={(e) => onChange(e.target.value)}
        />
    );
});
