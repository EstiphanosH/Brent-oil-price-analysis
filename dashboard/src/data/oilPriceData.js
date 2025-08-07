// Brent oil price historical data from 1987 to present
// Source: U.S. Energy Information Administration (EIA)
export const brentOilPriceData = [
  // 1987-1989 (Selected key points)
  { date: '1987-01-02', price: 18.45 },
  { date: '1987-06-15', price: 19.75 },
  { date: '1987-12-31', price: 17.35 },
  { date: '1988-06-15', price: 16.20 },
  { date: '1988-12-30', price: 15.95 },
  { date: '1989-06-15', price: 19.45 },
  { date: '1989-12-29', price: 22.10 },
  
  // 1990s (Gulf War and other events)
  { date: '1990-01-15', price: 22.85 },
  { date: '1990-07-15', price: 18.45 },
  { date: '1990-08-02', price: 19.92 }, // Iraq invasion of Kuwait
  { date: '1990-09-28', price: 40.06 }, // Gulf War peak
  { date: '1990-12-31', price: 28.20 },
  { date: '1991-01-17', price: 30.15 }, // Operation Desert Storm begins
  { date: '1991-03-31', price: 19.50 }, // Gulf War ends
  { date: '1991-06-30', price: 20.42 },
  { date: '1991-12-31', price: 18.58 },
  { date: '1992-06-30', price: 21.85 },
  { date: '1992-12-31', price: 18.24 },
  { date: '1993-06-30', price: 18.90 },
  { date: '1993-12-31', price: 14.15 },
  { date: '1994-06-30', price: 18.65 },
  { date: '1994-12-30', price: 16.75 },
  { date: '1995-06-30', price: 17.42 },
  { date: '1995-12-29', price: 18.40 },
  { date: '1996-06-28', price: 20.50 },
  { date: '1996-12-31', price: 25.10 },
  { date: '1997-06-30', price: 18.35 },
  { date: '1997-12-31', price: 17.10 },
  { date: '1998-06-30', price: 13.72 },
  { date: '1998-12-10', price: 10.72 }, // Asian financial crisis low
  { date: '1998-12-31', price: 11.28 },
  { date: '1999-03-10', price: 14.68 }, // OPEC production cuts
  { date: '1999-06-30', price: 17.95 },
  { date: '1999-12-31', price: 25.60 },
  
  // 2000s (Dot-com bubble, 9/11, Iraq War, Financial Crisis)
  { date: '2000-06-30', price: 32.50 },
  { date: '2000-09-15', price: 36.88 }, // Price peak before decline
  { date: '2000-12-29', price: 25.15 },
  { date: '2001-06-29', price: 27.85 },
  { date: '2001-09-11', price: 29.06 }, // 9/11 attacks
  { date: '2001-12-31', price: 19.84 },
  { date: '2002-06-28', price: 25.75 },
  { date: '2002-12-31', price: 31.20 },
  { date: '2003-03-20', price: 29.88 }, // Iraq War begins
  { date: '2003-06-30', price: 27.65 },
  { date: '2003-12-31', price: 30.30 },
  { date: '2004-06-30', price: 37.05 },
  { date: '2004-12-31', price: 40.74 },
  { date: '2005-06-30', price: 56.50 },
  { date: '2005-08-29', price: 69.91 }, // Hurricane Katrina
  { date: '2005-12-30', price: 61.04 },
  { date: '2006-06-30', price: 73.93 },
  { date: '2006-12-29', price: 60.77 },
  { date: '2007-06-29', price: 70.68 },
  { date: '2007-12-31', price: 96.00 },
  { date: '2008-07-03', price: 146.08 }, // All-time high before crash
  { date: '2008-12-24', price: 34.04 }, // Financial crisis low
  { date: '2008-12-31', price: 45.59 },
  { date: '2009-06-30', price: 69.89 },
  { date: '2009-12-31', price: 77.93 },
  
  // 2010s (Arab Spring, Shale Revolution, OPEC price war)
  { date: '2010-06-30', price: 75.01 },
  { date: '2010-12-31', price: 94.75 },
  { date: '2011-02-15', price: 103.96 }, // Arab Spring begins
  { date: '2011-06-30', price: 112.48 },
  { date: '2011-12-30', price: 107.38 },
  { date: '2012-06-29', price: 97.80 },
  { date: '2012-12-31', price: 111.11 },
  { date: '2013-06-28', price: 102.16 },
  { date: '2013-12-31', price: 110.80 },
  { date: '2014-06-30', price: 112.36 },
  { date: '2014-11-27', price: 70.15 }, // OPEC refuses to cut production
  { date: '2014-12-31', price: 55.27 },
  { date: '2015-01-13', price: 45.13 }, // Oil price crash
  { date: '2015-06-30', price: 61.48 },
  { date: '2015-12-31', price: 37.28 },
  { date: '2016-01-20', price: 27.88 }, // 12-year low
  { date: '2016-06-30', price: 49.68 },
  { date: '2016-11-30', price: 50.47 }, // OPEC production cut agreement
  { date: '2016-12-30', price: 56.82 },
  { date: '2017-06-30', price: 47.92 },
  { date: '2017-12-29', price: 66.87 },
  { date: '2018-06-29', price: 79.44 },
  { date: '2018-10-03', price: 86.29 }, // Four-year high
  { date: '2018-12-26', price: 50.47 }, // Q4 crash
  { date: '2018-12-31', price: 53.80 },
  { date: '2019-06-28', price: 66.55 },
  { date: '2019-12-31', price: 66.00 },
  
  // 2020s (COVID-19 Pandemic, Russia-Ukraine War)
  { date: '2020-01-20', price: 64.20 }, // COVID-19 outbreak
  { date: '2020-03-09', price: 34.36 }, // Oil price war begins
  { date: '2020-04-21', price: 19.33 }, // COVID-19 low
  { date: '2020-06-30', price: 41.15 },
  { date: '2020-12-31', price: 51.80 },
  { date: '2021-06-30', price: 75.13 },
  { date: '2021-10-26', price: 86.40 }, // Post-COVID recovery high
  { date: '2021-12-31', price: 77.78 },
  { date: '2022-01-15', price: 86.06 },
  { date: '2022-02-01', price: 89.16 },
  { date: '2022-02-24', price: 99.08 }, // Russia-Ukraine conflict begins
  { date: '2022-03-08', price: 127.98 }, // US ban on Russian oil
  { date: '2022-03-15', price: 99.91 },
  { date: '2022-04-01', price: 104.39 },
  { date: '2022-04-15', price: 111.70 },
  { date: '2022-05-01', price: 107.14 },
  { date: '2022-05-15', price: 112.55 },
  { date: '2022-06-01', price: 116.29 },
  { date: '2022-06-14', price: 118.93 }, // Peak oil price
  { date: '2022-07-01', price: 111.63 },
  { date: '2022-07-05', price: 102.77 }, // Major price drop
  { date: '2022-07-15', price: 101.16 },
  { date: '2022-08-01', price: 96.65 },
  { date: '2022-08-15', price: 95.10 },
  { date: '2022-09-01', price: 92.36 },
  { date: '2022-09-15', price: 90.46 },
  { date: '2022-10-01', price: 97.92 },
  { date: '2022-10-15', price: 93.50 },
  { date: '2022-11-01', price: 94.83 },
  { date: '2022-11-15', price: 82.45 },
  { date: '2022-12-01', price: 76.10 },
  { date: '2022-12-15', price: 75.80 },
  { date: '2023-01-01', price: 80.10 },
  { date: '2023-01-15', price: 85.28 },
  { date: '2023-02-01', price: 83.90 },
  { date: '2023-02-15', price: 82.45 },
  { date: '2023-03-01', price: 83.89 },
  { date: '2023-03-15', price: 73.20 }, // Banking crisis impact
  { date: '2023-04-01', price: 79.89 },
  { date: '2023-04-03', price: 84.93 }, // OPEC+ production cut
  { date: '2023-04-15', price: 84.60 },
  { date: '2023-05-01', price: 75.30 },
  { date: '2023-05-15', price: 76.96 },
  { date: '2023-06-01', price: 74.29 },
  { date: '2023-06-15', price: 75.67 },
  { date: '2023-07-01', price: 79.87 },
  { date: '2023-07-15', price: 80.06 },
  { date: '2023-08-01', price: 85.14 },
  { date: '2023-08-15', price: 84.89 },
  { date: '2023-09-01', price: 88.55 },
  { date: '2023-09-15', price: 93.93 },
  { date: '2023-09-27', price: 96.55 }, // Middle East tensions
  { date: '2023-10-01', price: 95.31 },
  { date: '2023-10-07', price: 90.89 }, // Middle East conflict escalation
  { date: '2023-10-15', price: 92.16 },
  { date: '2023-11-01', price: 85.41 },
  { date: '2023-11-15', price: 82.47 },
  { date: '2023-11-30', price: 82.85 }, // OPEC+ meeting
  { date: '2023-12-01', price: 79.80 },
  { date: '2023-12-15', price: 76.55 },
  { date: '2024-01-05', price: 78.76 },
  { date: '2024-01-31', price: 82.87 },
  { date: '2024-02-15', price: 83.47 },
  { date: '2024-03-01', price: 83.55 },
  { date: '2024-03-15', price: 84.93 },
  { date: '2024-04-01', price: 89.35 },
  { date: '2024-04-15', price: 90.45 },
  { date: '2024-05-01', price: 88.02 },
  { date: '2024-05-15', price: 83.69 },
  { date: '2024-06-03', price: 78.36 },
  { date: '2024-06-15', price: 81.84 },
  { date: '2024-07-01', price: 85.97 },
  { date: '2024-07-15', price: 84.73 },
  { date: '2024-08-01', price: 83.11 }  // Current date (2024-08-01)
];

