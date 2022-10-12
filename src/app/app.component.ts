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

    this.loadTasks();
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
    this.saveLocalStorage();
    this.clear();
  }

  deleteTask(tasks: Task) {
    const index = this.tasks.indexOf(tasks); //capturando o index da tarefa selecionada pelo botão
    if (index !== -1) {
      this.tasks.splice(index, 1) //aqui estamos removendo baseado no index que foi capturado no indexOf
    }
    this.saveLocalStorage();
  }

  doneTask(tasks: Task){
    tasks.done = true;
    this.saveLocalStorage();
  }

  undoneTask(tasks: Task){
    tasks.done = false;
    this.saveLocalStorage();
  }

  saveLocalStorage(){
    const data = JSON.stringify(this.tasks); //Criando uma variável que recebe um JSON de string como valor.
    localStorage.setItem('task', data); //Aqui usamos um método do JS que seta o item como parâmetro (chave, valor)
  }

  loadTasks(){
    const data = localStorage.getItem('task');
    this.tasks = JSON.parse(data);
  }
  
}
