// =========================================================
// DESIGN HOUR — Mock Data (Frontend Only)
// Replace with real API calls when backend is connected
// =========================================================

export const WHATSAPP_CONFIG = {
  number: '917400162509', // Default — can be overridden via Admin Settings
  businessName: 'Design Hour',
};

// Returns the live WhatsApp number — checks localStorage first (set by Admin Settings)
export function getWhatsAppNumber(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('dh_whatsapp_number') || WHATSAPP_CONFIG.number;
  }
  return WHATSAPP_CONFIG.number;
}


export const SERVICES = [
  {
    id: 'quick-30',
    name: 'Quick Consultation',
    shortName: '30-Minute Quick Consultation',
    duration: 30,
    price: 1999,
    description: 'For one focused design question or decision.',
    featured: false,
    complimentaryMinutes: 0,
  },
  {
    id: 'design-hour-60',
    name: 'Design Hour',
    shortName: '60-Minute Design Hour',
    duration: 60,
    price: 3999,
    description: 'For detailed design consultation. First 15 minutes complimentary.',
    featured: true,
    tag: 'MOST BOOKED',
    complimentaryMinutes: 15,
  },
  {
    id: 'deep-dive-90',
    name: 'Deep Dive',
    shortName: '90-Minute Deep Dive',
    duration: 90,
    price: 5999,
    description: 'For larger spaces and multiple design decisions.',
    featured: false,
    complimentaryMinutes: 0,
  },
  {
    id: 'commercial',
    name: 'Commercial Consultation',
    shortName: 'Commercial Consultation',
    duration: 0,
    price: 7500,
    priceLabel: 'From ₹7,500',
    description: 'For offices, retail, cafés, restaurants and other commercial spaces.',
    featured: false,
    isEnquiry: true,
    complimentaryMinutes: 0,
  },
];

export const TIME_SLOTS = [
  { time: '09:00', available: true },
  { time: '09:30', available: false },
  { time: '10:00', available: true },
  { time: '10:30', available: true },
  { time: '11:00', available: false },
  { time: '11:30', available: true },
  { time: '12:00', available: true },
  { time: '12:30', available: false },
  { time: '14:00', available: true },
  { time: '14:30', available: true },
  { time: '15:00', available: true },
  { time: '15:30', available: false },
  { time: '16:00', available: true },
  { time: '16:30', available: true },
  { time: '17:00', available: true },
  { time: '17:30', available: false },
];

export const PROPERTY_TYPES = [
  'Residential – Apartment',
  'Residential – Villa / Independent House',
  'Rental Home',
  'Modular Kitchen',
  'Living Room',
  'Bedroom',
  'Office',
  'Retail Space',
  'Café',
  'Restaurant',
  'Commercial Interior',
  'Other',
];

export const BUDGET_RANGES = [
  'Under ₹1 Lakh',
  '₹1–3 Lakhs',
  '₹3–5 Lakhs',
  '₹5–10 Lakhs',
  '₹10–25 Lakhs',
  '₹25 Lakhs+',
  'Not decided yet',
];

