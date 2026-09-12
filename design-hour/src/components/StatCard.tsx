interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  trend?: string;
  trendUp?: boolean;
}

export default function StatCard({ label, value, sub, trend, trendUp }: StatCardProps) {
  return (
    <div
      style={{
        background: 'var(--color-white)',
        border: '1px solid var(--color-light-grey)',
        padding: '1.5rem',
      }}
    >
      <p
        style={{
          fontSize: '0.6875rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-grey)',
          marginBottom: '0.75rem',
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          letterSpacing: '-0.025em',
          color: 'var(--color-near-black)',
          lineHeight: 1,
          marginBottom: '0.5rem',
        }}
      >
        {value}
      </p>
      {(sub || trend) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
          {trend && (
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: trendUp ? '#16a34a' : '#dc2626',
              }}
            >
              {trendUp ? '+' : ''}{trend}
            </span>
          )}
          {sub && (
            <span style={{ fontSize: '0.75rem', color: 'var(--color-grey)' }}>{sub}</span>
          )}
        </div>
      )}
    </div>
  );
}
