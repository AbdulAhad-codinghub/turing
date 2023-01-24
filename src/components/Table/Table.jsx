import axios from "axios";
import React, { useState, useEffect } from "react";
import { useGetCallsQuery } from "../../redux/Api";
import "./Table.css";

export const Table = () => {
  //   const [tableData, setTableData] = useState([]);
  //   const [page, setPage] = useState(0);
  //   const limit = 10;
  const { data, isLoading, error } = useGetCallsQuery();
  const mydata = data?.nodes;
  const [dataa, setData] = useState(data?.nodes);

  useEffect(() => {
    console.log(mydata);
    setData(data?.nodes);
    const getToken = async () => {
      let ttt = await axios.post(
        "https://frontend-test-api.aircall.io/auth/login",
        {
          username: "String!",
          password: "String!",
        }
      );

      localStorage.setItem("access_token", `Bearer ${ttt.data.access_token}`);
    };
    // console.log("hello", localStorage.getItem("access_token"));
    const interval = setInterval(() => {
      getToken();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setData(data?.nodes);
  }, [data]);

  const handleChange = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "all") {
      const newData = data.nodes;
      setData(newData);
    }
    if (filterValue === "archive") {
      const newData = data.nodes.filter((item) => item.is_archived === true);
      setData(newData);
    }
    if (filterValue === "unarchive") {
      const newData = data.nodes.filter((item) => item.is_archived === false);
      setData(newData);
    }
  };

  if (isLoading) return <p>loadinggg..................</p>;

  if (error) {
    return <p>erorrrrrrrrrrr...............</p>;
  }
  return (
    data && (
      <>
        <div className="filter">
          Filter by:{" "}
          <select onChange={handleChange}>
            <option value="all">All</option>
            <option value="archive">Archive</option>
            <option value="unarchive">Unarchive</option>
          </select>
        </div>
        <div className="table">
          <table className="detailsTable">
            <thead align="left">
              <tr>
                <th>Call Type</th>
                <th>Direction</th>
                <th>Duration</th>
                <th>From</th>
                <th>To</th>
                <th>Via</th>
                <th>Created at</th>
                <th>status</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody align="left">
              {dataa?.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td
                        className={
                          item.call_type.toLowerCase() === "missed"
                            ? "clrRed"
                            : "clrPrpl"
                        }
                      >
                        {item.call_type}
                      </td>
                      <td className="clrPrpl">{item.direction}</td>
                      <td>
                        <div>
                          <p>{item.duration}</p>
                          <p className="clrPrpl seconds">({item.duration})</p>
                        </div>
                      </td>
                      <td>{item.from}</td>
                      <td>{item.to}</td>
                      <td>{item.via}</td>
                      <td>{new Date(item.created_at).toLocaleString()}</td>

                      <td>
                        {item.is_archived === true ? (
                          <div className="archieveBtn">Archieved</div>
                        ) : (
                          <div className="unarchieveBtn">Unrchieved</div>
                        )}
                      </td>
                      <td>
                        <div className="addNoteBtn">Add Note</div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    )
  );
};