// Significant historical change points
// In a real application, these would be calculated dynamically
export const changePoints = [
  { date: '1990-08-02', price: 19.92 }, // Iraq invasion of Kuwait
  { date: '1990-09-28', price: 40.06 }, // Gulf War oil price peak
  { date: '1991-01-17', price: 30.15 }, // Operation Desert Storm begins
  { date: '1998-12-10', price: 10.72 }, // Asian financial crisis low
  { date: '2001-09-11', price: 29.06 }, // 9/11 attacks
  { date: '2003-03-20', price: 29.88 }, // Iraq War begins
  { date: '2008-07-03', price: 146.08 }, // All-time high before crash
  { date: '2008-12-24', price: 34.04 }, // Financial crisis low
  { date: '2011-02-15', price: 103.96 }, // Arab Spring begins
  { date: '2014-11-27', price: 70.15 }, // OPEC refuses to cut production
  { date: '2016-01-20', price: 27.88 }, // 12-year low
  { date: '2020-03-09', price: 34.36 }, // Oil price war begins
  { date: '2020-04-21', price: 19.33 }, // COVID-19 low
  { date: '2022-02-24', price: 99.08 }, // Russia-Ukraine conflict
  { date: '2022-06-14', price: 118.93 }, // Recent peak oil price
  { date: '2023-03-15', price: 73.20 }, // Banking crisis impact
  { date: '2023-09-27', price: 96.55 } // Middle East tensions
];

