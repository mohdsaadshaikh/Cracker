import InfoCard from "../../components/InfoCard";
import { Chart } from "react-google-charts";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetAllFinancesQuery } from "../../redux/apis/financeApi";

const DashBoard = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  const { data } = useGetAllFinancesQuery({
    category: selectedCategory || undefined,
    type: selectedType || undefined,
    paymentMethod: selectedPaymentMethod || undefined,
    recurring: isRecurring ? "true" : undefined,
  });

  const finances = data?.finances;
  const theme = useOutletContext();

  const [cardsData, setCardsData] = useState([
    {
      title: "Total Income",
      value: "0",
      detailsText: "View Details",
      bgColor: "bg-[#3b76ef]",
    },
    {
      title: "Total Expenses",
      value: "0",
      detailsText: "View Details",
      bgColor: "bg-[#63c7ff]",
    },
    {
      title: "Total Investment",
      value: "0",
      detailsText: "View Details",
      bgColor: "bg-[#a66dd4]",
    },
    {
      title: "Total Savings",
      value: "0",
      detailsText: "View Details",
      bgColor: "bg-[#6dd4b1]",
    },
  ]);

  const [paymentMethodData, setPaymentMethodData] = useState([]);
  const [recurringData, setRecurringData] = useState([]);

  useEffect(() => {
    if (finances) {
      const totalIncome = finances
        .filter((item) => item.type === "INCOME")
        .reduce((acc, curr) => acc + curr.amount, 0);

      const totalExpenses = finances
        .filter((item) => item.type === "EXPENSE")
        .reduce((acc, curr) => acc + curr.amount, 0);

      const totalInvestment = finances
        .filter((item) => item.type === "INVESTMENT")
        .reduce((acc, curr) => acc + curr.amount, 0);

      const totalSavings = finances
        .filter((item) => item.type === "SAVINGS")
        .reduce((acc, curr) => acc + curr.amount, 0);

      setCardsData([
        {
          title: "Total Income",
          value: totalIncome.toFixed(2),
          detailsText: "View Details",
          bgColor: "bg-[#3b76ef]",
        },
        {
          title: "Total Expenses",
          value: totalExpenses.toFixed(2),
          detailsText: "View Details",
          bgColor: "bg-[#63c7ff]",
        },
        {
          title: "Total Investment",
          value: totalInvestment.toFixed(2),
          detailsText: "View Details",
          bgColor: "bg-[#a66dd4]",
        },
        {
          title: "Total Savings",
          value: totalSavings.toFixed(2),
          detailsText: "View Details",
          bgColor: "bg-[#6dd4b1]",
        },
      ]);

      const paymentMethodsCount = finances.reduce((acc, curr) => {
        acc[curr.paymentMethod] = (acc[curr.paymentMethod] || 0) + 1;
        return acc;
      }, {});

      const barChartData = [
        ["Element", "Payment Method", { role: "style" }],
        ...Object.entries(paymentMethodsCount).map(([method, count]) => [
          method,
          count,
          method === "CASH"
            ? "#FFA500"
            : method === "CREDIT_CARD"
            ? "#63c7ff"
            : method === "DEBIT_CARD"
            ? "#6dd4b1"
            : method === "BANK_TRANSFER"
            ? "#a66dd4"
            : "#3b76ef",
        ]),
      ];

      setPaymentMethodData(barChartData);

      const recurringExpenses = finances.filter(
        (item) => item.recurring === true
      ).length;
      const nonRecurringExpenses = finances.filter(
        (item) => item.recurring === false
      ).length;

      const pieChartData = [
        ["Task", "Recurring Expenses"],
        ["Recurring", recurringExpenses],
        ["Other", nonRecurringExpenses],
      ];

      setRecurringData(pieChartData);
    }
  }, [
    finances,
    selectedCategory,
    selectedType,
    selectedPaymentMethod,
    isRecurring,
  ]);

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
          {paymentMethodData.length > 1 ? (
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={paymentMethodData}
              options={chartOptions}
            />
          ) : (
            <div className="flex items-center justify-center h-400px">
              <p className="text-lg">No Payment Method data available.</p>
            </div>
          )}

          {recurringData.length > 1 ? (
            <Chart
              chartType="PieChart"
              data={recurringData}
              options={{ ...chartOptions, ...pieChartOptions }}
              width="100%"
              height="400px"
            />
          ) : (
            <div className="flex items-center justify-center h-400px">
              <p className="text-lg">No Recurring Expenses data available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
