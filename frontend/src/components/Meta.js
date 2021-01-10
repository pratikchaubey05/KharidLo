import React from "react" ;
import {Helmet} from "react-helmet" ;

const Meta = ({title, description, keywords}) => {
    return (
        <>
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}></meta>
            <meta name="keyword" content={keywords}></meta>
        </Helmet>   
        </>
    )
}

Meta.defaultProps = {
    title: "Welcome To KharidLo",
    keywords: "Electronics, lowest price electronics, buy electronics",
    description: "We sell quality products made locally"
}

export default Meta
