import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    chat_id: {
        type: mongoose.Schema.Types.String,
        required: true,
        index: true,
    },
    query: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('History', schema);