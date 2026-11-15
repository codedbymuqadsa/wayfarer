import { U } from './images';

export const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Explore',
    href: '/explore',
    children: [
      { label: 'Explore all destinations', href: '/explore', text: 'Filter by region, season and travel style' },
      { label: 'Trip Planner', href: '/trip-planner', text: 'Build a day-by-day itinerary' },
      { label: 'Travel stories', href: '/#stories', text: 'Editorial inspiration' },
    ],
  },
  {
    label: 'Destinations',
    href: '/destinations',
    children: [
      { label: 'Bali, Indonesia', href: '/destinations/bali' },
      { label: 'Paris, France', href: '/destinations/paris' },
      { label: 'Santorini, Greece', href: '/destinations/santorini' },
      { label: 'Tokyo, Japan', href: '/destinations/tokyo' },
      { label: 'Maldives', href: '/destinations/maldives' },
      { label: 'All destinations', href: '/destinations' },
    ],
  },
  {
    label: 'Stays',
    href: '/stays',
    children: [
      { label: 'Search all stays', href: '/stays', text: 'Hotels, resorts, villas and lodges' },
      { label: 'Resorts', href: '/stays?type=Resort' },
      { label: 'Boutique hotels', href: '/stays?type=Boutique%20Hotel' },
      { label: 'Villas & lodges', href: '/stays?type=Villa' },
    ],
  },
  {
    label: 'Experiences',
    href: '/experiences',
    children: [
      { label: 'All experiences', href: '/experiences' },
      { label: 'Adventure', href: '/experiences?category=Adventure' },
      { label: 'Food & drink', href: '/experiences?category=Food' },
      { label: 'Culture', href: '/experiences?category=Culture' },
      { label: 'Romantic', href: '/experiences?category=Romantic' },
    ],
  },
  { label: 'About', href: '/about' },
];

export const travelCategories = [
  { title: 'Beach Escapes', text: 'Powder sand and turquoise water', image: U(62, 900), href: '/explore?type=Beach' },
  { title: 'Mountain Retreats', text: 'Alpine air and wide horizons', image: U(31, 900), href: '/explore?type=Mountain' },
  { title: 'City Breaks', text: 'Culture, cuisine and skylines', image: U(26, 900), href: '/explore?type=City' },
  { title: 'Luxury Resorts', text: 'Where every detail is considered', image: U(206, 900), href: '/stays?type=Resort' },
  { title: 'Romantic Getaways', text: 'Slow evenings for two', image: U(39, 900), href: '/explore?type=Romantic' },
  { title: 'Adventure Trips', text: 'Trails, summits and open water', image: U(160, 900), href: '/explore?type=Adventure' },
];

export const experienceThemes = [
  { title: 'Cultural Tours', text: 'Temples, markets and living traditions', image: U(34, 800), category: 'Culture' },
  { title: 'Adventure Activities', text: 'Balloons, treks and dune drives', image: U(125, 800), category: 'Adventure' },
  { title: 'Food Experiences', text: 'Cook, taste and wander with locals', image: U(167, 800), category: 'Food' },
  { title: 'Nature & Wildlife', text: 'Dawn drives and quiet trails', image: U(80, 800), category: 'Nature' },
  { title: 'Romantic Experiences', text: 'Sunset sails and candlelit cruises', image: U(130, 800), category: 'Romantic' },
];

