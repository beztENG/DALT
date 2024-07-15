import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from 'src/app/administratorsystem/shared/interface/academicManagement/student';
import { AcademicManagementService } from 'src/app/services/academic-management.service';
import { Class } from '../../shared/interface/class/class';
import { ClassService } from 'src/app/services/class.service';


@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit {
  students: Student[] = [];
  classes: Class[] = [];
  studentClasses: Class[] = [];
  classStudentSelected: Class[]=[];
  searchKeyword: string = '';
  showAddStudentForm = false;
  showEditStudentForm = false;
  showEnrollForm = false;
  showStudentClasses = false;
  selectedStudent: Student | null = null;
  editMode: boolean = false;
  enrollClassId: string = '';

  newStudent: Student = {
    studentId: '',
    studentName: '',
    email: '',
    password: '',
    phoneNumber: '',
    registrationDate: new Date(),
    midtermGrade: '',
    finalGrade: '',
    classes: []
  };

  @ViewChild('addStudentForm') addStudentForm: any; // Biến tham chiếu mẫu cho form thêm
  @ViewChild('editStudentForm') editStudentForm: any; // Biến tham chiếu mẫu cho form chỉnh sửa
  @ViewChild('enrollForm') enrollForm: any; // Biến tham chiếu mẫu cho form đăng ký
  courses: any;

  constructor(private academicService: AcademicManagementService, private classService: ClassService) { }

  ngOnInit(): void {
    this.loadStudents();
    this.loadClasses();
  }

  // Mở và đóng form thêm/chỉnh sửa sinh viên
  openAddStudentForm() {
    this.editMode = true;
    this.selectedStudent = null; // Xóa để thêm sinh viên mới
    this.showAddStudentForm = true;
  }

  closeAddStudentForm() {
    this.showAddStudentForm = false;
    this.editMode = false;
  }

  openEditStudentForm(student: Student) {
    this.editMode = true;
    this.selectedStudent = student; // Đặt để chỉnh sửa
    this.showEditStudentForm = true;
  }

  closeEditStudentForm() {
    this.showEditStudentForm = false;
    this.editMode = false;
    this.selectedStudent = null;
  }

  loadStudents(): void {
    this.academicService.getStudentsByRegistrationDate().subscribe(
      (data) => {
        this.students = data;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  loadClasses(): void {
    this.classService.getAllClasses().subscribe(data => {      
      this.classes = this.clearDataClass(data);
    });
    
  }

  clearDataClass(dataclass: Class[]):Class[] {
    for (let i = 0; i < dataclass.length; i++) {
      if(dataclass[i].isAvailable == false){
        dataclass.splice(i, 1);
      }
    }
    console.log(dataclass);
    return dataclass;
  }

  search(): void {
    if (this.searchKeyword.trim() !== '') {
      this.academicService.searchStudents(this.searchKeyword).subscribe(
        (data) => {
          this.students = data;
        },
        (error) => {
          console.error('Error searching students:', error);
        }
      );
    } else {
      this.loadStudents();
    }
  }

  // Thêm sinh viên mới
  addStudent(): void {
    this.academicService.addStudent(this.newStudent).subscribe(
      (addedStudent) => {
        this.students.push(addedStudent);
        console.log('Student added:', addedStudent);
        this.closeAddStudentForm(); // Đóng form sau khi thêm
        this.loadStudents(); // Làm mới danh sách
      },
      (error) => {
        console.error('Error adding student:', error);
      }
    );
  }

  // Hủy thêm sinh viên
  cancelAdd(): void {
    console.log('Adding student cancelled');
    this.closeAddStudentForm();
  }

  // Xóa sinh viên
  deleteStudent(studentId: string) {
    this.academicService.deleteStudent(studentId).subscribe(
      (response) => {
        console.log('Student deleted:', response.message);
        this.students = this.students.filter(student => student.studentId !== studentId);
        this.loadStudents(); // Làm mới danh sách
      },
      (error) => {
        console.error('Error deleting student:', error);
      }
    );
  }

  // Cập nhật sinh viên
  updateStudent(updatedStudent: Student) {
    if (!this.selectedStudent) {
      return; // No selected student to update
    }
    this.academicService.updateStudent(this.selectedStudent.studentId, updatedStudent).subscribe(
      (updatedStudent) => {
        const index = this.students.findIndex(s => s.studentId === updatedStudent.studentId);
        if (index !== -1) {
          this.students[index] = updatedStudent;
        }
        this.selectedStudent = null; // Clear selected student after update
        console.log('Student updated:', updatedStudent);
        this.closeEditStudentForm(); // Close the form after updating
        this.loadStudents(); // Refresh the list
      },
      (error) => {
        console.error('Error updating student:', error);
      }
    );
  }

  // Hủy chỉnh sửa sinh viên
  cancelEdit() {
    this.selectedStudent = null;
    this.closeEditStudentForm();
  }

  openEnrollForm(student: Student) {
    this.selectedStudent = student;
    this.showEnrollForm = true;
    this.classStudentSelected = this.clearClassDataSelected(this.classes, student.studentId);
    this.momodal();
  }

  clearClassDataSelected(dataclass: Class[], idStu: string):Class[] {
    let listStudent = [];
    for (let i = 0; i < dataclass.length; i++) {
      listStudent = dataclass[i].listStudent;
      console.log(idStu);
      console.log(listStudent);
      for(let j = 0; j < listStudent.length; j++){
        this.academicService.getStudentById(listStudent[j]).subscribe(data => {
          if( data.studentId == idStu){
            dataclass.splice(i, 1);
            console.log("Xóa thành công")}
        });
      }
    }
    return dataclass;
  }


  closeEnrollForm() {
    this.showEnrollForm = false;
    this.selectedStudent = null;
    this.enrollClassId = '';
    this.classStudentSelected = [];
    this.momodal();
  }

  // enrollStudentInClass(studentId: string, classId: string) {
  //   this.academicService.enrollStudentInClass(studentId, classId).subscribe(
  //     (response) => {
  //       console.log('Sinh viên đã đăng ký vào lớp:', response);
  //       this.closeEnrollForm();
  //     },
  //     (error) => {
  //       console.error('Lỗi khi đăng ký sinh viên vào lớp:', error);
  //     }
  //   );
  // }
  enrollStudentInClass(studentId: string, classId: string) {
    this.academicService.enrollStudentInClass(studentId, classId).subscribe(
        (response) => {
            console.log('Sinh viên đã đăng ký vào lớp:', response);
            alert('Sinh viên đã được ghi danh vào lớp học thành công');
            this.closeEnrollForm();
        },
        (error) => {
            if (error.status === 409) {
                alert('Sinh viên đã được đăng ký vào lớp này');
            } else {
                console.error('Lỗi khi đăng ký sinh viên vào lớp:', error);
            }
        }
    );
}


  loadStudentClasses(studentId: string) {
    this.academicService.getStudentClasses(studentId).subscribe(
      (data) => {
        this.studentClasses = data;
        this.showStudentClasses = true;
        this.momodal();
      },
      (error) => {
        console.error('Lỗi khi tải các lớp của sinh viên:', error);
      }
    );
  }

  momodal(): void {
    const modalElement = document.getElementById("nenmodal-1");
    if (modalElement) {
      modalElement.classList.toggle("active");
    } else {
      console.error("Không tìm thấy phần tử với id 'nenmodal-1'.");
    }
  }
}
