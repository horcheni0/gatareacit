import React from "react";
import { useState, useEffect } from 'react';
import { MdOutlineCalendarToday,MdBarChart,} from "react-icons/md";
import Card from "components/card";
import Chart from 'react-apexcharts';
const TotalSpent = () => {
  const [chartData, setChartData] = useState({
    series: [{
      name: 'Number of people in',
      data: []
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 6,
        colors: ['#4318FF']
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "#A3AED0",
            fontSize: "12px",
            fontWeight: "500",
          },
        },
        type: "text",
        range: undefined,
      },
      yaxis: {
        show:false,
        title: {
        show: false,
        },
        labels: {
          formatter: function (value) {
            return  + value
          }
        }
      },
      tooltip: {
        enabled: true,
        theme: "dark",
        style: {
          fontSize: "12px",
          fontFamily: undefined,
          backgroundColor: "#000000"
        },
      }, 
      colors: ['#0D6EFD']
    }
  });
  useEffect(() => {
    fetch('/api/total')
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        const date = sortedData.map((item) => new Date(item.date).toLocaleTimeString());
        const TotalData = sortedData.map((item) => item.total);
        setChartData({
          series: [{
            name: 'Number of people in',
            data: TotalData
          }],
          options: {
            ...chartData.options,
            xaxis: {
              ...chartData.options.xaxis,
              categories: date
            }
          }
        });
      })
      .catch((error) => console.error(error));
  });
  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-600">Daily Traffic</p>
        <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <MdOutlineCalendarToday />
          <span className="text-sm font-medium text-gray-600">This day</span>
        </button>
        <button className="!linear z-[1]  flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6 "  />
        </button>
      </div>
      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
        </div>
        <div className="h-full w-full">
         <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
        </div>
      </div>
    </Card>
  );
};
export default TotalSpent;
