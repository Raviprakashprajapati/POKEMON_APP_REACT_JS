import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function Search({updateSearchTerm}) {


  return (
    <>
      {/* search bar */}
      <div className="d-flex justify-content-center ">
      <div className="search text-white w-70">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="search"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => updateSearchTerm(e.target.value)}
          />
          <InputGroup.Text id="basic-addon1">🔍</InputGroup.Text>
        </InputGroup>
      </div>
    </div>
   
    </>
  );
}

export default Search;
