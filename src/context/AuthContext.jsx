import React, { createContext, useContext, useState, useEffect } from 'react';
import { employeeDetails } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('hrms_auth') === 'true';
  });
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      setUser(employeeDetails);
    } else {
      setUser(null);
    }
  }, [isAuthenticated]);

  const login = (employeeId, password) => {
    // Standard mock credentials validation
    // Accepts any realistic employee ID (e.g. EMP-2026-8942) and a non-empty password
    if (employeeId.trim() && password.length >= 4) {
      setIsAuthenticated(true);
      localStorage.setItem('hrms_auth', 'true');
      localStorage.setItem('hrms_employee_id', employeeId);
      return { success: true };
    }
    return { 
      success: false, 
      message: "Please enter a valid Employee ID and a password of at least 4 characters." 
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('hrms_auth');
    localStorage.removeItem('hrms_employee_id');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
