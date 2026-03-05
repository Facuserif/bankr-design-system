import { cn } from "../../lib/utils";
import { Input, type InputProps } from "./input";

export interface TextFieldProps extends Omit<InputProps, "hasError"> {
  label?: string;
  helperText?: string;
  errorText?: string;
  hasError?: boolean;
}

function TextField({
  label,
  helperText,
  errorText,
  hasError = false,
  className,
  filled,
  ...inputProps
}: TextFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label ? <label className="text-sm-medium text-text-color-text">{label}</label> : null}
      <Input hasError={hasError} filled={filled} {...inputProps} />
      {hasError && errorText ? (
        <p className="text-sm text-text-color-text-error">{errorText}</p>
      ) : helperText ? (
        <p className="text-sm text-text-color-text-muted">{helperText}</p>
      ) : null}
    </div>
  );
}

export { TextField };
