import React, { useState, useMemo, createContext } from 'react';
import PropTypes from 'prop-types';

export const MyContext = createContext();

function Provider({ children }) {
  const [state1, setState1] = useState('');

  const values = useMemo(() => ({
    state1,
    setState1,
  }), [state1, setState1]);

  return (
    <MyContext.Provider value={ values }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
