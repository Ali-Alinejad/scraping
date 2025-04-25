"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function MainPage() {
  const [prices, setPrices] = useState({
    stock: '',
    goldGram: '',
    goldOunce: '',
    goldCoin: '',
    dollar: '',
    bitcoin: '',
    tether: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/proxy'); // درخواست به پروکسی
        const stockPrice = extractPrice(data, 'l-gc30');
        const goldGramPrice = extractPrice(data, 'l-geram18');
        const goldOuncePrice = extractPrice(data, 'l-ons');
        const goldCoinPrice = extractPrice(data, 'l-mesghal');
        const dollarPrice = extractPrice(data, 'l-price_dollar_rl');
        const bitcoinPrice = extractPrice(data, 'l-crypto-bitcoin');
        const tetherPrice = extractPrice(data, 'l-crypto-tether-irr');

        setPrices({
          stock: stockPrice,
          goldGram: goldGramPrice,
          goldOunce: goldOuncePrice,
          goldCoin: goldCoinPrice,
          dollar: dollarPrice,
          bitcoin: bitcoinPrice,
          tether: tetherPrice
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // تابعی برای استخراج قیمت بر اساس id
  const extractPrice = (html: string, id: string) => {
    const regex = new RegExp(`<li id="${id}".*?<span class="info-price">(.*?)</span>`, 's');
    const match = regex.exec(html);
    if (match) {
      return match[1];
    }
    return "قیمت یافت نشد";
  };

  return (
    <div>
      <h1>قیمت‌ها</h1>
      <ul>
        <li><strong>بورس:</strong> {prices.stock}</li>
        <li><strong>طلا ۱۸:</strong> {prices.goldGram}</li>
        <li><strong>انس طلا:</strong> {prices.goldOunce}</li>
        <li><strong>مثقال طلا:</strong> {prices.goldCoin}</li>
        <li><strong>دلار:</strong> {prices.dollar}</li>
        <li><strong>بیت کوین:</strong> {prices.bitcoin}</li>
        <li><strong>تتر:</strong> {prices.tether}</li>
      </ul>
    </div>
  );
}
