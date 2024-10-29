import { useEffect, useState } from "react";
import "../Home/Home.css";
import { API_URL } from "../../loader";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Filter } from "../../components/Filter/Filter";
import { calculateDiscount } from '../../utils/calculateDiscount';

export const Home = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [minPrice, setMinPrice] = useState(-Infinity);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [sortOrder, setSortOrder] = useState("lowToHigh");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(API_URL);
                const products = response.data.products;
                setData(products);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
            }
        };
        fetchProducts();
    }, []);

    const handleCategoryChange = (event) => setSelectedCategory(event.target.value);
    const handleMinPriceChange = (event) => setMinPrice(event.target.value === "" ? -Infinity : Number(event.target.value));
    const handleMaxPriceChange = (event) => setMaxPrice(event.target.value === "" ? Infinity : Number(event.target.value));
    const handleSortOrderChange = (event) => setSortOrder(event.target.value);

    const filteredData = data
        .filter((item) => {
            const isCategoryMatch = selectedCategory ? item.category === selectedCategory : true;
            const isMinPriceMatch = item.price >= minPrice;
            const isMaxPriceMatch = item.price <= maxPrice;
            return isCategoryMatch && isMinPriceMatch && isMaxPriceMatch;
        })
        .sort((firstItem, secondItem) => sortOrder === "lowToHigh" ? firstItem.price - secondItem.price : secondItem.price - firstItem.price);

    if (error) return <h1>Error occurred: {error}</h1>;

    return (
        <>
            <Filter
                categories={[...new Set(data.map((item) => item.category))]}
                selectedCategory={selectedCategory}
                minPrice={minPrice}
                maxPrice={maxPrice}
                sortOrder={sortOrder}
                handleCategoryChange={handleCategoryChange}
                handleMinPriceChange={handleMinPriceChange}
                handleMaxPriceChange={handleMaxPriceChange}
                handleSortOrderChange={handleSortOrderChange}
            />
            <div className="home-container">
                {filteredData.map((item) => (
                    <div className="item-container" key={item.id}>
                        <div className="info-container">
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={`product/${item.id}`}>
                                <h1 className="product-title">{item.title}</h1>
                            </Link>
                            <div className="product-navigation-container">
                                <button className="product-button">Order</button>
                                <div>
                                    <p className="product-price"><strike><i>${item.price}</i></strike></p>
                                    <p style={{"color":"yellow"}}
                                    className="product-price">
                                        ${calculateDiscount(item.price, item.discountPercentage)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="product-image-container">
                            <Link to={`product/${item.id}`}>
                                <img className="product-image" src={item.images[0]} alt={item.title} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