export const FAQS = [
  {
    q: 'What is TAAS?',
    a: 'TAAS is a professional design consultation service where you book a designer for a fixed duration. You get expert advice on your space without committing to a full interior design project.',
  },
  {
    q: 'What is the first 15 minutes complimentary?',
    a: 'The first 15 minutes of your 60-minute consultation are complimentary. This time is used to understand your space, requirements and key concerns. Your full payment covers the entire session.',
  },
  {
    q: 'Do I need to hire you for the full project after consultation?',
    a: 'No. The consultation is an independent service. You are free to use the advice independently, approach other contractors, or discuss a larger project separately.',
  },
  {
    q: 'Why not just get a free site visit from a contractor or architect?',
    a: 'Contractors visit your space to quote their own work — their advice is shaped by what they can sell you. A TAAS consultation is vendor-neutral: we have no stake in which materials you pick, which contractor you hire, or what you decide to build. Our only job is to give you the clearest, most practical advice for your space and budget — which often means telling you what not to do, what not to spend on, and which contractor claims to challenge.',
  },
  {
    q: 'Who will conduct my consultation?',
    a: 'Every consultation is personally conducted by Sharvayu Sawant, Principal Designer. There are no junior staff or sub-contracted designers. When you book, you get Sharvayu — full stop.',
  },
  {
    q: 'What should I prepare for the consultation?',
    a: 'Photos, measurements, floor plans or mood references can be helpful, but they are not mandatory. Just bring your questions and we will help you get clarity.',
  },
  {
    q: 'Is payment required before the appointment?',
    a: 'Yes. Your appointment is confirmed only after successful online payment. This ensures a committed consultation time for both parties.',
  },
  {
    q: 'Can I reschedule my consultation?',
    a: 'Yes. Rescheduling is allowed subject to our cancellation and rescheduling policy. Please review the policy page for details.',
  },
  {
    q: 'Do you consult on commercial spaces?',
    a: 'Yes. Commercial consultations are available for offices, cafés, restaurants, retail spaces and studios. These are priced separately.',
  },
  {
    q: 'Is this an online or in-person consultation?',
    a: 'Both options are available. You can choose an on-site consultation at your location or a video consultation. Please specify your preference during booking.',
  },
];

export type BookingPaymentStatus = 'Pending' | 'Paid' | 'Refunded' | 'Waived';
export type ExtendedBookingStatus = 'Requested' | 'Payment Pending' | 'Payment Received' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled' | 'Rescheduled';

export interface Booking {
  id: string;
  customer: string;
  email: string;
  phone: string;
  service: string;
  serviceId: string;
  duration: number; // in minutes
  date: string;
  time: string;
  amount: number;
  payment: BookingPaymentStatus;
  status: ExtendedBookingStatus;
  location: string;
  propertyType: string;
  requirement?: string;
  notes?: string;
  startTimestamp?: number; // Unix ms — set when consultation starts
  endTimestamp?: number;   // Unix ms — set when consultation ends
  actualDuration?: number; // in seconds
  overtimeDuration?: number; // in seconds
}

