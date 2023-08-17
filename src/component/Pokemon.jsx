import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

// height , name,species.name,sprites.other.dream_world.font-default -home-official-artwork

function Pokemon({ name, height, experience, image1, species,id }) {


    // devcie and lapotp size u
    const [isWideScreen, setIsWideScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsWideScreen(window.innerWidth >= 768); // Adjust the breakpoint as needed
      };
  
      // Initial check and setup
      handleResize();
  
      // Add event listener for window resize
      window.addEventListener("resize", handleResize);
  
      // Clean up the event listener
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

  return (
    <>
   <div className={isWideScreen ? 'col-auto' : 'col-6'}>

   <Link to={`/pokemon/${id}`} style={{textDecoration:"none"}} >
    <Card  style={{ width: "10rem" }} className="mt-2 bg-warning-subtle ">
        <Card.Img variant="top" src={image1} />
        <Card.Body  style={{textDecoration:"none"}} >
          <Card.Title className=" fw-bolder"  >Name : {name}</Card.Title>
          <Card.Title style={{fontFamily:"monospace"}} >Height : {height}</Card.Title>
          <Card.Title style={{fontFamily:"monospace"}}>Experience : {experience}</Card.Title>
          
       
        </Card.Body>
      </Card>
      </Link>
   </div>
 
    </>
  );
}

export default Pokemon;
