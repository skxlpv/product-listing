export const calculateDiscount = (price, discountPercentage) => {
    const discount = (price * discountPercentage) / 100;
    const priceWithDiscount = price - discount;
    return priceWithDiscount.toFixed(2);
};