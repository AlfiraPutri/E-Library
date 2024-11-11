import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import { VisitorsBlockWrap } from "./Visitors.styles";

const VisitorsBlock = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch the user data per month from the API
    const fetchUsersByMonth = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/user');
          const users = response.data;

          // Inisialisasi data untuk 12 bulan dengan nilai awal 0
        const initialUsersPerMonth = Array(12).fill(0);

        // Mengelompokkan pengguna berdasarkan bulan
        users.forEach(user => {
          const month = new Date(user.created_at).getMonth(); // Ambil bulan dari tanggal pembuatan
          initialUsersPerMonth[month] += 1; // Tambah jumlah pengguna di bulan tersebut
        });

        // Format data menjadi array untuk chart
        const formattedData = initialUsersPerMonth.map((count, index) => ({
          month: new Date(0, index).toLocaleString('default', { month: 'short' }),
          user: count
        }));

        setUserData(formattedData); // Set data ke state untuk chart
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsersByMonth();
  }, []);

  return (
    <VisitorsBlockWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>Jumlah User per Bulan</h3>
        </BlockTitle>
      </div>
      <BlockContentWrap className="line-chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={userData}
            margin={{
              top: 10,
              right: 5,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="#f8f8f9" vertical={false} />
            <XAxis
              dataKey="month"
              tickSize={0}
              axisLine={false}
              tickMargin={15}
              tick={{
                fill: "#7B91B0",
                fontSize: 14,
              }}
            />
            <YAxis
              tickSize={0}
              axisLine={false}
              tick={{
                fill: "#7B91B0",
                fontSize: 14,
              }}
            />
            <Tooltip />
            <Legend iconType="square" />
            <Line
              type="monotone"
              dataKey="user"  
              stroke="#F9A01B"
              strokeWidth={4}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </BlockContentWrap>
    </VisitorsBlockWrap>
  );
};

export default VisitorsBlock;
