import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Task } from 'src/models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public tasks: Task[] = [];
  public title: string = "Olá mundo";
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([ //'placeholder', array de validações
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(90)
      ])]
    })
  }

  changeMe(){
    this.title = "Titulo alterado ;)";
  }

  clear() {
    this.form.reset();
  }

  addTask() {
    const title = this.form.controls['title'].value;
    const id = this.tasks.length + 1;
    this.tasks.push(new Task(id, title, false));
    this.clear();
  }

  deleteTask(tasks: Task) {
    const index = this.tasks.indexOf(tasks); //capturando o index da tarefa selecionada pelo botão
    if (index !== -1) {
      this.tasks.splice(index, 1) //aqui estamos removendo baseado no index que foi capturado no indexOf
    }
  }

  doneTask(tasks: Task){
    tasks.done = true;
  }

  undoneTask(tasks: Task){
    tasks.done = false;
  }

}
