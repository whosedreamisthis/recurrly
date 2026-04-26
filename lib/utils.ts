export function formatCurrency(value: number | string, currency: string = 'CAD'): string {
  try {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) {
      throw new Error('Invalid value');
    }
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue);
  } catch (error) {
    // Fallback: format with two decimal places and currency code
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    const safeValue = isNaN(numValue) ? 0 : numValue;
    return `${safeValue.toFixed(2)} ${currency.toUpperCase()}`;
  }
}