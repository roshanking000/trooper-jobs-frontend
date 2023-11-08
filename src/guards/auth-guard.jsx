import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../hooks/use-auth";
import { Navigate } from 'react-router-dom';

export const AuthGuard = (props) => {
  const { children } = props;
  const { isAuthenticated, isInitialized } = useAuth();
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    if (isInitialized) {
      setChecked(isAuthenticated);
    }
  }, [isInitialized, isAuthenticated])

  if (checked == null) {
    return null;
  }

  if (checked == true) {
    return <>{children}</>;  
  } else {
    return <>{<Navigate replace to='/auth' />}</>;
  }
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
