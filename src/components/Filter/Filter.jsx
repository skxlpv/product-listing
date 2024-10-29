import "../Filter/Filter.css";

export const Filter = ({
    categories,
    selectedCategory,
    minPrice,
    maxPrice,
    sortOrder,
    handleCategoryChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleSortOrderChange
}) => {
    return (
        <div className="filter-container">
            <h2 className="filter-title">Filter by:</h2>
            <select
                className="filter-button"
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                <option value="">Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <div className="filter-button">
                <label>Min Price:</label>
                <input
                    type="number"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                />
                <label>Max Price:</label>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                />
            </div>

            <select
                className="filter-button"
                value={sortOrder}
                onChange={handleSortOrderChange}
            >
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
            </select>
        </div>
    );
};
