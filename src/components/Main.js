import { Routes, Route, Navigate } from "react-router-dom";
import {useState, useEffect, useRef } from 'react';
import Home from "../Pages/Home";
import Index from  "../Pages/Index";
import Show from "../Pages/Show";

const PrivateRoute = ({ children, user }) => {
    if(user){
        return children;
    }  else {
        console.log(user);
        return (<Navigate to="/" />
        )
    }
}


export default function Main (props) {
    const user = props.user;
    const [people, setPeople] = useState(null);

    const getPeopleRef = useRef(null)

    // const API_URL = "http://localhost:4000/api/people"
    const API_URL = "https://warm-mountain-87567.herokuapp.com/api/people"

    const getPeople  = async () => {

        try {
            const token = await props.user.getIdToken();
            // console.log(token);
            // const payload = token.split('.')[1]
            // JSON.parse(atob(payload))
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            const data = await response.json();
            console.log(data);
            setPeople(data);
        } catch (error) { 
            //TODO: add catch error
            // console.log(error);
            
        }
    }

    useEffect(()=>{
        getPeopleRef.current = getPeople;
    } )

    useEffect(() => {
        if(user){
            // getPeople();
            getPeopleRef.current();
        } else {
            setPeople(null);
        }
    }, [  user ])

    const createPeople = async (person) => { // {name: 'Mary', title:'Scientist', image:'URL'}
        try {
            const token = await user.getIdToken();
            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token
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
            const token = await user.getIdToken();
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
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

                <Route path="/people"  element={<PrivateRoute user={props.user}><Index people={people} createPeople={createPeople} /></PrivateRoute>}/>

                <Route 
                path="/people/:id" 
                element={
                    <PrivateRoute user={user}>
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