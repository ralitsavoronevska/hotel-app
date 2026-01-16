// src/constants/hotelServices.ts

export interface HotelService {
  icon: string // emoji or icon name/class
  title: string
}

// ────────────────────────────────────────────────
// Services visible/usable by guests (clients)
// ────────────────────────────────────────────────

export const GUEST_SERVICES: HotelService[] = [
  { icon: '🍽️', title: 'In-Room Dining' },
  { icon: '🍷', title: 'Restaurant & Bar Reservations' },
  { icon: '🧖‍♀️', title: 'Spa & Wellness' },
  { icon: '🏊', title: 'Swimming Pool & Beach Access' },
  { icon: '🅿️', title: 'Parking' },
  { icon: '🚗', title: 'Transportation / Transfers' },
  { icon: '⏰', title: 'Wake-up Call' },
  { icon: '🧹', title: 'Housekeeping / Turndown Service' },
  { icon: '🧺', title: 'Laundry & Dry Cleaning' },
  { icon: '🎩', title: 'Concierge Services' },
  { icon: '🛏️', title: 'Room Extras' },
  { icon: '🕒', title: 'Late Check-out / Early Check-in' },
  { icon: '🍫', title: 'Minibar' },
  { icon: '🧳', title: 'Luggage Storage / Porter' },
  { icon: '💻', title: 'Business Center' },
  { icon: '🧸', title: 'Kids Club / Babysitting' },
  { icon: '🐶', title: 'Pet Services' },
  { icon: '📶', title: 'Wi-Fi & Smart Room Controls' },
  { icon: '✅', title: 'Express Check-out' },
  { icon: '⭐', title: 'Loyalty Program / Points' },
  { icon: '🔑', title: 'Digital Key / Mobile Check-in' },
]

// ────────────────────────────────────────────────
// Services visible/usable by hotel staff / administrators
// ────────────────────────────────────────────────

export const STAFF_SERVICES: HotelService[] = [
  { icon: '📅', title: 'Reservation Management' },
  { icon: '🛌', title: 'Room Assignment & Blocking' },
  { icon: '🏁', title: 'Check-in / Check-out Operations' },
  { icon: '🧹', title: 'Housekeeping Status & Tasks' },
  { icon: '🔧', title: 'Maintenance Requests & Tracking' },
  { icon: '💳', title: 'Minibar & Room Billing' },
  { icon: '💰', title: 'Rate & Pricing Management' },
  { icon: '👤', title: 'Guest Profile Management' },
  { icon: '🧾', title: 'Billing & Folio Management' },
  { icon: '💳', title: 'Payment Processing' },
  { icon: '🚫', title: 'Room Status Override' },
  { icon: '📋', title: 'Staff Task Scheduling' },
  { icon: '🔍', title: 'Lost & Found Management' },
  { icon: '⚠️', title: 'Incident / Complaint Handling' },
  { icon: '🔐', title: 'Access Control Management' },
  { icon: '🎉', title: 'Group & Event Coordination' },
  { icon: '📊', title: 'Revenue Reports & Forecasting' },
  { icon: '🔗', title: 'PMS Integration' },
  { icon: '🛡️', title: 'Security & DND Monitoring' },
  { icon: '📩', title: 'Guest Messaging & Communication' },
]
