const mongoose = require('mongoose')
const beatSchema = require('./beatSchema')
const Beat = require('./beat.js')
const Schema = mongoose.Schema

const beatItemSchema = new Schema({
    qty: {
        type: Number,
        default: 1
    },
    beat: {
        type: Schema.Types.ObjectId,
        ref: 'Beat',
        required: true
    }
}, {
    timestamps: true,
    // this is to make sure we run re.json(item) we keep the virtuals so we can use them in the front end
    toJSON: {
        virtuals: true
    }
})

beatItemSchema.virtual('extPrice').get(function () {
    console.log('this.beat.price', this)
    return this.qty * this.price
})

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    beatItems: [beatItemSchema],
    isPaid: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})

orderSchema.virtual('orderTotal').get(function () {
    return this.beatItems.reduce((total, beat) => total + beat.extPrice, 0);
  });
  
orderSchema.virtual('totalQty').get(function () {
    return this.beatItems.reduce((total, beat) => total + beat.qty, 0);
  });
  
orderSchema.virtual('orderId').get(function () {
    return this.id.slice(-6).toUpperCase();
  });

// getCart is kaleSoup - whatever we want to call this function will be in place of getCart
// if we wanted to call it getOrder, we would replace getCart with getOrder
orderSchema.statics.getCart = function(userId) {
    return this.findOneAndUpdate(
        { user: userId, isPaid: false },
        { user: userId },
        { upsert: true, new: true }
    )
    .populate('beatItems.beat')
    .exec()
}

orderSchema.methods.addItemToCart = async function(beatId) {
    // console.log('BEATID in ORDER MODEL', beatId)
    const cart = this;
    // console.log('const cart = this', cart)
    const beatItem = cart.beatItems.find(beatItem => beatItem._id.equals(beatId))

    // console.log("BEATITEM IN ORDER MODEL", beatItem)
    // console.log('beatItems length:', cart.beatItems.length);
  
    if (beatItem) {
      beatItem.qty++;
    } else {
      const Beat = mongoose.model('Beat');

      const beat = await Beat.findById(beatId);
    //   console.log('beat in ORDER MODEL, after beat.findById', beat);
      cart.beatItems.push({ beat })
    }
    return cart.save();
  };

orderSchema.methods.setItemQty = function(beatId, newQty) {
    const cart = this
    const beatItem = cart.beatItems.id(beatId);
    // console.log('beatItem in Order Model', beatItem.id)

    if (beatItem && newQty <= 0) {
        beatItem.deleteOne()
    } else if (beatItem) {
        beatItem.qty = newQty
    }

    return cart.save()
}

module.exports = mongoose.model('Order', orderSchema)