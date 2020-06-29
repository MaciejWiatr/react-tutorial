import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import { connect } from "react-redux";
import useDropdown from "./useDropdown.jsx";
import Results from "./Results.jsx";
import changeTheme from "./actionCreators/changeTheme.js";
import changeLocation from "./actionCreators/changeLocation.js";

const SearchParams = (props) => {
    const [breeds, setBreeds] = useState([]);
    const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
    const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
    const [pets, setPets] = useState([]);

    async function requestPets() {
        const { animals } = await pet.animals({
            location: props.location,
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
                        value={props.location}
                        placeholder="Location"
                        onChange={(e) => props.updateLocation(e.target.value)}
                    ></input>
                </label>
                <AnimalDropdown />
                <BreedDropdown />
                <label htmlFor="theme">
                    Theme
                    <select
                        value={props.theme}
                        onChange={(e) => props.setTheme(e.target.value)}
                        onBlur={(e) => props.setTheme(e.target.value)}
                    >
                        <option value="peru">Peru</option>
                        <option value="darkblue">Darkblue</option>
                        <option value="mediumorchid">Mediumorchid</option>
                        <option value="chartreuse">Chartreuse</option>
                    </select>
                </label>
                <button style={{ backgroundColor: props.theme }}>Submit</button>
            </form>
            <Results pets={pets}></Results>
        </div>
    );
};

const mapStateToProps = ({ theme, location }) => ({
    theme,
    location,
});

const mapDispatchToProps = (dispatch) => ({
    setTheme: (theme) => dispatch(changeTheme(theme)),
    updateLocation: (location) => dispatch(changeLocation(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchParams);
