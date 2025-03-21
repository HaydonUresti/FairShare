import mongoose from "mongoose"

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        uniuqe: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },

})

const StudentModel = mongoose.model("students", StudentSchema)

export default StudentModel