/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import Card from "components/card";
const PieChartCard = () => {
  const [genderData, setGenderData] = useState([]);
  useEffect(() => {
    axios
      .get('/api/gender')
      .then(response => {
        setGenderData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const chartOptions = {
    /*colors: ["#4318FF", "#f39c41"],
    chart: {
      width: "30px",
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    fill: {
      colors: ["#4318FF", "#f39c41"],
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
    series: genderData.map(data => data.count),
    labels: genderData.map(data => data.gender),
  }
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Gender Pie Chart
          </h4>
        </div>
      </div>
      <div className="mb-auto flex h-[220px] w-full items-center justify-center mt-9">
        <ReactApexChart options={chartOptions} series={chartOptions.series} type="pie" height={250} />
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-brand-500" />
            <p className="ml-1 text-sm font-normal text-gray-600">Female</p>
          </div>
        </div>
        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#f39d41]" />
            <p className="ml-1 text-sm font-normal text-gray-600">Male</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
export default PieChartCard;
*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

import Card from 'components/card';

const PieChartCard = () => {
  const [genderData, setGenderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/total/percentage');
        setGenderData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const malePercentage = genderData?.malePercentage || 0;
  const femalePercentage = genderData?.femalePercentage || 0;

  const chartOptions = {
    colors: ['#4318FF', '#f39c41'],
    chart: {
      width: '30px',
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    fill: {
      colors: ["#4318FF", "#f39c41"],
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

    series: [malePercentage, femalePercentage],
    labels: [`Male (${malePercentage}%)`, `Female (${femalePercentage}%)`],
  };

  return (
   <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-600">
            Gender Pie Chart
          </h4>
        </div>
      </div>
      <div className="mb-auto flex h-[220px] w-full items-center justify-center mt-9">
        <ReactApexChart options={chartOptions} series={chartOptions.series} type="pie" height={250} />
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-brand-500" />
            <p className="ml-1 text-sm font-normal text-gray-600">Female</p>
          </div>
        </div>
        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#f39d41]" />
            <p className="ml-1 text-sm font-normal text-gray-600">Male</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PieChartCard;