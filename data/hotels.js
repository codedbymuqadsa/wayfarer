import { U, ROOM_POOL } from './images';
import { getDestination } from './destinations';

export const AMENITY_MAP = {
  wifi: 'Free Wi-Fi', pool: 'Swimming Pool', spa: 'Spa & Wellness', breakfast: 'Breakfast Included', gym: 'Fitness Centre',
  restaurant: 'On-site Restaurant', bar: 'Bar & Lounge', parking: 'Free Parking', ac: 'Air Conditioning', beach: 'Beach Access', pets: 'Pet Friendly', kids: 'Family Friendly',
};
export const FACILITY_MAP = {
  concierge: 'Concierge', laundry: 'Laundry Service', shuttle: 'Airport Shuttle', business: 'Business Centre', reception: '24-hour Reception',
  roomservice: 'Room Service', luggage: 'Luggage Storage', tours: 'Tour Desk', access: 'Wheelchair Accessible', ev: 'EV Charging',
};
export const FEATURE_MAP = {
  seaview: 'Sea View', privatepool: 'Private Pool', balcony: 'Balcony / Terrace', kitchen: 'Kitchenette', bath: 'Soaking Bathtub',
  mountain: 'Mountain View', garden: 'Garden View', fireplace: 'Fireplace', cityview: 'City View',
};
export const PROPERTY_TYPES = ['Resort', 'Hotel', 'Boutique Hotel', 'Villa', 'Lodge', 'Apartment', 'Ryokan', 'Riad', 'Guesthouse'];

const expand = (str, map) => str.split(',').map((k) => map[k.trim()]).filter(Boolean);

// h(slug, name, destSlug, location, type, stars, rating, reviews, price, hero, second, featured, am, fac, feat, desc, highlights)
const h = (slug, name, dest, location, type, stars, rating, reviews, price, hero, second, featured, am, fac, feat, desc, highlights) => {
  const destination = getDestination(dest);
  const seed = slug.length + stars;
  const roomImg = (n) => U(ROOM_POOL[(seed * 3 + n * 5) % ROOM_POOL.length], 900);
  return {
    id: `h-${slug}`,
    name,
    slug,
    destinationId: destination.id,
    destinationSlug: dest,
    destinationName: destination.name,
    location: `${location}, ${destination.country}`,
    neighbourhood: location,
    type,
    description: desc,
    stars,
    rating,
    reviewCount: reviews,
    price,
    image: U(hero, 800),
    images: [U(hero, 1400), roomImg(0), U(second, 1000), roomImg(1), destination.gallery[1] || roomImg(2)],
    amenities: expand(am, AMENITY_MAP),
    facilities: expand(fac, FACILITY_MAP),
    features: expand(feat, FEATURE_MAP),
    highlights,
    availability: ['cave-house-oia', 'sacred-valley-glamp', 'cave-rose-hotel', 'caldera-blue-suites'].includes(slug) ? 'Limited availability' : 'Available',
    featured,
    popularity: Math.round(reviews * rating),
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    rooms: [
      { id: `${slug}-std`, name: 'Standard Room', capacity: 2, bed: '1 Queen Bed', size: 28, price: price, image: roomImg(0), amenities: ['Free Wi-Fi', 'Air Conditioning', 'Rain Shower', 'Tea & Coffee'] },
      { id: `${slug}-dlx`, name: 'Deluxe Room', capacity: 3, bed: '1 King Bed + Sofa', size: 36, price: Math.round(price * 1.35), image: roomImg(1), amenities: ['Free Wi-Fi', 'Balcony', 'Minibar', 'Bathrobes & Slippers'] },
      { id: `${slug}-ste`, name: 'Suite', capacity: 4, bed: '1 King Bed + 2 Singles', size: 52, price: Math.round(price * 1.9), image: roomImg(2), amenities: ['Separate Lounge', 'Soaking Bathtub', 'Nespresso Machine', 'Premium Toiletries'] },
      { id: `${slug}-pre`, name: 'Premium Suite', capacity: 6, bed: '2 King Beds', size: 78, price: Math.round(price * 2.8), image: roomImg(3), amenities: ['Private Terrace', 'Butler Service', 'Dining Area', 'Evening Turndown'] },
    ],
  };
};

