import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Import coin images
import btc from "../../assets/coins/btc.png";
import eth from "../../assets/coins/ETH-icon.png";
import sol from "../../assets/coins/sol.jpg";
import dot from "../../assets/coins/dot.jpg";
import ada from "../../assets/coins/ada.jpg";
import xrp from "../../assets/coins/xrp.png";
import doge from "../../assets/coins/dogejpg.jpg";
import matic from "../../assets/coins/matic.jpg";
import bnb from "../../assets/coins/bnb.jpg";
import sui from "../../assets/coins/sui.png";
import id from "../../assets/coins/id.png";
import pyth from "../../assets/coins/pyth.png";
import bio from "../../assets/coins/bio.png";
import token from "../../assets/coins/token.jpg";
import leter from "../../assets/coins/leter.png";
import kin from "../../assets/coins/kin.jpg";
import not from "../../assets/coins/not.png";
import iet from "../../assets/coins/iet.png";
import enj from "../../assets/coins/enj.png";
import tlm from "../../assets/coins/tlm.png";
import ckb from "../../assets/coins/ckb.png";
import one from "../../assets/coins/one.jpg";
import win from "../../assets/coins/win.jpg";
import cetus from "../../assets/coins/cetus.png";
import brett from "../../assets/coins/breet.png";
import gala from "../../assets/coins/gala.jpg";
import dent from "../../assets/coins/dent.png";
import kusuma from "../../assets/coins/kusuma.png";
import uicima from "../../assets/coins/uicima.png";
import podkan from "../../assets/coins/podkan.png";
import helium from "../../assets/coins/Helium-Coin.png";
import neiro from "../../assets/coins/neiro.png";
import BitcoinChart from "./BitcoinChart";

// Coin Images Map
const coinImages = {
  BTC: btc,
  ETH: eth,
  SOL: sol,
  DOT: dot,
  ADA: ada,
  XRP: xrp,
  DOGE: doge,
  MATIC: matic,
  BNB: bnb,
  SUI: sui,
  ID: id,
  PYTH: pyth,
  BIO: bio,
  GALA: gala,
  NEIROETH: uicima,
  IET: iet,
  LETER: leter,
  NOT: not,
  KIN: kin,
  BRETT: brett,
  CETUS: cetus,
  DENT: dent,
  TOKEN: token,
  ONE: one,
  ENJ: enj,
  TLM: tlm,
  WIN: win,
  CKB: ckb,
  UICIMA: uicima,
  default: token,
   "KUSAMA (KSM)": kusuma,
  "POLKADOT (DOT)": podkan, // Same as DOT
  "HELIUM (HNT)": helium,
  NEIROETH: neiro,
};

const CoinAllocationChart = ({ coins, title = "Coin Allocation" }) => {
  const [btcData, setBtcData] = useState([]);

  // Fetch BTC chart data from CoinGecko (last 7 days, hourly data)
  const fetchBTC = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=hourly"
      );
      const data = await res.json();
      const formatted = data.prices.map((p) => ({
        time: new Date(p[0]).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        price: p[1],
      }));
      setBtcData(formatted);
    } catch (err) {
      console.error("Error fetching BTC chart:", err);
    }
  };

  useEffect(() => {
    fetchBTC();
    const interval = setInterval(fetchBTC, 30000); // Auto refresh every 30s
    return () => clearInterval(interval);
  }, []);

  if (!coins || coins.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>
        <div className="text-center py-8 text-gray-500">
          No coin allocation data available
        </div>
      </div>
    );
  }

  // Total percentage
  const totalPercent = coins.reduce((sum, coin) => sum + coin.percent, 0);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Pie chart visualization with images */}
        <div className="mt-10">
        
          <BitcoinChart/>

      </div>
        {/* Coin legend */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {coins.map((coin, i) => (
              <div
                key={coin._id || i}
                className="flex items-center p-2 bg-gray-50 rounded-lg"
              >
                <div className="w-6 h-6 rounded-full mr-3 overflow-hidden flex items-center justify-center bg-gray-200">
                  <img
                    src={coinImages[coin.name] || coinImages.default}
                    alt={coin.name}
                    className="w-5 h-5 object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">
                      {coin.name}
                    </span>
                    <span className="text-sm font-semibold">
                      {coin.percent.toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {coin.amount.toFixed(2)} coins
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BTC Chart */}
  
    </div>
  );
};

export default CoinAllocationChart;
