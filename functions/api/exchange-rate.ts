import { currencyCodeSet, getCurrencyLabel } from '../../lib/currency-converter';

const jsonHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
};

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      ...jsonHeaders,
      ...init.headers,
    },
  });
}

function cleanCurrencyCode(value: string | null) {
  return (value || '').trim().toUpperCase().slice(0, 3);
}

export async function onRequestGet(context: { request: Request }) {
  const url = new URL(context.request.url);
  const from = cleanCurrencyCode(url.searchParams.get('from'));
  const to = cleanCurrencyCode(url.searchParams.get('to'));

  if (!from || !to) {
    return jsonResponse({ message: 'Missing currency pair.' }, { status: 400 });
  }

  if (!currencyCodeSet.has(from) || !currencyCodeSet.has(to)) {
    return jsonResponse({ message: 'Unsupported currency pair.' }, { status: 400 });
  }

  if (from === to) {
    return jsonResponse(
      {
        provider: 'Frankfurter',
        from,
        to,
        fromLabel: getCurrencyLabel(from),
        toLabel: getCurrencyLabel(to),
        rate: 1,
        date: new Date().toISOString().slice(0, 10),
        note: 'Same-currency conversion uses a 1:1 reference rate.',
      },
      {
        headers: {
          ...jsonHeaders,
          'Cache-Control': 'public, max-age=900, s-maxage=900, stale-while-revalidate=43200',
        },
      }
    );
  }

  try {
    const providerResponse = await fetch(`https://api.frankfurter.dev/v2/rate/${from}/${to}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!providerResponse.ok) {
      return jsonResponse(
        {
          message: 'Rate provider is temporarily unavailable.',
          status: providerResponse.status,
        },
        { status: 502 }
      );
    }

    const providerData = (await providerResponse.json()) as {
      amount?: number;
      base?: string;
      date?: string;
      rates?: Record<string, number>;
      rate?: number;
      quote?: string;
    };

    const resolvedRate =
      typeof providerData.rate === 'number'
        ? providerData.rate
        : typeof providerData.rates?.[to] === 'number'
          ? providerData.rates[to]
          : 0;

    if (!resolvedRate) {
      return jsonResponse({ message: 'No rate available for that pair yet.' }, { status: 502 });
    }

    return jsonResponse(
      {
        provider: 'Frankfurter',
        from,
        to,
        fromLabel: getCurrencyLabel(from),
        toLabel: getCurrencyLabel(to),
        rate: resolvedRate,
        date: providerData.date || new Date().toISOString().slice(0, 10),
        note: 'Latest market reference rate. Remittance partners will usually add fees or a payout margin.',
      },
      {
        headers: {
          ...jsonHeaders,
          'Cache-Control': 'public, max-age=900, s-maxage=900, stale-while-revalidate=43200',
        },
      }
    );
  } catch (error) {
    return jsonResponse(
      {
        message: error instanceof Error ? error.message : 'Failed to fetch exchange rate.',
      },
      { status: 500 }
    );
  }
}
