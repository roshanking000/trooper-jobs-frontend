import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext/auth-context';

export const useAuth = () => useContext(AuthContext);
