import { cn, formatCurrency, formatDate } from '@/lib/utils';

describe('Utils Functions', () => {
  
  describe('cn (className merger)', () => {
    it('should merge single class', () => {
      expect(cn('text-red-500')).toBe('text-red-500');
    });

    it('should merge multiple classes', () => {
      expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const isDisabled = false;
      
      expect(cn(
        'base-class',
        isActive && 'active-class',
        isDisabled && 'disabled-class'
      )).toBe('base-class active-class');
    });

    it('should override conflicting Tailwind classes', () => {
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
      expect(cn('p-4', 'p-8')).toBe('p-8');
    });

    it('should handle arrays of classes', () => {
      expect(cn(['text-sm', 'font-bold'])).toBe('text-sm font-bold');
    });

    it('should handle undefined and null values', () => {
      expect(cn('text-sm', undefined, null, 'font-bold')).toBe('text-sm font-bold');
    });

    it('should handle empty strings', () => {
      expect(cn('', 'text-sm', '')).toBe('text-sm');
    });

    it('should handle objects with boolean values', () => {
      expect(cn({
        'text-red-500': true,
        'text-blue-500': false,
        'font-bold': true
      })).toBe('text-red-500 font-bold');
    });
  });

  describe('formatCurrency', () => {
    it('should format positive numbers as GBP currency', () => {
      expect(formatCurrency(100)).toBe('£100.00');
      expect(formatCurrency(1000)).toBe('£1,000.00');
      expect(formatCurrency(1234.56)).toBe('£1,234.56');
    });

    it('should format negative numbers', () => {
      expect(formatCurrency(-100)).toBe('-£100.00');
      expect(formatCurrency(-1234.56)).toBe('-£1,234.56');
    });

    it('should format zero', () => {
      expect(formatCurrency(0)).toBe('£0.00');
    });

    it('should handle decimal places correctly', () => {
      expect(formatCurrency(99.99)).toBe('£99.99');
      expect(formatCurrency(99.999)).toBe('£100.00');
      expect(formatCurrency(99.994)).toBe('£99.99');
    });

    it('should handle very large numbers', () => {
      expect(formatCurrency(1000000)).toBe('£1,000,000.00');
      expect(formatCurrency(9999999.99)).toBe('£9,999,999.99');
    });

    it('should handle very small decimal values', () => {
      expect(formatCurrency(0.01)).toBe('£0.01');
      expect(formatCurrency(0.001)).toBe('£0.00');
    });

    it('should handle NaN', () => {
      expect(formatCurrency(NaN)).toBe('£NaN');
    });

    it('should handle Infinity', () => {
      expect(formatCurrency(Infinity)).toBe('£∞');
      expect(formatCurrency(-Infinity)).toBe('-£∞');
    });
  });

  describe('formatDate', () => {
    it('should format valid date strings', () => {
      expect(formatDate('2024-01-15')).toBe('Monday, January 15, 2024');
      expect(formatDate('2024-12-25')).toBe('Wednesday, December 25, 2024');
    });

    it('should handle different date formats', () => {
      expect(formatDate('2024-01-01T00:00:00Z')).toBe('Monday, January 1, 2024');
      expect(formatDate('2024/01/01')).toBe('Monday, January 1, 2024');
      expect(formatDate('01-01-2024')).toBe('Monday, January 1, 2024');
    });

    it('should handle leap years', () => {
      expect(formatDate('2024-02-29')).toBe('Thursday, February 29, 2024');
    });

    it('should handle invalid date strings', () => {
      expect(formatDate('invalid-date')).toBe('Invalid Date');
      expect(formatDate('')).toBe('Invalid Date');
    });

    it('should handle edge dates', () => {
      expect(formatDate('1900-01-01')).toBe('Monday, January 1, 1900');
      expect(formatDate('2099-12-31')).toBe('Thursday, December 31, 2099');
    });

    it('should handle ISO 8601 format with timezone', () => {
      const result = formatDate('2024-01-15T10:30:00+00:00');
      expect(result).toContain('January 15, 2024');
    });

    it('should handle malformed date strings gracefully', () => {
      expect(formatDate('2024-13-01')).toBe('Invalid Date'); // Invalid month
      expect(formatDate('2024-01-32')).toBe('Invalid Date'); // Invalid day
    });

    it('should handle XSS attempts in date string', () => {
      const xssPayload = '<script>alert("XSS")</script>';
      expect(formatDate(xssPayload)).toBe('Invalid Date');
    });

    it('should handle SQL injection attempts', () => {
      const sqlPayload = "'; DROP TABLE users; --";
      expect(formatDate(sqlPayload)).toBe('Invalid Date');
    });
  });

  describe('Edge Cases and Security', () => {
    it('should handle prototype pollution attempts in cn', () => {
      const maliciousInput = { '__proto__': { polluted: true } };
      expect(() => cn(maliciousInput as any)).not.toThrow();
    });

    it('should handle extremely long class names', () => {
      const longClassName = 'a'.repeat(10000);
      expect(() => cn(longClassName)).not.toThrow();
    });

    it('should handle special characters in formatCurrency', () => {
      expect(formatCurrency(123.45)).not.toContain('<');
      expect(formatCurrency(123.45)).not.toContain('>');
    });

    it('should not execute code in formatDate', () => {
      const codeInjection = 'new Date(); console.log("executed")';
      expect(formatDate(codeInjection)).toBe('Invalid Date');
    });
  });

  describe('Performance Tests', () => {
    it('should handle large arrays efficiently in cn', () => {
      const classes = Array(1000).fill('text-sm');
      const start = performance.now();
      cn(...classes);
      const end = performance.now();
      expect(end - start).toBeLessThan(100); // Should complete in less than 100ms
    });

    it('should format multiple currencies efficiently', () => {
      const start = performance.now();
      for (let i = 0; i < 1000; i++) {
        formatCurrency(Math.random() * 10000);
      }
      const end = performance.now();
      expect(end - start).toBeLessThan(100);
    });

    it('should format multiple dates efficiently', () => {
      const start = performance.now();
      for (let i = 0; i < 1000; i++) {
        formatDate(`2024-01-${(i % 28) + 1}`);
      }
      const end = performance.now();
      expect(end - start).toBeLessThan(100);
    });
  });
});