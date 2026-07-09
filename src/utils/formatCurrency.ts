export function formatCurrency(amount: number | string, currency = 'XOF', locale = 'fr-FR') {
  const value = typeof amount === 'number' ? amount : Number(amount ?? 0);
  try {
    // for currencies like XOF/XAF, use currency display as code
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'code',
      maximumFractionDigits: 0,
    }).format(value);
  } catch (e) {
    // fallback
    return `${value} ${currency}`;
  }
}

export default formatCurrency;
