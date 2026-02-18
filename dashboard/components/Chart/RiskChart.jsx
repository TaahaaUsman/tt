import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";

const data = [
  { date: "3/2/2010", score: 40 },
  { date: "3/2/2010", score: 45 },
  { date: "3/2/2010", score: 105 },
  { date: "3/2/2010", score: 70 },
  { date: "3/2/2010", score: 110 },
  { date: "3/2/2010", score: 60 },
  { date: "3/2/2010", score: 60 },
  { date: "3/2/2010", score: 90 },
  { date: "3/2/2010", score: 90 },
  { date: "3/2/2010", score: 50 },
  { date: "3/2/2010", score: 125 },
];

const BehaviorRiskChart = () => {
  return (
    <div className="p-4 rounded">
      <h5 className="fw-bold mb-3 ml-20">
        Your Behavior Risk Score Over Time
      </h5>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          
          {/* Low Risk Zone */}
          <ReferenceArea y1={0} y2={50} fill="#fffbe6" />

          {/* Medium Risk Zone */}
          <ReferenceArea y1={50} y2={90} fill="#f2c2c2" />

          {/* High Risk Zone */}
          <ReferenceArea y1={90} y2={140} fill="#FF7979" />

          <XAxis dataKey="date" />
          <YAxis domain={[0, 140]} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#444"
            strokeWidth={2}
            dot={{ fill: "white", stroke: "#444", strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BehaviorRiskChart;
