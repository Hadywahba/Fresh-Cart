import { Navigate } from "react-router-dom";

export default function Auth(props) {
  if (localStorage.getItem("getToken")) {
    return <Navigate to={"/"} />;
  } else {
    return props.children;
  }
}
