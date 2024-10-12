import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  BarChartOutlined,
  CloseOutlined,
  EditOutlined,
  HomeOutlined,
  LoginOutlined,
  MenuOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import Logo from "../../components/Logo";
import InfoCard from "../../components/InfoCard";
import { Chart } from "react-google-charts";
import { useNavigate, useOutletContext } from "react-router-dom";

const DashBoard = () => {
  const theme = useOutletContext();
  const cardsData = [
    {
      title: "Total Income",
      value: "5000",
      detailsText: "View Details",
      bgColor: "bg-[#3b76ef]",
    },
    {
      title: "Total Expenses",
      value: "2000",
      detailsText: "View Details",
      bgColor: "bg-[#63c7ff]",
    },
    {
      title: "Total Investment",
      value: "3000",
      detailsText: "View Details",
      bgColor: "bg-[#a66dd4]",
    },
    {
      title: "Total Savings",
      value: "150",
      detailsText: "View Details",
      bgColor: "bg-[#6dd4b1]",
    },
  ];
  const data = [
    ["Element", "Payment Method", { role: "style" }],
    ["CASH", 8.94, "#3b76ef"],
    ["CREDIT CARD", 10.49, "#63c7ff"],
    ["DEBIT CARD", 10.49, "#63c7ff"],
    ["BANK TRANSFER", 19.3, "#a66dd4"],
    ["OTHER", 21.45, "color: #6dd4b1"],
  ];
  const dataPie = [
    ["Task", "Recurring Expenses"],
    ["Recurring", 8],
    ["Other", 2],
  ];

  const pieChartOptions = {
    pieSliceText: "label",
    slices: {
      0: { offset: 0.1, color: "#63c7ff" },
      1: { offset: 0.1, color: "#a66dd4" },
    },
  };

  const chartOptions = {
    backgroundColor: "transparent",
    legend: {
      textStyle: { color: theme === "light" ? "black" : "white" },
    },
    hAxis: {
      textStyle: { color: theme === "light" ? "black" : "white" },
      titleTextStyle: { color: theme === "light" ? "black" : "white" },
    },
    vAxis: {
      textStyle: { color: theme === "light" ? "black" : "white" },
      titleTextStyle: { color: theme === "light" ? "black" : "white" },
    },
    titleTextStyle: { color: theme === "light" ? "black" : "white" },
  };

  return (
    <div className="flex h-full">
      <SideBar />
      <div className="flex-grow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {cardsData.map((card, index) => (
            <InfoCard
              title={card.title}
              value={card.value}
              detailsText={card.detailsText}
              bgColor={card.bgColor}
              key={index}
            />
          ))}
        </div>
        <div className="w-full mt-4 justify-between grid grid-cols-2 max-[850px]:grid-cols-1">
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            data={data}
            options={chartOptions}
          />
          <Chart
            chartType="PieChart"
            data={dataPie}
            options={{ ...chartOptions, ...pieChartOptions }}
            width="100%"
            height="400px"
          />
        </div>
      </div>
    </div>
  );
};

const SideBar = () => {
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
          <div className="text-xl py-4 px-6 mb-3 cursor-pointer flex gap-2 border-t border-gray-400">
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

export default DashBoard;
