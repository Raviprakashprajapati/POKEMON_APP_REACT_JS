import React from "react";
import "../css/Loader.css";

function Loader() {
  return (
    <div className="container loader mt-5 ">
      <div className="row d-flex justify-content-center  ">
        <div className="col-auto">
          <div class="loader">
            <div data-glitch="Loading..." class="glitch">
              Loading...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
