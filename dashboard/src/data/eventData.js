// Historical events data that affected oil prices (1987-2024)
// Sources: U.S. Energy Information Administration, OPEC, World Bank, and financial news archives
export const eventsData = [
  // 1980s-1990s Events
  {
    date: '1990-08-02',
    event: 'Iraq Invasion of Kuwait',
    type: 'Geopolitical',
    source: 'Global News Archives',
    price: 19.92,
    percent_change: 12.67,
    description: 'Iraq invades Kuwait, triggering immediate concerns about Middle East oil supplies.'
  },
  {
    date: '1990-09-28',
    event: 'Gulf War Price Peak',
    type: 'Geopolitical',
    source: 'Oil Price Historical Data',
    price: 40.06,
    percent_change: 28.92,
    description: 'Oil prices more than doubled as war in the Gulf threatened supplies from the entire region.'
  },
  {
    date: '1991-01-17',
    event: 'Operation Desert Storm',
    type: 'Geopolitical',
    source: 'Military Records',
    price: 30.15,
    percent_change: 5.82,
    description: 'The U.S.-led coalition begins military operations to liberate Kuwait.'
  },
  {
    date: '1991-03-31',
    event: 'Gulf War Ends',
    type: 'Geopolitical',
    source: 'Global News Archives',
    price: 19.50,
    percent_change: -32.48,
    description: 'Oil prices dropped as the Gulf War ended and supply fears subsided.'
  },
  {
    date: '1997-07-02',
    event: 'Asian Financial Crisis Begins',
    type: 'Economic',
    source: 'Financial Records',
    price: 18.28,
    percent_change: -4.62,
    description: 'Thailand devalues its currency, triggering financial crisis across Asia that reduced oil demand.'
  },
  {
    date: '1998-12-10',
    event: 'Asian Crisis Oil Price Low',
    type: 'Economic',
    source: 'Oil Price Historical Data',
    price: 10.72,
    percent_change: -31.86,
    description: 'Oil prices reached their lowest point in the aftermath of the Asian financial crisis.'
  },
  {
    date: '1999-03-10',
    event: 'OPEC Production Cuts',
    type: 'Supply',
    source: 'OPEC Archives',
    price: 14.68,
    percent_change: 12.75,
    description: 'OPEC agrees to cut production by 1.7 million barrels per day to counter low prices.'
  },

  // 2000s Events
  {
    date: '2001-09-11',
    event: '9/11 Terrorist Attacks',
    type: 'Geopolitical',
    source: 'Historical Records',
    price: 29.06,
    percent_change: -3.25,
    description: 'Terrorist attacks in the United States created global uncertainty and market instability.'
  },
  {
    date: '2003-03-20',
    event: 'Iraq War Begins',
    type: 'Geopolitical',
    source: 'Military Archives',
    price: 29.88,
    percent_change: 5.63,
    description: 'U.S.-led invasion of Iraq begins, affecting one of the world\'s major oil producers.'
  },
  {
    date: '2005-08-29',
    event: 'Hurricane Katrina',
    type: 'Natural Disaster',
    source: 'Weather Data',
    price: 69.91,
    percent_change: 7.82,
    description: 'Hurricane Katrina hits Gulf Coast, damaging U.S. oil infrastructure and reducing production.'
  },
  {
    date: '2008-07-03',
    event: 'All-Time Price High',
    type: 'Market',
    source: 'Financial Data',
    price: 146.08,
    percent_change: 3.56,
    description: 'Oil reaches an all-time high price amid strong demand, tight supply, and financial speculation.'
  },
  {
    date: '2008-09-15',
    event: 'Lehman Brothers Bankruptcy',
    type: 'Economic',
    source: 'Financial Archives',
    price: 91.92,
    percent_change: -6.84,
    description: 'Collapse of Lehman Brothers intensifies the global financial crisis, leading to reduced oil demand.'
  },
  {
    date: '2008-12-24',
    event: 'Financial Crisis Low',
    type: 'Economic',
    source: 'Oil Market Data',
    price: 34.04,
    percent_change: -6.45,
    description: 'Oil reaches its lowest point during the financial crisis as global demand collapses.'
  },

  // 2010s Events
  {
    date: '2011-02-15',
    event: 'Arab Spring Begins',
    type: 'Geopolitical',
    source: 'International Relations Archives',
    price: 103.96,
    percent_change: 8.31,
    description: 'Political unrest spreads across the Middle East, creating uncertainty in key oil-producing regions.'
  },
  {
    date: '2014-11-27',
    event: 'OPEC Refuses Production Cut',
    type: 'Supply',
    source: 'OPEC Statement',
    price: 70.15,
    percent_change: -9.72,
    description: 'OPEC decides not to cut production despite falling prices, starting a price war with U.S. shale producers.'
  },
  {
    date: '2015-01-13',
    event: 'Oil Price Crash',
    type: 'Market',
    source: 'Market Data',
    price: 45.13,
    percent_change: -5.89,
    description: 'Oil prices crash as oversupply from U.S. shale and weakening global demand create perfect storm.'
  },
  {
    date: '2016-01-20',
    event: '12-Year Price Low',
    type: 'Market',
    source: 'Oil Market Data',
    price: 27.88,
    percent_change: -6.81,
    description: 'Oil reaches its lowest price since 2003 amid persistent oversupply and China economic concerns.'
  },
  {
    date: '2016-11-30',
    event: 'OPEC Production Cut Agreement',
    type: 'Supply',
    source: 'OPEC Statement',
    price: 50.47,
    percent_change: 8.82,
    description: 'OPEC and non-OPEC producers agree to cut production by 1.8 million barrels per day.'
  },
  {
    date: '2018-10-03',
    event: 'Four-Year High',
    type: 'Market',
    source: 'Oil Market Data',
    price: 86.29,
    percent_change: 2.25,
    description: 'Oil reaches a four-year high on concerns about reduced global supply.'
  },
  {
    date: '2018-12-26',
    event: 'Q4 Market Crash',
    type: 'Economic',
    source: 'Financial Markets',
    price: 50.47,
    percent_change: -6.24,
    description: 'Oil prices collapse as broader financial markets crash on global economic concerns.'
  },

  // 2020s Events
  {
    date: '2020-01-20',
    event: 'COVID-19 Outbreak',
    type: 'Economic',
    source: 'Health Organizations',
    price: 64.20,
    percent_change: -1.88,
    description: 'COVID-19 outbreak begins to affect markets as pandemic fears emerge.'
  },
  {
    date: '2020-03-09',
    event: 'Oil Price War Begins',
    type: 'Supply',
    source: 'OPEC Statement',
    price: 34.36,
    percent_change: -24.59,
    description: 'Saudi Arabia and Russia begin oil price war, flooding market with excess supply.'
  },
  {
    date: '2020-04-21',
    event: 'COVID-19 Price Low',
    type: 'Economic',
    source: 'Oil Market Data',
    price: 19.33,
    percent_change: -8.94,
    description: 'Oil hits multi-decade low as COVID-19 lockdowns decimate global demand.'
  },
  {
    date: '2021-10-26',
    event: 'Post-COVID Recovery High',
    type: 'Economic',
    source: 'Market Data',
    price: 86.40,
    percent_change: 1.68,
    description: 'Oil reaches post-pandemic high as global economic recovery increases demand.'
  },
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
  },
  {
    date: '2024-04-01',
    event: 'Global Production Uncertainty',
    type: 'Supply',
    source: 'Market Analysis',
    price: 89.35,
    percent_change: 2.63,
    description: 'Geopolitical uncertainties and supply constraints push oil prices higher.'
  },
  {
    date: '2024-06-03',
    event: 'Demand Concerns',
    type: 'Economic',
    source: 'Financial Outlook',
    price: 78.36,
    percent_change: -4.38,
    description: 'Oil prices drop on concerns about weaker global economic outlook and reduced demand forecasts.'
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