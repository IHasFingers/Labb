import React, { useState, useRef } from 'react';
import Movie from './Movie';
 
export default function MovieList() {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "First Movie",
            grade: 5
        }
    ]);

    const inputRef = useRef();
    const gradeRef = useRef();

    function addItem() {
        if (!inputRef.current.value || !gradeRef.current.value) {
            alert("Var god fyll i båda fälten innan du sparar!");
            return;
          }
        const newId = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;

        setMovies([
            ...movies,
            {
                id: newId,
                title: inputRef.current.value,
                grade: gradeRef.current.value
            }
        ]);

        inputRef.current.value = "";
        gradeRef.current.value = ""; // Reset selected grade
    }

    function deleteItem(id) {
        setMovies(movies.filter((item) => item.id !== id));
    }

    function sortAlphabetically() {
        const sortedMovies = [...movies].sort((a, b) =>
            a.title.localeCompare(b.title)
        );
        setMovies(sortedMovies);
    }

    function sortByGrade() {
        const sortedMovies = [...movies].sort((a, b) => b.grade - a.grade);
        setMovies(sortedMovies);
    }

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
