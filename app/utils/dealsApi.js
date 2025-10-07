// src/utils/dealsApi.js
// Simulated API for cashback deals

const cashbackDB = [
      {
        id: 1,
        merchant: 'Amazon',
        category: 'Online Shopping',
        cashbackPercent: 5,
        description: 'Earn 5% cash back on all purchases at Amazon.com, including digital downloads, Amazon Fresh orders, and Prime subscriptions.',
        terms: 'Valid on purchases made directly through Amazon.com. Does not apply to purchases made through third-party merchants using Amazon Pay.',
        startDate: '2025-01-01',
        expiryDate: '2025-06-30',
      },
      {
        id: 2,
        merchant: 'Starbucks',
        category: 'Dining',
        cashbackPercent: 3,
        description: 'Get 3% cash back every time you use your Bank of America card at any Starbucks location nationwide.',
        terms: 'Applies to in-store and mobile app purchases. Cash back will be credited to your account within 5 business days.',
        startDate: '2025-01-01',
        expiryDate: '2025-12-31',
      },
      {
        id: 3,
        merchant: 'Walmart',
        category: 'Retail',
        cashbackPercent: 2,
        description: 'Earn 2% cash back on all purchases at Walmart stores and Walmart.com.',
        terms: 'Excludes purchases of gift cards, money orders, and Walmart Pay transactions at merchants other than Walmart.',
        startDate: '2025-02-15',
        expiryDate: '2025-08-15',
      },
      {
        id: 4,
        merchant: 'Chevron',
        category: 'Gas & Automotive',
        cashbackPercent: 4,
        description: 'Get 4% cash back on fuel purchases at all Chevron and Texaco gas stations.',
        terms: 'Cash back applies only to fuel purchases. In-store purchases are not eligible.',
        startDate: '2025-03-01',
        expiryDate: '2025-05-31',
      },
      {
        id: 5,
        merchant: 'Netflix',
        category: 'Entertainment',
        cashbackPercent: 5,
        description: 'Earn 5% cash back on your Netflix subscription when you use your Bank of America card as your payment method.',
        terms: 'Limited to one Netflix subscription per card. Cash back will appear on your statement within 2 billing cycles.',
        startDate: '2025-01-01',
        expiryDate: null,
      },
      {
        id: 6,
        merchant: 'Whole Foods',
        category: 'Groceries',
        cashbackPercent: 3,
        description: 'Get 3% cash back on all purchases at Whole Foods Market nationwide.',
        terms: 'Valid for in-store purchases only. Does not apply to delivery or pickup orders through third-party services.',
        startDate: '2025-02-01',
        expiryDate: '2025-07-31',
      },
      {
          id: 7,
          merchant: 'Best Buy',
          category: 'Electronics',
          cashbackPercent: 4,
          description: 'Earn 4% cash back on all purchases at Best Buy stores and BestBuy.com.',
          terms: 'Cash back applies to regular purchases, Geek Squad services, and extended warranties. Does not apply to gift card purchases.',
          startDate: '2025-03-15',
          expiryDate: '2025-09-15',
        },
        {
          id: 8,
          merchant: 'Uber',
          category: 'Travel',
          cashbackPercent: 3,
          description: 'Get 3% cash back on all Uber rides and Uber Eats orders when you pay with your Bank of America card.',
          terms: 'Cash back will be applied automatically to your statement. Valid for personal and business rides/orders.',
          startDate: '2025-01-01',
          expiryDate: '2025-12-31',
        },
        {
          id: 9,
          merchant: 'Target',
          category: 'Retail',
          cashbackPercent: 2,
          description: 'Earn 2% cash back on purchases at Target stores and Target.com.',
          terms: 'Pharmacy purchases, gift cards, and Target Circle redemptions are excluded from cash back rewards.',
          startDate: '2025-02-01',
          expiryDate: '2025-08-01',
        },
        {
          id: 10,
          merchant: 'Spotify',
          category: 'Entertainment',
          cashbackPercent: 5,
          description: 'Get 5% cash back on your Spotify Premium subscription when you use your Bank of America card.',
          terms: 'Limited to one Spotify Premium subscription per card. Family plans are eligible.',
          startDate: '2025-01-01',
          expiryDate: null,
        },
        {
          id: 11,
          merchant: 'Home Depot',
          category: 'Home Improvement',
          cashbackPercent: 3,
          description: 'Earn 3% cash back on all purchases at Home Depot stores and HomeDepot.com.',
          terms: 'Does not apply to installation services or rentals. Cash back will appear on your statement within one billing cycle.',
          startDate: '2025-03-01',
          expiryDate: '2025-06-30',
        },
        {
          id: 12,
          merchant: 'Chipotle',
          category: 'Dining',
          cashbackPercent: 4,
          description: 'Get 4% cash back when dining at any Chipotle Mexican Grill location or ordering through their app.',
          terms: 'Valid for in-restaurant purchases, online orders, and delivery when ordered directly through Chipotle.',
          startDate: '2025-02-15',
          expiryDate: '2025-05-15',
        },
        {
          id: 13,
          merchant: 'Delta Airlines',
          category: 'Travel',
          cashbackPercent: 3,
          description: 'Earn 3% cash back on all Delta Airlines ticket purchases and in-flight purchases.',
          terms: 'Applies to tickets purchased directly from Delta Airlines. Third-party bookings are not eligible.',
          startDate: '2025-01-01',
          expiryDate: '2025-12-31',
        },
        {
          id: 14,
          merchant: 'CVS Pharmacy',
          category: 'Health',
          cashbackPercent: 2,
          description: 'Get 2% cash back on all purchases at CVS Pharmacy locations nationwide.',
          terms: 'Prescription purchases are excluded from cash back rewards. MinuteClinic services are eligible.',
          startDate: '2025-03-01',
          expiryDate: '2025-09-30',
        },
        {
          id: 15,
          merchant: 'Sephora',
          category: 'Beauty',
          cashbackPercent: 4,
          description: 'Earn 4% cash back on all purchases at Sephora stores and Sephora.com.',
          terms: 'Cash back will be applied to your statement within 5 business days of purchase. Cannot be combined with price adjustments.',
          startDate: '2025-02-01',
          expiryDate: '2025-07-31',
        },
];

export const getCashbackDeal = (id) => {
  return cashbackDB.find((cb) => cb.id === id);
}

export const getCashbackDeals = () => {
    // In a real app, this would be an API call
    // For our demo, we'll return mock data
    
    // Let's create sample cashback deals for Bank of America
    return cashbackDB;
    // if (issuer === 'Bank of America') {
    // }
      
};