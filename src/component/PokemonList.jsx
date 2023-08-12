import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Pokemon from "./Pokemon";

function PokemonList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      pokemonApi();
    }, 3000); // Display loader for 3 seconds
  }, []);

  // extrat name and their url
  function pokemonApi() {
    fetch(POKEMON_URL)
      .then((response) => response.json())
      .then((value) => {
        const valueResult = value.results;

        console.log(value);
        setData(value.results);
        pokemonApiList(valueResult);
      });
  }

  // extract the specifix pokemon list
  function pokemonApiList(url) {
    const fetchDataPromises = url.map((i) => {
      return fetch(i.url).then((response) => response.json());
    });

    Promise.all(fetchDataPromises)
      .then((values) => {
        setAllData(values);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
      });
  }

  return (
    <div>
      <h4 className="text-center">Pokemon List</h4>

      <div className="container d-flex justify-content-center  " >
        <button className="btn btn-warning" >Prev</button>
        <button className=" btn btn-warning" >Next</button>
      </div>

      <div className="container">
        <div className="row d-flex justify-content-evenly align-items-center">
        {loading ? (
        <Loader />
      ) : (
        allData.map((i, index) => (
          <Pokemon
            key={index}
            name={i.name}
            height={i.height}
            image1={i.sprites.other.dream_world.front_default}
            experience={i.base_experience}
            species={i.species.name}
          />
        ))
      )}

        </div>
      </div>

    </div>
  );
}

export default PokemonList;
