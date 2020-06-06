import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown.jsx";
import Results from "./Results.jsx";
import ThemeContext from "./ThemeContext.jsx";

const SearchParams = () => {
    const [location, setLocation] = useState("Seattle, WA");
    const [breeds, setBreeds] = useState([]);
    const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
    const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
    const [pets, setPets] = useState([]);
    const [theme, setTheme] = useContext(ThemeContext);

    async function requestPets() {
        const { animals } = await pet.animals({
            location,
            breed,
            type: animal,
        });

        setPets(animals || []);
    }

    useEffect(() => {
        setBreeds([]);
        setBreed("");

        pet.breeds(animal).then(({ breeds: apiBreeds }) => {
            const breedStrings = apiBreeds.map(({ name }) => name);
            setBreeds(breedStrings);
        }, console.error);
    }, [animal, setBreeds, setBreed]);

    return (
        <div className="search-params">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    requestPets();
                }}
            >
                <label htmlFor="location">
                    Location
                    <input
                        id="location"
                        value={location}
                        placeholder="Location"
                        onChange={(e) => setLocation(e.target.value)}
                    ></input>
                </label>
                <AnimalDropdown />
                <BreedDropdown />
                <label htmlFor="theme">
                    Theme
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        onBlur={(e) => setTheme(e.target.value)}
                    >
                        <option value="peru">Peru</option>
                        <option value="darkblue">Darkblue</option>
                        <option value="mediumorchid">Mediumorchid</option>
                        <option value="chartreuse">Chartreuse</option>
                    </select>
                </label>
                <button style={{ backgroundColor: theme }}>Submit</button>
            </form>
            <Results pets={pets}></Results>
        </div>
    );
};

export default SearchParams;