const DEFAULT_MOCK_BOOKINGS: Booking[] = [
  {
    id: 'DH-2026-001',
    customer: 'Priya Mehta',
    email: 'priya.m@gmail.com',
    phone: '+91 98200 12345',
    service: 'Design Hour',
    serviceId: 'design-hour-60',
    duration: 60,
    date: '2026-08-18',
    time: '10:00',
    amount: 3999,
    payment: 'Paid',
    status: 'Confirmed',
    location: 'Bandra West, Mumbai',
    propertyType: 'Residential – Apartment',
    requirement: 'Living room layout and sofa selection',
  },
  {
    id: 'DH-2026-002',
    customer: 'Rohan Singhania',
    email: 'rohan.s@company.com',
    phone: '+91 99876 54321',
    service: 'Commercial Consultation',
    serviceId: 'commercial',
    duration: 90,
    date: '2026-08-18',
    time: '14:00',
    amount: 7500,
    payment: 'Paid',
    status: 'Confirmed',
    location: 'Lower Parel, Mumbai',
    propertyType: 'Office',
    requirement: 'Open office layout for 20 people',
  },
  {
    id: 'DH-2026-003',
    customer: 'Ananya Kapoor',
    email: 'ananya@gmail.com',
    phone: '+91 91234 56789',
    service: 'Quick Consultation',
    serviceId: 'quick-30',
    duration: 30,
    date: '2026-08-19',
    time: '11:00',
    amount: 1999,
    payment: 'Pending',
    status: 'Requested',
    location: 'Malad West, Mumbai',
    propertyType: 'Modular Kitchen',
    requirement: 'Kitchen layout and storage solutions',
  },
  {
    id: 'DH-2026-004',
    customer: 'Vikram Sharma',
    email: 'v.sharma@outlook.com',
    phone: '+91 87654 32109',
    service: 'Deep Dive',
    serviceId: 'deep-dive-90',
    duration: 90,
    date: '2026-08-17',
    time: '15:00',
    amount: 5999,
    payment: 'Paid',
    status: 'Completed',
    location: 'Andheri East, Mumbai',
    propertyType: 'Residential – Villa / Independent House',
    requirement: 'Full home design direction and material selection',
    actualDuration: 5540,
    overtimeDuration: 0,
  },
  {
    id: 'DH-2026-005',
    customer: 'Shreya Joshi',
    email: 'shreya.j@gmail.com',
    phone: '+91 90000 11111',
    service: 'Design Hour',
    serviceId: 'design-hour-60',
    duration: 60,
    date: '2026-08-20',
    time: '09:30',
    amount: 3999,
    payment: 'Pending',
    status: 'Payment Pending',
    location: 'Goregaon West, Mumbai',
    propertyType: 'Rental Home',
    requirement: 'Bedroom makeover on a budget',
  },
  {
    id: 'DH-2026-006',
    customer: 'Arjun Nair',
    email: 'arjun.nair@email.com',
    phone: '+91 92345 67890',
    service: 'Design Hour',
    serviceId: 'design-hour-60',
    duration: 60,
    date: '2026-08-21',
    time: '16:00',
    amount: 3999,
    payment: 'Paid',
    status: 'Rescheduled',
    location: 'Kandivali West, Mumbai',
    propertyType: 'Bedroom',
    requirement: 'Wardrobe design and bedroom layout',
  },
  {
    id: 'DH-2026-007',
    customer: 'Meera Iyer',
    email: 'meera.iyer@gmail.com',
    phone: '+91 93456 78901',
    service: 'Quick Consultation',
    serviceId: 'quick-30',
    duration: 30,
    date: '2026-08-22',
    time: '12:00',
    amount: 1999,
    payment: 'Pending',
    status: 'Requested',
    location: 'Santacruz West, Mumbai',
    propertyType: 'Residential – Apartment',
    requirement: 'Paint colour selection and finish advice',
  },
];

// For backward compatibility while we migrate, we export MOCK_BOOKINGS as a getter if possible, 
// but since it's used as an array in many files, we need a mutable array reference.
// We will populate this array on the client side from localStorage + DEFAULT_MOCK_BOOKINGS.
export const MOCK_BOOKINGS: Booking[] = [...DEFAULT_MOCK_BOOKINGS];

export function syncMockBookings() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('dh_new_bookings');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Booking[];
        // Clear MOCK_BOOKINGS and push all to maintain the reference
        MOCK_BOOKINGS.length = 0;
        MOCK_BOOKINGS.push(...parsed, ...DEFAULT_MOCK_BOOKINGS);
      } catch (e) {
        console.error('Failed to parse stored bookings', e);
      }
    }
  }
}

// Call it once when the file loads on the client
if (typeof window !== 'undefined') {
  syncMockBookings();
}

export function addMockBooking(booking: Booking) {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('dh_new_bookings');
    let parsed: Booking[] = [];
    if (stored) {
      try {
        parsed = JSON.parse(stored);
      } catch (e) {}
    }
    parsed.unshift(booking);
    localStorage.setItem('dh_new_bookings', JSON.stringify(parsed));
    syncMockBookings(); // update the array in memory
  }
}

export const REVENUE_DATA = [
  { month: 'Mar', revenue: 87500, bookings: 22 },
  { month: 'Apr', revenue: 112000, bookings: 28 },
  { month: 'May', revenue: 98500, bookings: 25 },
  { month: 'Jun', revenue: 134000, bookings: 34 },
  { month: 'Jul', revenue: 159000, bookings: 40 },
  { month: 'Aug', revenue: 184500, bookings: 46 },
];

