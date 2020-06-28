import { boundMethod } from 'autobind-decorator';
import axios from 'axios';

import { contextFactory } from './utils/contextFactory';

export interface User {
  id: string;
  employee_name: string;
}

const [UserContext, UserProvider] = contextFactory<User>();

class UserAPIProvider extends UserProvider {
  constructor(props: {}) {
    super(props);
    this.fetch().then(this.refresh);
  }

  private api = 'https://dummy.restapiexample.com/api/v1/employees';

  @boundMethod
  private fetch() {
    return axios
      .get<{ data: User[] }>(`${this.api}/`)
      .then((res) => res.data.data);
  }
}

export { UserContext, UserAPIProvider };
