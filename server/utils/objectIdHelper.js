var ObjectId = require('mongoose').Types.ObjectId;

function toObjectId(id) {
    
    var stringId = id.toString().toLowerCase();
    
    if (!ObjectId.isValid(stringId)) {
        return null;
    }
    
    var result = new ObjectId(stringId);
    if (result.toString() != stringId) {
        return null;
    }
    
    return result;
}

module.exports.toObjectId = toObjectId;