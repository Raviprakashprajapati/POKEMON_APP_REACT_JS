import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Pokemon from "./Pokemon";


function PokemonList() {
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const [pokemonUrl, setPokemonUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [randomNumber, setRandomNumber] = useState(1);
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
    // let url = randomNumber>1?`https://pokeapi.co/api/v2/pokemon?offset=${randomNumber}&limit=20`:pokemonUrl
    fetch(pokemonUrl)
      .then((response) => response.json())
      .then((value) => {
        setNextUrl(value.next);
        setPrevUrl(value.previous);
        console.log("url = ",pokemonUrl)
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





  const handleRandom = () => {
    const min = 5;
    const max = 1150;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(randomNum);
    // console.log(randomNumber)
    setPokemonUrl(`https://pokeapi.co/api/v2/pokemon?offset=${randomNumber}&limit=20`)
    



  };






  return (
    <div>
      {/* <h4 className="text-center">Pokemon List</h4> */}
    
    

      {/* pagination */}
      <div className="container mb-4 d-flex justify-content-center  ">
        <button
          className="btn  btn-warning"
          disabled={prevUrl === null}
          onClick={() => setPokemonUrl(prevUrl)}
        >
          Prev
        </button>

        <button
          style={{ marginLeft: "5px" }}
          className=" btn btn-danger"
          disabled={nextUrl === null}
          onClick={handleRandom}   
        >
          Random
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

      {/* <div className="d-flex justify-content-center mt-3 mb-3 " >
    <button className="btn btn-danger  " onClick={handleRandom}    >Random Pokemon</button>
    </div> */}


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
