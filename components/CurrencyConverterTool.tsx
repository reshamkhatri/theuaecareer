'use client';

import { useEffect, useMemo, useState } from 'react';
import { FiChevronDown, FiRefreshCw, FiRepeat } from 'react-icons/fi';
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
        // Try the proxy API first (works on Cloudflare Pages)
        let data: ExchangeRateResponse | null = null;

        try {
          const proxyResponse = await fetch(`/api/exchange-rate?from=${from}&to=${to}`);
          const contentType = proxyResponse.headers.get('content-type') || '';
          if (contentType.includes('application/json') && proxyResponse.ok) {
            data = (await proxyResponse.json()) as ExchangeRateResponse;
          }
        } catch {
          // Proxy unavailable, fall through to direct API
        }

        // Fallback: call Frankfurter API directly
        if (!data) {
          if (from === to) {
            data = {
              provider: 'Frankfurter',
              from,
              to,
              fromLabel: getCurrencyLabel(from),
              toLabel: getCurrencyLabel(to),
              rate: 1,
              date: new Date().toISOString().slice(0, 10),
              note: 'Same-currency conversion uses a 1:1 reference rate.',
            };
          } else {
            const directResponse = await fetch(
              `https://api.frankfurter.dev/v2/rate/${from}/${to}`,
              { headers: { Accept: 'application/json' } }
            );

            if (!directResponse.ok) {
              throw new Error('Rate provider is temporarily unavailable.');
            }

            const directData = (await directResponse.json()) as {
              rate?: number;
              rates?: Record<string, number>;
              date?: string;
            };

            const resolvedRate =
              typeof directData.rate === 'number'
                ? directData.rate
                : typeof directData.rates?.[to] === 'number'
                  ? directData.rates[to]
                  : 0;

            if (!resolvedRate) {
              throw new Error('No rate available for that pair yet.');
            }

            data = {
              provider: 'Frankfurter',
              from,
              to,
              fromLabel: getCurrencyLabel(from),
              toLabel: getCurrencyLabel(to),
              rate: resolvedRate,
              date: directData.date || new Date().toISOString().slice(0, 10),
              note: 'Latest market reference rate. Remittance partners will usually add fees or a payout margin.',
            };
          }
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
    <>
      <div className="converter-wrapper">
        {/* Main converter card */}
        <div className="converter-main">
          {/* Preset corridors */}
          <div className="converter-presets">
            <span className="converter-presets-label">Popular corridors</span>
            <div className="converter-presets-row">
              {corridorPresets.map((preset) => {
                const isActive = selectedPresetLabel === `${preset.from}-${preset.to}`;
                return (
                  <button
                    key={`${preset.from}-${preset.to}`}
                    type="button"
                    className={`converter-preset-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handlePresetSelect(preset.from, preset.to, preset.defaultAmount)}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input row */}
          <div className="converter-input-row">
            <div className="converter-field">
              <label className="converter-label">You send</label>
              <div className="converter-input-wrap">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="0.00"
                  className="converter-input"
                />
                <div className="converter-input-currency">
                  <select
                    value={from}
                    onChange={(event) => setFrom(event.target.value)}
                    className="converter-currency-select"
                  >
                    {currencyOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="converter-chevron" />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSwap}
              aria-label="Swap currencies"
              className="converter-swap-btn"
            >
              <FiRepeat />
            </button>

            <div className="converter-field">
              <label className="converter-label">They receive</label>
              <div className="converter-input-wrap">
                <div className="converter-output-value">
                  {loading ? (
                    <span className="converter-loading-text">...</span>
                  ) : (
                    new Intl.NumberFormat('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(convertedAmount)
                  )}
                </div>
                <div className="converter-input-currency">
                  <select
                    value={to}
                    onChange={(event) => setTo(event.target.value)}
                    className="converter-currency-select"
                  >
                    {currencyOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="converter-chevron" />
                </div>
              </div>
            </div>
          </div>

          {/* Rate display bar */}
          <div className="converter-rate-bar">
            <div className="converter-rate-info">
              <span className="converter-rate-label">Market rate</span>
              <span className="converter-rate-value">
                {loading || !rateData
                  ? 'Loading...'
                  : `1 ${from} = ${formatRate(rateData.rate)} ${to}`}
              </span>
            </div>
            <div className="converter-rate-actions">
              {rateData && !error && (
                <span className="converter-rate-date">
                  Updated {formatRateDate(rateData.date)}
                </span>
              )}
              <button
                type="button"
                onClick={() => setRefreshNonce((current) => current + 1)}
                disabled={loading}
                className="converter-refresh-btn"
                aria-label="Refresh rate"
              >
                <FiRefreshCw className={loading ? 'converter-spin' : ''} />
              </button>
            </div>
          </div>

          {/* Error display */}
          {error && (
            <div className="converter-error">
              {error}
            </div>
          )}

          {/* Disclaimer */}
          <p className="converter-disclaimer">
            {rateData?.note ||
              'Market reference rate from Frankfurter. Banks and exchange houses apply their own fees and spread.'}
          </p>
        </div>

        {/* Sidebar */}
        <div className="converter-sidebar">
          <div className="converter-sidebar-card">
            <h3 className="converter-sidebar-title">Before you send</h3>
            <ul className="converter-checklist">
              <li>Check the market rate here first</li>
              <li>Compare the final payout, not the advertised rate</li>
              <li>Watch for transfer fees and weekend delays</li>
              <li>Save a screenshot of your best quote</li>
            </ul>
          </div>

          <div className="converter-sidebar-card converter-sidebar-corridors">
            <h3 className="converter-sidebar-title">Common corridors</h3>
            <div className="converter-corridor-list">
              {corridorPresets.slice(0, 6).map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  className="converter-corridor-item"
                  onClick={() => handlePresetSelect(preset.from, preset.to, preset.defaultAmount)}
                >
                  <span className="converter-corridor-pair">{preset.label}</span>
                  <span className="converter-corridor-helper">{preset.helper}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="converter-sidebar-attribution">
            Data sourced from Frankfurter (European Central Bank reference rates). For planning only.
          </p>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .converter-wrapper {
              display: grid;
              grid-template-columns: 1fr 340px;
              gap: 24px;
              align-items: start;
            }

            .converter-main {
              background: #fff;
              border-radius: 20px;
              border: 1px solid rgba(0, 0, 0, 0.06);
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.04);
              padding: 28px;
              display: grid;
              gap: 24px;
            }

            .converter-presets {
              display: grid;
              gap: 10px;
            }

            .converter-presets-label {
              font-size: 0.8rem;
              font-weight: 600;
              color: var(--text-muted);
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }

            .converter-presets-row {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
            }

            .converter-preset-btn {
              padding: 8px 16px;
              border-radius: 100px;
              font-size: 0.85rem;
              font-weight: 600;
              border: 1px solid var(--border);
              background: #fff;
              color: var(--text-secondary);
              transition: all 0.15s ease;
              cursor: pointer;
            }

            .converter-preset-btn:hover {
              border-color: var(--accent);
              color: var(--accent);
              background: var(--accent-light);
            }

            .converter-preset-btn.active {
              background: var(--primary);
              color: #fff;
              border-color: var(--primary);
              box-shadow: 0 2px 8px rgba(15, 23, 42, 0.18);
            }

            .converter-input-row {
              display: grid;
              grid-template-columns: 1fr 44px 1fr;
              gap: 12px;
              align-items: end;
            }

            .converter-field {
              display: grid;
              gap: 8px;
            }

            .converter-label {
              font-size: 0.82rem;
              font-weight: 600;
              color: var(--text-secondary);
              letter-spacing: 0.2px;
            }

            .converter-input-wrap {
              display: flex;
              align-items: stretch;
              border: 1.5px solid var(--border);
              border-radius: 14px;
              background: #fff;
              overflow: hidden;
              transition: border-color 0.15s ease, box-shadow 0.15s ease;
              height: 56px;
            }

            .converter-input-wrap:focus-within {
              border-color: var(--accent);
              box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
            }

            .converter-input {
              flex: 1;
              min-width: 0;
              border: none;
              outline: none;
              padding: 0 16px;
              font-size: 1.15rem;
              font-weight: 600;
              color: var(--text);
              background: transparent;
            }

            .converter-input::placeholder {
              color: var(--text-muted);
              font-weight: 400;
            }

            .converter-input::-webkit-inner-spin-button,
            .converter-input::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            .converter-input[type=number] {
              -moz-appearance: textfield;
            }

            .converter-output-value {
              flex: 1;
              min-width: 0;
              padding: 0 16px;
              font-size: 1.15rem;
              font-weight: 700;
              color: var(--text);
              display: flex;
              align-items: center;
              background: #f8fafc;
            }

            .converter-loading-text {
              color: var(--text-muted);
            }

            .converter-input-currency {
              display: flex;
              align-items: center;
              gap: 2px;
              padding: 0 12px 0 0;
              border-left: 1px solid var(--border);
              background: #f8fafc;
              position: relative;
              min-width: 80px;
            }

            .converter-currency-select {
              appearance: none;
              border: none;
              outline: none;
              background: transparent;
              font-size: 0.9rem;
              font-weight: 700;
              color: var(--text);
              cursor: pointer;
              padding: 0 20px 0 14px;
              height: 100%;
            }

            .converter-chevron {
              position: absolute;
              right: 10px;
              top: 50%;
              transform: translateY(-50%);
              color: var(--text-muted);
              font-size: 0.85rem;
              pointer-events: none;
            }

            .converter-swap-btn {
              width: 44px;
              height: 44px;
              border-radius: 12px;
              border: 1.5px solid var(--border);
              background: #fff;
              color: var(--text-secondary);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.15s ease;
              align-self: center;
              margin-top: 18px;
            }

            .converter-swap-btn:hover {
              border-color: var(--accent);
              color: var(--accent);
              background: var(--accent-light);
              transform: rotate(180deg);
            }

            .converter-rate-bar {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 16px;
              padding: 14px 18px;
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
              border-radius: 14px;
              color: #fff;
              flex-wrap: wrap;
            }

            .converter-rate-info {
              display: flex;
              align-items: center;
              gap: 12px;
              flex-wrap: wrap;
            }

            .converter-rate-label {
              font-size: 0.78rem;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: rgba(226, 232, 240, 0.6);
            }

            .converter-rate-value {
              font-size: 1rem;
              font-weight: 700;
              color: #fff;
            }

            .converter-rate-actions {
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .converter-rate-date {
              font-size: 0.78rem;
              color: rgba(226, 232, 240, 0.5);
            }

            .converter-refresh-btn {
              width: 34px;
              height: 34px;
              border-radius: 10px;
              border: 1px solid rgba(255, 255, 255, 0.12);
              background: rgba(255, 255, 255, 0.06);
              color: rgba(255, 255, 255, 0.7);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.15s ease;
            }

            .converter-refresh-btn:hover {
              background: rgba(255, 255, 255, 0.14);
              color: #fff;
            }

            .converter-refresh-btn:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }

            .converter-spin {
              animation: converterSpin 0.8s linear infinite;
            }

            @keyframes converterSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            .converter-error {
              padding: 12px 16px;
              background: var(--danger-light);
              color: var(--danger);
              border-radius: 12px;
              font-size: 0.9rem;
              font-weight: 500;
            }

            .converter-disclaimer {
              margin: 0;
              font-size: 0.82rem;
              color: var(--text-muted);
              line-height: 1.6;
            }

            /* Sidebar */
            .converter-sidebar {
              display: grid;
              gap: 16px;
              align-content: start;
            }

            .converter-sidebar-card {
              background: #fff;
              border: 1px solid rgba(0, 0, 0, 0.06);
              border-radius: 16px;
              padding: 22px;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
            }

            .converter-sidebar-title {
              font-size: 0.95rem;
              font-weight: 700;
              margin-bottom: 14px;
              color: var(--text);
            }

            .converter-checklist {
              display: grid;
              gap: 10px;
              padding: 0;
              margin: 0;
            }

            .converter-checklist li {
              display: flex;
              align-items: flex-start;
              gap: 10px;
              font-size: 0.88rem;
              color: var(--text-secondary);
              line-height: 1.5;
            }

            .converter-checklist li::before {
              content: '';
              width: 6px;
              height: 6px;
              background: var(--accent);
              border-radius: 50%;
              flex-shrink: 0;
              margin-top: 7px;
            }

            .converter-corridor-list {
              display: grid;
              gap: 0;
            }

            .converter-corridor-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 8px;
              padding: 10px 0;
              border-bottom: 1px solid rgba(0, 0, 0, 0.04);
              cursor: pointer;
              transition: all 0.1s ease;
              text-align: left;
              width: 100%;
            }

            .converter-corridor-item:last-child {
              border-bottom: none;
              padding-bottom: 0;
            }

            .converter-corridor-item:first-child {
              padding-top: 0;
            }

            .converter-corridor-item:hover .converter-corridor-pair {
              color: var(--accent);
            }

            .converter-corridor-pair {
              font-size: 0.88rem;
              font-weight: 700;
              color: var(--text);
              transition: color 0.1s ease;
              white-space: nowrap;
            }

            .converter-corridor-helper {
              font-size: 0.78rem;
              color: var(--text-muted);
              text-align: right;
            }

            .converter-sidebar-attribution {
              font-size: 0.78rem;
              color: var(--text-muted);
              line-height: 1.55;
              margin: 0;
              padding: 0 4px;
            }

            /* Responsive */
            @media (max-width: 980px) {
              .converter-wrapper {
                grid-template-columns: 1fr;
              }
            }

            @media (max-width: 640px) {
              .converter-main {
                padding: 20px;
              }

              .converter-input-row {
                grid-template-columns: 1fr;
                gap: 8px;
              }

              .converter-swap-btn {
                margin-top: 0;
                justify-self: center;
                transform: rotate(90deg);
              }

              .converter-swap-btn:hover {
                transform: rotate(270deg);
              }

              .converter-rate-bar {
                flex-direction: column;
                align-items: flex-start;
              }
            }
          `,
        }}
      />
    </>
  );
}
