import React, { useEffect, useRef, useState } from "react";
import "./TestingDashboard.css";
import { MdDownload } from "react-icons/md";
import { getDatabase, onValue, ref } from "firebase/database";
import { SoilApp } from "../Firebase/Firebase";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const db = getDatabase(SoilApp);
function TestingDashboard() {
  const pdfRef = useRef();
  const [dateFilter, setDateFilter] = useState("");
  const [parameter, setParameter] = useState("all");
  const [historicalData, setHistoricalData] = useState([]);

  const downloadData = () => {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a3", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    });
  };

  useEffect(() => {
    const dataRef = ref(db, "soil_samples");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const formattedData = Object.values(data).map((item) => ({
          ...item,
          date: item.date ?? item.Date ?? "NA",
          phosphorus: item.phosphorus ?? item.Phosphorus ?? "N/A",
        }));

        setHistoricalData(formattedData);
      }
    });
  }, []);

  const lastDateUpdate =
    historicalData.length > 0
      ? historicalData[historicalData.length - 1].date
      : null;

  const latestData =
    historicalData.length > 0
      ? historicalData[historicalData.length - 1]
      : null;

  const filteredData = historicalData
    .filter((row) => {
      if (!dateFilter) return true;

      return row.date === dateFilter.trim();
    })
    .filter((row) => {
      if (parameter === "all") return true;
      return row[parameter.toLowerCase()] !== undefined;
    });

  return (
    <div className="dashboard-container" ref={pdfRef}>
      <div className="header">
        <h2>Soil Testing Dashboard</h2>
      </div>

      {/* Current Data */}

      <div className="card">
        <div className="status-section">
          <span>
            🕒 Last Update:{" "}
            {lastDateUpdate ? lastDateUpdate : "No date available"}
          </span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Phosphorus (mg/kg)</th>
            </tr>
          </thead>

          <tbody>
            {latestData ? (
              <tr>
                <td>{latestData.phosphorus}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="5">No current data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Controls */}
      <div className="card controls">
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          placeholder="Filter by Date"
        />

        <select
          value={parameter}
          onChange={(e) => setParameter(e.target.value)}
        >
          <option value="all">All Parameter</option>
          <option value="phosphorus">Phosphorus</option>
        </select>
        <button onClick={downloadData}>
          Download{" "}
          <span>
            <MdDownload />
          </span>
        </button>
      </div>

      {/* Historical Data */}
      <div className="card">
        <h3>Historical Data</h3>

        {filteredData.length > 0 ? (
          <table className="historical-table">
            <thead>
              <tr>
                <th>Date</th>

                {parameter === "all" || parameter === "phosphorus" ? (
                  <th>Phosphorus (mg/kg)</th>
                ) : null}
              </tr>
            </thead>

            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  {parameter === "all" || parameter === "phosphorus" ? (
                    <td>{row.phosphorus}</td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">
            No data available for the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default TestingDashboard;
