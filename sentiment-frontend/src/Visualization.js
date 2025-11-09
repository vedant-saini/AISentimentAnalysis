import React from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Visualization = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data to display. Upload a file to see the results.</p>;
  }

  // Process data for charts
  const sentimentCounts = data.reduce(
    (acc, item) => {
      acc[item.sentiment] += 1;
      return acc;
    },
    { positive: 0, negative: 0, neutral: 0 }
  );

  const pieData = Object.keys(sentimentCounts).map((key) => ({
    name: key,
    value: sentimentCounts[key],
  }));

  return (
    <div>
      <h2>Sentiment Analysis Results</h2>

      {/* Pie Chart */}
      <PieChart width={400} height={400}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={["#0088FE", "#FF8042", "#00C49F"][index]} />
          ))}
        </Pie>
      </PieChart>

      {/* Bar Chart */}
      <BarChart width={500} height={300} data={pieData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Visualization;