const raw = [
  h('alaya-ubud-retreat', 'Alaya Ubud Retreat', 'bali', 'Ubud', 'Resort', 5, 4.9, 842, 385, 99, 204, true, 'wifi,pool,spa,breakfast,restaurant,gym,ac', 'concierge,laundry,shuttle,roomservice,tours,reception', 'privatepool,garden,balcony,bath',
    'Set above the Ayung river gorge, Alaya pairs thatched-roof villas with forest views and a spa rooted in Balinese healing traditions. Mornings begin with yoga on the terrace; evenings end with gamelan at the open-air pavilion.', ['Riverside infinity pool', 'Daily yoga & meditation', 'Balinese healing spa', 'Complimentary shuttle to Ubud centre']),
  h('uluwatu-cliff-villas', 'Uluwatu Cliff Villas', 'bali', 'Uluwatu', 'Villa', 5, 4.8, 512, 540, 139, 199, true, 'wifi,pool,spa,breakfast,bar,ac,beach', 'concierge,laundry,shuttle,roomservice,reception', 'privatepool,seaview,balcony,bath',
    'Perched 80 metres above the Indian Ocean, these private villas each have their own plunge pool and sweeping sunset views. A cliff-edge lounge serves cocktails as surfers carve the waves below.', ['Private plunge pools', 'Cliff-edge sunset lounge', 'Beach lift access', 'Surf concierge']),
  h('sawah-boutique-stay', 'Sawah Boutique Stay', 'bali', 'Tegallalang', 'Boutique Hotel', 4, 4.7, 318, 165, 164, 201, false, 'wifi,pool,breakfast,restaurant,ac', 'laundry,tours,reception,luggage', 'garden,balcony',
    'A quiet boutique stay overlooking the Tegallalang terraces, with just twelve bamboo-and-teak rooms and a pool that blends into the paddies.', ['Rice terrace views', 'Teak and bamboo rooms', 'Cooking classes', 'Sunrise breakfast baskets']),
  h('maison-saint-germain', 'Maison Saint-Germain', 'paris', 'Saint-Germain-des-Prés', 'Boutique Hotel', 5, 4.8, 1204, 610, 191, 209, true, 'wifi,breakfast,bar,restaurant,spa,ac,gym', 'concierge,laundry,roomservice,reception,luggage,business', 'cityview,bath,balcony',
    "A Haussmann townhouse turned intimate hotel, a few steps from the Seine's bouquinistes. Velvet salons, a hidden courtyard and a cocktail library make it a Left Bank classic.", ['Left Bank location', 'Library cocktail bar', 'Hidden courtyard garden', 'Michelin-guide restaurant']),
  h('hotel-lumiere-montmartre', 'Hôtel Lumière Montmartre', 'paris', 'Montmartre', 'Boutique Hotel', 4, 4.6, 880, 245, 209, 127, false, 'wifi,breakfast,bar,ac', 'concierge,luggage,reception,laundry', 'cityview,balcony',
    'Artists once lived on this hillside; today a charming hotel occupies a restored atelier with leafy views toward Sacré-Cœur. Rooms are small but beautifully dressed in linen and oak.', ['Sacré-Cœur views', 'Artisan breakfast', 'Walk to cabarets and cafés', 'Quiet street']),
  h('rive-gauche-apartments', 'Rive Gauche Apartments', 'paris', 'Latin Quarter', 'Apartment', 4, 4.5, 402, 215, 33, 157, false, 'wifi,ac,kids,pets', 'laundry,luggage,reception', 'kitchen,cityview',
    'Light-filled serviced apartments with full kitchens in the heart of the Latin Quarter — ideal for longer Paris stays and families.', ['Full kitchens', 'Weekly cleaning', 'Family-sized layouts', 'Near the Panthéon']),
  h('chalet-edelweiss', 'Chalet Edelweiss', 'switzerland', 'Lauterbrunnen', 'Lodge', 4, 4.7, 430, 360, 144, 123, true, 'wifi,breakfast,restaurant,spa,parking,kids', 'concierge,laundry,luggage,tours,reception', 'mountain,fireplace,balcony',
    'A traditional timber chalet in the Lauterbrunnen valley where waterfalls drop beside your window. Wood stoves, fondue dinners and a sauna warm the evenings.', ['Waterfall views', 'Chalet fondue dinners', 'Sauna and steam', 'Hiking trails from the door']),
  h('alpenglow-lake-lodge', 'Alpenglow Lake Lodge', 'switzerland', 'Interlaken', 'Lodge', 5, 4.9, 301, 690, 214, 115, true, 'wifi,spa,pool,breakfast,restaurant,bar,gym,parking', 'concierge,laundry,shuttle,roomservice,tours,reception', 'mountain,seaview,privatepool,bath',
    'Between two lakes beneath the Eiger, Alpenglow blends alpine craft with contemporary comfort. A rooftop spa looks directly onto the peaks.', ['Rooftop spa with peak views', 'Lake-view rooms', 'Gourmet alpine kitchen', 'Ski and hike concierge']),
  h('caldera-blue-suites', 'Caldera Blue Suites', 'santorini', 'Oia', 'Boutique Hotel', 5, 4.9, 967, 720, 180, 130, true, 'wifi,pool,spa,breakfast,bar,restaurant,ac', 'concierge,laundry,roomservice,reception,shuttle', 'seaview,privatepool,balcony,bath',
    'Carved into the caldera cliff, Caldera Blue offers whitewashed suites with plunge pools facing the volcano. Breakfast arrives on your terrace; sunset is private.', ['Plunge pool suites', 'Caldera sunset terrace', 'Wine cellar tastings', 'Private breakfast on terrace']),
  h('cave-house-oia', 'Cave House Oia', 'santorini', 'Imerovigli', 'Villa', 4, 4.7, 540, 410, 186, 38, false, 'wifi,breakfast,ac,bar', 'concierge,reception,laundry', 'seaview,balcony,bath',
    "Traditional cave dwellings restored with modern comfort — cool in summer, silent at night and with views toward the sunset from every terrace.", ['Traditional cave architecture', 'Sunset terrace', 'Central Imerovigli', 'Hot tub terraces']),
  h('aegean-pearl-resort', 'Aegean Pearl Resort', 'santorini', 'Kamari', 'Resort', 4, 4.6, 720, 290, 199, 126, false, 'wifi,pool,breakfast,restaurant,beach,kids,ac', 'laundry,shuttle,tours,reception', 'seaview,balcony',
    "A relaxed beachfront resort on Kamari's black-sand shore with a sea-view sun deck and a taverna serving morning-caught fish.", ['Steps from black-sand beach', 'Sea-view sun deck', 'Greek taverna', 'Family-friendly']),
  h('marina-skyline-palace', 'Marina Skyline Palace', 'dubai', 'Dubai Marina', 'Hotel', 5, 4.7, 2010, 330, 190, 69, true, 'wifi,pool,spa,gym,restaurant,bar,breakfast,ac,parking,beach', 'concierge,business,shuttle,roomservice,reception,laundry', 'seaview,cityview,balcony',
    'A tower of glass and marble on the marina promenade with a sky-high pool, six restaurants and direct access to the beach.', ['Sky pool with marina views', 'Beach club access', 'Six restaurants', 'Promenade at your door']),
  h('desert-pearl-resort', 'Desert Pearl Resort', 'dubai', 'Al Marmoom', 'Resort', 5, 4.8, 620, 780, 189, 12, true, 'wifi,pool,spa,restaurant,bar,breakfast,ac', 'concierge,roomservice,reception,tours,laundry', 'privatepool,garden,balcony,bath',
    'A tranquil desert retreat of Arabian-inspired pavilions among dunes. Take a sunrise camel walk, a falconry demonstration or a stargazing dinner.', ['Private dune pavilions', 'Stargazing dinners', 'Falconry and camel rides', 'Hammam-inspired spa']),
  h('shinjuku-hinoki', 'Shinjuku Hinoki Hotel', 'tokyo', 'Shinjuku', 'Hotel', 4, 4.6, 1530, 260, 226, 49, false, 'wifi,restaurant,bar,gym,ac,breakfast', 'concierge,luggage,reception,laundry,business,access', 'cityview,bath',
    'Cypress-scented rooms above the neon of Shinjuku, with in-room soaking tubs and a calm lobby café that feels a world away from Kabukichō.', ['Hinoki cypress bathtubs', 'Walk to Golden Gai', 'Rooftop bar', 'Quiet-floor rooms']),
  h('ginza-muse', 'Ginza Muse', 'tokyo', 'Ginza', 'Hotel', 5, 4.8, 700, 590, 185, 74, true, 'wifi,spa,gym,restaurant,bar,breakfast,ac', 'concierge,roomservice,reception,luggage,laundry,business', 'cityview,bath',
    'A refined design hotel above Tokyo\'s most elegant shopping district, with a sushi counter on the 12th floor and floor-to-ceiling views over the Imperial skyline.', ['12th-floor sushi counter', 'Floor-to-ceiling skyline views', 'Spa with onsen-style bath', 'Ginza boutiques outside']),
  h('coral-atoll-villas', 'Coral Atoll Overwater Villas', 'maldives', 'Baa Atoll', 'Resort', 5, 4.9, 1250, 640, 193, 76, true, 'wifi,pool,spa,breakfast,restaurant,bar,beach,ac', 'concierge,roomservice,shuttle,reception,tours', 'seaview,privatepool,balcony,bath',
    'Thatched overwater villas with glass floor panels, a house reef on your doorstep and seaplane arrival over Baa Atoll\'s UNESCO biosphere.', ['Glass-floor overwater villas', 'Seaplane arrival', 'House reef snorkelling', 'Dive centre on site']),
  h('lagoon-haven', 'Lagoon Haven', 'maldives', 'South Malé Atoll', 'Resort', 5, 4.8, 890, 410, 208, 205, false, 'wifi,pool,spa,breakfast,restaurant,beach,ac,kids', 'concierge,shuttle,reception,tours', 'seaview,balcony,privatepool',
    'A laid-back island resort with beach and overwater villas, a kids\' club and a sunset bar reached by wooden jetty.', ['Short speedboat transfer', 'Sunset jetty bar', 'Kids club', 'Water sports centre']),
  h('bosphorus-pasha-palace', 'Bosphorus Pasha Palace', 'istanbul', 'Sultanahmet', 'Hotel', 5, 4.7, 760, 340, 210, 116, true, 'wifi,spa,breakfast,restaurant,bar,ac,gym', 'concierge,laundry,roomservice,reception,business,shuttle', 'cityview,bath,balcony',
    'A restored Ottoman mansion a short stroll from Hagia Sophia. Hand-painted ceilings, a marble hammam and a rooftop that looks over the Bosphorus.', ['Hammam spa', 'Rooftop with minaret views', 'Ottoman interiors', 'Turkish breakfast feast']),
  h('gion-machiya-ryokan', 'Gion Machiya Ryokan', 'kyoto', 'Gion', 'Ryokan', 4, 4.9, 360, 420, 201, 34, true, 'wifi,breakfast,spa,restaurant,ac', 'concierge,reception,luggage,tours', 'garden,bath,fireplace',
    'A restored wooden townhouse in the geisha district with tatami rooms, a hinoki bath and multi-course kaiseki dinners.', ['Kaiseki dinners', 'Tatami and futon rooms', 'Private cypress bath', 'Tea ceremony on request']),
  h('palazzo-aurelia', 'Palazzo Aurelia', 'rome', 'Centro Storico', 'Boutique Hotel', 5, 4.7, 480, 690, 170, 163, true, 'wifi,bar,breakfast,restaurant,spa,ac,gym', 'concierge,roomservice,reception,luggage,laundry', 'cityview,bath,balcony',
    'Behind a 17th-century façade near the Pantheon: frescoed salons, a rooftop terrace and bedrooms in soft stone and linen.', ['Pantheon at the door', 'Rooftop terrace', 'Frescoed salon', 'Wine cellar dinners']),
  h('trastevere-loft', 'Trastevere Loft', 'rome', 'Trastevere', 'Apartment', 4, 4.6, 295, 220, 47, 220, false, 'wifi,ac,kids,pets', 'laundry,luggage,reception', 'kitchen,balcony',
    'Warm, plant-filled apartments on a cobbled lane in Trastevere. Cook with local market ingredients or step out to trattorias.', ['Full kitchen', 'Trastevere lanes outside', 'Sunny balcony', 'Self check-in']),
  h('canal-grande-residenza', 'Canal Grande Residenza', 'venice', 'Dorsoduro', 'Boutique Hotel', 4, 4.6, 395, 530, 224, 78, false, 'wifi,breakfast,bar,ac', 'concierge,reception,luggage,laundry', 'cityview,balcony,bath',
    'A palazzo hotel with water-gate entrance on the Grand Canal. Rooms overlook canals and courtyards; breakfast is served beside a private jetty.', ['Private water-gate', 'Grand Canal views', 'Near the Accademia', 'Courtyard garden']),
  h('terrazza-azzurra', 'Terrazza Azzurra', 'cinque-terre', 'Manarola', 'Guesthouse', 4, 4.7, 280, 220, 178, 81, false, 'wifi,breakfast,pool,ac', 'luggage,reception,tours', 'seaview,balcony',
    'A family-run guesthouse high above Manarola harbour. A sun terrace overlooks the sea, and breakfast includes homemade focaccia.', ['Sea-view terrace', 'Homemade breakfast', 'Footpath to the harbour', 'Hiking guidance']),
  h('the-marlowe-mayfair', 'The Marlowe Mayfair', 'london', 'Mayfair', 'Hotel', 5, 4.7, 1420, 520, 217, 131, true, 'wifi,spa,gym,restaurant,bar,breakfast,ac,pets', 'concierge,roomservice,reception,laundry,business,luggage', 'cityview,bath',
    "A discreet townhouse hotel in the heart of Mayfair, with a clubby bar, a candle-lit restaurant and tailor-made afternoon tea.", ['Afternoon tea', 'Members-style bar', 'Spa with steam room', 'Steps from Hyde Park']),
  h('hudson-loft-hotel', 'Hudson Loft Hotel', 'new-york', 'Tribeca', 'Hotel', 4, 4.5, 2200, 380, 9, 26, false, 'wifi,gym,restaurant,bar,breakfast,ac,pets', 'concierge,reception,luggage,business,laundry', 'cityview',
    'A cast-iron warehouse turned boutique hotel with industrial-chic loft rooms, a rooftop terrace and a downstairs neighbourhood restaurant.', ['Loft-style rooms', 'Rooftop terrace', 'Walk to Hudson River Park', 'Neighbourhood restaurant']),
  h('casa-gracia', 'Casa Gràcia', 'barcelona', 'Gràcia', 'Boutique Hotel', 4, 4.6, 760, 215, 161, 67, false, 'wifi,breakfast,pool,bar,ac', 'concierge,reception,luggage,laundry', 'balcony,cityview',
    'A modernist townhouse in village-like Gràcia with a rooftop pool and a patio bar serving vermouth from 5 pm.', ['Rooftop pool', 'Modernist architecture', 'Vermouth bar', 'Walk to Park Güell']),
  h('old-town-residence', 'Old Town Residence', 'prague', 'Malá Strana', 'Apartment', 4, 4.6, 640, 190, 101, 94, false, 'wifi,ac,kids', 'laundry,luggage,reception', 'kitchen,cityview',
    'Serviced apartments in a Baroque house on the Castle side of the river, with views of red roofs and spires.', ['Castle-side location', 'Full kitchens', 'River views', 'Self check-in']),
  h('aurora-glass-cabins', 'Aurora Glass Cabins', 'iceland', 'Vík', 'Lodge', 4, 4.8, 270, 330, 122, 54, true, 'wifi,spa,restaurant,breakfast,parking,ac', 'tours,reception,luggage', 'mountain,seaview,bath',
    'Glass-roofed cabins on the south coast for watching the aurora from bed. A geothermal hot tub on each deck and a restaurant serving Arctic char.', ['Aurora wake-up calls', 'Private hot tubs', 'Black sand beach nearby', 'Glacier tours from the door']),
  h('riad-jardin-rouge', 'Riad Jardin Rouge', 'marrakech', 'Medina', 'Riad', 4, 4.8, 410, 190, 5, 30, false, 'wifi,pool,breakfast,restaurant,spa,ac', 'concierge,reception,laundry,tours,luggage', 'garden,balcony',
    'A hidden riad in the medina with a plunge pool courtyard, rooftop views toward the Atlas and a hammam for sunset rituals.', ['Courtyard plunge pool', 'Rooftop dining', 'Traditional hammam', 'Cooking workshops']),
  h('table-bay-residence', 'Table Bay Residence', 'cape-town', 'V&A Waterfront', 'Hotel', 5, 4.7, 620, 310, 197, 196, false, 'wifi,pool,spa,gym,restaurant,bar,breakfast,ac,parking', 'concierge,reception,laundry,roomservice,shuttle', 'seaview,balcony,cityview',
    'A contemporary waterfront hotel with Table Mountain views, a heated rooftop pool and a restaurant sourcing local produce.', ['Table Mountain views', 'Waterfront location', 'Rooftop pool', 'Winelands day trips']),
  h('sacred-valley-glamp', 'Sacred Valley Glamp', 'cusco', 'Urubamba', 'Lodge', 4, 4.8, 260, 190, 51, 207, false, 'wifi,breakfast,restaurant,bar', 'tours,reception,luggage,shuttle', 'mountain,garden',
    'Canvas safari tents with proper beds, wood stoves and valley views. Guided treks to Machu Picchu start at the front gate.', ['Luxury tents with stoves', 'Local guides', 'Andean breakfast', 'Stargazing fire pit']),
  h('andaman-cove-resort', 'Andaman Cove Resort', 'phuket', 'Kata Beach', 'Resort', 4, 4.6, 1100, 210, 200, 162, false, 'wifi,pool,spa,restaurant,beach,kids,breakfast,ac', 'concierge,shuttle,tours,reception,laundry', 'seaview,garden,balcony',
    'A tropical garden resort steps from Kata Beach, with lagoon pools, Thai massage pavilions and a family-friendly kids club.', ['Lagoon-style pools', 'Beachfront', 'Kids club', 'Island-hopping desk']),
  h('bay-pearl-resort', 'Bay Pearl Resort', 'ha-long', 'Bãi Cháy', 'Resort', 4, 4.7, 480, 175, 213, 117, false, 'wifi,pool,spa,restaurant,breakfast,beach,ac', 'tours,shuttle,reception,laundry', 'seaview,garden,privatepool',
    'Palm-lined pool villas facing the bay, with a spa and daily departures for overnight junk cruises.', ['Pool villas', 'Overnight cruise desk', 'Spa', 'Sunset bar']),
  h('cave-rose-hotel', 'Cave Rose Hotel', 'cappadocia', 'Göreme', 'Boutique Hotel', 5, 4.9, 295, 540, 7, 125, true, 'wifi,breakfast,spa,restaurant,ac', 'concierge,tours,reception,luggage', 'balcony,cityview,bath',
    'Rock-hewn suites with arched ceilings and terraces made for balloon-watching. Breakfast is served on the rooftop as dawn breaks.', ['Cave suites', 'Balloon-view terrace', 'Hammam', 'Rooftop breakfast']),
  h('savanna-tented-camp', 'Savanna Tented Camp', 'serengeti', 'Central Serengeti', 'Lodge', 5, 4.9, 880, 210, 183, 80, true, 'wifi,pool,restaurant,bar,spa,breakfast', 'tours,shuttle,reception,laundry', 'garden,balcony',
    'A luxurious tented camp on the migration route with a pool, sundowner deck and twice-daily game drives with expert guides.', ['Daily game drives', 'Sundowner deck', 'Expert guides', 'Fully inclusive stays']),
  h('torres-lodge', 'Torres Lodge', 'patagonia', 'Torres del Paine', 'Lodge', 4, 4.7, 450, 250, 177, 23, false, 'wifi,restaurant,bar,spa,breakfast', 'tours,reception,luggage,shuttle', 'mountain,fireplace,bath',
    'A mountain lodge below the Paine massif. Return from the trail to a wood-fired sauna, a roaring fire and Patagonian lamb.', ['Granite tower views', 'Wood-fired sauna', 'Guided treks', 'Hearty Patagonian dining']),
  h('harbour-light-hotel', 'Harbour Light Hotel', 'sydney', 'Circular Quay', 'Hotel', 5, 4.6, 360, 970, 206, 103, false, 'wifi,pool,spa,gym,bar,restaurant,breakfast,ac', 'concierge,roomservice,reception,laundry,business', 'seaview,cityview,balcony',
    'Wake to Opera House views from a harbour-front tower with an infinity pool and rooftop bar.', ['Opera House views', 'Infinity pool', 'Rooftop bar', 'Ferry terminal outside']),
];

