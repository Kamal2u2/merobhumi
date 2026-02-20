import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    buyerName: {
        type: String,
        required: true
    },
    buyerEmail: {
        type: String,
        required: true
    },
    buyerPhone: {
        type: String,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        default: 'I am interested in this property. Please contact me.'
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'closed'],
        default: 'new'
    }
}, { timestamps: true });

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
