import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/HomePage.css";

function ProductDetails({ cart, setCart }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState("");
    const username = localStorage.getItem("username");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/id/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setProduct(data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCart = () => {
        setCart([...cart, product]);
        alert(`${product.name} added to cart! 🌸`);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!username) {
            alert("Please login to leave a review");
            return;
        }
        try {
            const res = await fetch(`/api/products/${id}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: username, rating: reviewRating, comment: reviewComment })
            });
            if (res.ok) {
                // Refresh product to show new review
                const updatedRes = await fetch(`/api/products/id/${id}`);
                const updatedData = await updatedRes.json();
                setProduct(updatedData);
                setReviewComment("");
                alert("Thank you for your review! ✨");
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (!product) return <div className="loading">Loading lovely details...</div>;

    return (
        <div className="product-details-page">
            <header className="nav-bar">
                <div className="logo">🌷 Rosette</div>

                <div className="nav-center">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About Us</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                </div>

                <div className="nav-right">
                   {username && (
                       <Link to="/cart" className="nav-icon cart-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
                        </Link>
                    )}
                </div>
            </header>

            <main className="details-container">
                <div className="details-grid">
                    <div className="details-image-section">
                        <img src={product.image} alt={product.name} className="main-product-img" />
                    </div>
                    <div className="details-info-section">
                        <span className="category-tag">{product.category}</span>
                        <h1>{product.name}</h1>
                        <div className="overall-rating-premium">
                            <div className="single-star-row">
                                <span className="star-icon-p">⭐</span>
                                <span className="rating-num-p">{product.rating || 0} / 5</span>
                            </div>
                            <span className="review-count-premium">{product.reviews?.length || 0} customer reviews</span>
                        </div>
                        <p className="details-price">₹{product.price}</p>
                        <p className="details-description">
                            {product.description || "Indulge in the elegance of Rosette. This beautifully crafted item brings a touch of floral charm and premium quality to your lifestyle. Perfect for gifting or treating yourself."}
                        </p>
                        <button className="add-to-cart-premium" onClick={addToCart}>
                            Add to Cart 🛒
                        </button>
                        <div className="delivery-promise">
                            🚚 Free delivery on your first order!
                        </div>
                    </div>
                </div>

                <section className="reviews-section">
                    <h2>Customer Reviews 📝</h2>
                    <div className="reviews-grid">
                        <div className="reviews-list">
                            {product.reviews?.length > 0 ? (
                                product.reviews.map((rev, i) => (
                                    <div key={i} className="review-card">
                                        <div className="review-header">
                                            <strong>{rev.user}</strong>
                                            <span className="stars">⭐ {rev.rating} / 5</span>
                                        </div>
                                        <p>{rev.comment}</p>
                                        <small>{new Date(rev.date).toLocaleDateString()}</small>
                                    </div>
                                ))
                            ) : (
                                <p className="no-reviews">No reviews yet. Be the first to bloom! 🌸</p>
                            )}
                        </div>
                        <div className="add-review-form">
                            <h3>Share your thoughts</h3>
                            <form onSubmit={handleReviewSubmit}>
                                <div className="rating-stars-input">
                                    <label>Rate Us: </label>
                                    <div className="stars-row">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <span 
                                                key={num} 
                                                className={`star-icon ${reviewRating >= num ? 'filled' : ''}`}
                                                onClick={() => setReviewRating(num)}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <textarea 
                                    placeholder="Tell us what you think..." 
                                    value={reviewComment} 
                                    onChange={(e) => setReviewComment(e.target.value)}
                                    required
                                />
                                <button type="submit" className="submit-review-btn">Post Review</button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default ProductDetails;
