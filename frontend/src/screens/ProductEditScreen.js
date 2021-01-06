// DESC: This is the Product Edit Screen
import React, {useState, useEffect} from "react";
import axios from "axios"; // axios is needed for upload request
import {Link} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {listProductDetails, updateProduct} from "../actions/productActions";
import {PRODUCT_UPDATE_RESET} from "../constants/productConstants";

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id ;

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");
    // uploading state
    const [uploading, setUploading] = useState(false);


    const dispatch = useDispatch();
    
    const productDetails = useSelector((state)=> state.productDetails);
    const {loading, error, product} = productDetails; 

    const productUpdate = useSelector((state)=> state.productUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success:successUpdate} = productUpdate; 

    
    useEffect(()=>{
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET});
            history.push("/admin/productlist") ;
        }else{
            if(!product.name || product._id !== productId){
              dispatch(listProductDetails(productId));
            }else{
                setName(product.name);
                setBrand(product.brand);
                setPrice(product.price);
                setImage(product.image);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
                
            }
        }
    }, [product, dispatch, productId, history, successUpdate]);

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0] ; // As we are uploading a single file
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);
        try {
            const config = {
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            }
            const {data} = await axios.post("/api/upload", formData, config) ;
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);

        }

    }

    const submitHandler = (e) =>{
        // so that page doesnt refresh
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            brand,
            image,
            category,
            countInStock,
            description
        }));
        }   
    
    return (
        <>
            <Link className="btn btn-dark my-3 rounded" to="/admin/productlist"> &lt; Go Back </Link>
            <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {loading ? <Loader />:error ? <Message variant="danger">{error}</Message>:(
                <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control type="number" placeholder="Enter Price" value={price} onChange={(e)=> setPrice(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Image URL" value={image} onChange={(e)=> setImage(e.target.value)}></Form.Control>
                    <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler}>{uploading && <Loader />}</Form.File>
                </Form.Group>
                <Form.Group controlId="brand">
                    <Form.Label>Brand:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Brand" value={brand} onChange={(e)=> setBrand(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="countInStock">
                    <Form.Label>Count In Stock:</Form.Label>
                    <Form.Control type="number" placeholder="Enter Count In Stock" value={countInStock} onChange={(e)=> setCountInStock(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="category">
                    <Form.Label>Category:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Category" value={category} onChange={(e)=> setCategory(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter Description" value={description} onChange={(e)=> setDescription(e.target.value)}></Form.Control>
                </Form.Group>                      
                <Button type="submit" variant="primary">Update</Button>
            </Form>            
            )}
            </FormContainer>
        </>
        
    )
}

export default ProductEditScreen ;
