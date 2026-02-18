import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "3/2/2010", score: 45 },
  { date: "3/2/2010", score: 45 },
  { date: "3/2/2010", score: 100 },
  { date: "3/2/2010", score: 65 },
  { date: "3/2/2010", score: 100 },
  { date: "3/2/2010", score: 60 },
  { date: "3/2/2010", score: 60 },
  { date: "3/2/2010", score: 90 },
  { date: "3/2/2010", score: 90 },
  { date: "3/2/2010", score: 45 },
  { date: "3/2/2010", score: 120 },
];

const BehavioralRiskChart = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <ReferenceArea y1={0} y2={35} fill="#FFFBEA" />{" "}
          <ReferenceArea y1={35} y2={70} fill="#ffe1b2ff" />{" "}
          <ReferenceArea y1={70} y2={130} fill="#e59199ff" />{" "}
          <text x={100} y={230} fill="#14171F" fontSize={16} fontWeight="600">
            Low Risk
          </text>
          <text x={100} y={170} fill="#14171F" fontSize={16} fontWeight="600">
            Medium Risk
          </text>
          <text x={100} y={60} fill="#14171F" fontSize={16} fontWeight="600">
            High Risk
          </text>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9AA2B8" }} />

          <YAxis domain={[0, 130]} tick={{ fontSize: 10, fill: "#9AA2B8" }} />
          
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#5C5C5C"
            strokeWidth={2}
            dot={{ fill: "#fff", stroke: "#153f68", r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BehavioralRiskChart;
