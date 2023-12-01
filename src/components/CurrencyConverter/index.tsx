import { ChangeEvent, useEffect, useState } from 'react';
import { fetchCurrencyExchangeRate } from '@/api';
import { CurrencyConverterInput } from '../CurrencyConverterInput';
import s from './CurrencyConverter.module.scss';

const availableCurrencies: string[] = [
  'UAH',
  'EUR',
  'USD',
  'GBP',
  'JPY',
  'AED',
];

export const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState<string>('EUR');
  const [toCurrency, setToCurrency] = useState<string>('UAH');
  const [amountInputFrom, setAmountInputFrom] = useState<number>(1);
  const [amountInputTo, setAmountInputTo] = useState<number>(1);
  const [exchangeRate, setExchangeRate] = useState<number>(1);

  useEffect(() => {
    const fetchDataAndSetExchangeRate = async () => {
      const { currencyExchangeRate } = await fetchCurrencyExchangeRate({
        fromCurrency,
        toCurrency,
      });

      setExchangeRate(currencyExchangeRate);

      if (amountInputFrom !== null) {
        setAmountInputTo(
          parseFloat((amountInputFrom * currencyExchangeRate).toFixed(2)),
        );
      } else if (amountInputTo !== null) {
        setAmountInputFrom(
          parseFloat((amountInputTo / currencyExchangeRate).toFixed(2)),
        );
      }
    };

    fetchDataAndSetExchangeRate();
  }, [fromCurrency, toCurrency, amountInputFrom, amountInputTo]);

  const handleAmountInputFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputAmount = parseFloat(e.target.value);
    setAmountInputFrom(inputAmount);
    if (exchangeRate !== null) {
      setAmountInputTo(Number((inputAmount * exchangeRate).toFixed(2)));
    }
  };

  const handleAmountInputToChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputAmount = parseFloat(e.target.value);
    setAmountInputTo(inputAmount);
    if (exchangeRate !== null) {
      setAmountInputFrom(Number((inputAmount / exchangeRate).toFixed(2)));
    }
  };

  return (
    <section className={s.converter}>
      <div className='container'>
        <h1 className={s.converter_title}>Currency Converter</h1>
        <div className={s.converter_block}>
          <CurrencyConverterInput
            amount={amountInputFrom}
            onAmountChange={handleAmountInputFromChange}
            currency={fromCurrency}
            onCurrencyChange={setFromCurrency}
            availableCurrencies={availableCurrencies}
          />
          <CurrencyConverterInput
            amount={amountInputTo}
            onAmountChange={handleAmountInputToChange}
            currency={toCurrency}
            onCurrencyChange={setToCurrency}
            availableCurrencies={availableCurrencies}
          />
        </div>
      </div>
    </section>
  );
};
