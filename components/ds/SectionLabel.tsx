import React from 'react';

interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  rule?: boolean;
  onDark?: boolean;
}

export function SectionLabel({ children, rule = false, onDark = false, style = {}, ...rest }: SectionLabelProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: 'var(--font-body)',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: onDark ? 'var(--blue-bright)' : 'var(--blue)',
        ...style,
      }}
      {...rest}
    >
      {children}
      {rule && <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />}
    </div>
  );
}
