import mongoose from "mongoose";

const Schema = mongoose.Schema;

const VenueSchema = new Schema({
    venueID : { type: String, required:[true, 'Venue ID is required' ]},
    venueName : { type: String, required:[true, 'Venue name is required'] },
    phoneNumber: { type: String, required:[true, 'Venue phoneNumber is required'] },
	email : { type: String, required:[true, 'Venue email is required'] },
	manager_1_firstName : { type: String, required:[true, 'Venue manager 1 first name is required'] },
	manager_1_lastName : { type: String, required:[true, 'Venue manager 1 last name is required'] },
	addressLine_1 : { type: String, required:[true, 'Venue address line 1 is required'] },
	addressLine_2 : { type: String, required:[true, 'Venue address line 2 is required is required'] },
    county: { type: String, required:[true, 'Venue county is required'] },
    eircode: { type: String, required:[true, 'Venue eircode is required'] },
    tables: [
      {
        table_id: { type: String, required:[true, 'Venue table ID is required'] }, 
        capacity: { type: String, required:[true, 'Venue table capacity is required'] }, 
        booked: 
        [ 
            {
                date: 
                [
                    {
                        year: { type: Number, required:[ true, 'Enter year like 2021' ]},
                        month: { type: Number, required:[ true, 'Enter month like 01' ]},
                        day: { type: Number, required:[ true, 'Enter day like 31' ]}, 
                        hour: { type: Number, required:[ true, 'Enter hour like 18 ' ]}, 
                        minute: { type: Number, required:[ true, 'Enter minute like 60' ]}}
                ]   
            ,
                visit_id: { type: String, required: false }
            },
        ],
        misc: { type: String, required: false }
      }]
})

VenueSchema.statics.findByTableName = function (tableName) {
  return this.findOne({ tableName: tableName });
};

export default mongoose.model("Venue", VenueSchema);
