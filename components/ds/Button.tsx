'use client';
import React from 'react';

type ButtonVariant = 'primary' | 'ink' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onDark?: boolean;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  full?: boolean;
  as?: 'button' | 'a';
  href?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onDark = false,
  iconRight,
  iconLeft,
  disabled = false,
  full = false,
  as: Tag = 'button',
  ...rest
}: ButtonProps) {
  const sizes = {
    sm: { padding: '8px 16px', fontSize: 13, borderRadius: 'var(--r-sm)', gap: 6 },
    md: { padding: '11px 22px', fontSize: 14, borderRadius: 'var(--r-md)', gap: 8 },
    lg: { padding: '14px 30px', fontSize: 15, borderRadius: 'var(--r-md)', gap: 9 },
  };
  const s = sizes[size];

  const base: React.CSSProperties = {
    display: full ? 'flex' : 'inline-flex',
    width: full ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    padding: s.padding,
    fontFamily: 'var(--font-body)',
    fontSize: s.fontSize,
    fontWeight: 600,
    lineHeight: 1,
    borderRadius: s.borderRadius,
    border: '1.5px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    transition: 'transform var(--t-base), box-shadow var(--t-base), background var(--t-base), border-color var(--t-base)',
    boxSizing: 'border-box',
  };

  const variants: Record<ButtonVariant, React.CSSProperties> = {
    primary: { background: 'var(--blue)', color: '#fff' },
    ink:     { background: 'var(--navy)', color: '#fff' },
    outline: onDark
      ? { background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.45)' }
      : { background: 'var(--white)', color: 'var(--navy)', borderColor: 'var(--border)' },
    ghost:   { background: 'transparent', color: onDark ? '#fff' : 'var(--blue-dark)' },
  };

  const hoverEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    const el = e.currentTarget as HTMLElement;
    el.style.transform = 'translateY(-1px)';
    if (variant === 'primary') {
      el.style.background = 'var(--blue-dark)';
      el.style.boxShadow = 'var(--shadow-blue)';
    } else if (variant === 'ink') {
      el.style.background = 'var(--navy-light)';
      el.style.boxShadow = 'var(--shadow-navy)';
    } else if (variant === 'outline') {
      el.style.borderColor = onDark ? 'rgba(255,255,255,0.7)' : 'var(--border-strong)';
      el.style.background = onDark ? 'rgba(255,255,255,0.08)' : 'var(--bg-light)';
    } else {
      el.style.background = onDark ? 'rgba(255,255,255,0.08)' : 'var(--blue-light)';
    }
  };

  const hoverLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.transform = 'translateY(0)';
    el.style.boxShadow = 'none';
    Object.assign(el.style, variants[variant]);
  };

  return (
    <Tag
      style={{ ...base, ...variants[variant] }}
      disabled={Tag === 'button' ? disabled : undefined}
      onMouseEnter={hoverEnter}
      onMouseLeave={hoverLeave}
      {...(rest as any)}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}
