/* Conditional rendering using ternary expression */

import React, { useState, useEffect } from "react";

const IntervalExample = () => {
  //declare a new state variable, which we'll call "loading" and initial value of true
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((loading) => !loading);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <React.Fragment>
      {loading ? <div>loading...</div> : <div>Fetched data</div>}
    </React.Fragment>
  );
};

export default IntervalExample;
