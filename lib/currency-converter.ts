export interface CurrencyOption {
  code: string;
  name: string;
  symbol: string;
  region: string;
}

export interface CorridorPreset {
  from: string;
  to: string;
  label: string;
  helper: string;
  defaultAmount: number;
}

export const currencyOptions: CurrencyOption[] = [
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', region: 'Gulf payroll' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR', region: 'Gulf payroll' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'QAR', region: 'Gulf payroll' },
  { code: 'OMR', name: 'Omani Rial', symbol: 'OMR', region: 'Gulf payroll' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'KWD', region: 'Gulf payroll' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: 'BHD', region: 'Gulf payroll' },
  { code: 'INR', name: 'Indian Rupee', symbol: 'INR', region: 'Remittance destination' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: 'PKR', region: 'Remittance destination' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: 'BDT', region: 'Remittance destination' },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: 'NPR', region: 'Remittance destination' },
  { code: 'PHP', name: 'Philippine Peso', symbol: 'PHP', region: 'Remittance destination' },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'LKR', region: 'Remittance destination' },
].sort((left, right) => left.code.localeCompare(right.code));

export const currencyCodeSet = new Set(currencyOptions.map((option) => option.code));

export const corridorPresets: CorridorPreset[] = [
  {
    from: 'AED',
    to: 'INR',
    label: 'AED to INR',
    helper: 'Common salary transfers from the UAE to India.',
    defaultAmount: 2000,
  },
  {
    from: 'AED',
    to: 'NPR',
    label: 'AED to NPR',
    helper: 'Useful for Nepal-focused family support planning.',
    defaultAmount: 1500,
  },
  {
    from: 'AED',
    to: 'PKR',
    label: 'AED to PKR',
    helper: 'A frequent corridor for UAE-based workers sending money home.',
    defaultAmount: 2000,
  },
  {
    from: 'AED',
    to: 'BDT',
    label: 'AED to BDT',
    helper: 'Helpful for comparing employer payroll versus payout value.',
    defaultAmount: 1800,
  },
  {
    from: 'SAR',
    to: 'PHP',
    label: 'SAR to PHP',
    helper: 'A common Saudi Arabia to Philippines remittance check.',
    defaultAmount: 2500,
  },
  {
    from: 'SAR',
    to: 'INR',
    label: 'SAR to INR',
    helper: 'Frequently used by Saudi-based Indian workers.',
    defaultAmount: 2500,
  },
  {
    from: 'QAR',
    to: 'NPR',
    label: 'QAR to NPR',
    helper: 'Popular for Qatar to Nepal household remittances.',
    defaultAmount: 2000,
  },
  {
    from: 'QAR',
    to: 'INR',
    label: 'QAR to INR',
    helper: 'Useful when comparing Qatar offers with Indian expenses.',
    defaultAmount: 2000,
  },
  {
    from: 'KWD',
    to: 'INR',
    label: 'KWD to INR',
    helper: 'Good for Kuwait compensation planning in rupees.',
    defaultAmount: 700,
  },
];

export function getCurrencyLabel(code: string) {
  const option = currencyOptions.find((item) => item.code === code);

  if (!option) {
    return code;
  }

  return `${option.code} · ${option.name}`;
}