export const editorials = [
  { slug: 'slow-travel-bali', body: ["Most itineraries treat Bali as a checklist: a temple at sunrise, a waterfall by noon, a beach club by dusk. But the island reveals itself to those who stay put. Choose a single village — Ubud, Sidemen or Munduk — and settle in for three nights.","Walk the same lane each morning and you will begin to recognise the woman making canang offerings on her doorstep, the farmer opening the irrigation gate, the warung that serves the best nasi campur. These small repetitions are where travel turns into belonging.","Book a stay with a garden, hire a bicycle and let the afternoons stretch. The temples will still be there when you are ready — and you will arrive at them with a little more understanding of why they matter."], title: 'The Case for Slow Travel in Bali', category: 'Destination Story', text: 'Why three nights in one village will teach you more than ten days of ticking off temples.', image: U(164, 1400), read: '6 min read' },
  { slug: 'alps-in-autumn', body: ["September and October quietly rewrite the Alps. Larches turn gold, cable cars run without queues and the air carries a clarity that summer haze never allows.","Mountain huts stay open into October, serving rösti and hot chocolate to a far smaller crowd. Trails around Lauterbrunnen and Grindelwald are at their most photogenic, with fresh snow dusting the high peaks while the valleys remain mild.","Pack layers, book a lodge with a wood stove and plan for early starts. By late afternoon the light turns amber and the valley belongs to you."], title: 'Why Autumn Is the Alps’ Best-Kept Secret', category: 'Seasonal Guide', text: 'Golden larches, empty trails and mountain huts still serving fondue.', image: U(115, 900), read: '5 min read' },
  { slug: 'eating-tokyo', body: ["The best meals in Tokyo rarely happen in rooms with more than ten seats. Look for counters where the chef faces you, a menu handwritten on paper and a queue of salarymen who clearly know something.","Start with yakitori under the train tracks at Yurakucho, move to a standing sushi bar in Tsukiji, and finish with a bowl of ramen at midnight in Shinjuku. Learn three phrases — itadakimasu, oishii, gochisosama — and the city opens up.","Cash is still helpful, reservations are often essential and the finest meals are frequently the ones you stumble into by following the smell of charcoal."], title: 'Eating Tokyo, One Counter at a Time', category: 'Food & Drink', text: 'A field guide to the city’s smallest and most memorable dining rooms.', image: U(120, 900), read: '8 min read' },
];

export const whyChoose = [
  { icon: 'Gem', title: 'Curated stays', text: 'Every property is hand-picked for design, service and setting — never just a list of rooms.' },
  { icon: 'Route', title: 'Easy trip planning', text: 'Build a day-by-day itinerary, drop in experiences and keep it all in one place.' },
  { icon: 'Compass', title: 'Personalised experiences', text: 'Local-led tours and moments matched to how you like to travel.' },
  { icon: 'Sparkles', title: 'Flexible discovery', text: 'Search by mood, season or budget and shape a trip that fits you.' },
];

export const values = [
  { title: 'Curation over volume', text: 'We feature fewer places, chosen with care, so every recommendation earns its place.' },
  { title: 'Respect for place', text: 'We favour stays and guides who invest in their communities and protect what makes a destination special.' },
  { title: 'Honest detail', text: 'Clear prices, real photography and transparent policies — no surprises at checkout.' },
  { title: 'Time well spent', text: 'Tools that take the friction out of planning so you can focus on the journey.' },
];

export const faqs = {
  Reservations: [
    { q: 'How do I make a reservation?', a: 'Search for a destination, choose a stay, select a room and press Reserve. Complete your guest details and confirm — your booking reference appears immediately and is saved in My Trips.' },
    { q: 'Can I change the dates of my booking?', a: 'Open My Trips, view your booking and cancel it, then create a new reservation with your new dates. Flexible rates can be changed free of charge up to 48 hours before check-in.' },
    { q: 'Is my booking confirmed instantly?', a: 'Yes. WAYFARER bookings in this demo are confirmed on screen and stored on your device with a unique reference number.' },
  ],
  Hotels: [
    { q: 'How are hotels selected?', a: 'Our editors visit, review and rate every property. We look for distinctive design, outstanding service and a strong sense of place.' },
    { q: 'What time is check-in and check-out?', a: 'Standard check-in is from 3:00 PM and check-out is by 11:00 AM. Each hotel page lists exact times and any early or late options.' },
    { q: 'Are the photos accurate?', a: 'Photography represents the property type and setting. Room specifics may vary slightly by category.' },
  ],
  Payments: [
    { q: 'Which payment options are shown?', a: 'The booking page demonstrates credit or debit card, PayPal and Pay at Property options. This is a demonstration interface — no payment is processed and no card details are collected.' },
    { q: 'When am I charged?', a: 'In a live product, you would pay at booking or at the property depending on your selected rate. Here, no charges are ever made.' },
    { q: 'Do prices include taxes?', a: 'Prices shown include estimated taxes and service fees, which are itemised in your booking summary.' },
  ],
  Cancellations: [
    { q: 'What is the cancellation policy?', a: 'Most stays offer free cancellation up to 48 hours before check-in. Non-refundable rates are marked clearly. Read our full Cancellation Policy for details.' },
    { q: 'How do I cancel a booking?', a: 'Go to My Trips, open the booking and choose Cancel booking. Your booking status updates immediately.' },
  ],
  'Trip Planning': [
    { q: 'How does the Trip Planner work?', a: 'Create a trip with a destination and dates, then add activities to each day. You can reorder, edit and add notes. Everything is saved on your device.' },
    { q: 'Can I add experiences to my trip?', a: 'Yes. On any experience page choose Add to Trip, pick the trip and day, and the experience appears in your itinerary.' },
    { q: 'Will my plans be there tomorrow?', a: 'Plans are saved in your browser, so they will be available next time you visit on the same device.' },
  ],
  Account: [
    { q: 'Do I need an account?', a: 'No. WAYFARER uses a demo profile so you can explore every feature without registering.' },
    { q: 'How do I clear my saved data?', a: 'Remove wishlist items, trips and bookings from their pages, or clear site data from your browser settings.' },
  ],
};

