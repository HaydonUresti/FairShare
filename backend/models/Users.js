import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: false,
    },
    userRole: {
        type: String,
        enum: ['Student', 'Educator'],
        required: true,
    },
    groups: {
        type: [String],
        required: true,
    },
    googleId: {
        type: String,
        required: false,
    }
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel