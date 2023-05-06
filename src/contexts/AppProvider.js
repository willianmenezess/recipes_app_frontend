import React, { useState, useMemo, createContext } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

function AppProvider({ children }) {
  const [state1, setState1] = useState('');

  const values = useMemo(() => ({
    state1,
    setState1,
  }), [state1, setState1]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
