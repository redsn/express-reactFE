import { useParams, useNavigate } from 'react-router-dom';

export default function Show (props){
    const { id } = useParams();
    const navigate = useNavigate();
    const person = props.people.find(p => p._id === id);
    // console.log(person);

    const handleDelete = () => {
        // delete person
        // redirect to index : Programmatic navigation => 
        props.deletePeople(id);
        navigate('/');

    }
    return(
        <div className="person">
            <h1>{person.name}</h1>
            <h2>{person.title}</h2>
            <img src={person.image} alt={person.name} className="person-image" />

            <button onClick={handleDelete}>Delete This Person</button>
        </div>
    )
}