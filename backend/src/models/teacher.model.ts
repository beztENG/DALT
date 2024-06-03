import mongoose, { Document, Schema } from 'mongoose';

interface ITeacher extends Document {
    name: string;
    phoneNum: string;
    teachingClass: string;
    duration: string;
    periods: string[];
    timeline: string; 
}

const teacherSchema: Schema = new Schema({
    name: { type: String, required: true },
    phoneNum: { type: String, required: true },
    teachingClass: { type: String, required: true },
    duration: { type: String, required: true },
    periods: { type: [String], required: true },
    timeline: { type: String, required: true } 
}); 

const Teacher = mongoose.model<ITeacher>('Teacher', teacherSchema);
export default Teacher;
export { ITeacher };
