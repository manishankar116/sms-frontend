import React, {createContext, useState, useEffect} from "react";


export const DataContext = createContext();

export const DataProvider = ({children}) => {
  const [data, setData] = useState(null);

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZWFjaGVyMSIsImlhdCI6MTc3MzA3Nzc1NCwiZXhwIjoxNzczMTY0MTU0fQ.q17e1aZ9F7_pcE3jgCNkgPag6AMIo4foDloDlyPZwlw";

  useEffect(() => {
    fetch("http://10.0.2.2:8080/api/parent/1/child-overview", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        setData(json);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};