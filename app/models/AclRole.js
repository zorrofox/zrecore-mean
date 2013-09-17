var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var AclRoleSchema = new Schema({
    "role_name": {
        "type": String,
        "required": true,
        "unique": true,
        "lowercase": true,
        "trim": true
    },
    "is_active": {
        "type": Boolean,
        "required": true,
        "default": false
    },
    "inherit_role_id": {
        "type": ObjectId,
        "required": false,
        ref : 'AclRole'
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
    },
    acl_resources:[{
        type:ObjectId,
        ref:"AclResource"
    }]
});

AclRoleSchema.statics = {
    load: function (id, cb) {
        this.findOne({ _id : id }).populate('inherit_role_id').populate('acl_resources').exec(cb);
    }
};

module.exports = mongoose.model("AclRole", AclRoleSchema);
