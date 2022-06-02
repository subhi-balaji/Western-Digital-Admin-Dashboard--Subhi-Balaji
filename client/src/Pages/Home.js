import { useState, useEffect, useContext } from "react";
import { API, getPosts } from "../Utils/API";
import { Context, Provider } from "../Data/Context";
import { Computer } from "../Components/Computer.js";

export function Home() {
  // grab the neccessary state for this component via context api
  const { computers, setComputers, selected, setSelected } =
    useContext(Context);

  //hit backend endpoint and set computers state to returned object data.
  const getAllComputers = () => {
    getPosts.then((response) => {
      setComputers(response.data.data);
    });
  };

  useEffect(() => {
    getAllComputers();
  }, []); // on component load, run getAllComputers function

  return (
    <div className="App">
      <section className="comp_wrapper">
        <h3 className="generic_title">System Information</h3>
        {computers.map((c, i) => (
          // map through all computers state and render singular component for each computer with that data displayed.
          <Computer key={i} computer={c} number={i} />
        ))}
      </section>
    </div>
  );
}
