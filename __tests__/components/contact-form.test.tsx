import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/form/contact.component';
import axios from 'axios';
import { toast } from 'react-toastify';

jest.mock('axios');
jest.mock('react-toastify');

describe('ContactForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all form fields', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mobile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a valid phone number/i)).toBeInTheDocument();
    });
  });

  it('should validate email format', async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/email/i);
    
    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('should submit form with valid data', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
    (toast.success as jest.Mock).mockImplementation(() => {});
    
    render(<ContactForm />);
    
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/mobile/i), '1234567890');
    await userEvent.type(screen.getByLabelText(/your message/i), 'Test message content');
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'api/contact',
        {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          message: 'Test message content',
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      expect(toast.success).toHaveBeenCalledWith('Inquiry sent successfully!');
    });
  });

  it('should handle submission errors', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    (toast.error as jest.Mock).mockImplementation(() => {});
    
    render(<ContactForm />);
    
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/mobile/i), '1234567890');
    await userEvent.type(screen.getByLabelText(/your message/i), 'Test message');
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Oops, something went wrong. Please try again later.'
      );
    });
  });

  it('should disable submit button while submitting', async () => {
    (axios.post as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );
    
    render(<ContactForm />);
    
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/mobile/i), '1234567890');
    await userEvent.type(screen.getByLabelText(/your message/i), 'Test message');
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Sending...');
    
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent('Submit');
    });
  });

  it('should reset form after successful submission', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
    
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(screen.getByLabelText(/mobile/i), '1234567890');
    await userEvent.type(screen.getByLabelText(/your message/i), 'Test message');
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
    });
  });

  it('should handle XSS attempts in form fields', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
    
    render(<ContactForm />);
    
    const xssPayload = '<script>alert("XSS")</script>';
    
    await userEvent.type(screen.getByLabelText(/name/i), xssPayload);
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/mobile/i), '1234567890');
    await userEvent.type(screen.getByLabelText(/your message/i), xssPayload);
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'api/contact',
        expect.objectContaining({
          name: xssPayload,
          message: xssPayload,
        }),
        expect.any(Object)
      );
    });
  });

  it('should validate minimum message length', async () => {
    render(<ContactForm />);
    
    await userEvent.type(screen.getByLabelText(/your message/i), 'Short');
    fireEvent.blur(screen.getByLabelText(/your message/i));
    
    await waitFor(() => {
      expect(screen.getByText(/let me know how i can assist you/i)).toBeInTheDocument();
    });
  });
});