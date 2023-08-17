import React, { useState } from "react";

import PokemonList from "./PokemonList";
import Search from "./Search";
import PokemonDetails from "./PokemonDetails";

export default function Pokedex() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>

      <div className="border  text-dark border-warning p-3 m-3 bg-warning ">
        <h1 className="text-center fw-bolder ">Pokedex</h1>
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
