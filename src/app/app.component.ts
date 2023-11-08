import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { Observable, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  providers: [SchoolService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'todo-list-16';
  public students: Array<SchoolData> = [];
  public teachers: Array<SchoolData> = [];
  private zipSchoolResponses$ = zip(
    this.getStudentsData(),
    this.getTeacherData()
  );

  constructor(
    private schoolService: SchoolService,
  ) { }

  ngOnInit(): void {
    this.getSchoolData();
  }

  public getSchoolData(): void {
    this.zipSchoolResponses$.subscribe({
      next: (response) => {
        console.log('STUDENTS', response[0]);
        console.log('TEACHERS', response[1]);
      }
    })
  }

  private getStudentsData(): Observable<Array<SchoolData>> {
    return this.schoolService.getStudents();
  }

  private getTeacherData(): Observable<Array<SchoolData>> {
    return this.schoolService.getTeachers();
  }

}
