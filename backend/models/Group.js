import mongoose from 'mongoose'

const GroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
        trim: true,
        unique: true
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
})


const GroupModel = mongoose.model('groups', GroupSchema)

export default GroupModel