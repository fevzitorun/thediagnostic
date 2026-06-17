import React from 'react';

interface StatProps {
  value: React.ReactNode;
  suffix?: string;
  label?: string;
  suffixSize?: number;
  align?: 'left' | 'center' | 'right';
  onDark?: boolean;
  size?: number;
}

export function Stat({ value, suffix, label, suffixSize, align = 'left', onDark = false, size = 64 }: StatProps) {
  return (
    <div style={{ textAlign: align }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1,
        color: onDark ? '#fff' : 'var(--navy)',
        letterSpacing: '-1px',
      }}>
        {value}
        {suffix && (
          <span style={{ color: 'var(--blue)', fontSize: suffixSize ?? size * 0.55 }}>{suffix}</span>
        )}
      </div>
      {label && (
        <div style={{ fontSize: 13, color: onDark ? 'var(--text-on-navy-muted)' : 'var(--text-muted)', marginTop: 8 }}>
          {label}
        </div>
      )}
    </div>
  );
}
