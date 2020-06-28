import React from 'react';
import { useForm } from 'react-hook-form';

import { User, UserContext } from '../state';

export const UserProfiles: React.FC = () => {
  const { collection, add, remove } = React.useContext(UserContext);
  const { register, handleSubmit, reset } = useForm<User>({
    defaultValues: { id: `${Date.now()}` },
  });

  const onSubmit = (user: User) => {
    reset({ id: `${Date.now()}` });
    add(user);
  };

  return (
    <>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="id" ref={register()} />

        <label htmlFor="employee_name">Name</label>
        <input
          id="employee_name"
          name="employee_name"
          ref={register({
            required: 'Required',
          })}
        />

        <button>Add</button>
      </form>

      <h2>Users</h2>
      {collection.map(({ employee_name, id }) => (
        <h3 key={id} onClick={() => remove(id)}>
          {employee_name}
        </h3>
      ))}
    </>
  );
};
