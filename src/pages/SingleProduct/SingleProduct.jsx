import { API_URL } from "../../loader";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../SingleProduct/SingleProduct.css"

export const SingleProduct = () => {
    const { id } = useParams()
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const calculateDiscount = () => {
        const productPrice = parseFloat(data.price)
        const discountPercentage = parseFloat(data.discountPercentage)
        const discount = (productPrice * discountPercentage) / 100
        const priceWithDiscount = productPrice - discount
        return priceWithDiscount.toFixed(2)
    }

    useEffect(() => {
        const fetchSingleProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/${id}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
            }
        };
        fetchSingleProduct();
    }, [id]);

    if (!data) return (<h1>Loading...</h1>)
    if (error) return (<h1>Error occured: {error}</h1>)
    return (
        <div className="single-product-container">
            <div>
                <Link to={"/"}>
                    <img src={'https://img.icons8.com/ios-filled/50/FFFFFF/left.png'} alt={data.title} className="back-button"></img>
                </Link>
            </div>
            {error ? <p className="error-message">{error}</p> : null}
            <div className="single-product-image-container">
                {data.images && data.images.length > 0 ? 
                (<img className="single-product-image" src={data.images[0]} alt={data.title} />) 
                :
                (<p>404. Image Not Found</p>)}
            </div>
            <div className="single-product-description-container" key={data.id}>
                <h1>{data.title}</h1>
                <div className="single-product-price-container">
                    <p className="single-product-price"
                    style={{"color":"gray"}}>
                        <strike>${data.price}</strike>
                    </p>
                    <p className="single-product-price" 
                    style={{"color":"yellow"}}>
                        ${calculateDiscount()} {/* ProductPrice - Discount = PriceWithDiscount*/}
                    </p>
                </div>
                <p className="single-product-category">{data.category.toUpperCase()}</p>
                <p className="single-product-description">{data.description}</p>
                <button className="single-product-button">ORDER NOW!</button>
            </div>
        </div>
    )
}