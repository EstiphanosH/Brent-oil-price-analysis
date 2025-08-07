import React, { useState, useEffect } from 'react';
import { 
  ComposedChart, 
  Line, 
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea
} from 'recharts';
import { brentOilPriceData, changePoints, calculateMovingAverage } from '../../data/oilPriceData';
import { eventsData } from '../../data/eventData';

const OilPriceChart = () => {
  const [data, setData] = useState([]);
  const [selectedRange, setSelectedRange] = useState('1y');
  const [showMovingAverage, setShowMovingAverage] = useState(true);
  const [showChangePoints, setShowChangePoints] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const [hoveredEvent, setHoveredEvent] = useState(null);

  useEffect(() => {
    // Filter data based on selected time range
    const now = new Date('2023-12-31'); // Using the latest date in our dataset as "now"
    let startDate;
    
    switch(selectedRange) {
      case '3m':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6m':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1y':
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'all':
      default:
        startDate = new Date('2022-01-01'); // Start of our dataset
    }

    const startDateStr = startDate.toISOString().split('T')[0];
    
    // Filter oil price data by date
    const filteredPriceData = brentOilPriceData.filter(item => {
      return new Date(item.date) >= new Date(startDateStr);
    });
    
    // Process data with moving average if enabled
    const processedData = showMovingAverage 
      ? calculateMovingAverage(filteredPriceData, 7) 
      : filteredPriceData;
    
    // Add events to the data
    const dataWithEvents = processedData.map(pricePoint => {
      const matchingEvent = eventsData.find(event => event.date === pricePoint.date);
      return {
        ...pricePoint,
        event: matchingEvent ? matchingEvent.event : null,
        eventType: matchingEvent ? matchingEvent.type : null,
        eventDesc: matchingEvent ? matchingEvent.description : null
      };
    });
    
    setData(dataWithEvents);
  }, [selectedRange, showMovingAverage]);

  // Filter change points based on the current date range
  const visibleChangePoints = showChangePoints ? changePoints.filter(cp => {
    return data.some(d => d.date === cp.date);
  }) : [];

  // Custom tooltip to show event details
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-md">
          <p className="font-bold">{new Date(dataPoint.date).toLocaleDateString()}</p>
          <p className="text-blue-500">Price: ${dataPoint.price.toFixed(2)}</p>
          
          {dataPoint.ma && (
            <p className="text-purple-500">Moving Avg: ${dataPoint.ma.toFixed(2)}</p>
          )}
          
          {dataPoint.event && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="font-bold text-red-500">{dataPoint.event}</p>
              <p className="text-sm">{dataPoint.eventDesc}</p>
              <p className="text-xs text-gray-500">Type: {dataPoint.eventType}</p>
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };

  // Format the X-axis date labels
  const formatXAxis = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().substr(-2)}`;
  };

  // Handle event hover to show details
  const handleMouseOver = (data, index) => {
    if (data[index] && data[index].event) {
      setHoveredEvent(data[index]);
    }
  };

  const handleMouseLeave = () => {
    setHoveredEvent(null);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex space-x-2 mb-2 sm:mb-0">
          <button 
            className={`px-3 py-1 text-sm rounded-md ${selectedRange === '3m' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedRange('3m')}
          >
            3M
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${selectedRange === '6m' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedRange('6m')}
          >
            6M
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${selectedRange === '1y' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedRange('1y')}
          >
            1Y
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${selectedRange === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedRange('all')}
          >
            All
          </button>
        </div>
        
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-500"
              checked={showMovingAverage}
              onChange={() => setShowMovingAverage(!showMovingAverage)}
            />
            <span className="ml-2 text-sm">Moving Average</span>
          </label>
          
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-500"
              checked={showChangePoints}
              onChange={() => setShowChangePoints(!showChangePoints)}
            />
            <span className="ml-2 text-sm">Change Points</span>
          </label>
          
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-500"
              checked={showEvents}
              onChange={() => setShowEvents(!showEvents)}
            />
            <span className="ml-2 text-sm">Events</span>
          </label>
        </div>
      </div>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
            onMouseMove={(e) => e && e.activeTooltipIndex !== undefined && handleMouseOver(data, e.activeTooltipIndex)}
            onMouseLeave={handleMouseLeave}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxis} 
              tick={{fontSize: 10}}
              interval={'preserveStartEnd'}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              label={{ value: 'Brent Oil Price (USD)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Oil price line */}
            <Line 
              type="monotone" 
              dataKey="price" 
              name="Oil Price" 
              stroke="#ff7300" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8, onClick: (e, payload) => console.log(payload) }}
            />
            
            {/* Moving average line */}
            {showMovingAverage && (
              <Line 
                type="monotone" 
                dataKey="ma" 
                name="Moving Avg (7d)" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            )}
            
            {/* Event markers */}
            {showEvents && data.map((entry, index) => {
              if (entry.event) {
                return (
                  <ReferenceLine 
                    key={`event-${index}`}
                    x={entry.date} 
                    stroke="red"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    label={{ 
                      value: "⚠️", 
                      position: 'top',
                      fill: 'red',
                      fontSize: 12
                    }}
                  />
                );
              }
              return null;
            })}
            
            {/* Change point markers */}
            {showChangePoints && visibleChangePoints.map((point, index) => (
              <ReferenceLine
                key={`cp-${index}`}
                x={point.date}
                stroke="#4CAF50"
                strokeWidth={2}
                label={{
                  value: "📊",
                  position: 'bottom',
                  fill: '#4CAF50',
                  fontSize: 12
                }}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      {/* Display info about hovered event */}
      {hoveredEvent && hoveredEvent.event && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="font-bold text-blue-800">{hoveredEvent.event} ({hoveredEvent.date})</h3>
          <p className="text-gray-700">{hoveredEvent.eventDesc}</p>
        </div>
      )}
    </div>
  );
};

export default OilPriceChart;