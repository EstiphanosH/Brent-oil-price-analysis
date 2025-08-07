// Sample Brent oil price data
// In a real application, this would be your actual dataset
export const brentOilPriceData = [
  { date: '2022-01-01', price: 77.78 },
  { date: '2022-01-15', price: 86.06 },
  { date: '2022-02-01', price: 89.16 },
  { date: '2022-02-15', price: 95.39 },
  { date: '2022-03-01', price: 104.97 },
  { date: '2022-03-15', price: 99.91 },
  { date: '2022-04-01', price: 104.39 },
  { date: '2022-04-15', price: 111.70 },
  { date: '2022-05-01', price: 107.14 },
  { date: '2022-05-15', price: 112.55 },
  { date: '2022-06-01', price: 116.29 },
  { date: '2022-06-15', price: 118.51 },
  { date: '2022-07-01', price: 111.63 },
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
  { date: '2023-03-15', price: 73.20 },
  { date: '2023-04-01', price: 79.89 },
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
  { date: '2023-10-01', price: 95.31 },
  { date: '2023-10-15', price: 92.16 },
  { date: '2023-11-01', price: 85.41 },
  { date: '2023-11-15', price: 82.47 },
  { date: '2023-12-01', price: 79.80 },
  { date: '2023-12-15', price: 76.55 }
];

// Pre-computed change points for demonstration
// In a real application, these would be calculated dynamically
export const changePoints = [
  { date: '2022-02-24', price: 99.08 },  // Russia-Ukraine conflict
  { date: '2022-06-14', price: 118.93 }, // Peak oil price
  { date: '2022-07-05', price: 102.77 }, // Major price drop
  { date: '2023-03-15', price: 73.20 },  // Banking crisis impact
  { date: '2023-09-27', price: 96.55 }   // Middle East tensions
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