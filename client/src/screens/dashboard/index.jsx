import InfoCard from "../../components/InfoCard";
import { Chart } from "react-google-charts";
import { useOutletContext } from "react-router-dom";

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
    ["CASH", 8.94, "#FFA500"],
    ["CREDIT CARD", 10.49, "#63c7ff"],
    ["DEBIT CARD", 10.49, "#6dd4b1"],
    ["BANK TRANSFER", 19.3, "#a66dd4"],
    ["OTHER", 21.45, "#3b76ef"],
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
    <div className="flex h-full w-full">
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

export default DashBoard;
