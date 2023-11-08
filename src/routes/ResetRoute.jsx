import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Status } from "../Global";
import { isInvalid } from "../utils";

const ResetRoute = () => {
  const location = useLocation();
  const search = location.search;
  const urlencoded = search.split('=');
  if (isInvalid(urlencoded[1]))
    return <Navigate to="/auth" />
  else
    return <Navigate to="/auth" state={{target: Status.ResetPassword, token: urlencoded[1]}}/>
}

export default ResetRoute;