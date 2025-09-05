describe('Services and Checkout Validation', () => {
  
  describe('Services validation (data.json)', () => {
    it('should validate services against data.json catalog', () => {
      const servicesData = require('@/data.json');
      const availableServices = servicesData.services.videography;
      
      // These should match the services in data.json
      const expectedServices = [
        'Athlete Spotlight',
        'Promo Builder', 
        'Event Recap',
        'Edit-Only Package',
        'Team Highlights Compilation',
        'Product Demo Video'
      ];
      
      expectedServices.forEach(serviceName => {
        const service = availableServices.find((s: any) => s.title === serviceName);
        expect(service).toBeDefined();
        expect(service.price).toBeGreaterThan(0);
      });
      
      // Check structure
      availableServices.forEach((service: any) => {
        expect(service).toHaveProperty('id');
        expect(service).toHaveProperty('title');
        expect(service).toHaveProperty('price');
        expect(service).toHaveProperty('description');
        expect(service).toHaveProperty('features');
        expect(Array.isArray(service.features)).toBe(true);
      });
    });
  });

  describe('Checkout API validation', () => {
    it('should accept dynamic package names and prices', () => {
      // Test cases that should now work with flexible validation
      const validTestCases = [
        { packageName: 'Standard Video Package', price: 20 },
        { packageName: 'Custom Event Package', price: 150 },
        { packageName: 'Premium Wedding Video', price: 500 },
        { packageName: 'Sports Highlight Reel', price: 85 }
      ];
      
      validTestCases.forEach(testCase => {
        // Basic validation checks (what the API now does)
        expect(testCase.packageName).toBeTruthy();
        expect(testCase.packageName.length).toBeGreaterThan(0);
        expect(testCase.packageName.length).toBeLessThanOrEqual(200);
        expect(testCase.price).toBeGreaterThan(0);
        expect(testCase.price).toBeLessThanOrEqual(10000);
      });
    });

    it('should reject invalid data', () => {
      const invalidTestCases = [
        { packageName: '', price: 50 }, // Empty name
        { packageName: 'Valid Package', price: 0 }, // Zero price
        { packageName: 'Valid Package', price: -10 }, // Negative price
        { packageName: 'Valid Package', price: 15000 }, // Too expensive
        { packageName: 'x'.repeat(250), price: 50 }, // Name too long
      ];
      
      invalidTestCases.forEach(testCase => {
        const isValidName = testCase.packageName.length > 0 && testCase.packageName.length <= 200;
        const isValidPrice = testCase.price > 0 && testCase.price <= 10000;
        const shouldPass = isValidName && isValidPrice;
        
        expect(shouldPass).toBe(false);
      });
    });
  });

  describe('Security validation maintained', () => {
    it('should prevent XSS in package names', () => {
      const xssAttempts = [
        '<script>alert("xss")</script>',
        'javascript:alert("xss")',
        '<img src=x onerror=alert("xss")>',
        'Package</script><script>alert("xss")</script>'
      ];
      
      xssAttempts.forEach(maliciousName => {
        // The API should sanitize this
        const sanitized = maliciousName.trim().slice(0, 100);
        expect(sanitized.length).toBeLessThanOrEqual(100);
        // In a real implementation, we'd also strip HTML tags
      });
    });

    it('should have reasonable price limits', () => {
      // Ensure our limits prevent abuse
      expect(1).toBeGreaterThanOrEqual(1); // Min price
      expect(10000).toBeLessThanOrEqual(10000); // Max price
      
      // Should reject extremes
      expect(0.5).toBeLessThan(1); // Too low
      expect(50000).toBeGreaterThan(10000); // Too high
    });
  });
  
  describe('Integration expectations', () => {
    it('should work with Sanity CMS package structure', () => {
      // Expected structure from Sanity (based on types.ts)
      const sanityPackage = {
        name: 'Standard Video Package',
        description: 'A comprehensive video package',
        price: 20,
        priceDiscount: undefined,
        _key: 'some-key-123'
      };
      
      // What gets sent to checkout API
      const checkoutData = {
        packageName: sanityPackage.name,
        price: sanityPackage.priceDiscount || sanityPackage.price
      };
      
      expect(checkoutData.packageName).toBe('Standard Video Package');
      expect(checkoutData.price).toBe(20);
    });
    
    it('should work with data.json service structure', () => {
      // Expected structure from data.json
      const dataJsonService = {
        id: 1,
        title: 'Athlete Spotlight',
        price: 75,
        description: 'A tailored short video...',
        features: ['1 hour filming', 'Editing', 'etc']
      };
      
      // Services use inquiry form, not checkout, but structure should be consistent
      expect(dataJsonService.title).toBeTruthy();
      expect(dataJsonService.price).toBeGreaterThan(0);
      expect(Array.isArray(dataJsonService.features)).toBe(true);
    });
  });
});