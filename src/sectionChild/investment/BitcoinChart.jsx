import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

// Import Bitcoin image
import btc from "../../assets/coins/btc.png";

const BitcoinChart = () => {
  const [btcData, setBtcData] = useState([]);
  const [timeframe, setTimeframe] = useState("15min");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch BTC chart data from CoinGecko
  const fetchBTC = async () => {
    setIsLoading(true);
    try {
    
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=10&interval=hourly"
      );
      const data = await res.json();
      
      // Process data to create 15-minute intervals (simulated for demo)
      const formatted = processTo15MinIntervals(data.prices);
      setBtcData(formatted);
    } catch (err) {
      console.error("Error fetching BTC chart:", err);
      
      // Fallback to dummy data if API fails
      const dummyData = generateDummyData();
      setBtcData(dummyData);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to process hourly data into 15-minute intervals (simulated)
  const processTo15MinIntervals = (prices) => {
    const result = [];
    
    for (let i = 0; i < prices.length - 1; i++) {
      const currentPrice = prices[i][1];
      const nextPrice = prices[i+1][1];
      const currentTime = prices[i][0];
      const timeDiff = prices[i+1][0] - currentTime;
      
      // Create 4 data points between each hour (simulating 15min intervals)
      for (let j = 0; j < 4; j++) {
        const interpolatedTime = currentTime + (timeDiff / 4) * j;
        // Simple linear interpolation for price
        const interpolatedPrice = currentPrice + ((nextPrice - currentPrice) / 4) * j;
        
        result.push({
          time: new Date(interpolatedTime).getTime(),
          date: new Date(interpolatedTime).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          timeLabel: new Date(interpolatedTime).toLocaleTimeString("en-US", {
            hour: '2-digit',
            minute: '2-digit'
          }),
          price: interpolatedPrice,
        });
      }
    }
    
    return result;
  };

  // Generate dummy data in case API fails
  const generateDummyData = () => {
    const data = [];
    const now = new Date().getTime();
    let price = 50000;
    
    // Generate data for last 20 days with 15-minute intervals
    for (let i = 20 * 24 * 4 - 1; i >= 0; i--) {
      const time = now - (i * 15 * 60 * 1000);
      // Random price fluctuation
      price = price + (Math.random() - 0.5) * 1000;
      
      data.push({
        time: time,
        date: new Date(time).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        timeLabel: new Date(time).toLocaleTimeString("en-US", {
          hour: '2-digit',
          minute: '2-digit'
        }),
        price: price,
      });
    }
    
    return data;
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
          <p className="text-gray-700 font-medium">
            {new Date(label).toLocaleDateString("en-US", {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
          <p className="text-gray-500 text-sm">
            {new Date(label).toLocaleTimeString("en-US", {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          <p className="text-lg font-semibold mt-1 text-orange-500">
            ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      );
    }
    return null;
  };

  // Format XAxis ticks based on timeframe
  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    if (timeframe === "15min") {
      return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}\n${date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}`;
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  useEffect(() => {
    fetchBTC();
    const interval = setInterval(fetchBTC, 300000); // Auto refresh every 5 minutes
    return () => clearInterval(interval);
  }, [timeframe]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-3 sm:mb-0">
          Autonix
          
        </h3>
        
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          {["15min", "1H", "1D", "1W"].map((interval) => (
            <button
              key={interval}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeframe === interval
                  ? "bg-white shadow-sm font-medium text-orange-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setTimeframe(interval)}
            >
              {interval}
            </button>
          ))}
        </div>
      </div>

      {/* Current Price Stats */}
      {/* {btcData.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-orange-50 p-3 rounded-lg flex-1 min-w-[140px]">
            <p className="text-xs text-gray-500">Current Price</p>
            <p className="text-xl font-bold text-orange-600">
              ${btcData[btcData.length - 1].price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg flex-1 min-w-[140px]">
            <p className="text-xs text-gray-500">24h Change</p>
            <p className="text-xl font-bold text-green-500">+2.35%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg flex-1 min-w-[140px]">
            <p className="text-xs text-gray-500">24h Volume</p>
            <p className="text-xl font-bold text-gray-800">$24.5B</p>
          </div>
        </div>
      )} */}

      {/* Chart */}
      <div className="h-80">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading chart data...</div>
          </div>
        ) : (
      <ResponsiveContainer width="100%" height="100%">
  <AreaChart data={btcData}>
    <defs>
      {/* Gradient fill */}
      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4}/>   {/* Indigo-500 */}
        <stop offset="50%" stopColor="#8B5CF6" stopOpacity={0.2}/>  {/* Violet-500 */}
        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>    
      </linearGradient>
    </defs>

    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

    <XAxis 
      dataKey="time" 
      tickFormatter={formatXAxis}
      tick={{ fontSize: 11, fill: "#475569" }} // Slate-600
      angle={-45}
      textAnchor="end"
      height={60}
    />

    <YAxis
      domain={['dataMin - 1000', 'dataMax + 1000']}
      tickFormatter={(value) => `$${value.toLocaleString()}`}
      tick={{ fontSize: 12, fill: "#475569" }}
      width={70}
    />

    <Tooltip content={<CustomTooltip />} />

   <Area
  type="monotone"
  dataKey="price"
  stroke="#4F46E5"          // Indigo line
  strokeWidth={2}           // thinner line (was 3)
  fill="url(#colorPrice)"
  activeDot={{ r: 5, stroke: '#4F46E5', strokeWidth: 2, fill: '#fff' }}
/>

  </AreaChart>
</ResponsiveContainer>

        )}
      </div>

      {/* Chart Footer */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <div>
          Data updated every 15 minutes
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
          <span>BTC/USD</span>
        </div>
      </div>
    </div>
  );
};

export default BitcoinChart;