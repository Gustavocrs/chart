import "./Charts.css";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
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
  const [typeAllData, setTypeAllData] = useState([]);

  let data = [
    {
      name: "Valor 1",
      valor: 40,
    },
    {
      name: "Valor 2",
      valor: 30,
    },
  ];

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
    setDataPoints(...[convertedCode]);
  }

  function DataFilterType() {
    for (let i = 0; i < dataPoints.length; i++) {
      if (dataPoints[i].type === "start") {
        let configStart = {
          type: dataPoints[i].type,
          timestamp: dataPoints[i].timestamp,
          select: [dataPoints[i].select],
          group: dataPoints[i].group,
        };
        setTypeStart(...[configStart]);
        console.log(configStart);
        // console.log(typeStart);
      } else if (dataPoints[i].type === "span") {
        let configSpan = {
          type: dataPoints[i].type,
          timestamp: dataPoints[i].timestamp,
          begin: dataPoints[i].begin,
          end: dataPoints[i].end,
        };
        setTypeSpan(...[configSpan]);
        console.log(configSpan);
        // console.log(typeSpan);
      } else if (dataPoints[i].type === "data") {
        let configData = {
          type: dataPoints[i].type,
          timestamp: dataPoints[i].timestamp,
          os: dataPoints[i].os,
          browser: dataPoints[i].browser,
          min_response_time: dataPoints[i].min_response_time,
          max_response_time: dataPoints[i].max_response_time,
        };
        setTypeData(...[configData]);
        // console.log(typeData);
        console.log(configData);
      } else if (dataPoints[i].type === "stop") {
        let configStop = {
          type: dataPoints[i].type,
          timestamp: dataPoints[i].timestamp,
        };
        setTypeStop(...[configStop]);
        // console.log(typeStop);
        console.log(configStop);
      }
    }
  }

  function GenerateChart() {
    Converter();
    DataFilterType();
  }

  return (
    <div className="container">
      <h1>Gustavo Silva's Challenge</h1>
      <TextArea value={valor} onChange={(e) => setText(e.target.value)} />
      <ResponsiveContainer>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="name" type="number" />
          <YAxis dataKey="name" />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip />

          {data.map((val) => (
            <Line
              dataKey="value"
              data={val.valor}
              name={val.name}
              key={val.name}
            />
          ))}

          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ right: -80 }}
          />
        </LineChart>
      </ResponsiveContainer>
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
