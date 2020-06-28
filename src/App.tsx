import React from 'react';
import './styles.css';

import { UserAPIProvider } from './state';
import { UserProfiles } from './components';

export const App: React.FC = () => {
  return (
    <div className="App">
      <UserAPIProvider>
        <UserProfiles />
      </UserAPIProvider>
    </div>
  );
};
