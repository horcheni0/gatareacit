/*import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const Gender = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Data',
        data: [],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  });

  useEffect(() => {
    fetch('/api/total')
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => new Date(a.date) - new Date(b.date)); // sort by date
        const labels = data.map((item) => {
          const date = new Date(item.date);
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const seconds = date.getSeconds();
          return `${hours}:${minutes}:${seconds}`;
        });
        const totalData = data.map((item) => item.total);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Data',
              data: totalData,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        });
      });
  }, []);

  return <Line data={chartData} />;
};

export default Gender;

*/

///
/*
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class Gender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return opts.w.globals.labels[opts.seriesIndex] + ": " + val
          }
        }
      },
      series: [30, 40, 35, 50, 49, 60, 70, 91, 125, 100, 60, 80],
      chartType: 'bar'
    };
  }

  handleChartTypeChange = (event) => {
    this.setState({ chartType: event.target.value });
  }

  render() {
    const { options, series, chartType } = this.state;

    return (
      <div>
        <div className="chart-type-selector">
          <label>
            Chart Type:
            <select value={chartType} onChange={this.handleChartTypeChange}>
              <option value="bar">Bar</option>
              <option value="pie">Pie</option>
            </select>
          </label>
        </div>
        {chartType === 'bar' && (
          <ReactApexChart options={options} series={[{ name: 'Sales', data: series }]} type="bar" height={350} />
        )}
        {chartType === 'pie' && (
          <ReactApexChart options={options} series={series} type="pie" height={350} />
        )}
      </div>
    );
  }
}

export default Gender;
*/
/*
import React from "react";
import Chart from "react-apexcharts";
import { useEffect, useState } from 'react';

const Gender = () => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    fetch('/api/total')
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => new Date(a.date) - new Date(b.date)); // sort by date
        const labels = data.map((item) => {
          const date = new Date(item.date);
          const hours = date.getHours();
          return `${hours}`;
        });
        const totalData = data.map((item) => item.total);
    });
}, []);
const chartOptions = {
  chart: {
    type: "bar",
    height: 350,
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  colors: ["#4318FF"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  series: [
    {
      name: "Revenue",
      data: [4321, 3214, 5432, 7654, 1234],
    },
  ],
  xaxis: {
    categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  yaxis: {
    title: {
      text: "Revenue (USD)",
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "$ " + val + " USD";
      },
    },
  },
};
  

  return (
    <Chart
      options={chartOptions}
      series={chartOptions.series}
      type="bar"
      height={350}
    />
  );
};

export default Gender;
*/
/*
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const Gender = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    totalData: [],
  });

  useEffect(() => {
    fetch("/api/total")
      .then((response) => response.json())
      .then((data) => {
        // Check and convert date property to Date object if necessary
        data.forEach((item) => {
          if (typeof item.date !== "object" || item.date.constructor !== Date) {
            item.date = new Date(item.date);
          }
        });
        // Group by hour and sum totals
        const hourlyData = {};
        data.forEach((item) => {
          const hour = item.date.getHours();
          hourlyData[hour] = (hourlyData[hour] || 0) + item.total;
        });
        // Generate labels and totalData arrays
        const labels = Array.from(Array(24).keys()).map((hour) => `${hour}:00`);
        const totalData = labels.map((label) => hourlyData[label.split(":")[0]] || 0);
        setChartData({ labels, totalData });
      });
  }, []);
  

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
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
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
        columnWidth: "40px",
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
      show: true,
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
      show: true,
      color: "black",
      labels: {
        show: true,
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
    },
  };

  return (
    <Chart
      options={chartOptions}
      series={chartOptions.series}
      type="bar"
      height={350}
    />
  );
};

export default Gender;
/*
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const Gender = () => {
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
  }, []);

  return (
    <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
  );
};

export default Gender;
*/import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import 'apexcharts/dist/apexcharts.css';
import axios from 'axios';

const Gender = () => {
  const [chartOptions, setChartOptions] = React.useState({
    chart: {
      id: 'basic-bar',
      stacked:true
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
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="bar"
      width={500}
      height={300}
    />
  );
};

export default Gender;


/*
import React from 'react';
import Chart from 'react-apexcharts';
import 'apexcharts/dist/apexcharts.css';
import axios from 'axios';

const MyChart = () => {
  const [chartOptions, setChartOptions] = React.useState({
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: [], // initialize with empty categories
    },
  });

  const [chartSeries, setChartSeries] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data'); // replace with your API endpoint
        const data = response.data;
        const categories = data.map(d => d.category);
        const series = [
          {
            name: 'Value 1',
            data: data.map(d => d.value1),
          },
          {
            name: 'Value 2',
            data: data.map(d => d.value2),
          },
        ];
        setChartOptions(options => ({ ...options, xaxis: { categories } }));
        setChartSeries(series);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="bar"
      width={500}
      height={300}
    />
  );
};

const App = () => {
  return (
    <div>
      <MyChart />
    </div>
  );
};

export default App;
*/