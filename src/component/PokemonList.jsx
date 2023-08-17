import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Pokemon from "./Pokemon";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function PokemonList() {
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const [pokemonUrl, setPokemonUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  // searching

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      pokemonApi();
    }, 500); // Display loader for 3 seconds
  }, [pokemonUrl]);

  // extrat name and their url
  function pokemonApi() {
    setLoading(true);
    fetch(pokemonUrl)
      .then((response) => response.json())
      .then((value) => {
        setNextUrl(value.next);
        setPrevUrl(value.previous);
        console.log(value);
        const valueResult = value.results;

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

    setLoading(false);
  }

  // devcie and lapotp size
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
    <div>
      <h4 className="text-center">Pokemon List</h4>

      {/* pagination */}
      <div className="container d-flex justify-content-center  ">
        <button
          className="btn  btn-warning"
          disabled={prevUrl === null}
          onClick={() => setPokemonUrl(prevUrl)}
        >
          Prev
        </button>

        <button
          style={{ marginLeft: "5px" }}
          className=" btn btn-warning"
          disabled={nextUrl === null}
          onClick={() => setPokemonUrl(nextUrl)}
        >
          Next
        </button>
      </div>


      {/* pokemon */}
      <div className={isWideScreen ? 'container' : 'container-fluid'}>
        <div className="row d-flex justify-content-center align-items-center ">
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
                id={i.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonList;
