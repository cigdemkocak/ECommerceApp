
//yeni yaptım

export class UserModel {
  id: string;
  name: string;
  surname: string;
  role: string;
  email: string;
  password: string;
  token: string;

  constructor(id: string, name: string, surname: string, role:string, email: string, password: string, token: string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.role = role;
    this.email = email;
    this.password = password;
    this.token = token;
  }
}