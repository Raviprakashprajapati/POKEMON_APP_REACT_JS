import React from "react";
import "../css/Loader.css";

function Loader() {
  return (
    <div className="container loader "   >
      <div className="row">
        <div className="col-5">
          <div class="loader">
            <div class="cell d-0"></div>
            <div class="cell d-1"></div>
            <div class="cell d-2"></div>

            <div class="cell d-1"></div>
            <div class="cell d-2"></div>

            <div class="cell d-2"></div>
            <div class="cell d-3"></div>

            <div class="cell d-3"></div>
            <div class="cell d-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
