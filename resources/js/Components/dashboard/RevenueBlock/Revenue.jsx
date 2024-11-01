import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import { RevenueWrap } from "./Revenue.styles";

const Revenue = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/history");
        const history = response.data;

        // Initialize an object to store unique books read per month
        const booksPerMonth = {};

        history.forEach((entry) => {
            // Memastikan bahwa created_at dan id_buku ada
            if (entry.created_at && entry.id_buku) {
              const isoDate = entry.created_at.replace(" ", "T");
              const date = new Date(isoDate);

              if (!isNaN(date)) {
                const month = date.toLocaleString("default", { month: "long", year: "numeric" });

                if (!booksPerMonth[month]) {
                  booksPerMonth[month] = new Set();
                }

                booksPerMonth[month].add(entry.id_buku);
              } else {
                console.error(`Format tanggal tidak valid untuk entri: ${entry.created_at}`);
              }
            } else {
              console.warn("Melewati entri dengan field yang hilang:", entry);
            }
          });


        // Format data for the chart
        const formattedData = Object.keys(booksPerMonth).map((month) => ({
          month,
          jumlah: booksPerMonth[month].size,
        }));

        setHistoryData(formattedData);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchHistoryData();
  }, []);

  return (
    <RevenueWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>Buku Terbaca per Bulan</h3>
        </BlockTitle>
      </div>
      <BlockContentWrap className="bar-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={historyData}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid stroke="#f8f8f9" vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickSize={0}
              axisLine={false}
              tick={{ fill: "#7B91B0", fontSize: 12 }}
              tickMargin={8}
            />
            <YAxis
              tickCount={6}
              axisLine={false}
              tickSize={0}
              tick={{ fill: "#7B91B0", fontSize: 12 }}
            />
            <Tooltip formatter={(value) => `${value} buku`} />
            <Legend iconType="circle" iconSize={10} />
            <Bar
              dataKey="jumlah"
              name="Jumlah Buku Terbaca"
              fill="#00E096"
              radius={[4, 4, 0, 0]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </BlockContentWrap>
    </RevenueWrap>
  );
};

export default Revenue;
