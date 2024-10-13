import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserProfileQuery } from "./redux/apis/authApi";
import Spinner from "./components/Spinner";
import { lazy, Suspense, useEffect } from "react";
import { setAuthenticated } from "./redux/slice/auth";

const Auth = lazy(() => import("./screens/auth/auth"));
const DashBoard = lazy(() => import("./screens/dashboard/index"));
const Error = lazy(() => import("./screens/error/error"));

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.Authentication);
  const { data, isSuccess, isFetching, isLoading, error } =
    useGetUserProfileQuery();
  // console.log(data?.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuthenticated({ userData: data }));
    }
  }, [isFetching, dispatch]);

  const isSomeQueryPending = useSelector(
    (state) =>
      Object.values(state.apis.queries).some(
        (query) => query.status === "pending"
      ) ||
      Object.values(state.apis.mutations).some(
        (query) => query.status === "pending"
      )
  );

  if (isLoading) {
    return;
  }

  return (
    <>
      {isSomeQueryPending && <Spinner />}
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {!isAuthenticated ? (
              <Route path="/" element={<Auth />} />
            ) : (
              <Route path="/" element={<AppLayout />}>
                <Route path="/" element={<DashBoard />} />
              </Route>
            )}
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
