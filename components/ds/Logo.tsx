import React from 'react';

interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  onDark?: boolean;
  size?: number;
  markOnly?: boolean;
  src?: string;
}

export function Logo({
  onDark = false,
  size = 40,
  markOnly = false,
  src = '/images/logo-mark.png',
  style = {},
  ...rest
}: LogoProps) {
  return (
    <span
      style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.3, textDecoration: 'none', ...style }}
      {...rest}
    >
      <img
        src={src}
        alt="The Diagnostic"
        style={{ width: size, height: size, objectFit: 'contain', display: 'block', flexShrink: 0 }}
      />
      {!markOnly && (
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, fontFamily: 'var(--font-body)' }}>
          <span style={{
            fontSize: size * 0.3,
            fontWeight: 500,
            letterSpacing: '0.02em',
            color: onDark ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)',
            marginBottom: size * 0.04,
          }}>The</span>
          <span style={{
            fontSize: size * 0.46,
            fontWeight: 800,
            letterSpacing: '-0.01em',
            color: onDark ? '#fff' : 'var(--navy)',
          }}>Diagnostic</span>
        </span>
      )}
    </span>
  );
}
