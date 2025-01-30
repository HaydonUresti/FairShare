import mongoose from 'mongoose'

const GroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    members: {
        type: Array,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
        trim: true
    },
    joinCode: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})


const GroupModel = mongoose.model('groups', GroupSchema)

export default GroupModel