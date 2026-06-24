'use client';
import React from 'react';

interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  size?: 'sm' | 'md';
}

export function Tag({ children, selected = false, size = 'md', ...rest }: TagProps) {
  const sizes = {
    sm: { padding: '3px 10px', fontSize: 11 },
    md: { padding: '5px 14px', fontSize: 12.5 },
  };
  const s = sizes[size];
  const interactive = !!rest.onClick;

  return (
    <button
      type="button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: s.padding,
        fontFamily: 'var(--font-body)',
        fontSize: s.fontSize,
        fontWeight: 500,
        lineHeight: 1.4,
        borderRadius: 'var(--r-pill)',
        border: selected ? '1px solid var(--navy)' : '1px solid var(--border)',
        background: selected ? 'var(--navy)' : 'var(--white)',
        color: selected ? '#fff' : 'var(--navy)',
        cursor: interactive ? 'pointer' : 'default',
        whiteSpace: 'nowrap',
        transition: 'all var(--t-fast)',
      }}
      onMouseEnter={(e) => {
        if (selected || !interactive) return;
        e.currentTarget.style.background = 'var(--blue-light)';
        e.currentTarget.style.borderColor = 'rgba(38,152,211,0.35)';
        e.currentTarget.style.color = 'var(--blue-dark)';
      }}
      onMouseLeave={(e) => {
        if (selected || !interactive) return;
        e.currentTarget.style.background = 'var(--white)';
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.color = 'var(--navy)';
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
