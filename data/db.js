var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    sport: {
        type: String,
        required: false,
    },
    sex: {
        type: String,
        required: true,
    },
    height: {
        type: Number,
        required: false,
    },
    weight: {
        type: Number,
        required: false,
    }
});

const sportSchema = new Schema({
    sport: {
        type: String,
        required: true,
    },
    coach: {
        type: String,
        required: false,
    }
});

const exerciseTypeSchema = new Schema({
    _id: Schema.Types.ObjectId,
    exercise: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    }
});

const recordSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    exerciseType: {
        type: String,
        required: true,
    },
    side: {
        type: String,
        required: false,
    },
    max: {
        type: Number,
        required: true,
    },
    avg: {
        type: Number,
        required: true,
    },
    data: {
        type: [ Number ],
        required: true,
    },
    date: {
        type: Date,
        max: Date.now,
    }
});

var users = mongoose.model('user', userSchema);
var sports = mongoose.model('sport', sportSchema);
var exerciseTypes = mongoose.model('exercise', exerciseTypeSchema);
var records = mongoose.model('record', recordSchema);

module.exports = {
    User: users,
    Sport: sports,
    Exercise: exerciseTypes,
    Record: records,
}
