'use client';
import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
  as?: 'input' | 'textarea' | 'select';
  options?: (SelectOption | string)[];
  id?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export function Field({
  label,
  hint,
  error,
  as = 'input',
  options = [],
  id,
  style = {},
  ...rest
}: FieldProps) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const controlStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    color: 'var(--text-dark)',
    background: 'var(--white)',
    border: `1.5px solid ${error ? 'var(--danger)' : focus ? 'var(--blue)' : 'var(--border)'}`,
    borderRadius: 'var(--r-md)',
    padding: as === 'textarea' ? '12px 14px' : '11px 14px',
    outline: 'none',
    boxShadow: focus ? '0 0 0 3px var(--focus-ring)' : 'none',
    transition: 'border-color var(--t-fast), box-shadow var(--t-fast)',
    boxSizing: 'border-box' as const,
    resize: as === 'textarea' ? 'vertical' as const : undefined,
    minHeight: as === 'textarea' ? 100 : undefined,
    appearance: as === 'select' ? 'none' as const : undefined,
    ...style,
  };

  const sharedHandlers = {
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label htmlFor={fieldId} style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dark)' }}>
          {label}
        </label>
      )}
      {as === 'textarea' ? (
        <textarea id={fieldId} style={controlStyle} {...sharedHandlers} {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : as === 'select' ? (
        <select id={fieldId} style={controlStyle} {...sharedHandlers} {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}>
          {options.map((o) => {
            const val = typeof o === 'string' ? o : o.value;
            const lbl = typeof o === 'string' ? o : o.label;
            return <option key={val} value={val}>{lbl}</option>;
          })}
        </select>
      ) : (
        <input id={fieldId} style={controlStyle} {...sharedHandlers} {...(rest as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {(hint || error) && (
        <span style={{ fontSize: 12, color: error ? 'var(--danger)' : 'var(--text-muted)' }}>{error || hint}</span>
      )}
    </div>
  );
}
