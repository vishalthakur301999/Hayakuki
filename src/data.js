export const airports = [
  { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi International' },
  { code: 'GOI', city: 'Goa', name: 'Dabolim Airport' },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj' },
  { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda International' },
  { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhas Chandra Bose' },
  { code: 'MAA', city: 'Chennai', name: 'Chennai International' },
  { code: 'COK', city: 'Kochi', name: 'Cochin International' },
  { code: 'JAI', city: 'Jaipur', name: 'Jaipur International' },
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
]
