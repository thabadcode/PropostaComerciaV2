import { useState } from "react";

export type Validator<T> = (value: T) => string | null;

export function useFormField<T>(
    initial: T,
    validate: Validator<T> = () => null
) {
    const [value, setValue] = useState<T>(initial);
    const [isTouched, setIsTouched] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const errorMsg = validate(value);
    const isValid = errorMsg === null
    const showError = !isValid && isTouched && !isFocused

    return {
        value, setValue, 
        isValid, errorMsg, showError,
        onFocus: () => setIsFocused(true),
        onBlur: () => { setIsFocused(false); setIsTouched(true); },
        touch: () => setIsTouched(true),
        reset: () => { setValue(initial); setIsTouched(false); setIsFocused(false); }
    };
}