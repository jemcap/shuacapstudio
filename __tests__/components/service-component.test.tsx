import React from 'react';
import { render, screen } from '@testing-library/react';
import ServiceComponent from '@/components/services/service.component';
import serviceData from '@/data.json';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

describe('ServiceComponent', () => {
  it('should render services from data.json', () => {
    render(<ServiceComponent />);
    
    // Check that the main heading is rendered
    expect(screen.getByText(/videography services/i)).toBeInTheDocument();
    
    // Verify that services from data.json are rendered
    const expectedServices = serviceData.services.videography;
    
    expectedServices.forEach(service => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
      
      // Check that price is displayed (formatted as currency)
      const priceRegex = new RegExp(`£${service.price}`, 'i');
      expect(screen.getByText(priceRegex)).toBeInTheDocument();
    });
  });

  it('should validate data.json structure is correct', () => {
    const services = serviceData.services.videography;
    
    expect(Array.isArray(services)).toBe(true);
    expect(services.length).toBeGreaterThan(0);
    
    services.forEach(service => {
      // Ensure each service has required properties
      expect(service).toHaveProperty('id');
      expect(service).toHaveProperty('title');
      expect(service).toHaveProperty('price');
      expect(service).toHaveProperty('description');
      expect(service).toHaveProperty('features');
      expect(service).toHaveProperty('audience');
      
      // Validate data types
      expect(typeof service.id).toBe('number');
      expect(typeof service.title).toBe('string');
      expect(typeof service.price).toBe('number');
      expect(typeof service.description).toBe('string');
      expect(typeof service.audience).toBe('string');
      expect(Array.isArray(service.features)).toBe(true);
      
      // Validate reasonable values
      expect(service.id).toBeGreaterThan(0);
      expect(service.title.length).toBeGreaterThan(0);
      expect(service.price).toBeGreaterThan(0);
      expect(service.features.length).toBeGreaterThan(0);
    });
  });

  it('should have expected services in data.json', () => {
    const services = serviceData.services.videography;
    const serviceTitles = services.map(s => s.title);
    
    // These are the services that should be in the catalog
    const expectedServiceTitles = [
      'Athlete Spotlight',
      'Promo Builder',
      'Event Recap',
      'Edit-Only Package',
      'Team Highlights Compilation',
      'Product Demo Video'
    ];
    
    expectedServiceTitles.forEach(expectedTitle => {
      expect(serviceTitles).toContain(expectedTitle);
    });
    
    console.log('Available services in data.json:');
    serviceTitles.forEach((title, index) => {
      console.log(`${index + 1}. ${title}`);
    });
  });

  it('should render service cards with inquiry buttons', () => {
    render(<ServiceComponent />);
    
    // Should have inquiry buttons for each service
    const inquireButtons = screen.getAllByText(/inquire/i);
    expect(inquireButtons.length).toBe(serviceData.services.videography.length);
  });

  it('should display service features correctly', () => {
    render(<ServiceComponent />);
    
    // Check that service features are displayed
    serviceData.services.videography.forEach(service => {
      service.features.forEach(feature => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });
  });
});