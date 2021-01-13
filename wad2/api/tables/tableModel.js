import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TableSchema = new Schema({
  tableName: { type: String, unique: true, required: true},
  timeSlots: [{
      time: {type: String, required: true },
      bookedBy: {type: String, required: false },
      isBooked: {type: Boolean, required: false }
  }]  
//  favourites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movies'}]
});


TableSchema.statics.getTables = function () {
    return this.find({})
}

TableSchema.statics.findByTableName = function(tableName) {
  return this.findOne( { tableName: tableName  });
}

export default mongoose.model('Table', TableSchema);
