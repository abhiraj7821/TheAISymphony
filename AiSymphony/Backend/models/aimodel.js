const mangoose = require('mongoose');

const aischema = new mangoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        required: true,
        trim: true,
    },
    prompt: {
        type: String,
        required: true,
        trim: true,
    },
    imagePath:{
        type:String,
        required:true,
        trim:true,
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true,
    },
    cloudinaryId: {
        type: String,   
        required: true,

        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const AiModel = mangoose.model('AiModel', aischema);
module.exports = AiModel;