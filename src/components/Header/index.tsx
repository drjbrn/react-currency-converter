import { useState, useEffect } from 'react';
import { fetchCurrencyExchangeRate } from '@/api';
import { Icon } from '@iconify/react';
import s from './Header.module.scss';

export const Header = () => {
  const [eurRate, setEurRate] = useState<string>('');
  const [usdRate, setUsdRate] = useState<string>('');

  useEffect(() => {
    const fetchDataAndSetRates = async () => {
      const euroToUahExchangeRate = await fetchCurrencyExchangeRate({
        fromCurrency: 'EUR',
        toCurrency: 'UAH',
      });

      const usdToUahExchangeRate = await fetchCurrencyExchangeRate({
        fromCurrency: 'USD',
        toCurrency: 'UAH',
      });

      setEurRate(euroToUahExchangeRate.currencyExchangeRate.toFixed(2));
      setUsdRate(usdToUahExchangeRate.currencyExchangeRate.toFixed(2));
    };

    fetchDataAndSetRates();
  }, []);

  return (
    <header className={s.header}>
      <div className={`container ${s.header_container}`}>
        <div className={s.header_logo}>
          <h2>CC</h2>
        </div>
        <div className={s.header_amount}>
          <p>
            EUR:
            <span>
              {eurRate} <Icon icon='mdi:currency-uah' />
            </span>
          </p>
          <p>
            USD:
            <span>
              {usdRate} <Icon icon='mdi:currency-uah' />
            </span>
          </p>
        </div>
      </div>
    </header>
  );
};
