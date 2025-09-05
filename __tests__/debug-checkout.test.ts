import { POST } from '@/app/api/checkout-session/route';
import { NextRequest } from 'next/server';

describe('Debug Checkout Flow', () => {
  it('should debug data structure mismatch', async () => {
    // Test with typical Sanity CMS package data that frontend might send
    const testCases = [
      { packageName: 'Athlete Spotlight', price: 75 },
      { packageName: 'athlete spotlight', price: 75 },
      { packageName: 'AthleteSpotlight', price: 75 },
      { packageName: 'Promo Builder', price: 285 },
      { packageName: 'Event Recap', price: 250 },
      { packageName: 'EventRecap', price: 250 },
    ];

    for (const testData of testCases) {
      console.log(`Testing: ${testData.packageName} at £${testData.price}`);
      
      const request = new NextRequest('http://localhost:3000/api/checkout-session', {
        method: 'POST',
        body: JSON.stringify(testData),
      });

      const response = await POST(request);
      const result = await response.json();
      
      console.log(`Status: ${response.status}`);
      if (response.status !== 200) {
        console.log('Error:', result);
      } else {
        console.log('Success - would redirect to:', result.url ? 'Stripe' : 'No URL');
      }
      console.log('---');
    }
  });

  it('should show available packages', async () => {
    const request = new NextRequest('http://localhost:3000/api/checkout-session', {
      method: 'POST',
      body: JSON.stringify({ packageName: 'NonExistentPackage', price: 100 }),
    });

    const response = await POST(request);
    const result = await response.json();
    
    console.log('Available packages from data.json:');
    if (result.availablePackages) {
      result.availablePackages.forEach((pkg: string, index: number) => {
        console.log(`${index + 1}. "${pkg}"`);
      });
    }
  });
});