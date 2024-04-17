import { Schema, model } from "mongoose";

export interface Events{
    id : string;
    title : string;
    description : string;
    imageUrl: string;
    content: string;
}

export const EventsSchema = new Schema<Events>(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        imageUrl: {type: String, required: true},
        content: {type: String, required: true}
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps: true
    }
)

export const EventsModel = model<Events>('events',EventsSchema);