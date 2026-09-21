import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

const controlBase =
  'w-full rounded-xl border bg-navy-overlay px-4 py-3 text-body-sm text-sheet-1 ' +
  'transition-[border-color,box-shadow] duration-200 ease-brand ' +
  'placeholder:text-white/30 focus:outline-none focus-visible:outline-none';

const controlState = (invalid: boolean) =>
  invalid
    ? 'border-danger/70 focus:border-danger focus:shadow-[0_0_0_3px_rgb(224_100_95_/_0.18)]'
    : 'border-white/12 hover:border-white/20 focus:border-gold-light focus:shadow-[0_0_0_3px_rgb(220_195_131_/_0.18)]';

interface LabelShellProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}

function LabelShell({ id, label, required, error, hint, className, children }: LabelShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-caption font-medium text-sheet-2">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-gold-light">
              {' '}
              *
            </span>
            <span className="sr-only"> (Pflichtfeld)</span>
          </>
        )}
      </label>

      {children}

      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-caption text-sheet-3">
          {hint}
        </p>
      )}

      {/* Errors are announced, not just coloured — the previous build relied
          on a red ring alone, which a screen reader never reports. */}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-caption text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
}

export function TextField({
  id,
  label,
  error,
  hint,
  required,
  wrapperClassName,
  ...rest
}: TextFieldProps) {
  return (
    <LabelShell
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
      className={wrapperClassName}
    >
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cx(controlBase, controlState(Boolean(error)))}
        {...rest}
      />
    </LabelShell>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  wrapperClassName?: string;
}

export function SelectField({
  id,
  label,
  error,
  options,
  placeholder,
  required,
  wrapperClassName,
  ...rest
}: SelectFieldProps) {
  return (
    <LabelShell id={id} label={label} required={required} error={error} className={wrapperClassName}>
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cx(controlBase, controlState(Boolean(error)), 'lc-select')}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </LabelShell>
  );
}

/**
 * Off-screen decoy field. Bots fill every input they find; humans never see
 * this one. The original forms had no spam protection whatsoever on a public
 * anon-insert endpoint.
 */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="lc-website-field">Website</label>
      <input
        id="lc-website-field"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
