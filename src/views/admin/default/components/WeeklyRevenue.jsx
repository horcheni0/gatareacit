/*import React from "react";
import Chart from 'react-apexcharts';
import 'apexcharts/dist/apexcharts.css';
import axios from 'axios';
import { useEffect } from 'react';
import Card from "components/card";
import { MdBarChart } from "react-icons/md";

const WeeklyRevenue = () => {
  const [chartOptions, setChartOptions] = React.useState({
    chart: {
      id: 'basic-bar',
      stacked:true
    },
    fill: {
      type: "solid",
      colors: ["#5E37FF", "#f49c44"],
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000"
      },
      theme: 'dark',
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
    },
    legend: {
      show: false,
    },
    colors: ["#5E37FF", "#6AD2FF"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "20px",
      },
    },
    grid: {
      borderColor: "rgba(163, 174, 208, 0.3)",
      show: true,
      yaxis: {
        lines: {
          show: false,
          opacity: 0.5,
        },
      },
      row: {
        opacity: 0.5,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      show: false,
      color: "black",
      labels: {
        show: false,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
    },
    xaxis: {
      categories: [],
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
  });

  const [chartSeries, setChartSeries] = React.useState([
    {
      name: 'Male',
      data: [],
    },
    {
      name: 'Female',
      data: [],
    },
  ]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/api/total/hour');
      const data = response.data;
      const hour = data.map(datum => datum._id.hour);
      const maleData = data.map(datum => datum.male);
      const femaleData = data.map(datum => datum.female);
      setChartOptions(prevOptions => ({
        chart: {
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          style: {
            fontSize: "12px",
            fontFamily: undefined,
            backgroundColor: "#000000"
          },
          theme: 'dark',
        onDatasetHover: {
          style: {
            fontSize: "12px",
            fontFamily: undefined,
          },
        },
        },
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: hour,
        },
      }));
      setChartSeries(prevSeries => [
        {
          ...prevSeries[0],
          data: maleData,
        },
        {
          ...prevSeries[1],
          data: femaleData,
        },
      ]);
    }
    fetchData();
  }, []);
  
  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Daily Revenue
        </h2>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="md:mt-16 lg:mt-0">
  <div className="h-64 sm:h-72 md:h-80 lg:h-96 xl:h-120 w-full">
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="bar"
      height="100%"
      width="100%"
    />
  </div>
</div>

    </Card>
  );
};

export default WeeklyRevenue;
*/
/*
import React from "react";
import Chart from 'react-apexcharts';
import 'apexcharts/dist/apexcharts.css';
import axios from 'axios';
import { useEffect } from 'react';
import Card from "components/card";
import { MdBarChart } from "react-icons/md";

const WeeklyRevenue = () => {
  const [chartOptions, setChartOptions] = React.useState({
    // Chart options...
  });

  const [chartSeries, setChartSeries] = React.useState([
    {
      name: 'Male',
      data: [],
    },
    {
      name: 'Female',
      data: [],
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/api/total/hour');
      const data = response.data;
      //const hour = data.map(datum => datum._id.hour);
      const maleData = data.map(datum => datum.m_total); // Use "m_total" field
      const femaleData = data.map(datum => datum.f_total); // Use "f_total" field
      setChartOptions(prevOptions => ({
      }));
      setChartSeries(prevSeries => [
        {
          ...prevSeries[0],
          data: maleData,
        },
        {
          ...prevSeries[1],
          data: femaleData,
        },
      ]);
    }
    fetchData();
  }, []);

  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Daily Revenue
        </h2>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="md:mt-16 lg:mt-0">
  <div className="h-64 sm:h-72 md:h-80 lg:h-96 xl:h-120 w-full">
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="bar"
      height="100%"
      width="100%"
    />
  </div>
</div>

    </Card>
  );
};

export default WeeklyRevenue;






















/*


import React from "react";
import Chart from 'react-apexcharts';
import 'apexcharts/dist/apexcharts.css';
import axios from 'axios';
import { useEffect } from 'react';
import Card from "components/card";
import { MdBarChart } from "react-icons/md";

const WeeklyRevenue = () => {
  const [chartOptions, setChartOptions] = React.useState({
    // Chart options...
    chart: {
      id: 'basic-bar',
      stacked:true
    },
    fill: {
      type: "solid",
      colors: ["#5E37FF", "#f49c44"],
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000"
      },
      theme: 'dark',
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
    },
    legend: {
      show: false,
    },
    colors: ["#5E37FF", "#6AD2FF"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "20px",
      },
    },
    grid: {
      borderColor: "rgba(163, 174, 208, 0.3)",
      show: true,
      yaxis: {
        lines: {
          show: false,
          opacity: 0.5,
        },
      },
      row: {
        opacity: 0.5,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      show: false,
      color: "black",
      labels: {
        show: false,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
    },
    xaxis: {
      categories: [],
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
    }
    
  });

  const [chartSeries, setChartSeries] = React.useState([
    {
      name: 'Male',
      data: [],
    },
    {
      name: 'Female',
      data: [],
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/total/hour');
        const data = response.data;
        const hour = data.map(datum => datum._id.hour);
        const maleData = data.map(datum => datum.m_total);
        const femaleData = data.map(datum => datum.f_total);
        setChartOptions(prevOptions => ({
          chart: {
            stacked: true,
            toolbar: {
              show: false,
            },
          },
          tooltip: {
            style: {
              fontSize: "12px",
              fontFamily: undefined,
              backgroundColor: "#000000"
            },
            theme: 'dark',
          onDatasetHover: {
            style: {
              fontSize: "12px",
              fontFamily: undefined,
            },
          },
          },
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: hour,
          },
        }));
        setChartSeries(prevSeries => [
          {
            ...prevSeries[0],
            data: maleData,
          },
          {
            ...prevSeries[1],
            data: femaleData,
          },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    fetchData();
  }, []);

  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Daily Revenue
        </h2>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="h-64 sm:h-72 md:h-80 lg:h-96 xl:h-120 w-full">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height="100%"
            width="100%"
          />
        </div>
      </div>
    </Card>
  );
};

export default WeeklyRevenue;

/*
import React from "react";
import Chart from 'react-apexcharts';
import 'apexcharts/dist/apexcharts.css';
import axios from 'axios';
import { useEffect } from 'react';
import Card from "components/card";
import { MdBarChart } from "react-icons/md";

const WeeklyRevenue = () => {
  const [chartOptions, setChartOptions] = React.useState({
    // Chart options...
    // Same as your existing code
  });

  const [chartSeries, setChartSeries] = React.useState([
    {
      name: 'Male',
      data: [],
    },
    {
      name: 'Female',
      data: [],
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/total/hour');
        const data = response.data;
        
        // Filter the data for the desired range of hours (8 AM to 7 PM)
        const filteredData = data.filter(datum => datum._id.hour >= 8 && datum._id.hour <= 19);

        const hour = filteredData.map(datum => datum._id.hour);
        const maleData = filteredData.map(datum => datum.m_total);
        const femaleData = filteredData.map(datum => datum.f_total);
        setChartOptions(prevOptions => ({
          // Same as your existing code
        }));
        setChartSeries(prevSeries => [
          {
            ...prevSeries[0],
            data: maleData,
          },
          {
            ...prevSeries[1],
            data: femaleData,
          },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    fetchData();
  }, []);

  return (
     <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-600">Gender Revenue</h3>
        <MdBarChart className="text-gray-600 text-xl" />
      </div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={300}
      />
    </Card>
  );
};

export default WeeklyRevenue;
*/
import React, { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import 'apexcharts/dist/apexcharts.css';
import axios from 'axios';
import Card from "components/card";
import { MdBarChart } from "react-icons/md";

const WeeklyRevenue = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: 'basic-bar',
      stacked:true
    },
    fill: {
      type: "solid",
      colors: ["#5E37FF", "#f49c44"],
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000"
      },
      theme: 'dark',
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
    },
    legend: {
      show: false,
    },
    colors: ["#5E37FF", "#6AD2FF"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "20px",
      },
    },
    grid: {
      borderColor: "rgba(163, 174, 208, 0.3)",
      show: true,
      yaxis: {
        lines: {
          show: false,
          opacity: 0.5,
        },
      },
      row: {
        opacity: 0.5,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      show: false,
      color: "black",
      labels: {
        show: false,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
    },
    xaxis: {
      categories: [],
      show: false,
    labels: {
      show: false,
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
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: 'Male',
      data: [],
    },
    {
      name: 'Female',
      data: [],
    },
  ]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/total/hour');
      const data = response.data;
      const maleData = data.map(datum => datum.m_total); // Use "m_total" field
      const femaleData = data.map(datum => datum.f_total); // Use "f_total" field
      setChartOptions(prevOptions => ({
        ...prevOptions,
        xaxis: {
          categories: data.map(datum => datum._id.hour),
        },
      }));
      setChartSeries(prevSeries => [
        {
          ...prevSeries[0],
          data: maleData,
        },
        {
          ...prevSeries[1],
          data: femaleData,
        },
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch

    const interval = setInterval(fetchData, 5000); // Refresh data every 1 minute

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, []);

  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-600">
          Gender Revenue
        </h2>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="h-64 sm:h-72 md:h-80 lg:h-96 xl:h-120 w-full">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height="100%"
            width="100%"
          />
        </div>
      </div>
    </Card>
  );
};

export default WeeklyRevenue;