export const policies = {
  booking: {
    title: 'Booking Policy',
    updated: '1 January 2026',
    intro: 'This policy explains how reservations are made, confirmed and managed on WAYFARER.',
    sections: [
      ['Making a reservation', 'A reservation is made when you complete the booking form and confirm. You must be at least 18 years old to book, and the lead guest must be present at check-in with valid photo identification.'],
      ['Confirmation', 'You will see a confirmation screen with a unique booking reference as soon as your reservation is complete. Keep this reference for any enquiries.'],
      ['Guest details', 'Please provide accurate names and contact details. Names on the booking should match the identification presented at check-in.'],
      ['Occupancy', 'Each room has a maximum occupancy listed on its card. Additional guests may incur supplements or may not be accommodated.'],
      ['Special requests', 'Special requests are passed to the property but cannot be guaranteed. They are subject to availability at check-in.'],
    ],
  },
  cancellation: {
    title: 'Cancellation Policy',
    updated: '1 January 2026',
    intro: 'Plans change. This policy explains when and how you can cancel a reservation.',
    sections: [
      ['Free cancellation', 'Standard rates can be cancelled free of charge up to 48 hours before the check-in date at 3:00 PM local time.'],
      ['Late cancellations', 'Cancellations within 48 hours of check-in may be charged the first night of the stay.'],
      ['No-shows', 'If you do not arrive and have not cancelled, the full amount of the reservation may be charged.'],
      ['How to cancel', 'Open My Trips, select the booking and choose Cancel booking. The status updates immediately.'],
      ['Experiences', 'Experiences can be cancelled up to 24 hours before the start time for a full refund. Weather-related cancellations by the operator are fully refunded.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    updated: '1 January 2026',
    intro: 'We value your privacy. This policy describes the limited information stored by this demonstration site.',
    sections: [
      ['What we store', 'WAYFARER stores your wishlist, bookings, trips and demo profile in your own browser using local storage. Nothing is sent to a server.'],
      ['Forms', 'Information you enter into contact, newsletter and booking forms is validated in your browser. In this demo, it is not transmitted anywhere.'],
      ['Payments', 'This demonstration does not process payments and does not request real payment card details.'],
      ['Cookies and tracking', 'We do not use advertising cookies or third-party trackers.'],
      ['Your choices', 'You can delete any stored data from within the site or by clearing your browser storage at any time.'],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    updated: '1 January 2026',
    intro: 'By using this website you agree to the following terms.',
    sections: [
      ['Use of the site', 'WAYFARER is a demonstration travel platform. Content is provided for illustration and no real reservations are made.'],
      ['Accuracy', 'Hotel, destination and experience information is fictional or illustrative and may not reflect real availability or pricing.'],
      ['Intellectual property', 'Brand identity, design and written content belong to WAYFARER. Photography is sourced from Unsplash contributors.'],
      ['Limitation of liability', 'To the extent permitted by law, WAYFARER is not liable for losses arising from reliance on demonstration content.'],
      ['Changes', 'We may update these terms from time to time. Continued use of the site constitutes acceptance of changes.'],
    ],
  },
};
