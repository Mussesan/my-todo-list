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
  public title: string = "Olá Mundo";
  public form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['Write some task', Validators.compose([ //'placeholder', vetor de validações
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(90)
      ])]
    })

    this.tasks.push(new Task(1,"Estudar JS", false));
    this.tasks.push(new Task(2,"Estudar Angular", true));
    this.tasks.push(new Task(3,"Construir portfólio", false));
  }

  changeMe(){
    this.title = "Titulo alterado ;)";
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
