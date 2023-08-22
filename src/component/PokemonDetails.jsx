import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function PokemonDetails({pokemonName}) {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const navigate = useNavigate();
  const [otherUrl,setOtherUrl] = useState("")
  const [otherData,setOtherData ] = useState([])

  useEffect(() => {
      dowloadDetails();
      
  }, [id]);




  function dowloadDetails() {

    try {

 
    // if searcbar has pokemonname
    if(pokemonName){
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then((value) => {
          return value.json();
        })
        .then((value) => {
          console.log(value);
          let tyye = value.types[0].type.url
          setOtherUrl(tyye)
          console.log("If other id = ",tyye)

          setPokemon({
            name: value.name,
            image1: value.sprites.other.dream_world.front_default,
            image2: value.sprites.other.home.front_default,
            weight: value.weight,
            types1: value.types[0].type.name,
            types2: value.types.length == 2 ? value.types[1].type.name : "Null",
            height: value.height,
            ability1:value.abilities[0].ability.name,
            ability2:value.abilities.length==2?value.abilities[1].ability.name:"Null",
          
          });
          otherRelatedPokemon(tyye)
        });
  
      }
      else{
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((value) => {
          return value.json();
        })
        .then((value) => {
          console.log("pokemon details=", value);
          let tyye = value.types[0].type.url
          console.log("else other id = ",tyye)
          setOtherUrl(tyye)
          
          
      

          setPokemon({
            name: value.name,
            image1: value.sprites.other.dream_world.front_default,
            image2: value.sprites.other.home.front_default,
            weight: value.weight,
            types1: value.types[0].type.name,
            types2: value.types.length == 2 ? value.types[1].type.name : "Null",
            height: value.height,
            ability1:value.abilities[0].ability.name,
            ability2:value.abilities.length==2?value.abilities[1].ability.name:"Null"
          });

          otherRelatedPokemon(tyye)

        });
      }
   
      
    } catch (error) {
      console.log("Something went wrong")
      
    }
 
  }

  function otherRelatedPokemon(otherIdUrl){
   
    console.log("other id url = ",otherUrl)
    fetch(otherIdUrl)
    .then((value) => {
      return value.json();
    })
    .then((value)=>{
      console.log("other pokemon details=", value.pokemon);
      setOtherData(value.pokemon)

    })
     

  }

  function extractLastNumber(url) {
    const regex = /(\d+)(?!.*\d)/; // Match the last digits
    const match = url.match(regex);
    if (match) {
      return match[0];
    }
    return null; // No match found
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: Adds smooth scrolling effect
    });
  };

  
 
  
  
  
  
  

  

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-5 mb-5  ">
      <h3
        className="text-center bg-warning p-3 text-dark fw-bolder border rounded-5"
        onClick={() => navigate("/")}
      >
        Pokemon Details
      </h3>

      <div className="mt-5">
        <Card
          style={{ width: "18rem", border: "none" }}
          className="bg-dark text-white "
        >
          <div className="d-flex justify-content-evenly align-items-center  ">
            {pokemon.image1?<Card.Img variant="top" style={{width:"65%"}} 
            src={pokemon.image1}
            
            />
          :
          
          <p>😥Sorry No image 😔</p>}
          </div>

          <Card.Body>
            <div className="  p-2 text-center ">
              <Card.Title style={{fontSize:"18px"}} className=" fw-bolder fst-italic bg-white p-2 text-dark ">
                Name : {pokemon.name}
              </Card.Title>
              <Card.Title className=" fw-bold fst-italic bg-warning p-2 text-dark ">Weight : {pokemon.weight}</Card.Title>
              <Card.Title className=" fw-bold fst-italic bg-warning p-2 text-dark ">Height : {pokemon.height}</Card.Title>

              <div className="ability text-dark mt-3 bg-warning p-3" >
                <h4 className="fw-bold" style={{fontSize:"17px"}} >Abilities</h4>
                <div className="d-flex justify-content-evenly align-items-center ">
                  <button className="btn btn-dark " >{pokemon.ability1}</button>
                  <button className="btn btn-dark" >{pokemon.ability2}</button>
                </div>
              </div>


            </div>

            <br />
            <div
              style={{ fontFamily: "monospace" }}
              className="border border-warning p-2 text-center"
            >
              <div>
                <h4 className="fw-bolder" >Types</h4>
                <div className="d-flex justify-content-evenly align-items-center" >
                <span className="btn fw-bold btn-warning">
                  {pokemon.types1}
                </span>
                <span className="btn fw-bold btn-warning">
                  {pokemon.types2}
                </span>
                </div>
              </div>
              
              <Card.Img variant="top" src={pokemon.image2} />
            </div>

            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
      </div>


    {/* other related pokemon--- */}
      <h3 className="mt-4 text-center mb-4" >Recommended Pokemon </h3>
      <div className="container-fluid">
      <div className="row gap-1 d-flex justify-content-evenly" >
      {
      otherData.map((i,index)=>{
        return(
          <Link key={index} className="col-5 col-md-4 border rounded-3 border-danger bg-warning text-dark p-1   "  style={{textDecoration:"none"}} to={`/pokemon/${extractLastNumber(i.pokemon.url)}`} onClick={scrollToTop} >
     
           
            <h4  style={{fontSize:"17px"}} className="text-dark text-center" >{index++} -  {i.pokemon?.name}</h4>
         
       
            </Link>
        )
      })

    }
      </div>
   
      </div>


    </div>
  );
}

export default PokemonDetails;