export const BOOKING_BREAKDOWN = [
  { name: '30 Min', value: 18, color: '#9b9a97' },
  { name: '60 Min', value: 58, color: '#1a1917' },
  { name: '90 Min', value: 15, color: '#6b6a68' },
  { name: 'Commercial', value: 9, color: '#3d3c3a' },
];

export const AD_SOURCE_DATA = [
  { source: 'Google Ads', bookings: 18, percentage: 39 },
  { source: 'Meta Ads', bookings: 14, percentage: 30 },
  { source: 'Organic', bookings: 10, percentage: 22 },
  { source: 'Direct', bookings: 4, percentage: 9 },
];

export const MOCK_CUSTOMERS = [
  { name: 'Priya Mehta', email: 'priya.m@gmail.com', phone: '+91 98200 12345', bookings: 2, totalSpent: 7998, lastBooking: '2026-08-18' },
  { name: 'Rohan Singhania', email: 'rohan.s@company.com', phone: '+91 99876 54321', bookings: 1, totalSpent: 7500, lastBooking: '2026-08-18' },
  { name: 'Vikram Sharma', email: 'v.sharma@outlook.com', phone: '+91 87654 32109', bookings: 3, totalSpent: 13997, lastBooking: '2026-08-17' },
  { name: 'Ananya Kapoor', email: 'ananya@gmail.com', phone: '+91 91234 56789', bookings: 1, totalSpent: 1999, lastBooking: '2026-08-19' },
  { name: 'Arjun Nair', email: 'arjun.nair@email.com', phone: '+91 92345 67890', bookings: 2, totalSpent: 7998, lastBooking: '2026-08-21' },
  { name: 'Shreya Joshi', email: 'shreya.j@gmail.com', phone: '+91 90000 11111', bookings: 1, totalSpent: 3999, lastBooking: '2026-08-20' },
  { name: 'Meera Iyer', email: 'meera.iyer@gmail.com', phone: '+91 93456 78901', bookings: 1, totalSpent: 1999, lastBooking: '2026-08-22' },
];

export const ADMIN_SERVICES = [
  {
    id: '1',
    name: 'Quick Consultation',
    description: 'For one focused design question or decision.',
    duration: 30,
    price: 1999,
    complimentaryMinutes: 0,
    status: 'Active',
    availability: 'Mon–Sat',
    overtimeEnabled: false,
    overtimeRate: 0,
    gracePeriodMinutes: 0,
  },
  {
    id: '2',
    name: 'Design Hour',
    description: 'For detailed design consultation. First 15 minutes complimentary.',
    duration: 60,
    price: 3999,
    complimentaryMinutes: 15,
    status: 'Active',
    availability: 'Mon–Sat',
    overtimeEnabled: true,
    overtimeRate: 1999, // per 30 min
    gracePeriodMinutes: 5,
  },
  {
    id: '3',
    name: 'Deep Dive',
    description: 'For larger spaces and multiple design decisions.',
    duration: 90,
    price: 5999,
    complimentaryMinutes: 0,
    status: 'Active',
    availability: 'Mon–Sat',
    overtimeEnabled: true,
    overtimeRate: 1999,
    gracePeriodMinutes: 5,
  },
  {
    id: '4',
    name: 'Commercial Consultation',
    description: 'For offices, cafés, restaurants, retail spaces and studios.',
    duration: 90, // default, configurable per booking
    price: 7500,
    complimentaryMinutes: 0,
    status: 'Active',
    availability: 'Mon–Fri',
    overtimeEnabled: true,
    overtimeRate: 2500,
    gracePeriodMinutes: 10,
  },
];

export interface ConsultationRecord {
  bookingId: string;
  startTime: string;
  endTime: string;
  bookedDuration: number; // minutes
  actualDuration: number; // seconds
  overtimeDuration: number; // seconds
  status: 'Completed' | 'In Progress' | 'Cancelled';
  notes?: string;
}

