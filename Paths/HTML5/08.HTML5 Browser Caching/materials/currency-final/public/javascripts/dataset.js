String.prototype.count = function(str) {
  return this.split(str).length
}

var currencies = {
  USD: { name: "US Dollar", symbol: "$", rateUSD: 1 },
  EUR: { name: "Euro", symbol: "€", rateUSD: 1 },
  GBP: { name: "British Pound", symbol: "£", rateUSD: 1 },
  CAD: { name: "Canadian Dollar", symbol: "$", rateUSD: 1 },
  AUD: { name: "Australian Dollar", symbol: "$", rateUSD: 1 },
  JPY: { name: "Japanese Yen", symbol: "¥", rateUSD: 1 },
  KRW: { name: "South Korean Won", symbol: "₩", rateUSD: 1 },
  NZD: { name: "New Zealand Dollar", symbol: "$", rateUSD: 1 },
  CHF: { name: "Swiss Franc", symbol: "chf", rateUSD: 1 },
  SGD: { name: "Singapore Dollar", symbol: "$", rateUSD: 1 },
  HKD: { name: "Hong Kong Dollar", symbol: "$", rateUSD: 1, 1:0 }
};

if(!localStorage.currencies) localStorage.currencies = JSON.stringify(currencies);
if(!localStorage.fromTo) localStorage.fromTo = '{ "from": "JPY", "to": "AUD" }';

window.currencies = JSON.parse(localStorage.currencies);
window.fromTo = JSON.parse(localStorage.fromTo);