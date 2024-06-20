import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';
import { ClassService } from 'src/app/services/class.service';
import { Teacher } from '../../shared/interface/academicManagement/teacher';
import { Class } from '../../shared/interface/class/class';

@Component({
  selector: 'app-teacher-admin',
  templateUrl: './teacher-admin.component.html',
  styleUrls: ['./teacher-admin.component.css']
})
export class TeacherAdminComponent implements OnInit {

  teachers: Teacher[] = [];
  classes: Class[] = [];
  newTeacher: Teacher = { name: '', phoneNum: '', teachingClass: '', duration: '', periods: [], timeline: '' };
  selectedTeacher: Teacher | null = null;
  selectedDate: string | null = null;

  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  daysInMonth: (number | null)[] = [];

  constructor(private teacherService: TeacherService, private classService: ClassService) { }

  ngOnInit(): void {
    this.loadTeachers();
    this.loadClasses();
    this.generateCalendarDays(this.currentYear, this.currentMonth);
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data;
    });
  }

  loadClasses(): void {
    this.classService.getAllClasses().subscribe(data => {
      this.classes = data;
    });
  }

  addTeacher(): void {
    if (this.selectedDate) {
      this.newTeacher.periods = [this.selectedDate];
      this.teacherService.createTeacher(this.newTeacher).subscribe(
        data => {
          this.teachers.push(data);
          this.newTeacher = { name: '', phoneNum: '', teachingClass: '', duration: '', periods: [], timeline: '' };
          this.toggleAddTeacherModal(); // Close the modal after adding a teacher
        },
        error => {
          alert(error.error);
        }
      );
    }
  }

  editTeacher(teacher: Teacher): void {
    this.selectedTeacher = { ...teacher };
    this.toggleEditTeacherModal(); // Open the modal for editing
  }

  updateTeacher(): void {
    if (this.selectedTeacher) {
      this.teacherService.updateTeacher(this.selectedTeacher._id!, this.selectedTeacher).subscribe(
        data => {
          const index = this.teachers.findIndex(t => t._id === data._id);
          if (index !== -1) {
            this.teachers[index] = data;
          }
          this.selectedTeacher = null;
          this.toggleEditTeacherModal(); // Close the modal after updating
        },
        error => {
          alert(error.error);
        }
      );
    }
  }

  deleteTeacher(id: string): void {
    this.teacherService.deleteTeacher(id).subscribe(() => {
      this.teachers = this.teachers.filter(t => t._id !== id);
    });
  }

  cancelEdit(): void {
    this.selectedTeacher = null;
    this.toggleEditTeacherModal(); // Close the modal when cancelling
  }

  generateCalendarDays(year: number, month: number): void {
    const date = new Date(year, month, 1);
    const days: (number | null)[] = [];
    const firstDay = date.getDay();

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    while (date.getMonth() === month) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }

    this.daysInMonth = days;
  }

  selectDay(day: number): void {
    this.selectedDate = `${this.currentYear}-${this.currentMonth + 1}-${day}`;
    this.toggleAddTeacherModal(); // Open the modal when selecting a day
  }

  getClassById(courseId: string): Class | undefined {
    return this.classes.find(cls => cls.classId === courseId);
  }

  getClassInfo(courseId: string): string {
    const classInfo = this.getClassById(courseId);
    if (classInfo) {
      return classInfo.courseId + classInfo.classId;
    }
    return ''; // Or return some default value or handle the case appropriately
  }

  getTeachersForDay(day: number): Teacher[] {
    const date = `${this.currentYear}-${this.currentMonth + 1}-${day}`;
    return this.teachers.filter(t => t.periods.includes(date));
  }

  getCalendarWeeks(): (number | null)[][] {
    const weeks: (number | null)[][] = [];
    let week: (number | null)[] = [];

    for (let i = 0; i < this.daysInMonth.length; i++) {
      if (i > 0 && i % 7 === 0) {
        weeks.push(week);
        week = [];
      }
      week.push(this.daysInMonth[i]);
    }

    if (week.length > 0) {
      weeks.push(week);
    }

    while (weeks[weeks.length - 1].length < 7) {
      weeks[weeks.length - 1].push(null);
    }

    return weeks;
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentYear--;
      this.currentMonth = 11;
    } else {
      this.currentMonth--;
    }
    this.generateCalendarDays(this.currentYear, this.currentMonth);
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentYear++;
      this.currentMonth = 0;
    } else {
      this.currentMonth++;
    }
    this.generateCalendarDays(this.currentYear, this.currentMonth);
  }

  toggleAddTeacherModal(): void {
    const modal = document.getElementById('addTeacherModal');
    if (modal) {
      modal.classList.toggle('active');
    }
  }

  toggleEditTeacherModal(): void {
    const modal = document.getElementById('editTeacherModal');
    if (modal) {
      modal.classList.toggle('active');
    }
  }
}
