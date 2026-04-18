'use client';

import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            style={{
              padding: '24px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '12px',
              textAlign: 'center',
              color: '#991b1b',
              fontSize: '0.9rem',
            }}
          >
            <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Something went wrong loading this section.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              style={{
                padding: '8px 16px',
                border: '1px solid #fca5a5',
                borderRadius: '8px',
                background: '#fff',
                color: '#991b1b',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
