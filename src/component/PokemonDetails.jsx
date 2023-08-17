import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function PokemonDetails({pokemonName}) {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
      dowloadDetails();
  }, []);


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
        });
  
      }
      else{
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((value) => {
          return value.json();
        })
        .then((value) => {
          console.log(value);
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
        });
      }
   
      
    } catch (error) {
      console.log("Something went wrong")
      
    }
 
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-5 mb-5  ">
      <h3
        className="text-center bg-warning p-3 text-dark fw-bolder"
        onClick={() => navigate("/")}
      >
        Pokemon details
      </h3>

      <div className="mt-5">
        <Card
          style={{ width: "18rem", border: "none" }}
          className="bg-dark text-white "
        >
          <div className="d-flex justify-content-evenly align-items-center  ">
            <Card.Img variant="top" src={pokemon.image1} />
          </div>

          <Card.Body>
            <div className="  p-2 text-center ">
              <Card.Title className=" fw-bolder fst-italic bg-white p-2 text-dark ">
                Name : {pokemon.name}
              </Card.Title>
              <Card.Title className=" fw-bold fst-italic bg-warning p-2 text-dark ">Weight : {pokemon.weight}</Card.Title>
              <Card.Title className=" fw-bold fst-italic bg-warning p-2 text-dark ">Height : {pokemon.height}</Card.Title>

              <div className="ability text-dark mt-3 bg-warning p-3" >
                <h3 className="fw-bold">Abilities</h3>
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
                <h3 className="fw-bolder" >Types</h3>
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
    </div>
  );
}

export default PokemonDetails;
