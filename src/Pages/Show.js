import { useParams, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';

export default function Show (props){
    const [updateForm, setUpdateForm] = useState({
        name: "",
        title: "",
        image: "" 
    })



    const { id } = useParams();
    const navigate = useNavigate();
    // const person = props.people.find(p => p._id === id);
    // console.log(person);
    const person = props.people ? props.people.find(p => p._id === id) : null

    const handleDelete = () => {
        // delete person
        // redirect to index : Programmatic navigation => 
        props.deletePeople(id);
        navigate('/');
    };

    const handleChange =  (e) => {
        setUpdateForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        props.updatePeople(id, updateForm);
    };

    useEffect(() => {
        if(person) {
        setUpdateForm(person)}
    }, [props.people]);

    const loading = () => {<h1>Loading data...</h1>};
    const loaded = () => {
        return(
            <>
            
            <h1>{person.name}</h1>
            <h2>{person.title}</h2>
            <img src={person.image} alt={person.name} className="person-image" />

            </>
        )
    }
    return(
        <div className="person">
            {/* <h1>{person.name}</h1>
            <h2>{person.title}</h2>
            <img src={person.image} alt={person.name} className="person-image" /> */}
            {person ? loaded() : loading()}

            <button onClick={handleDelete}>Delete This Person</button>

            <form onSubmit={handleUpdate}>
                <input type="text" name="name"  value={updateForm.name} onChange={handleChange} placeholder="Name"/>
                <input type="text" name="title" value={updateForm.title} onChange={handleChange} placeholder="Title"/>
                <input type="text" name="image" value={updateForm.image} onChange={handleChange} placeholder="Image"/>
                <input type="submit" value="Update" />
            </form>
        </div>
    )
}