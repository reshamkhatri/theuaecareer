'use client';

import { useEffect, useMemo, useState } from 'react';
import { FiRefreshCw, FiRepeat, FiTrendingUp } from 'react-icons/fi';
import { corridorPresets, currencyOptions, getCurrencyLabel } from '@/lib/currency-converter';

interface ExchangeRateResponse {
  provider: string;
  from: string;
  to: string;
  fromLabel: string;
  toLabel: string;
  rate: number;
  date: string;
  note: string;
  message?: string;
}

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value) + ` ${currency}`;
}

function formatRate(value: number) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(value);
}

function formatRateDate(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function CurrencyConverterTool() {
  const defaultPreset = corridorPresets[0];
  const [amount, setAmount] = useState(String(defaultPreset.defaultAmount));
  const [from, setFrom] = useState(defaultPreset.from);
  const [to, setTo] = useState(defaultPreset.to);
  const [rateData, setRateData] = useState<ExchangeRateResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshNonce, setRefreshNonce] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadRate() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/exchange-rate?from=${from}&to=${to}`);
        const data = (await response.json()) as ExchangeRateResponse;

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load exchange rate.');
        }

        if (!active) {
          return;
        }

        setRateData(data);
      } catch (loadError) {
        if (!active) {
          return;
        }

        setRateData(null);
        setError(loadError instanceof Error ? loadError.message : 'Failed to load exchange rate.');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadRate();

    return () => {
      active = false;
    };
  }, [from, to, refreshNonce]);

  const parsedAmount = useMemo(() => {
    const normalized = Number.parseFloat(amount);
    return Number.isFinite(normalized) && normalized >= 0 ? normalized : 0;
  }, [amount]);

  const convertedAmount = useMemo(() => {
    if (!rateData) {
      return 0;
    }

    return parsedAmount * rateData.rate;
  }, [parsedAmount, rateData]);

  const selectedPresetLabel = useMemo(() => `${from}-${to}`, [from, to]);

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  function handlePresetSelect(fromCurrency: string, toCurrency: string, nextAmount: number) {
    setFrom(fromCurrency);
    setTo(toCurrency);
    setAmount(String(nextAmount));
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '24px',
      }}
      className="currency-converter-grid"
    >
      <div
        className="card"
        style={{
          padding: 'clamp(1.4rem, 3vw, 2rem)',
          borderRadius: '28px',
          border: '1px solid rgba(99,102,241,0.18)',
          boxShadow: '0 24px 48px rgba(15,23,42,0.08)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98))',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '16px',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '999px',
                padding: '6px 12px',
                background: '#eef2ff',
                color: '#4f46e5',
                fontWeight: 800,
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '12px',
              }}
            >
              <FiTrendingUp />
              Gulf remittance tool
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.1rem)', marginBottom: '8px' }}>Currency Converter</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '50ch', lineHeight: 1.7 }}>
              Compare the latest market reference rate for the most-used Gulf salary corridors before you send money home.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setRefreshNonce((current) => current + 1)}
            disabled={loading}
            className="btn btn-secondary"
            style={{
              alignSelf: 'flex-start',
              borderRadius: '999px',
              opacity: loading ? 0.7 : 1,
            }}
          >
            <FiRefreshCw />
            Refresh rate
          </button>
        </div>

        <div style={{ display: 'grid', gap: '12px', marginBottom: '1.5rem' }}>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontWeight: 700 }}>Popular remittance routes</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {corridorPresets.map((preset) => (
              <button
                key={`${preset.from}-${preset.to}`}
                type="button"
                onClick={() => handlePresetSelect(preset.from, preset.to, preset.defaultAmount)}
                style={{
                  borderRadius: '999px',
                  padding: '10px 14px',
                  background:
                    selectedPresetLabel === `${preset.from}-${preset.to}` ? 'var(--primary)' : 'rgba(255,255,255,0.9)',
                  color:
                    selectedPresetLabel === `${preset.from}-${preset.to}` ? 'white' : 'var(--text-secondary)',
                  border:
                    selectedPresetLabel === `${preset.from}-${preset.to}`
                      ? '1px solid var(--primary)'
                      : '1px solid var(--border)',
                  fontWeight: 700,
                  boxShadow: selectedPresetLabel === `${preset.from}-${preset.to}` ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '14px',
            alignItems: 'end',
            marginBottom: '1.5rem',
          }}
          className="currency-input-grid"
        >
          <label style={{ display: 'grid', gap: '10px' }}>
            <span style={{ fontWeight: 700 }}>You send</span>
            <input
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="Enter amount"
              style={{
                width: '100%',
                borderRadius: '18px',
                border: '1px solid var(--border)',
                padding: '16px 18px',
                background: 'white',
              }}
            />
          </label>

          <button
            type="button"
            onClick={handleSwap}
            aria-label="Swap currencies"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              background: 'white',
              color: 'var(--primary)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <FiRepeat />
          </button>

          <div style={{ display: 'grid', gap: '10px' }}>
            <label style={{ display: 'grid', gap: '10px' }}>
              <span style={{ fontWeight: 700 }}>Into</span>
              <select
                value={to}
                onChange={(event) => setTo(event.target.value)}
                style={{
                  width: '100%',
                  borderRadius: '18px',
                  border: '1px solid var(--border)',
                  padding: '16px 18px',
                  background: 'white',
                }}
              >
                {currencyOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {getCurrencyLabel(option.code)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '14px',
            marginBottom: '1.5rem',
          }}
          className="currency-select-grid"
        >
          <label style={{ display: 'grid', gap: '10px' }}>
            <span style={{ fontWeight: 700 }}>From currency</span>
            <select
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              style={{
                width: '100%',
                borderRadius: '18px',
                border: '1px solid var(--border)',
                padding: '16px 18px',
                background: 'white',
              }}
            >
              {currencyOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {getCurrencyLabel(option.code)}
                </option>
              ))}
            </select>
          </label>
          <div
            style={{
              borderRadius: '20px',
              border: '1px solid rgba(99,102,241,0.16)',
              background: 'linear-gradient(145deg, rgba(238,242,255,0.9), rgba(255,255,255,0.92))',
              padding: '16px 18px',
              display: 'grid',
              gap: '8px',
              alignContent: 'center',
            }}
          >
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 700 }}>Typical use</span>
            <span style={{ fontWeight: 700, color: 'var(--text)' }}>
              {corridorPresets.find((preset) => preset.from === from && preset.to === to)?.helper ||
                'Use this for a quick salary-to-home-currency estimate.'}
            </span>
          </div>
        </div>

        <div
          style={{
            borderRadius: '24px',
            padding: '1.35rem',
            background: 'linear-gradient(135deg, #0f172a 0%, #172554 100%)',
            color: 'white',
            boxShadow: '0 18px 32px rgba(15,23,42,0.14)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '12px' }}>
            <div>
              <div style={{ color: 'rgba(226,232,240,0.74)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                Latest reference
              </div>
              <div style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', fontWeight: 800, marginTop: '8px' }}>
                {loading ? 'Loading...' : formatMoney(convertedAmount, to)}
              </div>
            </div>
            <div style={{ textAlign: 'right', minWidth: '190px' }}>
              <div style={{ color: 'rgba(226,232,240,0.74)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                Working-day market rate
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: '8px' }}>
                {loading || !rateData ? 'Loading...' : `1 ${from} = ${formatRate(rateData.rate)} ${to}`}
              </div>
            </div>
          </div>
          <p style={{ margin: 0, color: 'rgba(226,232,240,0.82)', lineHeight: 1.7 }}>
            {error
              ? error
              : rateData?.note ||
                'Latest market reference rate. Banks and exchange houses usually apply their own fee and spread before payout.'}
          </p>
          {rateData && !error && (
            <p style={{ margin: '12px 0 0', color: 'rgba(226,232,240,0.62)', fontSize: '0.92rem' }}>
              Source: {rateData.provider} | Updated for {formatRateDate(rateData.date)}
            </p>
          )}
        </div>
      </div>

      <div
        className="card"
        style={{
          padding: 'clamp(1.4rem, 3vw, 2rem)',
          borderRadius: '28px',
          border: '1px solid var(--border)',
          boxShadow: '0 20px 40px rgba(15,23,42,0.06)',
          background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          display: 'grid',
          gap: '18px',
          alignContent: 'start',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '999px',
              padding: '6px 12px',
              background: '#ecfeff',
              color: '#0f766e',
              fontWeight: 800,
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '12px',
            }}
          >
            Best use
          </div>
          <h3 style={{ fontSize: '1.45rem', marginBottom: '8px' }}>Before you send money</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Use the converter to benchmark the latest market rate, then compare it with the payout quote from your bank, exchange house, or remittance app.
          </p>
        </div>

        <div
          style={{
            borderRadius: '20px',
            padding: '18px',
            background: '#f8fafc',
            border: '1px solid var(--border)',
          }}
        >
          <h4 style={{ marginBottom: '10px' }}>Quick checklist</h4>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Check the market reference first.</li>
            <li>Compare the final payout amount, not only the advertised rate.</li>
            <li>Watch transfer fees, branch pickup fees, and weekend delays.</li>
            <li>Save a screenshot of your best quote before you transfer.</li>
          </ul>
        </div>

        <div
          style={{
            borderRadius: '20px',
            padding: '18px',
            background: 'linear-gradient(145deg, rgba(99,102,241,0.08), rgba(255,255,255,0.9))',
            border: '1px solid rgba(99,102,241,0.16)',
          }}
        >
          <h4 style={{ marginBottom: '10px' }}>Most-used corridors on this page</h4>
          <div style={{ display: 'grid', gap: '10px' }}>
            {corridorPresets.slice(0, 6).map((preset) => (
              <div key={preset.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                <span style={{ fontWeight: 700 }}>{preset.label}</span>
                <span style={{ color: 'var(--text-muted)' }}>{preset.helper}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.93rem', lineHeight: 1.7 }}>
          This tool shows the latest market reference rate using Frankfurter data. It is useful for planning, but remittance providers can still return a lower final payout after fees and spreads.
        </p>
      </div>
    </div>
  );
}
