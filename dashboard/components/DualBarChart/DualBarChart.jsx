import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#0C3155",
          color: "#fff",
          padding: "11px 6px",
          borderRadius: "8px",
          fontSize: "8px",
          border: "1.6px solid #8A9FB3",
          fontWeight:500,
        }}
      >
        <p style={{ marginBottom: "9px", color:"#fff" }}>
          <span style={{ color: "#153F68" }}>●</span> {payload[0].value}<span style={{fontSize:"6px", fontWeight:400}}> (Patients)</span>
        </p>
        <p style={{ margin: 0, color:"#fff"  }}>
          <span style={{ color: "#6F94B4" }}>●</span> {payload[1].value}<span style={{fontSize:"6px", fontWeight:400}}> (Reports)</span>
        </p>
      </div>
    );
  }
  return null;
};

const DualBarChart = ({data}) => {
  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <BarChart data={data} barGap={10}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#475467", fontSize: 12 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#475467", fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
          <Bar
            dataKey="patients"
            fill="#153F68"
            radius={[12, 12, 12, 12]}
            barSize={25}
          />
          <Bar
            dataKey="reports"
            fill="#6F94B4"
            radius={[12, 12, 12, 12]}
            barSize={25}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DualBarChart;
