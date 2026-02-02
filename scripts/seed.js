const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jashn';

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'admin' },
}, { timestamps: true });

const EventSchema = new mongoose.Schema({
  title: String,
  slug: String,
  description: String,
  shortDescription: String,
  images: [String],
  videos: [String],
  tags: [String],
  pricingEnabled: Boolean,
  basePrice: Number,
  addons: [{ name: String, price: Number }],
  featured: Boolean,
}, { timestamps: true });

const CitySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  bannerImage: String,
  gallery: [String],
  featured: Boolean,
}, { timestamps: true });

const PackageSchema = new mongoose.Schema({
  title: String,
  slug: String,
  cityId: mongoose.Schema.Types.ObjectId,
  description: String,
  duration: String,
  images: [String],
  pricingEnabled: Boolean,
  price: Number,
  itinerary: [{ day: Number, title: String, description: String }],
  included: [String],
  excluded: [String],
  featured: Boolean,
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);
const City = mongoose.models.City || mongoose.model('City', CitySchema);
const Package = mongoose.models.Package || mongoose.model('Package', PackageSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Admin.deleteMany({});
    await Event.deleteMany({});
    await City.deleteMany({});
    await Package.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create Admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({
      email: 'admin@jashnplanners.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    });
    console.log('👤 Admin created');

    // Create Events
    const events = await Event.insertMany([
      {
        title: 'Wedding Planning',
        slug: 'wedding-planning',
        description: 'Create your dream wedding with our comprehensive planning services. From venue selection to decoration, catering to entertainment, we handle every detail to make your special day perfect.',
        shortDescription: 'Complete wedding planning and coordination services',
        images: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=800'],
        tags: ['Wedding', 'Celebration', 'Premium'],
        pricingEnabled: true,
        basePrice: 150000,
        addons: [
          { name: 'Photography Package', price: 50000 },
          { name: 'Decoration Upgrade', price: 30000 },
        ],
        featured: true,
      },
      {
        title: 'Birthday Party',
        slug: 'birthday-party',
        description: 'Make birthdays memorable with themed decorations, entertainment, and catering. Perfect for all ages from kids to adults.',
        shortDescription: 'Themed birthday celebrations for all ages',
        images: ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800'],
        tags: ['Birthday', 'Party', 'Fun'],
        pricingEnabled: true,
        basePrice: 25000,
        featured: false,
      },
      {
        title: 'Corporate Events',
        slug: 'corporate-events',
        description: 'Professional event management for conferences, seminars, product launches, and team building activities.',
        shortDescription: 'Professional corporate event management',
        images: ['https://images.unsplash.com/photo-1511578314322-379afb476865?w=800'],
        tags: ['Corporate', 'Professional', 'Business'],
        pricingEnabled: false,
        featured: true,
      },
    ]);
    console.log('🎉 Events created');

    // Create Cities
    const cities = await City.insertMany([
      {
        name: 'Jaipur',
        slug: 'jaipur',
        description: 'The Pink City of India, known for its magnificent palaces, forts, and rich cultural heritage. Experience royal hospitality and vibrant traditions.',
        bannerImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
        gallery: ['https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800'],
        featured: true,
      },
      {
        name: 'Goa',
        slug: 'goa',
        description: 'Tropical paradise with pristine beaches, Portuguese heritage, and vibrant nightlife. Perfect for relaxation and adventure.',
        bannerImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
        gallery: ['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800'],
        featured: true,
      },
      {
        name: 'Kerala',
        slug: 'kerala',
        description: 'God\'s Own Country with serene backwaters, lush greenery, and Ayurvedic wellness. Experience tranquility and natural beauty.',
        bannerImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
        gallery: ['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800'],
        featured: true,
      },
      {
        name: 'Manali',
        slug: 'manali',
        description: 'Himalayan hill station perfect for adventure and nature lovers. Snow-capped mountains, valleys, and adventure sports.',
        bannerImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
        gallery: ['https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800'],
        featured: false,
      },
    ]);
    console.log('🏙️  Cities created');

    // Create Packages
    await Package.insertMany([
      {
        title: 'Royal Jaipur Heritage Tour',
        slug: 'royal-jaipur-heritage-tour',
        cityId: cities[0]._id,
        description: 'Explore the magnificent palaces and forts of Jaipur. Visit Amber Fort, City Palace, Hawa Mahal, and experience royal Rajasthani culture.',
        duration: '3 Days / 2 Nights',
        images: ['https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800'],
        pricingEnabled: true,
        price: 15000,
        itinerary: [
          { day: 1, title: 'Arrival & City Palace', description: 'Check-in, visit City Palace and Jantar Mantar' },
          { day: 2, title: 'Amber Fort & Hawa Mahal', description: 'Full day exploring forts and local markets' },
          { day: 3, title: 'Departure', description: 'Breakfast and departure' },
        ],
        included: ['Hotel accommodation', 'Breakfast', 'Sightseeing', 'Transport'],
        excluded: ['Lunch & Dinner', 'Entry fees', 'Personal expenses'],
        featured: true,
      },
      {
        title: 'Goa Beach Paradise',
        slug: 'goa-beach-paradise',
        cityId: cities[1]._id,
        description: 'Relax on pristine beaches, enjoy water sports, explore Portuguese heritage, and experience vibrant nightlife.',
        duration: '4 Days / 3 Nights',
        images: ['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800'],
        pricingEnabled: true,
        price: 20000,
        itinerary: [
          { day: 1, title: 'Arrival & Beach Time', description: 'Check-in and relax at Calangute Beach' },
          { day: 2, title: 'Water Sports', description: 'Parasailing, jet skiing, and banana boat rides' },
          { day: 3, title: 'Heritage Tour', description: 'Visit churches and Old Goa' },
          { day: 4, title: 'Departure', description: 'Breakfast and departure' },
        ],
        included: ['Hotel accommodation', 'Breakfast', 'Airport transfers', 'Sightseeing'],
        excluded: ['Lunch & Dinner', 'Water sports fees', 'Personal expenses'],
        featured: true,
      },
      {
        title: 'Kerala Backwaters Experience',
        slug: 'kerala-backwaters-experience',
        cityId: cities[2]._id,
        description: 'Cruise through serene backwaters in a traditional houseboat, experience Ayurvedic treatments, and explore tea plantations.',
        duration: '5 Days / 4 Nights',
        images: ['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800'],
        pricingEnabled: true,
        price: 25000,
        itinerary: [
          { day: 1, title: 'Arrival Cochin', description: 'Check-in and local sightseeing' },
          { day: 2, title: 'Houseboat Cruise', description: 'Full day backwater cruise with meals' },
          { day: 3, title: 'Munnar Tea Gardens', description: 'Visit tea plantations and waterfalls' },
          { day: 4, title: 'Ayurvedic Spa', description: 'Relaxing Ayurvedic treatments' },
          { day: 5, title: 'Departure', description: 'Breakfast and departure' },
        ],
        included: ['Hotel & houseboat', 'All meals', 'Sightseeing', 'Transport'],
        excluded: ['Spa treatments', 'Entry fees', 'Personal expenses'],
        featured: true,
      },
    ]);
    console.log('✈️  Packages created');

    console.log('\n✅ Seed completed successfully!');
    console.log('\n📧 Admin Login:');
    console.log('   Email: admin@jashnplanners.com');
    console.log('   Password: admin123');
    console.log('\n⚠️  Please change the password after first login\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
