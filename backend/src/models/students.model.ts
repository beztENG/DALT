import { Schema, model, Types } from "mongoose";

export interface Student {
    studentId: string;
    studentName: string;
    email: string;
    password: string;
    phoneNumber: string;
    registrationDate: Date;
    midtermGrade: string;
    finalGrade: string;
    classes: Types.ObjectId[];
}

export const StudentSchema = new Schema<Student>(
    {
        studentId: { type: String, required: true },
        studentName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: true, unique: true },
        registrationDate: { type: Date, required: true },
        midtermGrade: { type: String, required: false },
        finalGrade: { type: String, required: false },
        classes: [{ type: Types.ObjectId, ref: 'class' }]
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

export const StudentModel = model<Student>('student', StudentSchema);
