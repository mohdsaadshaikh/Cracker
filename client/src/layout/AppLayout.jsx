import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import UserAvatar from "../components/Avatar";
import Logo from "../components/Logo";
import {
  BarChartOutlined,
  CloseOutlined,
  EditOutlined,
  HomeOutlined,
  LoginOutlined,
  MenuOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { useLazyLogoutUserQuery } from "../redux/apis/authApi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUnAuthenticated } from "../redux/slice/auth";

const AppLayout = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("app-theme") || "light"
  );

  const { userData } = useSelector((state) => state.Authentication);

  const [triggerLogout] = useLazyLogoutUserQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const logoutHandler = async () => {
    try {
      await triggerLogout().unwrap();
      dispatch(setUnAuthenticated());
      navigate("/");
      toast.success("Successfully logged out!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="w-full shadow sticky z-50 h-20 flex justify-between items-center">
        <div className="flex items-center justify-between h-16 px-4 w-full">
          <Logo />
          <div className="flex items-center gap-4">
            <ThemeChanger theme={theme} toggleTheme={toggleTheme} />
            <UserAvatar name={userData?.userData?.user.name} />
          </div>
        </div>
      </div>
      <div className="w-screen h-[90%] flex overflow-x-auto customized-scrollbar">
        <SideBar logoutHandler={logoutHandler} />
        <Outlet context={theme} />
      </div>
    </div>
  );
};

const ThemeChanger = ({ toggleTheme }) => {
  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        className="theme-controller"
        value="synthwave"
        onChange={toggleTheme}
      />
      <SunOutlined className="text-[20px] swap-off h-10 w-10 fill-current " />

      <MoonOutlined className="text-[20px] swap-on h-10 w-10 fill-current" />
    </label>
  );
};

const SideBar = ({ logoutHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 900px)" });
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const list = [
    {
      label: "Overview",
      icons: <HomeOutlined />,
      command: () => navigate("/overview"),
    },
    {
      label: "Details",
      icons: <BarChartOutlined />,
      command: () => navigate("/details"),
    },
    {
      label: "Add Finance",
      icons: <PlusSquareOutlined />,
      command: () => navigate("/create"),
    },
    {
      label: "Edit Finance",
      icons: <EditOutlined />,
      command: () => navigate("/edit-finance"),
    },
  ];

  const renderLinks = () => {
    return list.map((list, i) => (
      <div
        className="py-2 px-4 mb-3 rounded cursor-pointer select-none hover:bg-gray-200 dark:hover:bg-gray-800 text-lg transition-all ease-in-out flex gap-3"
        key={i}
      >
        <span>{list.icons}</span> {list.label}
      </div>
    ));
  };

  return (
    <>
      {isDesktop ? (
        <div className="w-64 h-full bg-base-100 shadow-lg flex flex-col justify-between">
          <div className="mt-4 p-4">{renderLinks()}</div>
          <div
            className="text-xl py-4 px-6 mb-3 cursor-pointer flex gap-2 border-t border-gray-400"
            onClick={logoutHandler}
          >
            <LoginOutlined />
            <span>Logout</span>
          </div>
        </div>
      ) : (
        <div>
          {/* Hamburger icon */}
          {!isOpen && (
            <MenuOutlined
              onClick={toggleSidebar}
              className="text-2xl cursor-pointer mt-6 ml-6"
            />
          )}

          {isOpen && (
            <>
              <div className="fixed " onClick={toggleSidebar} />
              <div className="fixed top-0 left-0 w-64 h-full bg-base-100 shadow-lg transform transition-transform duration-300 ease-in-out z-50">
                <div className="mt-12">
                  <Logo />
                </div>
                <div className="p-4">{renderLinks()}</div>
                <div
                  className="text-xl w-64 py-4 px-6 cursor-pointer flex gap-2 border-t border-gray-400 absolute bottom-0 "
                  onClick={logoutHandler}
                >
                  <LoginOutlined />
                  <span>Logout</span>
                </div>

                <CloseOutlined
                  onClick={toggleSidebar}
                  className="text-xl absolute top-4 right-4 cursor-pointer z-50"
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AppLayout;
