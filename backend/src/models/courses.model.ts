import { Schema, model } from "mongoose";

export interface Course{
    courseId : string;
    name: string;
    imgUrl: string;
    description: string;
    time: string;
    numofLessons: number;
}

export const CoursesSchema = new Schema<Course>(
    {
        courseId: {type: String, required: true},
        name: {type: String, required: true},
        imgUrl: {type: String, required: true},
        description: {type: String, required: false},
        time: {type: String, required: true},
        numofLessons: {type: Number, required: true}
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

export const CoursesModel = model<Course>('courses',CoursesSchema);