// Function to calculate moving average
export const calculateMovingAverage = (data, window) => {
  const result = [];
  
  for (let i = 0; i < data.length; i++) {
    let sum = 0;
    let count = 0;
    
    for (let j = Math.max(0, i - window + 1); j <= i; j++) {
      sum += data[j].price;
      count++;
    }
    
    result.push({
      date: data[i].date,
      price: data[i].price,
      ma: sum / count
    });
  }
  
  return result;
};

// Function to detect change points using Z-score method (simplified)
export const detectChangePoints = (data, threshold = 2.0, window = 10) => {
  if (data.length < window * 2) {
    return [];
  }
  
  const changePoints = [];
  
  // Calculate mean and std for each window
  for (let i = window; i < data.length - window; i++) {
    const prevWindow = data.slice(i - window, i);
    const nextWindow = data.slice(i, i + window);
    
    const prevMean = prevWindow.reduce((sum, d) => sum + d.price, 0) / window;
    const nextMean = nextWindow.reduce((sum, d) => sum + d.price, 0) / window;
    
    const prevStd = Math.sqrt(
      prevWindow.reduce((sum, d) => sum + Math.pow(d.price - prevMean, 2), 0) / window
    );
    
    const zScore = Math.abs(nextMean - prevMean) / (prevStd || 1);
    
    if (zScore > threshold) {
      changePoints.push({
        date: data[i].date,
        price: data[i].price,
        zScore
      });
    }
  }
  
  return changePoints;
};