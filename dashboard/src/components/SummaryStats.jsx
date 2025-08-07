import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { brentOilPriceData } from '../data/oilPriceData';
import { eventsData, eventTypes } from '../data/eventData';
import { COLORS } from '../data/mockData';

const SummaryStats = () => {
  const stats = useMemo(() => {
    // Calculate min/max/avg price
    const prices = brentOilPriceData.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    
    // Calculate highest/lowest daily change
    let maxDailyChange = 0;
    let minDailyChange = 0;
    let maxChangeDate = '';
    let minChangeDate = '';
    
    for (let i = 1; i < brentOilPriceData.length; i++) {
      const prevPrice = brentOilPriceData[i-1].price;
      const currPrice = brentOilPriceData[i].price;
      const dailyChange = ((currPrice - prevPrice) / prevPrice) * 100;
      
      if (dailyChange > maxDailyChange) {
        maxDailyChange = dailyChange;
        maxChangeDate = brentOilPriceData[i].date;
      }
      
      if (dailyChange < minDailyChange) {
        minDailyChange = dailyChange;
        minChangeDate = brentOilPriceData[i].date;
      }
    }
    
    // Calculate volatility (standard deviation)
    const mean = avgPrice;
    const squaredDiffs = prices.map(price => Math.pow(price - mean, 2));
    const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / prices.length;
    const volatility = Math.sqrt(variance);
    
    // Count events by type
    const eventsByType = {};
    eventTypes.forEach(type => {
      eventsByType[type] = eventsData.filter(e => e.type === type).length;
    });
    
    // Calculate average price change by event type
    const avgChangeByType = {};
    eventTypes.forEach(type => {
      const typeEvents = eventsData.filter(e => e.type === type);
      if (typeEvents.length > 0) {
        avgChangeByType[type] = typeEvents.reduce((sum, e) => sum + e.percent_change, 0) / typeEvents.length;
      } else {
        avgChangeByType[type] = 0;
      }
    });
    
    return {
      priceStats: {
        min: minPrice,
        max: maxPrice,
        avg: avgPrice,
        volatility
      },
      changeStats: {
        maxDaily: maxDailyChange,
        minDaily: minDailyChange,
        maxDate: maxChangeDate,
        minDate: minChangeDate
      },
      eventStats: {
        total: eventsData.length,
        byType: eventsByType,
        avgChangeByType
      }
    };
  }, []);
  
  // Prepare data for event impact chart
  const eventImpactData = eventTypes.map(type => ({
    name: type,
    value: stats.eventStats.byType[type],
    avgChange: stats.eventStats.avgChangeByType[type]
  }));
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Price Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Price Statistics</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Average Price</p>
            <p className="text-2xl font-semibold text-blue-600">${stats.priceStats.avg.toFixed(2)}</p>
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Minimum</p>
              <p className="text-xl font-medium text-red-600">${stats.priceStats.min.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Maximum</p>
              <p className="text-xl font-medium text-green-600">${stats.priceStats.max.toFixed(2)}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Price Volatility</p>
            <p className="text-xl font-medium">${stats.priceStats.volatility.toFixed(2)}</p>
            <p className="text-xs text-gray-400 mt-1">Standard deviation of prices</p>
          </div>
        </div>
      </div>
      
      {/* Price Change Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Price Changes</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Largest Daily Increase</p>
            <p className="text-2xl font-semibold text-green-600">+{stats.changeStats.maxDaily.toFixed(2)}%</p>
            <p className="text-xs text-gray-400">
              on {new Date(stats.changeStats.maxDate).toLocaleDateString()}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Largest Daily Decrease</p>
            <p className="text-2xl font-semibold text-red-600">{stats.changeStats.minDaily.toFixed(2)}%</p>
            <p className="text-xs text-gray-400">
              on {new Date(stats.changeStats.minDate).toLocaleDateString()}
            </p>
          </div>
          
          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-500">Price Range</p>
            <p className="text-xl font-medium">
              ${stats.priceStats.max.toFixed(2) - stats.priceStats.min.toFixed(2)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              ({((stats.priceStats.max - stats.priceStats.min) / stats.priceStats.min * 100).toFixed(2)}% difference)
            </p>
          </div>
        </div>
      </div>
      
      {/* Event Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Event Statistics</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Total Events</p>
            <p className="text-2xl font-semibold text-purple-600">{stats.eventStats.total}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Events by Type</p>
            {Object.entries(stats.eventStats.byType).map(([type, count], index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{type}</span>
                <span className="text-sm font-medium">{count}</span>
              </div>
            ))}
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Most Common Event Type</p>
            <p className="text-lg font-medium">
              {Object.entries(stats.eventStats.byType).sort((a, b) => b[1] - a[1])[0][0]}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {Object.entries(stats.eventStats.byType).sort((a, b) => b[1] - a[1])[0][1]} events
            </p>
          </div>
        </div>
      </div>
      
      {/* Impact Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Event Impact</h3>
        
        <div className="h-36 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={eventImpactData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
                label={({ name }) => name}
              >
                {eventImpactData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Average Price Impact by Type</p>
          {eventTypes.map((type, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                <span 
                  className="h-3 w-3 rounded-full mr-2" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span className="text-sm">{type}</span>
              </div>
              <span 
                className={`text-sm font-medium ${stats.eventStats.avgChangeByType[type] >= 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {stats.eventStats.avgChangeByType[type] >= 0 ? '+' : ''}
                {stats.eventStats.avgChangeByType[type].toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryStats;