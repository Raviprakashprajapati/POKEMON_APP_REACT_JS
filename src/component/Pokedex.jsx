import React from "react";
import Search from "./Search";
import PokemonList from "./PokemonList";

export default function Pokedex() {
  return (
    <div>
      <div className="border border-danger p-3 m-3 bg-danger" >
        <h1 className="text-center">Pokedex</h1>

        <Search />
      </div>

      <PokemonList />
    </div>
  );
}
