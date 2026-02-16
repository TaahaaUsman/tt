import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../redux/slices/authSlice";
import { useUserQuery } from "../query/queries";

export default function AuthSync({ children }) {
  const dispatch = useDispatch();
  const { data, isSuccess, isError, isFetching } = useUserQuery();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    } else if (isError) {
      dispatch(setUser(null));
    }
    if (!isFetching) {
      dispatch(setLoading(false));
    }
  }, [data, isSuccess, isError, isFetching, dispatch]);

  return children;
}
