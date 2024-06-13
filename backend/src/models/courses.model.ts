import { Schema, model } from "mongoose";

export interface Course {
    courseId: string;
    name: string;
    imgUrl: string;
    description: string;
    time: string;
    numofLessons: number;
}

export const CourseSchema = new Schema<Course>(
    {
        courseId: { type: String, required: true },
        name: { type: String, required: true },
        imgUrl: { type: String, required: true },
        description: { type: String },
        time: { type: String, required: true },
        numofLessons: { type: Number, required: true }
    }, {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

export const CourseModel = model<Course>('Course', CourseSchema);
