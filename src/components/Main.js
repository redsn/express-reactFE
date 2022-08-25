import { Routes, Route, Navigate } from "react-router-dom";
import {useState, useEffect } from 'react';
import Home from "../Pages/Home";
import Index from  "../Pages/Index";
import Show from "../Pages/Show";

const PrivateRoute = ({ children, user }) => {
    if(user){
        return children;
    }  else {
        return <Navigate to="/" />
    }
}


export default function Main (props) {
    const user = props.user;
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
        if(user){
            getPeople();
        } else {
            setPeople(null);
        }
    }, [  user ])

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

    const updatePeople = async (id, updatedPerson) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(updatedPerson)
            });
            getPeople();
        } catch (error) {
            
        }
    }

    return(
        <>
        <main>
            <Routes>
                <Route path="/" element={<Home/>} />

                <Route path="/people"  element={<PrivateRoute user={user}><Index people={people} createPeople={createPeople} /></PrivateRoute>}/>

                <Route 
                path="/people/:id" 
                element={
                    <PrivateRoute>
                            <Show 
                            people={people} 
                            deletePeople={deletePeople}
                            updatePeople={updatePeople}
                            />
                            </PrivateRoute>
                            } />
            </Routes>
        </main>
        </>
    )
}