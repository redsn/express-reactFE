import { Routes, Route } from "react-router-dom";
import {useState, useEffect } from 'react';
import Index from  "../Pages/Index";
import Show from "../Pages/Show";


export default function Main (props) {
    const [people, setPeople] = useState(null);

    const API_URL = "http://localhost:4000/api/people"

    const getPeople  = async () => {

        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            console.log(data);
            setPeople(data);
        } catch (error) { 
            //TODO: add catch error
            // console.log(error);
            
        }
    }

    useEffect(() => {
        getPeople();
    }, [])

    const createPeople = async (person) => { // {name: 'Mary', title:'Scientist', image:'URL'}
        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(person),
            })
            getPeople(); // update our state with the updated array of objects. For reloading on index. 
        } catch (error) {
            console.log(error)
        }
    }

    const deletePeople = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            getPeople();
        } catch (error) {
            
        }
    }

    return(
        <>
        <main>
            <Routes>
                <Route path="/"  element={<Index people={people} createPeople={createPeople} />}/>

                <Route 
                path="/people/:id" 
                element={<Show 
                            people={people} deletePeople={deletePeople} />} />
            </Routes>
        </main>
        </>
    )
}