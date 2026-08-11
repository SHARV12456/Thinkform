/**
 * Booking form validation utilities
 */

export interface BookingFormData {
  name?: string;
  email?: string;
  phone?: string;
  working_on?: string;
  challenge?: string;
  figure_out?: string;
  website?: string;
  session_type?: string;
  preferred_date?: string;
  preferred_time?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format (basic)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate date format
 */
export function isValidDate(dateString: string): boolean {
  if (!dateString) return true; // Date is optional
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Validate booking form data
 */
export function validateBookingForm(data: BookingFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required fields
  if (!data.name?.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  } else if (data.name.trim().length > 255) {
    errors.push({ field: 'name', message: 'Name must be less than 255 characters' });
  }

  if (!data.email?.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  if (!data.working_on?.trim()) {
    errors.push({ field: 'working_on', message: 'Please describe what you are working on' });
  } else if (data.working_on.trim().length < 10) {
    errors.push({ field: 'working_on', message: 'Please provide more details (at least 10 characters)' });
  } else if (data.working_on.trim().length > 5000) {
    errors.push({ field: 'working_on', message: 'Description is too long (max 5000 characters)' });
  }

  // Optional fields with validation
  if (data.phone && !isValidPhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Invalid phone format' });
  }

  if (data.phone && data.phone.trim().length > 20) {
    errors.push({ field: 'phone', message: 'Phone number is too long' });
  }

  if (data.challenge && data.challenge.trim().length > 2000) {
    errors.push({ field: 'challenge', message: 'Challenge description is too long (max 2000 characters)' });
  }

  if (data.figure_out && data.figure_out.trim().length > 2000) {
    errors.push({ field: 'figure_out', message: 'Goal description is too long (max 2000 characters)' });
  }

  if (data.website && data.website.trim().length > 500) {
    errors.push({ field: 'website', message: 'Website URL is too long' });
  }

  if (data.preferred_date && !isValidDate(data.preferred_date)) {
    errors.push({ field: 'preferred_date', message: 'Invalid date format' });
  }

  return errors;
}

/**
 * Sanitize booking form input
 */
export function sanitizeBookingForm(data: BookingFormData): BookingFormData {
  return {
    name: data.name?.trim().slice(0, 255),
    email: data.email?.trim().toLowerCase().slice(0, 255),
    phone: data.phone?.trim().slice(0, 20),
    working_on: data.working_on?.trim().slice(0, 5000),
    challenge: data.challenge?.trim().slice(0, 2000),
    figure_out: data.figure_out?.trim().slice(0, 2000),
    website: data.website?.trim().slice(0, 500),
    session_type: data.session_type?.trim().slice(0, 100),
    preferred_date: data.preferred_date?.trim(),
    preferred_time: data.preferred_time?.trim().slice(0, 100),
  };
}
