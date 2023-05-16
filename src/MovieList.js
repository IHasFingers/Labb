import React, { useState, useRef } from 'react';
import Movie from './Movie';
 
export default function MovieList() {
    const [movies, setMovies] = useState([
        { // standard item in the list to test that there is something showing on the site
            id: 1,
            title: "First Movie",
            grade: 5
        }
    ]);

    const inputRef = useRef();
    const gradeRef = useRef();

    function addItem() { // main function to add movies to the list
        if (!inputRef.current.value || !gradeRef.current.value) {
            alert("Var god fyll i båda fälten innan du sparar!"); // prompts when there is nothing in one or both of the fields
            return;
          }
        const newId = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1; // gives an item an id based on the previous id, if there is none the item gets id 1

        setMovies([
            ...movies,
            {
                id: newId,
                title: inputRef.current.value,
                grade: gradeRef.current.value // sets the values based on the input and saves them
            }
        ]);

        inputRef.current.value = ""; // Reset input field
        gradeRef.current.value = ""; // Reset selected grade
    }
    // function that delets a movie when you click the cross image
    function deleteItem(id) {
        setMovies(movies.filter((item) => item.id !== id));
    }
    // function that sorts alphabetically 
    function sortAlphabetically() {
        const sortedMovies = [...movies].sort((a, b) =>
            a.title.localeCompare(b.title)
        );
        setMovies(sortedMovies);
    }
    // function that sorts movies based on grade by comparing
    function sortByGrade() {
        const sortedMovies = [...movies].sort((a, b) => b.grade - a.grade);
        setMovies(sortedMovies);
    }
    // returns what is shown on the site through app.js
    return (
        <div>
            <label htmlFor="title">Titel:</label>
            <input className="form-control" placeholder="Lägg till film" id="title" ref={inputRef} />

            <label htmlFor="grade">Grade:</label>
            <select id="grade" className="form-control" ref={gradeRef}>
                <option value="">Välj betyg här...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            
            <button onClick={addItem} type="button" className="btn btn-success" style={{marginTop: 5}}>Spara film</button>

            <ul className="list-group">
                {movies.map(movie => <Movie key={movie.id} item={movie} deleteItem={deleteItem} />)}
            </ul> 
            <button onClick={sortAlphabetically} type="button" className='btn btn-primary' id="alphabetical">Alfabetisk ordning</button><button onClick={sortByGrade} type="button" className='btn btn-primary' style={{ margin: 15 }} id="grades">Betygsordning</button>
        </div>
    );
}
