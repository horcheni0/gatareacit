import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import Card from 'components/card';
const DailyTraffic = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    totalData: [],
  });
  useEffect(() => {
    fetchData(); 
    const interval = setInterval(fetchData, 5000); 
    return () => {
      clearInterval(interval); 
    };
  }, []);
  const fetchData = () => {
    fetch('/api/total')
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          if (typeof item.date !== 'object' || item.date.constructor !== Date) {
            item.date = new Date(item.date);
          }
        });
  
        // Filter data from 8 to 19
        const filteredData = data.filter((item) => {
          const hour = item.date.getHours();
          return hour >= 8 && hour <= 19;
        });
  
        // Group by hour and sum totals
        const hourlyData = {};
        filteredData.forEach((item) => {
          const hour = item.date.getHours();
          hourlyData[hour] = (hourlyData[hour] || 0) + item.total;
        });
  
        // Generate labels and totalData arrays
        const labels = Array.from(Array(12).keys()).map((hour) => `${hour + 8}`);
        const totalData = labels.map((label) => hourlyData[Number(label)] || 0);
        setChartData({ labels, totalData });
      });
  };
  
  const { labels, totalData } = chartData;
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 0,
              color: "#4318FF",
              opacity: 1,
            },
            {
              offset: 100,
              color: "rgba(67, 24, 255, 1)",
              opacity: 0.28,
            },
          ],
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
      strokeDashArray: 2,
      yaxis: {
        lines: {
          show: false,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "60px",
        horizontal: false,
        endingShape: "rounded",
      },
    },
    colors: ["#4318FF"],
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    series: [
      {
        name: "Total",
        data: totalData,
      },
    ],
    xaxis: {
      categories: labels,
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      color: "black",
      labels: {
        show: false,
        style: {
          colors: "#CBD5E0",
          fontSize: "14px",
        },
        formatter: function (val) {
          return val + " per hour";
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " per hour";
        },
      },
      enabled: true,
      theme: "dark",
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000"
      },
    },
  };
  return (
    <Card extra="pb-7 p-[20px]">
      <p className='text-lg font-semibold text-gray-800 dark:text-gray-600'>Visitors By Hour</p>
      <div className="h-[300px] w-full pt-10 pb-0">
        <Chart options={chartOptions} series={[{ data: totalData }]} type="bar" height={290} />
      </div>
    </Card>
  );
};

export default DailyTraffic;
