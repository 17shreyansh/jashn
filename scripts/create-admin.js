const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jashn'

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'admin' },
}, { timestamps: true })

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: 'admin@jashnplanners.com' })
    
    if (existingAdmin) {
      console.log('Admin already exists!')
      console.log('Email:', existingAdmin.email)
      
      // Update password
      const hashedPassword = await bcrypt.hash('admin123', 10)
      existingAdmin.password = hashedPassword
      await existingAdmin.save()
      console.log('Password updated to: admin123')
    } else {
      // Create new admin
      const hashedPassword = await bcrypt.hash('admin123', 10)
      
      const admin = await Admin.create({
        email: 'admin@jashnplanners.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
      })

      console.log('Admin created successfully!')
      console.log('Email:', admin.email)
      console.log('Password: admin123')
    }

    await mongoose.disconnect()
    console.log('Done!')
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

createAdmin()