export const MOCK_CONSULTATION_RECORDS: ConsultationRecord[] = [
  {
    bookingId: 'DH-2026-004',
    startTime: '2026-08-17T15:00:00+05:30',
    endTime: '2026-08-17T16:32:20+05:30',
    bookedDuration: 90,
    actualDuration: 5540,
    overtimeDuration: 0,
    status: 'Completed',
    notes: 'Client decided on warm neutral palette. Recommended Italian marble for kitchen countertop. Follow-up required for furniture procurement.',
  },
];

// =========================================================
// Integration Placeholders — Replace with real IDs
// =========================================================

export const TRACKING_CONFIG = {
  META_PIXEL_ID: 'META_PIXEL_ID',
  GOOGLE_ANALYTICS_ID: 'GOOGLE_ANALYTICS_ID',
  GOOGLE_ADS_CONVERSION_ID: 'GOOGLE_ADS_CONVERSION_ID',
  GOOGLE_ADS_LABEL_BOOKING_STARTED: 'BOOKING_STARTED_LABEL',
  GOOGLE_ADS_LABEL_BOOKING_COMPLETED: 'BOOKING_COMPLETED_LABEL',
  GOOGLE_ADS_LABEL_PAYMENT_INITIATED: 'PAYMENT_INITIATED_LABEL',
  GOOGLE_ADS_LABEL_PAYMENT_COMPLETED: 'PAYMENT_COMPLETED_LABEL',
};

// =========================================================
// Payment Gateway Placeholder
// =========================================================

export const PAYMENT_CONFIG = {
  GATEWAY: 'RAZORPAY', // Replace with actual gateway: 'RAZORPAY' | 'STRIPE' | 'CASHFREE'
  KEY_ID: 'RAZORPAY_KEY_ID',
  CURRENCY: 'INR',
};

export type BookingStatus = 'Requested' | 'Payment Pending' | 'Payment Received' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled' | 'Rescheduled';

export function generateBookingId(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `DH-${year}-${num}`;
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// =========================================================
// WhatsApp Message Generators
// =========================================================

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  propertyType: string;
  location: string;
  size: string;
  concern: string;
  budget: string;
  notes: string;
  serviceName: string;
  serviceShortName: string;
  duration: number;
  price: number;
  dateFormatted: string;
  time: string;
  complimentaryMinutes?: number;
}

