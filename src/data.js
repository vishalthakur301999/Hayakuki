export const airports = [
  { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi International' },
  { code: 'GOI', city: 'Goa', name: 'Dabolim Airport' },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj' },
  { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda International' },
  { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhas Chandra Bose' },
  { code: 'MAA', city: 'Chennai', name: 'Chennai International' },
  { code: 'COK', city: 'Kochi', name: 'Cochin International' },
  { code: 'JAI', city: 'Jaipur', name: 'Jaipur International' },
  { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi International' },
  { code: 'PNQ', city: 'Pune', name: 'Pune International' },
  { code: 'AMD', city: 'Ahmedabad', name: 'Sardar Vallabhbhai Patel International' },
  { code: 'LKO', city: 'Lucknow', name: 'Chaudhary Charan Singh International' },
  { code: 'VNS', city: 'Varanasi', name: 'Lal Bahadur Shastri International' },
  { code: 'GAU', city: 'Guwahati', name: 'Lokpriya Gopinath Bordoloi International' },
  { code: 'IXB', city: 'Bagdogra', name: 'Bagdogra International' },
  { code: 'IXL', city: 'Leh', name: 'Kushok Bakula Rimpochee Airport' },
  { code: 'SXR', city: 'Srinagar', name: 'Sheikh ul-Alam International' },
  { code: 'TRV', city: 'Thiruvananthapuram', name: 'Trivandrum International' },
  { code: 'BBI', city: 'Bhubaneswar', name: 'Biju Patnaik International' },
  { code: 'IDR', city: 'Indore', name: 'Devi Ahilya Bai Holkar Airport' },
  { code: 'IXZ', city: 'Port Blair', name: 'Veer Savarkar International' },
  { code: 'UDR', city: 'Udaipur', name: 'Maharana Pratap Airport' },
  { code: 'ATQ', city: 'Amritsar', name: 'Sri Guru Ram Dass Jee International' },
  { code: 'PAT', city: 'Patna', name: 'Jay Prakash Narayan Airport' },
]

export const flights = [
  { id: '6E-2113', airline: 'IndiGo', short: '6E', from: 'DEL', to: 'GOI', depart: '06:10', arrive: '08:50', duration: '2h 40m', stops: 0, price: 5890, original: 6430, badge: 'Best value', color: '#2563eb', aircraft: 'Airbus A321neo', baggage: '15 kg', emissions: 148 },
  { id: 'AI-2841', airline: 'Air India', short: 'AI', from: 'DEL', to: 'GOI', depart: '08:45', arrive: '11:35', duration: '2h 50m', stops: 0, price: 6640, original: 6640, badge: 'Lowest emissions', color: '#d42433', aircraft: 'Airbus A320neo', baggage: '20 kg', emissions: 132 },
  { id: 'QP-1354', airline: 'Akasa Air', short: 'QP', from: 'DEL', to: 'GOI', depart: '12:20', arrive: '15:00', duration: '2h 40m', stops: 0, price: 6199, original: 6910, badge: 'Great deal', color: '#f97316', aircraft: 'Boeing 737 MAX 8', baggage: '15 kg', emissions: 141 },
  { id: 'UK-847', airline: 'Air India', short: 'AI', from: 'DEL', to: 'GOI', depart: '17:10', arrive: '19:50', duration: '2h 40m', stops: 0, price: 7490, original: 7490, badge: 'Flexible', color: '#d42433', aircraft: 'Airbus A320', baggage: '20 kg', emissions: 151 },
  { id: 'IX-1943', airline: 'Air India Express', short: 'IX', from: 'DEL', to: 'GOI', depart: '20:40', arrive: '23:25', duration: '2h 45m', stops: 0, price: 5720, original: 6270, badge: 'Cheapest', color: '#e5484d', aircraft: 'Boeing 737-8', baggage: '15 kg', emissions: 144 },
  { id: '6E-2028', airline: 'IndiGo', short: '6E', from: 'DEL', to: 'GOI', depart: '14:15', arrive: '19:10', duration: '4h 55m', stops: 1, price: 5110, original: 5890, badge: 'Cheapest', color: '#2563eb', aircraft: 'Airbus A320neo', baggage: '15 kg', emissions: 196 },
  { id: '6E-5031', airline: 'IndiGo', short: '6E', from: 'BOM', to: 'BLR', depart: '07:30', arrive: '09:15', duration: '1h 45m', stops: 0, price: 3840, original: 4290, badge: 'Best value', color: '#2563eb', aircraft: 'Airbus A320neo', baggage: '15 kg', emissions: 93 },
  { id: 'AI-639', airline: 'Air India', short: 'AI', from: 'BOM', to: 'BLR', depart: '10:10', arrive: '11:55', duration: '1h 45m', stops: 0, price: 4210, original: 4210, badge: 'Lowest emissions', color: '#d42433', aircraft: 'Airbus A320neo', baggage: '20 kg', emissions: 86 },
  { id: 'QP-1105', airline: 'Akasa Air', short: 'QP', from: 'BLR', to: 'COK', depart: '16:35', arrive: '17:45', duration: '1h 10m', stops: 0, price: 2990, original: 3420, badge: 'Great deal', color: '#f97316', aircraft: 'Boeing 737 MAX 8', baggage: '15 kg', emissions: 62 },
  { id: '6E-728', airline: 'IndiGo', short: '6E', from: 'CCU', to: 'MAA', depart: '05:55', arrive: '08:20', duration: '2h 25m', stops: 0, price: 4890, original: 5360, badge: 'Early bird', color: '#2563eb', aircraft: 'Airbus A321neo', baggage: '15 kg', emissions: 119 },
  { id: 'AI-1741', airline: 'Air India', short: 'AI', from: 'DEL', to: 'JAI', depart: '09:20', arrive: '10:15', duration: '55m', stops: 0, price: 2710, original: 2710, badge: 'Fastest', color: '#d42433', aircraft: 'Airbus A319', baggage: '20 kg', emissions: 49 },
  { id: '6E-6211', airline: 'IndiGo', short: '6E', from: 'DEL', to: 'HYD', depart: '05:40', arrive: '07:55', duration: '2h 15m', stops: 0, price: 4790, original: 5280, badge: 'Early bird', color: '#2563eb', aircraft: 'Airbus A321neo', baggage: '15 kg', emissions: 121 },
  { id: 'AI-560', airline: 'Air India', short: 'AI', from: 'DEL', to: 'HYD', depart: '13:10', arrive: '15:25', duration: '2h 15m', stops: 0, price: 5340, original: 5340, badge: 'Flexible', color: '#d42433', aircraft: 'Airbus A320neo', baggage: '20 kg', emissions: 116 },
  { id: 'QP-1412', airline: 'Akasa Air', short: 'QP', from: 'BOM', to: 'GOI', depart: '08:25', arrive: '09:40', duration: '1h 15m', stops: 0, price: 3290, original: 3790, badge: 'Best value', color: '#f97316', aircraft: 'Boeing 737 MAX 8', baggage: '15 kg', emissions: 68 },
  { id: '6E-7342', airline: 'IndiGo', short: '6E', from: 'BLR', to: 'IXZ', depart: '06:15', arrive: '08:45', duration: '2h 30m', stops: 0, price: 7290, original: 7980, badge: 'Island fare', color: '#2563eb', aircraft: 'Airbus A320neo', baggage: '15 kg', emissions: 137 },
  { id: 'AI-485', airline: 'Air India', short: 'AI', from: 'DEL', to: 'IXL', depart: '06:05', arrive: '07:35', duration: '1h 30m', stops: 0, price: 6890, original: 7420, badge: 'Mountain route', color: '#d42433', aircraft: 'Airbus A320neo', baggage: '20 kg', emissions: 91 },
  { id: '6E-2049', airline: 'IndiGo', short: '6E', from: 'DEL', to: 'IXL', depart: '09:10', arrive: '10:40', duration: '1h 30m', stops: 0, price: 7140, original: 7690, badge: 'Popular', color: '#2563eb', aircraft: 'Airbus A320neo', baggage: '15 kg', emissions: 88 },
  { id: 'IX-1176', airline: 'Air India Express', short: 'IX', from: 'COK', to: 'TRV', depart: '11:35', arrive: '12:25', duration: '50m', stops: 0, price: 2290, original: 2690, badge: 'Quick hop', color: '#e5484d', aircraft: 'Boeing 737-8', baggage: '15 kg', emissions: 41 },
  { id: '6E-918', airline: 'IndiGo', short: '6E', from: 'HYD', to: 'VNS', depart: '07:20', arrive: '09:15', duration: '1h 55m', stops: 0, price: 4390, original: 4870, badge: 'Best value', color: '#2563eb', aircraft: 'Airbus A320neo', baggage: '15 kg', emissions: 97 },
  { id: 'AI-657', airline: 'Air India', short: 'AI', from: 'BOM', to: 'UDR', depart: '10:45', arrive: '12:10', duration: '1h 25m', stops: 0, price: 3980, original: 3980, badge: 'Flexible', color: '#d42433', aircraft: 'Airbus A319', baggage: '20 kg', emissions: 74 },
  { id: '6E-2218', airline: 'IndiGo', short: '6E', from: 'CCU', to: 'GAU', depart: '06:50', arrive: '08:05', duration: '1h 15m', stops: 0, price: 3190, original: 3580, badge: 'Early bird', color: '#2563eb', aircraft: 'Airbus A320neo', baggage: '15 kg', emissions: 62 },
  { id: 'QP-1546', airline: 'Akasa Air', short: 'QP', from: 'BOM', to: 'AMD', depart: '18:30', arrive: '19:45', duration: '1h 15m', stops: 0, price: 2860, original: 3290, badge: 'Evening deal', color: '#f97316', aircraft: 'Boeing 737 MAX 8', baggage: '15 kg', emissions: 64 },
  { id: '6E-6539', airline: 'IndiGo', short: '6E', from: 'BLR', to: 'PNQ', depart: '14:05', arrive: '15:35', duration: '1h 30m', stops: 0, price: 3470, original: 3890, badge: 'Best value', color: '#2563eb', aircraft: 'Airbus A321neo', baggage: '15 kg', emissions: 77 },
  { id: 'AI-821', airline: 'Air India', short: 'AI', from: 'DEL', to: 'SXR', depart: '07:45', arrive: '09:15', duration: '1h 30m', stops: 0, price: 5640, original: 5640, badge: 'Lowest emissions', color: '#d42433', aircraft: 'Airbus A320neo', baggage: '20 kg', emissions: 82 },
  { id: 'IX-2763', airline: 'Air India Express', short: 'IX', from: 'MAA', to: 'BBI', depart: '16:10', arrive: '18:00', duration: '1h 50m', stops: 0, price: 3890, original: 4320, badge: 'Great deal', color: '#e5484d', aircraft: 'Boeing 737-8', baggage: '15 kg', emissions: 93 },
  { id: '6E-5112', airline: 'IndiGo', short: '6E', from: 'DEL', to: 'ATQ', depart: '11:30', arrive: '12:35', duration: '1h 05m', stops: 0, price: 2980, original: 3390, badge: 'Quick hop', color: '#2563eb', aircraft: 'Airbus A320neo', baggage: '15 kg', emissions: 54 },
  { id: 'AI-409', airline: 'Air India', short: 'AI', from: 'DEL', to: 'PAT', depart: '15:50', arrive: '17:35', duration: '1h 45m', stops: 0, price: 4180, original: 4180, badge: 'Flexible', color: '#d42433', aircraft: 'Airbus A320', baggage: '20 kg', emissions: 89 },
  { id: 'QP-1328', airline: 'Akasa Air', short: 'QP', from: 'BOM', to: 'LKO', depart: '09:35', arrive: '11:45', duration: '2h 10m', stops: 0, price: 4670, original: 5190, badge: 'Great deal', color: '#f97316', aircraft: 'Boeing 737 MAX 8', baggage: '15 kg', emissions: 111 },
  { id: '6E-7784', airline: 'IndiGo', short: '6E', from: 'DEL', to: 'IDR', depart: '19:15', arrive: '20:40', duration: '1h 25m', stops: 0, price: 3510, original: 3940, badge: 'Evening deal', color: '#2563eb', aircraft: 'Airbus A320neo', baggage: '15 kg', emissions: 72 },
]

export const fareDates = [
  { day: 'Tue', date: '13 Aug', price: 6230 },
  { day: 'Wed', date: '14 Aug', price: 5890, best: true },
  { day: 'Thu', date: '15 Aug', price: 6410 },
  { day: 'Fri', date: '16 Aug', price: 7050 },
  { day: 'Sat', date: '17 Aug', price: 6820 },
]

export const inspirations = [
  { city: 'Leh', kicker: 'High-altitude calm', price: 'from ₹6,890', className: 'leh', code: 'IXL' },
  { city: 'Kochi', kicker: 'Coast, culture, coffee', price: 'from ₹4,120', className: 'kochi', code: 'COK' },
  { city: 'Jaipur', kicker: 'A very pink weekend', price: 'from ₹2,710', className: 'jaipur', code: 'JAI' },
  { city: 'Varanasi', kicker: 'Dawn on the ghats', price: 'from ₹4,390', className: 'kochi', code: 'VNS' },
  { city: 'Udaipur', kicker: 'Lakeside evenings', price: 'from ₹3,980', className: 'jaipur', code: 'UDR' },
  { city: 'Port Blair', kicker: 'Trade traffic for tides', price: 'from ₹7,290', className: 'leh', code: 'IXZ' },
]

export const stories = [
  {
    id: 'slow-days-in-goa',
    title: 'The slower side of Goa',
    excerpt: 'Beyond the beach clubs: village bakeries, quiet coves and the best kind of long lunch.',
    category: 'Coast',
    readTime: '6 min read',
    author: 'Maya Kapoor',
    date: '8 Aug 2026',
    className: 'story-goa',
    body: [
      'Goa rewards the traveller who leaves a little room in the plan. Head inland after breakfast and the traffic thins into tiled homes, old wells and lanes shaded by breadfruit trees.',
      'Start in São Matias for a walk past its Portuguese-era houses, then follow the Mandovi north for lunch. The small kitchens here work to the rhythm of the day: fish arrives, menus change, and nobody is in much of a hurry.',
      'Save the beach for late afternoon. Ashwem is gentle at that hour, with enough space to find your own patch of sand and watch the sky turn copper.'
    ]
  },
  {
    id: 'jaipur-after-dark',
    title: 'Jaipur after dark',
    excerpt: 'Rooftop thalis, blue-hour bazaars and an evening route through the Pink City.',
    category: 'City guide',
    readTime: '5 min read',
    author: 'Arjun Mehta',
    date: '2 Aug 2026',
    className: 'story-jaipur',
    body: [
      'When the afternoon heat lifts, Jaipur changes tempo. Shop shutters glow under warm bulbs and the old city becomes a maze of spice stalls, silver workshops and late cups of chai.',
      'Begin at Hawa Mahal just before sunset. Walk south through Johari Bazaar, stopping wherever the kachori queue looks longest, then climb to a rooftop for dinner with the lit palace walls below.',
      'The best evenings here are loosely planned. Pick a direction, leave time for conversation, and let the old city do the rest.'
    ]
  },
  {
    id: 'leh-breathe-deeper',
    title: 'Leh: arrive, pause, breathe',
    excerpt: 'A gentle first 48 hours at altitude, from monastery mornings to bowls of thukpa.',
    category: 'Mountains',
    readTime: '8 min read',
    author: 'Tashi Dolma',
    date: '27 Jul 2026',
    className: 'story-leh',
    body: [
      'The first rule of Leh is simple: do less. Your body needs time to meet the altitude, so make the opening day about sunlight, water and the short walk between your guesthouse and the market.',
      'On the second morning, take the slow road to Thiksey. The monastery catches the early light, and the view across the Indus valley puts the scale of Ladakh into perspective.',
      'Back in town, find a bowl of thukpa and sit longer than necessary. Acclimatisation has rarely tasted so good.'
    ]
  },
  {
    id: 'kochi-by-water',
    title: 'Kochi, by water',
    excerpt: 'Ferries, spice warehouses and a harbour city best understood from the deck.',
    category: 'Culture',
    readTime: '7 min read',
    author: 'Nila Thomas',
    date: '19 Jul 2026',
    className: 'story-kochi',
    body: [
      'Kochi makes more sense from a ferry. The public boats stitch together islands, markets and neighbourhoods while tankers move slowly across the horizon.',
      'Ride from Ernakulam to Fort Kochi in the morning, walk through Mattancherry before the heat builds, and stop for cardamom tea near the old spice warehouses.',
      'Return across the water at sunset. It costs almost nothing and delivers one of the finest city views in the south.'
    ]
  },
  {
    id: 'varanasi-first-light',
    title: 'Varanasi at first light',
    excerpt: 'A dawn boat, lanes full of breakfast and a city that never really sleeps.',
    category: 'City guide',
    readTime: '6 min read',
    author: 'Kabir Joshi',
    date: '12 Jul 2026',
    className: 'story-jaipur',
    body: [
      'The river is at its quietest just before sunrise. Boats push away from Assi Ghat while the far bank remains a pale strip of sand.',
      'After the ride, follow the smell of frying kachori into the old lanes. Breakfast here is not a stop between sights; it is part of understanding the city.',
      'Spend the afternoon slowly and return to the ghats when the lamps come out. Varanasi reveals itself in repetitions.'
    ]
  },
  {
    id: 'andaman-blue',
    title: 'The Andamans in blue',
    excerpt: 'Ferry timings, reef mornings and how to leave enough room for island weather.',
    category: 'Islands',
    readTime: '8 min read',
    author: 'Reva Nair',
    date: '4 Jul 2026',
    className: 'story-goa',
    body: [
      'Island time begins with the ferry board. Build a flexible route from Port Blair and resist the urge to pack every beach into one trip.',
      'Neil Island is made for bicycles and early swims. Havelock carries more energy, but a quiet cove is never far away.',
      'Keep one unplanned day. Tropical rain has a way of rewriting itineraries, usually for the better.'
    ]
  },
  {
    id: 'udaipur-lake-notes',
    title: 'Notes from Udaipur',
    excerpt: 'Courtyard cafés, miniature paintings and the loveliest walk around Lake Pichola.',
    category: 'Culture',
    readTime: '5 min read',
    author: 'Meera Rathore',
    date: '28 Jun 2026',
    className: 'story-kochi',
    body: [
      'Udaipur is most persuasive on foot. Start at Gangaur Ghat and let the lanes carry you between tiny shrines, painting studios and shaded courtyards.',
      'The City Palace deserves a morning, but the quieter pleasure is watching the lake change colour from a rooftop at dusk.',
      'Stay close to the old city and walk early. The light on the white walls is worth the alarm.'
    ]
  },
  {
    id: 'hyderabad-by-plate',
    title: 'Hyderabad by the plate',
    excerpt: 'An edible route through old-city breakfasts, Irani cafés and late-night biryani.',
    category: 'Food',
    readTime: '7 min read',
    author: 'Amaan Khan',
    date: '20 Jun 2026',
    className: 'story-leh',
    body: [
      'Begin near Charminar before the shops open, with a cup of Irani chai and a plate of soft khari biscuits.',
      'Lunch can wait. Snack through the old city, then head west for a slower afternoon in the cafés around Banjara Hills.',
      'Biryani is the final event. Order less than you think you need and still expect leftovers.'
    ]
  }
]

export const demoUsers = [
  { email: 'vishal@hayakuki.com', password: 'demo', name: 'Vishal Thakur', phone: '+91 98765 43210', role: 'traveller', home: 'New Delhi (DEL)', tier: 'Silver Voyager' },
  { email: 'admin@hayakuki.com', password: 'admin123', name: 'Riya Sen', role: 'admin', home: 'Mumbai', tier: 'Operations' },
]
