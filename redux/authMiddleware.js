import { setAuthenticated } from "./authSlice";

const authMiddleware = (storeAPI) => (next) => (action) => {
  if (action.type !== setAuthenticated.type) {
    const token = localStorage.getItem("token");
    if (token) {
      storeAPI.dispatch(setAuthenticated(true));
    } else {
      storeAPI.dispatch(setAuthenticated(false));
    }
  }

  return next(action);
};

export default authMiddleware;
