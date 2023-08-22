import React, { useState } from "react";
import "../css/ButtonVideo.css"
import PokemonList from "./PokemonList";
import Search from "./Search";
import PokemonDetails from "./PokemonDetails";
import { useNavigate } from "react-router-dom";

export default function Pokedex() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div>

      <div className="border top-nav text-dark border-warning p-3 m-3 bg-warning  ">
        <div > 
        <h1 className="text-center fw-bolder bg-white p-2 border rounded-5" onClick={handleReload} >Pokedex</h1>
        </div>
      
        <Search updateSearchTerm={setSearchTerm} />
        <h1 className="text-center">{searchTerm}</h1>
      </div>

      {
        searchTerm.length==0 ?
        <PokemonList />
        :
        <PokemonDetails key={searchTerm} pokemonName={searchTerm} />

      }

    </div>
  );
}
