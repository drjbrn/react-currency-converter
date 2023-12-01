import axios from 'axios';

interface FetchSpecificCurrencyExchangeRateProps {
  fromCurrency: string;
  toCurrency: string;
}

export const fetchCurrencyExchangeRate = async ({
  fromCurrency,
  toCurrency,
}: FetchSpecificCurrencyExchangeRateProps) => {
  try {
    const response = await axios.get(
      `https://${import.meta.env.VITE_API_URL}/v6/${
        import.meta.env.VITE_API_KEY
      }/pair/${fromCurrency}/${toCurrency}`,
    );

    const { data } = response;

    return {
      currencyExchangeRate: data.conversion_rate,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
