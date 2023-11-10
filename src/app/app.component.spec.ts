import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { first } from 'rxjs';
import { TodoSignalsService } from './services/todo-signals.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Todo } from './models/model/todo.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoSignalService: TodoSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule, NoopAnimationsModule],
      providers: [TodoSignalsService],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoSignalService = TestBed.inject(TodoSignalsService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Teste do @Input()
  it('should set @Input() property correctly', () => {
    component.projectName = 'Testing Angular With Jest';

    fixture.detectChanges();

    expect(component.projectName).toEqual('Testing Angular With Jest');
  })

  // Teste de @Output() e @Input()
  it('should emit event with @Output() decorator correctly', () => {
    component.projectName = 'Testing my Angular application';

    component.outputEvent
      .pipe(
        first()
      )
      .subscribe({
        next: (event) => {
          expect(event).toEqual('Testing my Angular application');
          component.handleEmitEvent();
        }
      })
  })

  // Teste de um acionamento de um serviço e de um signal
  it('should create new todo correctly and call service method', () => {
    jest.spyOn(todoSignalService, 'updateTodo');
    const newTodo: Todo = {
      id: 1,
      title: 'Testing creating Todo',
      description: 'Test new Todo',
      done: true,
    };

    component.handleCreateTodo(newTodo);
    fixture.detectChanges();
    expect(todoSignalService.updateTodo).toHaveBeenCalledWith(newTodo);
    expect(component.todoSignal()).toEqual([newTodo]);
  });

  // Testes de elementos do DOM
  it ('should not render paragraph in the DOM', () => {
    const componentDebugElement: DebugElement = fixture.debugElement;
    const element: HTMLElement = componentDebugElement.nativeElement;
    const paragraph = element.querySelector('p');

    expect(paragraph).toBeNull();
  });

  it('should render paragraph correctly', () => {
    component.renderTestMessage = true;

    fixture.detectChanges();

    const componentDebugElement: DebugElement = fixture.debugElement;
    const paragraphDebugElement = componentDebugElement.query(By.css('p'));
    const paragraph: HTMLElement = paragraphDebugElement.nativeElement;

    expect(paragraph.textContent).toEqual('Test your Angular application');
  });

  // Teste de setTimeout
  it('should isDoned property to be false', () => {
    component.handleCheckIsDone();
    expect(component.isDoned).toBe(false);
  });

  it('should isDoned property to be true', fakeAsync(() => {
    component.handleCheckIsDone();
    tick(200);

    expect(component.isDoned).toBe(true);
  }));
});
