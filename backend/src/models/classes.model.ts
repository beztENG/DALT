import { Schema, model } from "mongoose";
import { Student, StudentModel, StudentSchema } from "./students.model";

export interface Class{
    courseId : string;
    classId: string;
    listStudent: Student;
}

export const ClassSchema = new Schema<Class>(
    {
        courseId: {type: String, required: true},
        classId: {type: String, required: true},
        listStudent: [StudentSchema]
        
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