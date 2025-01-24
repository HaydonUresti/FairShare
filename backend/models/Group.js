import mongoose from 'mongoose'

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    members: {
        type: Array,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
})


const GroupModel = mongoose.model('groups', GroupSchema)

export default GroupModel