// old code 
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({isRegistered, isLoggedIn, Children}) => {
//     if (!isRegistered) {
//         return <Navigate to="/signup" />;
//     }
//     if (!isLoggedIn) {
//         return <Navigate to="/login" />;
//     }
//     return Children;
// }

// export default ProtectedRoute;


// new code (working)
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isRegistered, isLoggedIn, children }) => {
  if ( !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
