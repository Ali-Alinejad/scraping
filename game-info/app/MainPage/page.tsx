"use client";

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
  const [lastUpdated, setLastUpdated] = useState<string>('');

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
        setLastUpdated(new Date().toLocaleString()); // بروزرسانی زمان
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // بروزرسانی هر یک دقیقه

    return () => clearInterval(intervalId); // پاک کردن تایمر
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
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">قیمت‌ها</h1>
      <div dir='r' className="text-center text-gray-500">آخرین بروزرسانی: {lastUpdated}</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card for Stock */}
        <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col items-center transition-transform duration-300 transform hover:scale-105">
          <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
            <i className="fas fa-chart-line text-green-600 mr-2"></i> بورس
          </h3>
          <p className="text-2xl font-bold text-green-600">{prices.stock}</p>
        </div>

        {/* Card for Gold Gram */}
        <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col items-center transition-transform duration-300 transform hover:scale-105">
          <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
            <i className="fas fa-gem text-yellow-500 mr-2"></i> طلا ۱۸ عیار
          </h3>
          <p className="text-2xl font-bold text-yellow-500">{prices.goldGram}</p>
        </div>

        {/* Card for Gold Ounce */}
        <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col items-center transition-transform duration-300 transform hover:scale-105">
          <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
            <i className="fas fa-gem text-yellow-600 mr-2"></i> انس طلا
          </h3>
          <p className="text-2xl font-bold text-yellow-600">{prices.goldOunce}</p>
        </div>

        {/* Card for Gold Coin */}
        <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col items-center transition-transform duration-300 transform hover:scale-105">
          <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
            <i className="fas fa-gem text-yellow-400 mr-2"></i> مثقال طلا
          </h3>
          <p className="text-2xl font-bold text-yellow-400">{prices.goldCoin}</p>
        </div>

        {/* Card for Dollar */}
        <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col items-center transition-transform duration-300 transform hover:scale-105">
          <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
            <i className="fas fa-dollar-sign text-blue-500 mr-2"></i> دلار
          </h3>
          <p className="text-2xl font-bold text-blue-500">{prices.dollar}</p>
        </div>

        {/* Card for Bitcoin */}
        <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col items-center transition-transform duration-300 transform hover:scale-105">
          <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
            <i className="fab fa-bitcoin text-orange-500 mr-2"></i> بیت کوین
          </h3>
          <p className="text-2xl font-bold text-orange-500">{prices.bitcoin}</p>
        </div>

        {/* Card for Tether */}
        <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col items-center transition-transform duration-300 transform hover:scale-105">
          <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
            <i className="fab fa-usd-circle text-gray-600 mr-2"></i> تتر
          </h3>
          <p className="text-2xl font-bold text-gray-600">{prices.tether}</p>
        </div>
      </div>
    </div>
  );
}
