const {mongoose,Schema} = require('mongoose')

const subscriptionSchema = new Schema({
    subscriber:{
        type: Schema.Types.ObjectId, // one who is subcribing
        ref: "User"
    },
    channel:{
        type: Schema.Types.ObjectId, // one to whom 'subscriber' is subcribing
        ref: "User"
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Subscription", subscriptionSchema)