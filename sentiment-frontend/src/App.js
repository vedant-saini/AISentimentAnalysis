import React, { useState } from "react";
import FileUpload from "./FileUpload"; // Make sure FileUpload is exported as default
import Visualization from "./Visualization"; // Make sure Visualization is exported as default

function App() {
  // State to store the analysis results
  const [data, setData] = useState([]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Sentiment Analysis Portal</h1>
      {/* File Upload Component */}
      <FileUpload setData={setData} />
      {/* Visualization Component */}
      <Visualization data={data} />
    </div>
  );
}

export default App;



