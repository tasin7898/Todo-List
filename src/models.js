
export class ToDO {
  constructor({title = "", description = "", dueDate = "", priority = "", checklist = false} = {}){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist;
    this.id = crypto.randomUUID();
  }
  toggleCheck(){
    this.checklist = !this.checklist;
  }

}

export class Project {
  constructor(title = ""){
    this.project = title;
    this.id = crypto.randomUUID();
    this.todoes = [];
  }
  addToDos(todo){
    this.todoes.push(todo);
  }
}

export const defaultProj = {
  project : "Default",
  id : "default6767",
  todoes : [],
}