import React from "react";
import "./Computer.css";
import { useHistory } from "react-router-dom";

export const Computer = ({ computer, number }) => {
  const history = useHistory();
  const handleSelect = (name) => history.push(`/computer/${name}`);
  return (
    <>
      <div
        className="comp_container"
        onClick={() => handleSelect(computer.host_hostname)}
      >
        <div> 
          <h1>
            <span className="owa">{number + 1}:</span> {computer.computer_name}
          </h1>
        </div>
        <div className="comp_container__cpu">
          <h3>{computer.cpu_brand}</h3>
          <footer>
            <p>
              CPU Type: <span>{computer.cpu_type}</span>
            </p>
            <p>
              Logical Cores: <span>{computer.cpu_logical_cores}</span>
            </p>

            <p>
              Physical Cores: <span>{computer.cpu_physical_cores}</span>
            </p>
          </footer>
        </div>
        <div className="comp_container__model">
          {computer.hardware_vendor.replace(/[.,\s]/g, "")} -{" "}
          {computer.hardware_model}
        </div>
      </div>
    </>
  );
};