export const hotels = raw;

export const getHotel = (slug) => hotels.find((x) => x.slug === slug);
export const getHotelsByDestination = (destSlug) => hotels.filter((x) => x.destinationSlug === destSlug);

// Mock reviews, deterministic per hotel
const REVIEW_NAMES = ['Amelia R.', 'Daniel K.', 'Sofia M.', 'James T.', 'Priya S.', 'Lucas B.', 'Hannah W.', 'Omar A.', 'Chloé D.', 'Ethan P.', 'Mei L.', 'Isabella G.'];
const REVIEW_TEXT = [
  ['Exceptional stay', 'From the moment we arrived the staff made us feel looked after. The room was spotless and the location could not be better. We will absolutely return.'],
  ['Beautiful property', 'The design is thoughtful and the views are the real star. Breakfast was a highlight — fresh, generous and served with a smile.'],
  ['Worth every penny', 'Service was warm and attentive without being intrusive. Our room was spacious and quiet, and the bed was among the most comfortable we have slept in.'],
  ['A perfect base', 'Ideally located for exploring, yet a calm haven to return to. The concierge gave us superb recommendations that shaped our trip.'],
  ['Romantic and relaxed', 'We came for our anniversary and the team added small touches that made it special. Dinner on the terrace was unforgettable.'],
  ['Lovely, with minor niggles', 'A gorgeous hotel overall. The air-conditioning was a little noisy one night, but the staff fixed it quickly. Great value for the quality.'],
  ['Great for families', 'Our kids loved the pool and the staff were wonderfully patient. Rooms were spacious and the breakfast spread had something for everyone.'],
  ['Understated luxury', 'Quietly sophisticated. Every detail — from linens to lighting — felt considered. The spa is a must.'],
];
export const getReviews = (hotel) => {
  const seed = hotel.slug.length;
  return Array.from({ length: 6 }, (_, i) => {
    const t = REVIEW_TEXT[(seed + i) % REVIEW_TEXT.length];
    const rating = [5, 5, 4.5, 5, 4, 4.5][(seed + i) % 6];
    const month = ((seed + i * 2) % 12) + 1;
    return {
      id: `${hotel.id}-r${i}`,
      name: REVIEW_NAMES[(seed * 2 + i) % REVIEW_NAMES.length],
      rating,
      date: `2026-${String(month).padStart(2, '0')}-${String(((seed + i * 3) % 27) + 1).padStart(2, '0')}`,
      title: t[0],
      text: t[1],
    };
  });
};

export const allAmenities = Object.values(AMENITY_MAP);
export const allFacilities = Object.values(FACILITY_MAP);
export const allFeatures = Object.values(FEATURE_MAP);
