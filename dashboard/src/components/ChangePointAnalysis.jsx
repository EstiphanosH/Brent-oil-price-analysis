import React, { useState, useEffect } from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { brentOilPriceData, changePoints, detectChangePoints } from '../data/oilPriceData';
import { eventsData } from '../data/eventData';

const ChangePointAnalysis = () => {
  const [detectedChangePoints, setDetectedChangePoints] = useState([]);
  const [sensitivity, setSensitivity] = useState(2.0);
  const [windowSize, setWindowSize] = useState(10);
  const [showActualChangePoints, setShowActualChangePoints] = useState(true);
  const [showDetectedChangePoints, setShowDetectedChangePoints] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const [selectedChangePoint, setSelectedChangePoint] = useState(null);
  
  useEffect(() => {
    // Detect change points using the algorithm
    if (showDetectedChangePoints) {
      const detected = detectChangePoints(brentOilPriceData, sensitivity, windowSize);
      setDetectedChangePoints(detected);
    }
  }, [sensitivity, windowSize, showDetectedChangePoints]);
  
  // Prepare data for visualization
  const scatterData = brentOilPriceData.map((point, index) => ({
    x: new Date(point.date).getTime(),
    y: point.price,
    z: 1, // Standard size for price points
    date: point.date
  }));
  
  // Add change points to scatter data with larger size
  const changePointScatterData = changePoints.map(cp => ({
    x: new Date(cp.date).getTime(),
    y: cp.price,
    z: 5, // Larger size for change points
    date: cp.date,
    isChangePoint: true
  }));
  
  // Add detected change points to scatter data
  const detectedChangePointScatterData = detectedChangePoints.map(cp => ({
    x: new Date(cp.date).getTime(),
    y: cp.price,
    z: 5, // Larger size for change points
    date: cp.date,
    isDetected: true,
    zScore: cp.zScore
  }));
  
  // Format date for X-axis ticks
  const formatXAxis = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getFullYear().toString().substr(-2)}`;
  };
  
  // Custom tooltip for data points
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-bold">{new Date(data.date).toLocaleDateString()}</p>
          <p className="text-blue-600">Price: ${data.y.toFixed(2)}</p>
          
          {data.isChangePoint && (
            <p className="text-green-600 font-semibold">Significant Change Point</p>
          )}
          
          {data.isDetected && (
            <p className="text-purple-600 font-semibold">
              Detected Change Point (Z-Score: {data.zScore.toFixed(2)})
            </p>
          )}
          
          {/* Show any events that occurred on this date */}
          {eventsData.find(e => e.date === data.date) && (
            <div className="mt-1 pt-1 border-t border-gray-200">
              <p className="text-red-600 font-semibold">
                Event: {eventsData.find(e => e.date === data.date).event}
              </p>
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };
  
  // Handle change point selection for detailed analysis
  const handleChangePointSelect = (point) => {
    setSelectedChangePoint(point);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-lg font-semibold">Change Point Detection Analysis</h2>
        
        <div className="flex flex-wrap items-center space-x-4 mt-2 sm:mt-0">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
              checked={showActualChangePoints}
              onChange={() => setShowActualChangePoints(!showActualChangePoints)}
            />
            <span className="ml-2 text-sm">Known Change Points</span>
          </label>
          
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-purple-600"
              checked={showDetectedChangePoints}
              onChange={() => setShowDetectedChangePoints(!showDetectedChangePoints)}
            />
            <span className="ml-2 text-sm">Detected Change Points</span>
          </label>
          
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-red-600"
              checked={showEvents}
              onChange={() => setShowEvents(!showEvents)}
            />
            <span className="ml-2 text-sm">Events</span>
          </label>
        </div>
      </div>
      
      {/* Algorithm parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <label htmlFor="sensitivity" className="block text-sm font-medium text-gray-700">
            Detection Sensitivity (Z-Score Threshold): {sensitivity.toFixed(1)}
          </label>
          <input
            type="range"
            id="sensitivity"
            min="1"
            max="5"
            step="0.1"
            value={sensitivity}
            onChange={(e) => setSensitivity(parseFloat(e.target.value))}
            className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">
            Lower values detect more change points (more sensitive)
          </p>
        </div>
        
        <div>
          <label htmlFor="windowSize" className="block text-sm font-medium text-gray-700">
            Analysis Window Size: {windowSize}
          </label>
          <input
            type="range"
            id="windowSize"
            min="5"
            max="20"
            step="1"
            value={windowSize}
            onChange={(e) => setWindowSize(parseInt(e.target.value))}
            className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">
            Window of data points to analyze for changes
          </p>
        </div>
      </div>
      
      {/* Change Points Scatter Plot */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-md font-medium mb-4">Change Point Detection Visualization</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Date" 
                domain={['auto', 'auto']} 
                tickFormatter={formatXAxis} 
                scale="time"
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Price" 
                domain={['auto', 'auto']} 
                label={{ value: 'Brent Oil Price (USD)', angle: -90, position: 'insideLeft' }}
              />
              <ZAxis type="number" dataKey="z" range={[30, 300]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
              <Legend />
              
              {/* Base oil price data */}
              <Scatter 
                name="Oil Price Points" 
                data={scatterData} 
                fill="#8884d8" 
                line={{ stroke: '#8884d8', strokeWidth: 1 }} 
                shape="circle"
              />
              
              {/* Known change points */}
              {showActualChangePoints && (
                <Scatter
                  name="Known Change Points"
                  data={changePointScatterData}
                  fill="#4CAF50"
                  shape="star"
                  onClick={handleChangePointSelect}
                />
              )}
              
              {/* Detected change points */}
              {showDetectedChangePoints && (
                <Scatter
                  name="Detected Change Points"
                  data={detectedChangePointScatterData}
                  fill="#9C27B0"
                  shape="triangle"
                  onClick={handleChangePointSelect}
                />
              )}
              
              {/* Event reference lines */}
              {showEvents && eventsData.map((event, index) => (
                <ReferenceLine
                  key={`event-${index}`}
                  x={new Date(event.date).getTime()}
                  stroke="red"
                  strokeDasharray="3 3"
                  label={{
                    value: "⚠️",
                    position: 'top',
                    fill: 'red',
                    fontSize: 12
                  }}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Change Point Details */}
      {selectedChangePoint && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-md font-medium mb-4">Change Point Analysis</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold mb-2">Selected Change Point:</h4>
              <p className="mb-1"><span className="font-semibold">Date:</span> {new Date(selectedChangePoint.date).toLocaleDateString()}</p>
              <p className="mb-1"><span className="font-semibold">Price:</span> ${selectedChangePoint.y.toFixed(2)}</p>
              
              {selectedChangePoint.isDetected && (
                <p className="mb-1"><span className="font-semibold">Z-Score:</span> {selectedChangePoint.zScore.toFixed(2)}</p>
              )}
              
              {/* Find the nearest event to this change point */}
              {(() => {
                const cpDate = new Date(selectedChangePoint.date);
                let nearestEvent = null;
                let minDayDiff = Infinity;
                
                eventsData.forEach(event => {
                  const eventDate = new Date(event.date);
                  const dayDiff = Math.abs((cpDate - eventDate) / (1000 * 60 * 60 * 24));
                  
                  if (dayDiff < minDayDiff && dayDiff <= 14) { // Within 14 days
                    minDayDiff = dayDiff;
                    nearestEvent = event;
                  }
                });
                
                if (nearestEvent) {
                  return (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <h4 className="text-sm font-semibold mb-1">Nearest Event:</h4>
                      <p className="text-sm mb-1"><span className="font-semibold">Event:</span> {nearestEvent.event}</p>
                      <p className="text-sm mb-1"><span className="font-semibold">Date:</span> {new Date(nearestEvent.date).toLocaleDateString()}</p>
                      <p className="text-sm mb-1"><span className="font-semibold">Type:</span> {nearestEvent.type}</p>
                      <p className="text-sm"><span className="font-semibold">Days Apart:</span> {minDayDiff.toFixed(0)} days</p>
                    </div>
                  );
                }
                return <p className="mt-4 text-gray-500">No related events found within 14 days.</p>;
              })()}
            </div>
            
            <div className="p-4 bg-blue-50 rounded-md">
              <h4 className="text-sm font-semibold mb-2">Price Impact Analysis:</h4>
              {(() => {
                // Find price 7 days before and 7 days after the change point
                const cpDate = new Date(selectedChangePoint.date);
                const cpIndex = brentOilPriceData.findIndex(d => d.date === selectedChangePoint.date);
                
                if (cpIndex > 7 && cpIndex < brentOilPriceData.length - 7) {
                  const beforePrice = brentOilPriceData[cpIndex - 7].price;
                  const afterPrice = brentOilPriceData[cpIndex + 7].price;
                  const changePercent = ((afterPrice - beforePrice) / beforePrice) * 100;
                  
                  return (
                    <>
                      <p className="mb-1"><span className="font-semibold">Price 7 days before:</span> ${beforePrice.toFixed(2)}</p>
                      <p className="mb-1"><span className="font-semibold">Price 7 days after:</span> ${afterPrice.toFixed(2)}</p>
                      <p className={`font-semibold ${changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        7-day Impact: {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
                      </p>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold mb-2">Interpretation:</h4>
                        <p className="text-sm text-gray-700">
                          {changePercent >= 5 ? 'This change point indicates a major positive shift in oil prices.' :
                          changePercent <= -5 ? 'This change point indicates a major negative shift in oil prices.' :
                          changePercent > 0 ? 'This change point indicates a minor positive shift in oil prices.' :
                          'This change point indicates a minor negative shift in oil prices.'}
                        </p>
                        <p className="text-sm text-gray-700 mt-2">
                          The change was {Math.abs(changePercent) > 10 ? 'significant' : 'moderate'} and {
                            eventsData.some(e => {
                              const eventDate = new Date(e.date);
                              return Math.abs((cpDate - eventDate) / (1000 * 60 * 60 * 24)) <= 7;
                            }) ? 'appears to be correlated with a nearby event.' : 'does not directly correlate with any specific event.'
                          }
                        </p>
                      </div>
                    </>
                  );
                } else {
                  return <p className="text-gray-500">Insufficient data to perform 7-day impact analysis.</p>;
                }
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePointAnalysis;