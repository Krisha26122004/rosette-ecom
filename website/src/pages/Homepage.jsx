import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/HomePage.css";

function HomepageCard({ product, addToCart }) {
    const [quantity, setQuantity] = useState(1);

    const renderSingleStar = (rating) => {
        return (
            <div className="single-star-rating">
                <span className="star-icon-v2">⭐</span>
                <span className="rating-val-v2">{rating || 0} / 5</span>
            </div>
        );
    };

    return (
        <div className="product-card-premium">
            <Link to={`/product/${product._id || product.id}`} className="card-link-wrapper">
                <div className="card-img-container">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="card-details">
                    <h3>{product.name}</h3>
                    <div className="amazon-rating-h">
                        {renderSingleStar(product.rating)}
                        <span className="review-count-h">({product.reviews?.length || 0} reviews)</span>
                    </div>
                    <p className="price">₹{product.price}</p>
                </div>
            </Link>

            <div className="card-actions-compact">
                <div className="qty-row">
                    <button className="qty-btn-h" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                    <span className="qty-val-h">{quantity}</span>
                    <button className="qty-btn-h" onClick={() => setQuantity(q => q + 1)}>+</button>
                </div>
                <button
                    className="cart-btn-premium-h"
                    onClick={() => addToCart(product, quantity)}
                >
                    Add
                </button>
            </div>
        </div>
    );
}

export function HomePage({ cart, setCart }) {

    const [search, setSearch] = useState("");
    const [showLogin, setShowLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const username = localStorage.getItem("username");

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    function addtoCart(product, quantity = 1) {
        const itemsToAdd = Array(quantity).fill(product);
        setCart([...cart, ...itemsToAdd]);
        alert(`${quantity} ${product.name} Added to Cart! 🌸`);
    }

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <header className="nav-bar">

                <div className="logo">🌷 Rosette</div>

                <div className="nav-center">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About Us</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                </div>


                <div className="nav-right">

                    <div className="profile">
                        <button
                            className="nav-icon profile-icon"
                            onClick={() => setShowLogin(!showLogin)}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </button>

                        {showLogin && (
                            <div className="premium-dropdown">
                                {!username ? (
                                    <>
                                        <Link to="/login" className="dropdown-item">Login</Link>
                                        <Link to="/signup" className="dropdown-item">Signup</Link>
                                    </>
                                ) : (
                                    <>
                                        <div className="user-welcome">Hi, {username} ✨</div>
                                        <Link to="/orders" className="dropdown-item">Orders</Link>
                                        <button
                                            className="dropdown-item logout-btn"
                                            onClick={() => {
                                                localStorage.removeItem("username");
                                                window.location.reload();
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {username && (
                        <Link to="/cart" className="nav-icon cart-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
                        </Link>
                    )}
                </div>

            </header>

            <section className="hero">
                <div className="hero-text">
                    <h1>Soft Flowers, Sweet Feelings</h1>
                    <p>Handmade coquette crochet bouquets for gentle hearts 🌸</p>
                    <div className="hero-actions">
                        <Link to="/products/all">
                            <button className="shop-btn">Shop Now</button>
                        </Link>
                        {!username && (
                            <Link to="/signup">
                                <button className="join-btn-o">Join the Family ✨</button>
                            </Link>
                        )}
                    </div>
                </div>

                <section className="products-horizontal">
                    <h2>Featured Products</h2>

                    {filteredProducts.length === 0 ? (
                        <p className="no-products">No products found</p>
                    ) : (
                        <div className="product-row">

                            {filteredProducts.slice(0, 4).map((product) => (
                                <HomepageCard
                                    key={product._id || product.id}
                                    product={product}
                                    addToCart={addtoCart}
                                />
                            ))}

                        </div>
                    )}
                </section>
            </section>

            <footer className="footer">
                <div className="footer-grid">
                    <div className="footer-column">
                        <div className="logo">🌷 Rosette</div>
                        <p style={{ marginTop: '15px', fontSize: '14px', lineHeight: '1.6', color: '#6b7280' }}>
                            Spreading joy, one stitch at a time. Handmade crochet treasures for your heart and home.
                        </p>
                    </div>
                    <div className="footer-column">
                        <h3>Shop</h3>
                        <ul>
                            <li><Link to="/products/all">All Products</Link></li>
                            <li><Link to="/products/bouquets">Bouquets</Link></li>
                            <li><Link to="/products/accessories">Accessories</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Company</h3>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Stay in Bloom</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '15px' }}>
                            Subscribe to get special offers and floral updates!
                        </p>
                        <div className="newsletter-box">
                            <input type="email" placeholder="Your email" />
                            <button>Join</button>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© Rosette! All right is reserved</p>
                </div>
            </footer>
        </div>
    );
}


