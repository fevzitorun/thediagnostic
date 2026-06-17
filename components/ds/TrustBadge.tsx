import React from 'react';

interface TrustBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon?: React.ReactNode;
  onDark?: boolean;
}

export function TrustBadge({ children, icon, onDark = false, ...rest }: TrustBadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '8px 14px',
        borderRadius: 'var(--r-sm)',
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        fontWeight: 600,
        border: onDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid var(--border)',
        background: onDark ? 'rgba(255,255,255,0.06)' : 'var(--white)',
        color: onDark ? 'var(--text-on-navy)' : 'var(--text-body)',
      }}
      {...rest}
    >
      {icon && <span style={{ display: 'inline-flex', color: 'var(--blue)' }}>{icon}</span>}
      {children}
    </span>
  );
}
