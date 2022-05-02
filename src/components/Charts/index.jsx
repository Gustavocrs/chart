// import "./Charts.css";
// import {
//   LineChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   Line,
//   ResponsiveContainer,
// } from "recharts";

import { Chart } from "react-google-charts";

import { useState } from "react";
import JSON5 from "json5";
import Button from "../Button";
import TextArea from "../TextArea";

export default function Charts() {
  const [text, setText] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const [typeStart, setTypeStart] = useState([]);
  const [typeSpan, setTypeSpan] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [typeStop, setTypeStop] = useState([]);

  let configStart,
    configSpan,
    configData,
    configStop = [];

  const valor = `{type: 'start', timestamp: 1519862400000,select: ['min_response_time', 'max_response_time'],group: ['os', 'browser']}
    {type: 'span', timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000}
    {type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3}
    {type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'chrome', min_response_time: 0.2, max_response_time: 1.2}
    {type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.2}
    {type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'firefox', min_response_time: 0.1, max_response_time: 1.0}
    {type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'chrome', min_response_time: 0.2, max_response_time: 0.9}
    {type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.0}
    {type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'firefox', min_response_time: 0.2, max_response_time: 1.1}
    {type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.4}
    {type: 'stop', timestamp: 1519862460000}`;

  function Converter() {
    let convertedCode = "[" + valor.split("\n") + "]";
    convertedCode = JSON5.parse(convertedCode);
    setDataPoints(convertedCode);
  }

  function DataFilterType() {
    for (let i = 0; i < dataPoints.length; i++) {
      if (dataPoints[i].type === "start") {
        configStart = {
          type: dataPoints[i].type,
          timestamp: dataPoints[i].timestamp,
          select: [dataPoints[i].select],
          group: dataPoints[i].group,
        };
        // console.log(configStart);
      } else if (dataPoints[i].type === "span") {
        configSpan = {
          type: dataPoints[i].type,
          timestamp: dataPoints[i].timestamp,
          begin: dataPoints[i].begin,
          end: dataPoints[i].end,
        };
        // console.log(configSpan);
      } else if (dataPoints[i].type === "data") {
        configData = {
          type: dataPoints[i].type,
          timestamp: dataPoints[i].timestamp,
          os: dataPoints[i].os,
          browser: dataPoints[i].browser,
          min_response_time: dataPoints[i].min_response_time,
          max_response_time: dataPoints[i].max_response_time,
        };
        // console.log(configData);
      } else if (dataPoints[i].type === "stop") {
        configStop = {
          type: dataPoints[i].type,
          timestamp: dataPoints[i].timestamp,
        };
        // console.log(configStop);
      }
    }
  }

  function GroupSort() {
    console.log(configData);
  }

  function GenerateChart() {
    Converter();
    DataFilterType();
    GroupSort();
  }

  const data = [
    ["Year", "Sales", "Expenses"], //LABEL X, LABEL Y, PONTO
    ["2004", 1000, 400],
    ["2005", 1170, 460],
    ["2006", 660, 1120],
    ["2007", 1030, 540],
  ];

  const options = {
    curveType: "function",
    legend: { position: "right" },
  };

  return (
    <div className="container">
      <h1>Gustavo Silva's Challenge</h1>
      <TextArea value={valor} onChange={(e) => setText(e.target.value)} />
      <Chart
        chartType="LineChart"
        width="90%"
        height="400px"
        data={data}
        options={options}
      />

      {/* <ResponsiveContainer>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="name" type="number" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ right: -80 }}
          />

          <Line key="name" type="monotone" data="vv" stroke="red" />

        </LineChart>
      </ResponsiveContainer> */}
      <div>
        <Button name="Generate Chart" onClick={GenerateChart} />
      </div>
    </div>
  );
}

// function compareByGroup(point1, point2) {
//   for (let j = 0; j < group.length; j++) {
//     let g = group[j];
//     if (point1[g] != point2[g]) {
//       return false;
//     }
//   }
//   return true;
// }

// function addBySelect(point1, point2) {
//   console.log(select)
//   for (let j = 0; j < select.length; j++) {
//     let s = select[j];
//     if (typeof point1[s] == typeof []) {
//       point1[s].push(point2[s]);
//     } else {
//       point1[s] = [point1[s], point2[s]];
//     }
//   }
//   return point1;
// }

// function typeData(comando) {
// let add = true;
// for (let i = 0; i < dataPoints.length; i++) {
//   let point = dataPoints[i];
//   if (compareByGroup(comando, point)) {
//     add = false;
//     addBySelect(point, comando);
//   }
// }
// if (add) {
//   dataPoints.push(comando);
//   console.log(comando);
//   // console.log(dataPoints);
// }
// }
