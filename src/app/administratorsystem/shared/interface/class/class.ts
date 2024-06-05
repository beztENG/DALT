import { Student } from "../academicManagement/student";

export interface Class{
    courseId : string;
    classId: string;
    listStudent: Student;
}