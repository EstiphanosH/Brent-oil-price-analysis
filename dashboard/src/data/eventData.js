// Sample events data that affected oil prices
export const eventsData = [
  {
    date: '2022-02-24',
    event: 'Russia-Ukraine Conflict',
    type: 'Geopolitical',
    source: 'Global News',
    price: 99.08,
    percent_change: 8.59,
    description: 'Russia invades Ukraine, leading to sanctions and energy supply concerns.'
  },
  {
    date: '2022-03-08',
    event: 'US Ban on Russian Oil',
    type: 'Policy',
    source: 'US Government',
    price: 127.98,
    percent_change: 4.32,
    description: 'The United States announces a ban on Russian oil imports.'
  },
  {
    date: '2022-06-14',
    event: 'Peak Oil Price',
    type: 'Market',
    source: 'Market Data',
    price: 118.93,
    percent_change: 0.85,
    description: 'Brent crude oil reaches its highest price since 2014.'
  },
  {
    date: '2022-07-05',
    event: 'Recession Fears',
    type: 'Economic',
    source: 'Financial Analysis',
    price: 102.77,
    percent_change: -9.45,
    description: 'Growing fears of global recession trigger a sharp drop in oil prices.'
  },
  {
    date: '2022-12-05',
    event: 'G7 Price Cap',
    type: 'Policy',
    source: 'G7 Statement',
    price: 82.68,
    percent_change: -2.17,
    description: 'G7 nations implement a price cap on Russian oil.'
  },
  {
    date: '2023-03-15',
    event: 'Banking Crisis',
    type: 'Economic',
    source: 'Banking Sector',
    price: 73.20,
    percent_change: -7.52,
    description: 'Collapse of Silicon Valley Bank and banking sector instability leads to market concerns.'
  },
  {
    date: '2023-04-03',
    event: 'OPEC+ Production Cut',
    type: 'Supply',
    source: 'OPEC Statement',
    price: 84.93,
    percent_change: 6.31,
    description: 'OPEC+ announces surprise oil production cut of more than 1 million barrels per day.'
  },
  {
    date: '2023-09-27',
    event: 'Middle East Tensions',
    type: 'Geopolitical',
    source: 'International News',
    price: 96.55,
    percent_change: 2.85,
    description: 'Rising tensions in the Middle East raise concerns about potential disruptions to oil supply.'
  },
  {
    date: '2023-10-07',
    event: 'Middle East Conflict',
    type: 'Geopolitical',
    source: 'International News',
    price: 90.89,
    percent_change: 5.68,
    description: 'Escalation of conflict in the Middle East raises oil supply concerns.'
  },
  {
    date: '2023-11-30',
    event: 'OPEC+ Meeting',
    type: 'Supply',
    source: 'OPEC Statement',
    price: 82.85,
    percent_change: -0.82,
    description: 'OPEC+ extends voluntary oil output cuts into 2024.'
  }
];

// Categorize events by type for filtering
export const eventTypes = [...new Set(eventsData.map(event => event.type))];

// Get events within a date range
export const getEventsInRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return eventsData.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= start && eventDate <= end;
  });
};

// Get events by type
export const getEventsByType = (type) => {
  if (!type || type === 'All') {
    return eventsData;
  }
  return eventsData.filter(event => event.type === type);
};

// Get event by date
export const getEventByDate = (date) => {
  return eventsData.find(event => event.date === date);
};

// Calculate price impact statistics
export const calculateEventImpact = () => {
  const impactByType = {};
  
  eventTypes.forEach(type => {
    const typeEvents = getEventsByType(type);
    const avgChange = typeEvents.reduce((sum, event) => sum + event.percent_change, 0) / typeEvents.length;
    
    impactByType[type] = {
      count: typeEvents.length,
      avgPercentChange: avgChange,
      maxChange: Math.max(...typeEvents.map(e => e.percent_change)),
      minChange: Math.min(...typeEvents.map(e => e.percent_change))
    };
  });
  
  return impactByType;
};