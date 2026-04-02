import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Product.css";

function ProductCard({ product, addToCart }) {
    const [quantity, setQuantity] = useState(1);

    const renderSingleStar = (rating) => {
        return (
            <div className="single-star-rating">
                <span className="star-icon">⭐</span>
                <span className="rating-val">{rating || 0} / 5</span>
            </div>
        );
    };

    return (
        <div className="product-card-product">
            <Link to={`/product/${product._id || product.id}`} className="product-card-link">
                <div className="product-img-wrapper">
                    <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
            </Link>

            <div className="amazon-rating-v2">
                {renderSingleStar(product.rating)}
                <span className="review-count">({product.reviews?.length || 0} reviews)</span>
            </div>

            <p className="price-product">₹{product.price}</p>

            <div className="action-row-compact">
                <div className="qty-control-inline">
                    <button className="qty-btn-mini" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                    <span className="qty-val">{quantity}</span>
                    <button className="qty-btn-mini" onClick={() => setQuantity(q => q + 1)}>+</button>
                </div>
                
                <button
                    className="cart-btn-mini"
                    onClick={() => addToCart(product, quantity)}
                >
                    Add
                </button>
            </div>
        </div>
    );
}

function Products({ cart, setCart }) {

    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const username = localStorage.getItem("username");
    const cartCount = cart.length;

    useEffect(() => {
        fetch('/api/products/' + category)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, [category]);

    function addToCart(product, quantity = 1) {
        // Create an array of the same product repeated 'quantity' times
        const itemsToAdd = Array(quantity).fill(product);
        setCart([...cart, ...itemsToAdd]);
        alert(`${quantity} ${product.name} Added To Cart! 🌸`);
    }

    const filteredProducts =
        category === "all"
            ? products
            : products.filter((p) => p.category === category);

    return (

        <div className="container-products">

            <header className="nav-bar">

                <div className="logo">🌷 Rosette</div>

                <div className="nav-center">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About Us</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                </div>

                <div className="nav-right">

                    {username && (
                        <>
                            <Link to="/orders" className="nav-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                            </Link>
                            <Link to="/cart" className="nav-icon cart-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
                            </Link>
                        </>
                    )}

                </div>

            </header>

            <div className="category-nav-product">

                <Link to="/" className="pervious-btn">⬅ Previous</Link>

                <Link to="/products/all">All Products</Link>
                <Link to="/products/accessories">Accessories</Link>
                <Link to="/products/bouquets">Bouquets</Link>
                <Link to="/products/keychains">Keychains</Link>


                <Link to="/cart" className="next-btn">Next ➡</Link>
            </div>




            <h1 className="page-title-product">
                {category === "all" ? "All Products" : category.toUpperCase()}
            </h1>




            <div className="product-grid-product">

                {filteredProducts.map((product) => (
                    <ProductCard 
                        key={product._id || product.id} 
                        product={product} 
                        addToCart={addToCart} 
                    />
                ))}

            </div>

        </div>
    );
}

export default Products;