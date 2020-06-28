import React from 'react';
import { boundMethod } from 'autobind-decorator';

type ID = string | number;

interface Entity {
  id: ID;
}

export const contextFactory = <T extends Entity>() => {
  interface ContextValue {
    collection: T[];
    add: (item: T) => Promise<void> | void;
    remove: (id: T['id']) => Promise<void> | void;
    update: (id: T['id'], item: T) => Promise<void> | void;
    refresh: (collection: T[]) => Promise<void> | void;
  }

  const Context = React.createContext<ContextValue>(undefined as any);

  class Provider extends React.Component {
    public state = {
      collection: [] as T[],
    };

    @boundMethod
    protected refresh(collection: T[]): Promise<void> | void {
      this.setState({ collection });
    }

    @boundMethod
    protected add(item: T): Promise<void> | void {
      this.setState({ collection: [...this.state.collection, item] });
    }

    @boundMethod
    protected remove(id: T['id']): Promise<void> | void {
      this.setState({
        collection: this.state.collection.filter((item) => item.id !== id),
      });
    }

    @boundMethod
    protected update(id: T['id'], item: T): Promise<void> | void {
      this.setState({
        collection: this.state.collection.map((current) => (current.id === id ? item : current)),
      });
    }

    public render() {
      const {
        state: { collection },
        add,
        remove,
        update,
        refresh,
      } = this;
      const { Provider } = Context;
      return (
        <Provider value={{ collection, add, remove, update, refresh }}>
          {this.props.children}
        </Provider>
      );
    }
  }

  return [Context, Provider] as const;
};
