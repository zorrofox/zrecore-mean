var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var AclResourceSchema = new Schema({
    "resource_code": {
        "type": String,
        "required": true,
        "unique": true,
        "trim": true,
        uppercase:true
    },
    resource_name: {
        type: String,
        require: true,
        unique: true
    },
    resource_order: {
        type: Number,
        require: true
    },
    "resource_url": {
        "type": String,
        "require": false
    },
    "children_resource": [{
        "type": ObjectId,
        ref: "AclResource"
    }],
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
},{
    toObject: {virtuals: true},
    toJSON: {virtuals:true}
});

AclResourceSchema.virtual("_hasChildren").get(function(){
    return (this.children_resource)?((this.children_resource).length > 0):(this.children_resource);
});

AclResourceSchema.statics = {
    /*load: function (id, cb) {
        this.findOne({ _id: id }).populate('father_resource').exec(cb);
    },*/
    loadQuery: function (query) {
        return this.find(query).populate('father_resource');
    },
    updateMiddleWare: function(data){
        if (data.father_resource !=undefined && data.father_resource == "")
           data.father_resource = null;
    }
};

module.exports = mongoose.model("AclResource", AclResourceSchema);
