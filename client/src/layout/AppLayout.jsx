import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import UserAvatar from "../components/Avatar";
import Logo from "../components/Logo";

const AppLayout = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("app-theme") || "light"
  );

  // Update the theme in localStorage and on the HTML element
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="w-full shadow sticky z-50 h-20 flex justify-between items-center">
        <div className="flex items-center justify-between h-16 px-4 w-full">
          <Logo />
          <div className="flex items-center gap-4">
            <ThemeChanger theme={theme} toggleTheme={toggleTheme} />
            <UserAvatar name="Saad" />
          </div>
        </div>
      </div>
      <div className="w-full h-[90%] overflow-x-auto customized-scrollbar">
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

export default AppLayout;
