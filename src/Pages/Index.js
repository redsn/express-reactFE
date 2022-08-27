import {Link} from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Head from '../components/Head';

// for state, formValid = false; const isFormValid () {return newForm.name.length > 3 && newForm.title.length > 3}

// Then in form. invoke isFormValid() everytime state changes in handleChanges

export default function Index (props){
    // const test = props.people
    const [ newForm, setNewForm ] = useState({
        name: "",
        image: "",
        title: ""
    })
    const [formValid, setFormValid ] = useState(false);
    const isFormValid = () => {return (newForm.name.length >= 3 && newForm.title.length >= 3)}
    const loaded = () => {
        return props.people.map(({name, title, image, _id}) => {
            
            return(
                <div className="person" key={_id}>
                    <Link to={`/people/${_id}`}>
                        <h1>{name}</h1>
                    </Link>

                </div>
            )
        })
    };
    const loading = () => {
        return(<h1>Loading Data...</h1>)
    };

    // const handleChange = (e) => {
    //     const target = e.target.name
    //     // console.log(e.target.name)
    //     setNewForm({
    //         target: e.target.value
    //     })
    // };

    const handleChange = (e) => {
        setNewForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!isFormValid()) return
        // if(Object.values(newForm).length === 0) return;
        if(Object.values(newForm).indexOf('') === -1) return;
        props.createPeople(newForm);
    };

    const isFormValidRef = useRef(null);

    useEffect(()  => {
        isFormValidRef.current = isFormValid;
    })
    useEffect(() => {
        setFormValid(isFormValidRef.current())
    },[newForm])

    return (
    <>
    <Head title="index"/>
    <section>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={newForm.name} onChange={handleChange} name="name" placeholder="Name" />
                    <input type="text" value={newForm.title} onChange={handleChange} name="title" placeholder="Title of Person" />
                    <input type="text" value={newForm.image} onChange={handleChange} name="image" placeholder="Image  URL" />
                    <input disabled={!formValid} type="submit" value="Send" />
                </form>
            {props.people ? loaded() : loading()}
             </section>
             </>
             );
}