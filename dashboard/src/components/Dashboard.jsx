import React, { useState } from 'react';
import OilPriceChart from './charts/OilPriceChart';
import EventAnalysis from './EventAnalysis';
import ChangePointAnalysis from './ChangePointAnalysis';
import SummaryStats from './SummaryStats';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Brent Oil Price Change Point Analysis</h1>
        
        <div className="flex space-x-2 overflow-x-auto pb-2 mt-2 sm:mt-0">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'events' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('events')}
          >
            Event Analysis
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'changepoints' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('changepoints')}
          >
            Change Point Detection
          </button>
        </div>
      </div>
      
      {/* Summary Stats */}
      {activeTab === 'overview' && (
        <>
          <div className="mb-6">
            <SummaryStats />
          </div>
          
          {/* Oil Price Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Brent Oil Price Trends</h2>
            <OilPriceChart />
          </div>
        </>
      )}
      
      {/* Event Analysis */}
      {activeTab === 'events' && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <EventAnalysis />
        </div>
      )}
      
      {/* Change Point Analysis */}
      {activeTab === 'changepoints' && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <ChangePointAnalysis />
        </div>
      )}
      
      {/* Footer with explanation */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
        <h3 className="text-lg font-medium text-gray-800 mb-2">About This Dashboard</h3>
        <p className="text-gray-600 mb-2">
          This dashboard analyzes how significant events affect Brent oil prices. It identifies change points in price trends and correlates them with global events.
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Data Sources:</span> Historical Brent oil price data and major global events that impacted oil markets.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;