export function generateBookingRequestMessage(data: BookingFormData): string {
  const lines = [
    `Hi, I'd like to reserve a ${data.serviceName} consultation.`,
    ``,
    `Consultation:`,
    `${data.serviceShortName}`,
    ``,
    `Duration:`,
    `${data.duration} minutes${data.complimentaryMinutes ? ` (first ${data.complimentaryMinutes} minutes complimentary)` : ''}`,
    ``,
    `Preferred date:`,
    `${data.dateFormatted}`,
    ``,
    `Preferred time:`,
    `${data.time} IST`,
    ``,
    `Location:`,
    `${data.location}`,
    ``,
    `Property:`,
    `${data.propertyType}${data.size ? ` — ${data.size}` : ''}`,
    ``,
    `Requirement:`,
    `${data.concern || 'General design consultation'}`,
    data.budget ? `\nBudget range:\n${data.budget}` : '',
    data.notes ? `\nAdditional notes:\n${data.notes}` : '',
    ``,
    `Name:`,
    `${data.name}`,
    ``,
    `Amount:`,
    `₹${data.price.toLocaleString('en-IN')}`,
    ``,
    `Please confirm the slot and payment details.`,
  ].filter(l => l !== undefined);
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

export function generateConfirmationMessage(booking: Booking): string {
  return [
    `Your Design Hour consultation is confirmed.`,
    ``,
    `Service:`,
    `${booking.service}`,
    ``,
    `Date:`,
    `${formatDate(booking.date)}`,
    ``,
    `Time:`,
    `${booking.time} IST`,
    ``,
    `Location:`,
    `${booking.location}`,
    ``,
    `Duration:`,
    `${booking.duration} minutes`,
    ``,
    `We look forward to meeting you.`,
    `— Design Hour`,
  ].join('\n');
}

export function generateReminderMessage(booking: Booking): string {
  return [
    `A quick reminder for your Design Hour consultation today.`,
    ``,
    `Time:`,
    `${booking.time} IST`,
    ``,
    `Location:`,
    `${booking.location}`,
    ``,
    `Your consultation will begin at the scheduled time.`,
    `See you soon.`,
    `— Design Hour`,
  ].join('\n');
}

export function generatePaymentRequestMessage(booking: Booking): string {
  return [
    `Your requested Design Hour slot is available.`,
    ``,
    `Consultation:`,
    `${booking.service} — ${booking.duration} minutes`,
    ``,
    `Date:`,
    `${formatDate(booking.date)} at ${booking.time} IST`,
    ``,
    `Fee:`,
    `₹${booking.amount.toLocaleString('en-IN')}`,
    ``,
    `Please complete the payment using the UPI details below so we can confirm your appointment.`,
  ].join('\n');
}

export function generateFollowUpMessage(booking: Booking): string {
  return [
    `Thank you for your Design Hour consultation.`,
    ``,
    `If you have any questions about the recommendations or would like to discuss next steps, feel free to reach out.`,
    ``,
    `We hope to work with you again.`,
    `— Design Hour`,
  ].join('\n');
}

export function openWhatsApp(phoneNumber: string, message: string): void {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
}

export interface OvertimeBillData {
  customerName: string;
  serviceName: string;
  bookedDuration: number;       // minutes
  actualDuration: number;       // seconds
  overtimeSeconds: number;      // seconds
  gracePeriodMinutes: number;
  billableOvertimeMinutes: number;
  overtimeRate: number;         // per 30 min block
  overtimeCost: number;
  baseAmount: number;
  totalAmount: number;
}

export function generateOvertimeBillMessage(data: OvertimeBillData): string {
  const actualMin = Math.floor(data.actualDuration / 60);
  const actualSec = data.actualDuration % 60;
  const overtimeMin = Math.floor(data.overtimeSeconds / 60);
  const overtimeSec = data.overtimeSeconds % 60;

  return [
    `Hi ${data.customerName},`,
    ``,
    `Your Design Hour consultation has concluded. Here is your session summary:`,
    ``,
    `Service: ${data.serviceName}`,
    `Booked Duration: ${data.bookedDuration} minutes`,
    `Actual Duration: ${actualMin} min ${actualSec > 0 ? `${actualSec} sec` : ''}`.trim(),
    ``,
    `─────────────────────`,
    `BILLING BREAKDOWN`,
    `─────────────────────`,
    `Base Consultation: ₹${data.baseAmount.toLocaleString('en-IN')}`,
    ``,
    `Additional Time: ${overtimeMin} min ${overtimeSec > 0 ? `${overtimeSec} sec` : ''}`.trim(),
    data.gracePeriodMinutes > 0
      ? `Grace Period: First ${data.gracePeriodMinutes} minutes complimentary`
      : '',
    `Billable Overtime: ${data.billableOvertimeMinutes} minutes`,
    `Overtime Rate: ₹${data.overtimeRate.toLocaleString('en-IN')} per 30 minutes`,
    `Overtime Charge: ₹${data.overtimeCost.toLocaleString('en-IN')}`,
    ``,
    `─────────────────────`,
    `TOTAL PAYABLE: ₹${data.totalAmount.toLocaleString('en-IN')}`,
    `─────────────────────`,
    ``,
    `Please complete the additional payment at your earliest convenience. We will share the UPI details shortly.`,
    ``,
    `Thank you for the extended session. We look forward to seeing your space come together.`,
    `— Design Hour`,
  ].filter(l => l !== null && l !== undefined).join('\n');
}
