import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { Observable, from, map, of, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  providers: [SchoolService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input() public projectName!: string;
  @Output() public outputEvent = new EventEmitter<string>();
  public title = 'todo-list-16';
  public students: Array<SchoolData> = [];
  public teachers: Array<SchoolData> = [];
  private zipSchoolResponses$ = zip(
    this.getStudentsData(),
    this.getTeacherData()
  );
  private ages = of(20, 30, 40, 50, 60, 70);
  private carData = from([
    {
      brand: 'Fiat',
      model: 'Palio',
      horsepower: 75
    },
    {
      brand: 'Volkswagen',
      model: 'Gol',
      horsepower: 75
    },
    {
      brand: 'Hyundai',
      model: 'i30',
      horsepower: 145
    }
  ]);

  constructor(
    private schoolService: SchoolService,
  ) { }

  ngOnInit(): void {
    this.getMultipliedAges();
    this.getCarModel();
  }

  public handleEmitEvent(): void {
    this.outputEvent.emit(this.projectName);
  }

  public getMultipliedAges(): void {
    this.ages
      .pipe(
        map((age) => age * 2)
      ).subscribe({
        next: (response) => {
          console.log('IDADE MULTIPLICADO', response);
        }
      })
  }

  public getCarModel(): void {
    this.carData.pipe(
      map((car) => car.model)
    ).subscribe({
      next: (response) => {
        console.log('modelos', response);
      }
    })
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
