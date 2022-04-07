export class User {
  id: string;
  name: string;
  role: string;
  surname: string;
  email: string;

  constructor(id: string, name: string, surname: string, role:string, email: string) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.surname = surname;
    this.email = email;
  }
}