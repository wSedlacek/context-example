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

  private api = 'http://dummy.restapiexample.com/api/v1';

  @boundMethod
  private async fetch() {
    return axios.get<{ data: User[] }>(`${this.api}/employees`).then((res) => res.data.data);
  }

  @boundMethod
  protected async remove(id: string): Promise<void> {
    await axios.delete(`${this.api}/delete/${id}`);
    super.remove(id);
  }

  @boundMethod
  protected async add(item: User): Promise<void> {
    await axios.post(`${this.api}/create`, item);
    super.add(item);
  }

  @boundMethod
  protected async update(id: string, item: User): Promise<void> {
    await axios.put(`${this.api}/update/${id}`, item);
    super.add(item);
  }
}

export { UserContext, UserAPIProvider };
