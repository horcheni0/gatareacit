import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    case 'UPDATE_USER':
      return { 
        ...state,
        user: {
          ...state.user,
          profile: action.payload,
        }
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  });

  const fetchUserProfile = async (userId) => {
    try {
      const response = await fetch(`/api/user/profile/${userId}`);
      const profile = await response.json();
      dispatch({ type: 'UPDATE_USER', payload: profile });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      fetchUserProfile(user.id);
    }
  }, []);

  console.log('AuthContext state:', state);
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  );
};
