import React, { useEffect, useState } from "react";

export const Statistics = () => {
  const [assignees, setAssignees] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const assignees = await fetch("http://localhost:3000/assignees", {
        method: "GET",
      });

      setAssignees(await assignees.json());
    };

    getData();
  }, []);
  console.log(assignees);
  return (
    <>
      <div>Here is statistcs</div>
    </>
  );
};
