import { Schema, model, Types } from "mongoose";

export interface Class {
    courseId: string;
    classId: string;
    startDate: Date;
    isAvailable: boolean;
    listStudent: Types.ObjectId[];
}

export const ClassSchema = new Schema<Class>(
    {
        courseId: { type: String, required: true },
        classId: { type: String, required: true },
        startDate: { type: Date, required: true },
        isAvailable: { type: Boolean, required: true },
        listStudent: { type: [Types.ObjectId], ref: 'student', default: [] }

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

export const ClassModel = model<Class>('class', ClassSchema);
