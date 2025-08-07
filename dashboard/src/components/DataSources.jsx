import React, { useState } from 'react';
import { brentOilPriceData } from '../data/oilPriceData';
import { eventsData } from '../data/eventData';

const DataSources = () => {
  const [showPriceData, setShowPriceData] = useState(false);
  const [showEventData, setShowEventData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('all');
  const [filterType, setFilterType] = useState('all');
  
  // Extract unique years from the dataset for filtering
  const years = [...new Set(brentOilPriceData.map(item => 
    new Date(item.date).getFullYear().toString()
  ))].sort();
  
  // Extract event types for filtering
  const eventTypes = [...new Set(eventsData.map(event => event.type))];
  
  // Filter price data based on search term and year
  const filteredPriceData = brentOilPriceData.filter(item => {
    const itemYear = new Date(item.date).getFullYear().toString();
    return (
      (filterYear === 'all' || itemYear === filterYear) &&
      (searchTerm === '' || item.date.includes(searchTerm) || item.price.toString().includes(searchTerm))
    );
  });
  
  // Filter event data based on search term, year, and type
  const filteredEventData = eventsData.filter(item => {
    const itemYear = new Date(item.date).getFullYear().toString();
    return (
      (filterYear === 'all' || itemYear === filterYear) &&
      (filterType === 'all' || item.type === filterType) &&
      (searchTerm === '' || 
       item.date.includes(searchTerm) || 
       item.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.price.toString().includes(searchTerm))
    );
  });
  
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Data Sources</h2>
      
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              id="search"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by date, event, description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="yearFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Year</label>
            <select
              id="yearFilter"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
            <select
              id="typeFilter"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          <div>
            <button
              onClick={() => setShowPriceData(!showPriceData)}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 transition-transform ${showPriceData ? 'transform rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Brent Oil Price Data ({filteredPriceData.length} records)
            </button>
            
            {showPriceData && (
              <div className="mt-2 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (USD)</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPriceData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">${item.price.toFixed(2)}</td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                          {(() => {
                            const matchingEvent = eventsData.find(event => event.date === item.date);
                            return matchingEvent ? matchingEvent.event : '';
                          })()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div>
            <button
              onClick={() => setShowEventData(!showEventData)}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 transition-transform ${showEventData ? 'transform rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Event Data ({filteredEventData.length} records)
            </button>
            
            {showEventData && (
              <div className="mt-2 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (USD)</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Change</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEventData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.event}</td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">${item.price.toFixed(2)}</td>
                        <td className={`px-6 py-2 whitespace-nowrap text-sm ${item.percent_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.percent_change >= 0 ? '+' : ''}{item.percent_change.toFixed(2)}%
                        </td>
                        <td className="px-6 py-2 text-sm text-gray-500 max-w-md">{item.description}</td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">{item.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-md font-medium mb-2">Data Sources Information</h3>
        <p className="text-sm text-gray-600 mb-4">
          The Brent oil price data in this application has been sourced from the U.S. Energy Information Administration (EIA) and covers the period from January 1987 to August 2024. Selected key points have been included to highlight significant price movements.
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Event data has been compiled from multiple sources including OPEC press releases, World Bank reports, financial news archives, and historical market records. Events are categorized by type (Economic, Geopolitical, Market, Policy, Supply, Natural Disaster) to enable analysis of how different factors affect oil prices.
        </p>
        <p className="text-sm text-gray-600">
          Change point detection uses a z-score based algorithm that identifies statistically significant shifts in price trends by comparing moving windows of price data. The detection sensitivity and window size can be adjusted in the Change Point Analysis tab.
        </p>
      </div>
    </div>
  );
};

export default DataSources;