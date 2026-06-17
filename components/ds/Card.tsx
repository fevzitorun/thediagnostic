'use client';
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  accent?: boolean;
  featured?: boolean;
  radius?: string;
  padding?: number | string;
}

export function Card({
  children,
  interactive = false,
  accent = false,
  featured = false,
  radius = 'var(--r-lg)',
  padding = 24,
  style = {},
  ...rest
}: CardProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: 'var(--white)',
        border: featured ? '1.5px solid var(--navy)' : '1px solid var(--border)',
        borderRadius: radius,
        padding,
        boxShadow: interactive && hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transform: interactive && hover ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform var(--t-base), box-shadow var(--t-base), border-color var(--t-base)',
        borderColor: interactive && hover && !featured ? 'rgba(38,152,211,0.35)' : undefined,
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {accent && (
        <span style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'var(--grad-blue)',
          opacity: hover ? 1 : 0,
          transition: 'opacity var(--t-base)',
        }} />
      )}
      {children}
    </div>
  );
}
