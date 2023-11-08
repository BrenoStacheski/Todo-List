import { Inject } from "@angular/core";
import { Observable, of } from "rxjs";

export interface SchoolData {
  name: string;
  id: string;
}

@Inject({
  providedIn: 'root'
})
export class SchoolService {
  private students: Array<SchoolData> = [
    {
      name: "Marcos",
      id: "1"
    },
    {
      name: "João",
      id: "2"
    },
    {
      name: "Marcia",
      id: "3"
    },
  ];

  private teachers: Array<SchoolData> = [
    {
      name: "Jorge",
      id: "1"
    },
    {
      name: "Luiz",
      id: "2"
    },
    {
      name: "Gabriel",
      id: "3"
    },
  ];

  public getStudents(): Observable<Array<SchoolData>> {
    return of(this.students);
  }

  public getTeachers(): Observable<Array<SchoolData>> {
    return of(this.teachers);
  }
}
