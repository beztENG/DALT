import { Schema, model } from "mongoose";

export interface Class{
    courseId : string;
    classId: string;
    listStudent: [];
}

export const ClassSchema = new Schema<Class>(
    {
        courseId: {type: String, required: true},
        classId: {type: String, required: true},
        listStudent: {type: [], required: false, default: []}
        
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

export const ClassModel = model<Class>('class',ClassSchema);