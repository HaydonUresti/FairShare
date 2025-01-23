import mongoose from "mongoose"

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
        required: true,
    },
    userRole: {
        type: String,
        enum: ['Student', 'Educator'],
        required: true,
    }

})

const UserModel = mongoose.model("users", UserSchema)

export default UserModel