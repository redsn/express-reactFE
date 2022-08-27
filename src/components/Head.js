import { Helmet } from "react-helmet";

const Head = (props) => {
    return(
        <Helmet>
            <title> {props.title} | People App</title>
        </Helmet>
    )
}

export default Head;