import { HttpClient } from '@angular/common/http';
import { User } from '../types';
import { HttpModel } from '../utils/HttpModel.class';

export class UserModel extends HttpModel<User> {
  constructor(http: HttpClient) {
    super('/user', http);
  }
}
