import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [characterCount, setCharacterCount] = useState();
  const [characters, setCharacters] = useState([]);

  const api = "https://rickandmortyapi.com/api/character";

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setCharacterCount(data.info.count);
        setCharacters(data.results);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCharacter();
  }, []);

  console.log("Characters", characters);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Rick and Morty</h1>
      <h1>Total Character : {characterCount}</h1>
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {characters.map((character) => (
          <div key={character.id} style={{ margin: "10px" }}>
            <img
              style={{ borderRadius: "10px" }}
              src={character.image}
              alt={character.name}
            />
            <h2>{character.name}</h2>
            <h3>
              {character.gender}{" "}
              <span
                style={{
                  marginLeft: "5px",
                  marginRight: "5px",
                  backgroundColor:
                    character.status == "Alive" ? "green" : "red",
                  color: "white",
                  padding: "4px 10px",
                  fontSize: "15px",
                  borderRadius: "10px",
                }}
              >
                {character.status}
              </span>
              <span>{character.species}</span>
            </h3>
          </div>
        ))}
      </section>
    </div>
  );
}
