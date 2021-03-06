var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var AclResourceSchema = new Schema({
    "resource_name": {
        "type": String,
        "required": true,
        "unique": true,
        "trim": true
    },
    resource_desc:{
        type:String,
        require:true,
        unique:true
    },
    "resource_url": {
        "type": String,
        "require": true,
        "unique": true
    },
    "father_resource": {
        "type": ObjectId,
        ref: "AclResource"
    },
    "is_active": {
        "type": Boolean,
        "required": true,
        "default": false
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
});

AclResourceSchema.statics = {
    load: function (id, cb) {
        this.findOne({ _id : id }).populate('father_resource').exec(cb);
    }
};

module.exports = mongoose.model("AclResource", AclResourceSchema);
