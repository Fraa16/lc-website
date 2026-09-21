import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

export type FieldTone = 'dark' | 'light';

const controlBase =
  'w-full rounded-xl border px-4 py-3 text-body-sm ' +
  'transition-[border-color,box-shadow] duration-200 ease-brand ' +
  'focus:outline-none focus-visible:outline-none';

const controlTone = {
  dark: 'bg-navy-3 text-sheet-1 placeholder:text-white/30',
  light: 'bg-white text-ink-1 placeholder:text-navy/40',
} as const;

const controlState = (invalid: boolean, tone: FieldTone) => {
  if (invalid) {
    return tone === 'dark'
      ? 'border-danger/70 focus:border-danger focus:shadow-[0_0_0_3px_rgb(224_100_95_/_0.18)]'
      : 'border-danger-ink/60 focus:border-danger-ink focus:shadow-[0_0_0_3px_rgb(176_47_42_/_0.14)]';
  }
  return tone === 'dark'
    ? 'border-white/12 hover:border-white/20 focus:border-gold-light focus:shadow-[0_0_0_3px_rgb(220_195_131_/_0.18)]'
    : 'border-navy/15 hover:border-navy/25 focus:border-gold focus:shadow-[0_0_0_3px_rgb(182_143_64_/_0.22)]';
};

const labelTone = {
  dark: 'text-sheet-2',
  light: 'text-ink-2',
} as const;

const hintTone = {
  dark: 'text-sheet-3',
  light: 'text-ink-3',
} as const;

const errorTone = {
  dark: 'text-danger',
  light: 'text-danger-ink',
} as const;

const markerTone = {
  dark: 'text-gold-light',
  light: 'text-gold-deep',
} as const;

interface LabelShellProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  tone: FieldTone;
  className?: string;
  children: ReactNode;
}

function LabelShell({ id, label, required, error, hint, tone, className, children }: LabelShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className={cx('mb-2 block text-caption font-medium', labelTone[tone])}>
        {label}
        {required && (
          <>
            <span aria-hidden="true" className={markerTone[tone]}>
              {' '}
              *
            </span>
            <span className="sr-only"> (Pflichtfeld)</span>
          </>
        )}
      </label>

      {children}

      {hint && !error && (
        <p id={`${id}-hint`} className={cx('mt-1.5 text-caption', hintTone[tone])}>
          {hint}
        </p>
      )}

      {/* Errors are announced, not just coloured — the previous build relied
          on a red ring alone, which a screen reader never reports. */}
      {error && (
        <p id={`${id}-error`} className={cx('mt-1.5 text-caption', errorTone[tone])} role="alert">
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
  tone?: FieldTone;
  wrapperClassName?: string;
}

export function TextField({
  id,
  label,
  error,
  hint,
  required,
  tone = 'dark',
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
      tone={tone}
      className={wrapperClassName}
    >
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cx(controlBase, controlTone[tone], controlState(Boolean(error), tone))}
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
  tone?: FieldTone;
  wrapperClassName?: string;
}

export function SelectField({
  id,
  label,
  error,
  options,
  placeholder,
  required,
  tone = 'dark',
  wrapperClassName,
  ...rest
}: SelectFieldProps) {
  return (
    <LabelShell
      id={id}
      label={label}
      required={required}
      error={error}
      tone={tone}
      className={wrapperClassName}
    >
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cx(
          controlBase,
          controlTone[tone],
          controlState(Boolean(error), tone),
          tone === 'dark' ? 'lc-select' : 'lc-select lc-select-light'
        )}
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
