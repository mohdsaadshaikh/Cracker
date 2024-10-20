import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserProfileQuery } from "./redux/apis/authApi";
import Spinner from "./components/Spinner";
import { lazy, Suspense, useEffect } from "react";
import { setAuthenticated } from "./redux/slice/auth";
import FinancesTable from "./screens/finances/FinanceTable";

const Auth = lazy(() => import("./screens/auth/Auth"));
const DashBoard = lazy(() => import("./screens/dashboard/index"));
const Error = lazy(() => import("./screens/error/Error"));

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.Authentication);
  const { data, isSuccess, isFetching, isLoading } = useGetUserProfileQuery();
  console.log(data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuthenticated({ userData: data }));
    }
  }, [isFetching, dispatch, data, isSuccess]);

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
                <Route path="/finances" element={<FinancesTable />} />
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
