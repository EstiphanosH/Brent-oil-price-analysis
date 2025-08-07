import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { eventsData, eventTypes, calculateEventImpact } from '../data/eventData';
import { COLORS } from '../data/mockData';

const EventAnalysis = () => {
  const [selectedEventType, setSelectedEventType] = useState('All');
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [eventImpact, setEventImpact] = useState({});
  
  useEffect(() => {
    // Filter events by selected type
    if (selectedEventType === 'All') {
      setFilteredEvents(eventsData);
    } else {
      setFilteredEvents(eventsData.filter(event => event.type === selectedEventType));
    }
    
    // Calculate impact statistics
    setEventImpact(calculateEventImpact());
  }, [selectedEventType]);
  
  // Prepare data for the event type distribution chart
  const eventTypeDistribution = eventTypes.map(type => ({
    name: type,
    value: eventsData.filter(event => event.type === type).length
  }));
  
  // Prepare data for the price impact chart
  const priceImpactData = Object.keys(eventImpact).map(type => ({
    name: type,
    avgImpact: eventImpact[type]?.avgPercentChange || 0
  }));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Event Analysis</h2>
        
        <div className="mt-2 sm:mt-0">
          <select
            className="form-select rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={selectedEventType}
            onChange={(e) => setSelectedEventType(e.target.value)}
          >
            <option value="All">All Event Types</option>
            {eventTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Type Distribution Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-md font-medium mb-4">Event Type Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={eventTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {eventTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} events`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Price Impact Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-md font-medium mb-4">Average Price Impact by Event Type (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={priceImpactData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: '% Change', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                <Legend />
                <Bar 
                  dataKey="avgImpact" 
                  name="Avg. Price Change (%)" 
                  isAnimationActive={true}
                  animationDuration={1000}
                  // Color bars based on positive/negative impact
                  fill={(entry) => entry.avgImpact >= 0 ? '#4CAF50' : '#FF5252'}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Event List Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm overflow-x-auto">
        <h3 className="text-md font-medium mb-4">Events List {selectedEventType !== 'All' ? `(${selectedEventType})` : ''}</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (USD)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change (%)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEvents.map((event, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {event.event}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {event.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${event.price.toFixed(2)}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${event.percent_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {event.percent_change >= 0 ? '+' : ''}{event.percent_change.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventAnalysis;