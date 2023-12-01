import React, { ChangeEvent } from 'react';
import s from './CurrencyConverterInput.module.scss';

interface CurrencyConverterInputProps {
  amount: number;
  onAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  currency: string;
  onCurrencyChange: (value: string) => void;
  availableCurrencies: string[];
}

export const CurrencyConverterInput = ({
  amount,
  onAmountChange,
  currency,
  onCurrencyChange,
  availableCurrencies,
}: CurrencyConverterInputProps) => {
  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onCurrencyChange(e.target.value);
  };

  return (
    <div className={s.converter}>
      <input
        type='number'
        value={amount}
        onChange={onAmountChange}
        className={s.converter_input}
      />
      <select
        value={currency}
        onChange={handleCurrencyChange}
        className={s.converter_select}
      >
        {availableCurrencies.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
