import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function Search() {
  return (
    <div className="container">
      <div className="search  ">
        <InputGroup size="sm" className="mb-3">
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="enter the pokemon"
          />
        </InputGroup>
      </div>
    </div>
  );
}

export default Search;
