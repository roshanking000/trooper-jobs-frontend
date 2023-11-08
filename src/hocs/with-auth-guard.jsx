import React from "react";

import { AuthGuard } from "../guards/auth-guard";

export const withAuthGuard = (Component) => (props) => {
  return (
    <AuthGuard>
      <Component {...props} />
    </AuthGuard>
  );
};