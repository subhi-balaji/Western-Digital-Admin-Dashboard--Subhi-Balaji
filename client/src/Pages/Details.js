import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "../Data/Context";
import { getPostByName } from "../Utils/API";
import "./Details.css";
import { findProcesses } from "../Utils/FindProcesses";

const Details = () => {
  // desctructure the id via the useParams hook provided by react router.
  const { id } = useParams();
  // grab necessary state for this component via useContext api.
  const { selected, setSelected } = useContext(Context);

  //on component mount & when ID is changed run this code to hit backend endpoints and set state relatively.
  useEffect(() => {
    const details = getPostByName(id).then((response) => {
      setSelected(response.data); //set selected computer to data returned by backend.
    });
  }, [id]);

  const [main, setMain] = useState([]);

  useEffect(() => {
    setMain(findProcesses(selected.map((item) => item)));
  }, [selected]);

  const history = useHistory();

  if (selected.length === 0) {
    history.push("/"); //error handling, if there's no processes running return the user to default page...
  }

  return (
    <div className="details_wrapper">
      <div className="details_container">
        <h1
          className="generic_title"
          style={{ marginBottom: "2rem", marginTop: "3rem" }}
        >
          {id}
        </h1>
        {/*items are the programs, and selected is the computer data given back from the above useEffect */}
        {main.length > 0 && (
          <>
            <h4 style={{ marginBottom: "1rem" }}>Main processes</h4>
            <div className="details_grid" style={{ marginBottom: "1rem" }}>
              {main.map((item, index) => (
                <div key={index} className="details_box">
                  <footer>
                    <p
                      style={{
                        textTransform: "uppercase",
                        fontSize: "0.77em",
                        fontWeight: "600",
                        letterSpacing: ".5px",
                        marginBottom: ".2rem",
                      }}
                    >
                      elapsed time:{" "}
                      <span style={{ marginRight: ".5rem" }}>
                        {item.elapsed_time} day(s)
                      </span>
                    </p>
                    <p
                      style={{
                        textTransform: "uppercase",
                        fontSize: "0.77em",
                        fontWeight: "600",
                        letterSpacing: ".5px",
                      }}
                    >
                      date started:{" "}
                      <span style={{ marginRight: ".5rem" }}>
                        {item.start_time.split(" ")[0].replace(/-/g, "/")} {item.start_time.split(" ")[1]}
                      </span>
                    </p>
                  </footer>
                  <h1>{item.name}</h1>
                  <main>
                    <p
                      style={{
                        textTransform: "uppercase",
                        fontSize: "0.77em",
                        fontWeight: "600",
                        letterSpacing: ".5px",
                        marginBottom: ".2rem",
                      }}
                    >
                      Disk:
                    </p>
                    <ul>
                      <li>Read: {item.disk_bytes_read}</li>
                      <li>Written: {item.disk_bytes_written}</li>
                    </ul>
                  </main>
                </div>
              ))}
            </div>
          </>
        )}

        <h4 style={{ marginBottom: "1rem" }}>All processes</h4>

        <div className="details_grid" style={{ marginBottom: "1rem" }}>
          {selected.map((item, index) => (
            <div key={index} className="details_box">
              <footer>
                <p
                  style={{
                    textTransform: "uppercase",
                    fontSize: "0.77em",
                    fontWeight: "600",
                    letterSpacing: ".5px",
                    marginBottom: ".2rem",
                  }}
                >
                  elapsed time:{" "}
                  <span style={{ marginRight: ".5rem" }}>
                    {item.elapsed_time} day(s)
                  </span>
                </p>
                <p
                  style={{
                    textTransform: "uppercase",
                    fontSize: "0.77em",
                    fontWeight: "600",
                    letterSpacing: ".5px",
                  }}
                >
                  date started:{" "}
                  <span style={{ marginRight: ".5rem" }}>
                    {item.start_time.split(" ")[0].replace(/-/g, "/")} {item.start_time.split(" ")[1]}
                  </span>
                </p>
              </footer>
              <h1>{item.name}</h1>
              <main>
                <p
                  style={{
                    textTransform: "uppercase",
                    fontSize: "0.77em",
                    fontWeight: "600",
                    letterSpacing: ".5px",
                    marginBottom: ".2rem"
                  }}
                >
                  Disk:
                </p>
                <ul>
                  <li>Read: {item.disk_bytes_read}</li>
                  <li>Written: {item.disk_bytes_written}</li>
                </ul>
              </main>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
