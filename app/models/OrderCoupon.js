var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var OrderCouponSchema = new Schema({
    "id": ObjectId,
    "order_id": {
        "type": ObjectId,
        "required": true
    },
    "coupon_id": {
        "type": ObjectId,
        "required": true
    },
    "timestamp_added": {
        "type": Date,
        "default": Date.now,
        "required": false
    },
    "timestamp_modified": {
        "type": Date,
        "default": Date.now,
        "required": false
    },
    "timestamp_deactivated": {
        "type": Date,
        "required": false
    }
}, {
    "autoIndex": false
});

OrderCouponSchema.index({
    "order_id": 1,
    "coupon_id": 1
}, {
    "unique": true
});

module.exports = mongoose.model("OrderCoupon", OrderCouponSchema);
