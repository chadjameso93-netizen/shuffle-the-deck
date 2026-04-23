import { ReactNode } from 'react';

interface PageShellProps {
  children: ReactNode;
  maxWidth?: string;
  center?: boolean;
}

export default function PageShell({
  children,
  maxWidth = '600px',
  center = true,
}: PageShellProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: center ? 'center' : 'stretch',
        justifyContent: center ? 'center' : 'flex-start',
        padding: '2rem 1.5rem',
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth,
          ...(center ? {} : { margin: '0 auto' }),
        }}
      >
        {children}
      </div>
    </div>
  );
}