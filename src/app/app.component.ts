import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Task } from 'src/models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public mode = 'list';
  public tasks: Task[] = [];
  public title: string = "Olá mundo";
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([ //'placeholder', array de validações
        Validators.required, //campo requerido
        Validators.minLength(3), //mínimo de 3 caracteres
        Validators.maxLength(90) //máximo de 90 caracteres
      ])]
    })

    this.loadTasks();//Carregando todas as tasks que estão no local storage do navegador
                    // sempre que o constutor for chamado.
  }

  changeMe(){
    this.title = "Titulo alterado ;)";
  }

  clear() {
    this.form.reset();//método usado para limpar o input sempre queo método addTask for chamado.
  }

  addTask() {
    const title = this.form.controls['title'].value;
    const id = this.tasks.length + 1;
    this.tasks.push(new Task(id, title, false));
    this.saveLocalStorage();//primeiro salvamos o item no localstorage
    this.clear();//depois limpamos o input
  }

  deleteTask(tasks: Task) { //este método será adicionado em cada botão Delete que será gerado pelo NgIf.
    const index = this.tasks.indexOf(tasks); //capturando o index de uma tarefa específica selecionada pelo botão Delete
    if (index !== -1) { //sempre que o array de tarefas for diferente de -1, a remoção será executada
      this.tasks.splice(index, 1) //aqui estamos removendo baseado no index que foi capturado no indexOf
    }
    this.saveLocalStorage();
  }

  doneTask(tasks: Task){
    tasks.done = true; //alterando a propriedade 'done' do objeto Tasks para true
                      // logo, a tarefa será concluída
    this.saveLocalStorage();
  }

  undoneTask(tasks: Task){
    tasks.done = false;//alterando a propriedade 'done' do objeto Tasks para false
                      // logo, a tarefa será colocada como não concluída
    this.saveLocalStorage();
  }

  saveLocalStorage(){
    const data = JSON.stringify(this.tasks); //Criando uma variável que recebe um JSON de string como valor.
    localStorage.setItem('task', data); //Aqui usamos um método do JS que seta o item como parâmetro (chave, dado a ser adicionado)
  }

  loadTasks(){
    // Sempre que a variável data vier como 'nulo'
    // vamos efetuar a verificação e setar ela como 'vazia'
    const data = localStorage.getItem('task');
    if (data) {
      this.tasks = JSON.parse(data);
    } else {
      this.tasks = [];
    }
    
  }

  changeMode(mode: string){
    this.mode = mode;
  }
  
}
