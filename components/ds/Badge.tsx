import React from 'react';

type BadgeTone = 'neutral' | 'teal' | 'success' | 'warning' | 'danger' | 'info' | 'amber';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  solid?: boolean;
  dot?: boolean;
}

export function Badge({ children, tone = 'neutral', solid = false, dot = false, ...rest }: BadgeProps) {
  const tones: Record<BadgeTone, { bg: string; fg: string; dot: string }> = {
    neutral: { bg: 'var(--bg-subtle)',    fg: 'var(--text-muted)',  dot: 'var(--text-faint)' },
    teal:    { bg: 'var(--blue-light)',   fg: 'var(--blue-dark)',   dot: 'var(--blue)' },
    success: { bg: 'var(--success-bg)',   fg: 'var(--success)',     dot: 'var(--success)' },
    warning: { bg: 'var(--warning-tint)', fg: 'var(--warning)',     dot: 'var(--warning)' },
    danger:  { bg: 'var(--danger-tint)',  fg: 'var(--danger)',      dot: 'var(--danger)' },
    info:    { bg: 'var(--info-bg)',      fg: 'var(--info)',        dot: 'var(--info)' },
    amber:   { bg: 'var(--amber-light)',  fg: 'var(--amber)',       dot: 'var(--amber)' },
  };
  const t = tones[tone];
  const solidStyle: React.CSSProperties = { background: t.dot, color: '#fff' };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 11px',
        borderRadius: 'var(--r-pill)',
        fontFamily: 'var(--font-body)',
        fontSize: 12,
        fontWeight: 700,
        lineHeight: 1.4,
        letterSpacing: '0.01em',
        ...(solid ? solidStyle : { background: t.bg, color: t.fg }),
      }}
      {...rest}
    >
      {dot && (
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: solid ? '#fff' : t.dot, flexShrink: 0 }} />
      )}
      {children}
    </span>
  );
}
