interface CurrencySymbols {
    [key: string]: string;
}

export const currencySymbols: CurrencySymbols = Object.freeze({
    USD: '$',
    EUR: '€',
    AUD: 'A$',
    GBP: '£',
    CAD: 'CA$',
    CNY: 'CN¥',
    JPY: '¥',
    SEK: 'SEK',
    CHF: 'CHF',
    INR: '₹',
    KWD: 'د.ك',
    RON: 'RON',
});
