import { Link } from "react-router-dom";
import "../styles/About.css";

function About({ cart }) {
    return (
        <div className="about-page">
            <header className="nav-bar">
                <div className="logo">🌷 Rosette</div>
                <div className="nav-center">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About Us</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                </div>
                <div className="nav-right">
                   {localStorage.getItem("username") && (
                       <Link to="/cart" className="nav-icon cart-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
                        </Link>
                    )}
                </div>
            </header>

            <main className="about-content">
                <section className="about-hero">
                    <div className="hero-overlay">
                        <h1>Beyond the Stitch 🌸</h1>
                        <p>At Rosette, we believe that every loop of thread can tell a story.</p>
                    </div>
                </section>

                <section className="about-details">
                    <div className="about-section">
                        <h2>Our Craftsmanship</h2>
                        <p>
                            Born from a love for traditional art, **Rosette** is dedicated to bringing the warmth of handmade crochet 
                            into modern homes. Each piece—from our delicate bouquets to our durable floor mats—is meticulously 
                            hand-stitched with care, precision, and passion.
                        </p>
                    </div>

                    <div className="about-grid">
                        <div className="grid-card">
                            <div className="card-icon">🌷</div>
                            <h3>Everlasting Flowers</h3>
                            <p>Hand-crocheted bouquets that capture beauty without ever fading. A sustainable alternative to fresh flowers.</p>
                        </div>
                        <div className="grid-card">
                            <div className="card-icon">🏠</div>
                            <h3>Home Decor</h3>
                            <p>From intricate table runners to cozy wall hangings, our crochet techniques breathe life into every room.</p>
                        </div>
                        <div className="grid-card">
                            <div className="card-icon">🧶</div>
                            <h3>Floor Mats & More</h3>
                            <p>We push the limits of crochet, creating functional art like durable, plush floor mats and stylish accessories.</p>
                        </div>
                    </div>

                    <div className="about-mission">
                        <h2>Our Mission</h2>
                        <div className="mission-box">
                            <p>
                                "To preserve the art of crochet while creating sustainable, beautiful, and functional pieces 
                                that bring joy to your everyday life."
                            </p>
                        </div>
                    </div>

                    <section className="about-team-section">
                        <h2>Meet the Creators</h2>
                        <div className="team-grid">
                            <div className="team-card">
                                <div className="team-initial-wrapper">KD</div>
                                <h3>Krisha Darji</h3>
                                <p>Founder & Lead Artist</p>
                            </div>
                            <div className="team-card">
                                <div className="team-initial-wrapper">DD</div>
                                <h3>Dipali Darji</h3>
                                <p>Co-founder & Creative Director</p>
                            </div>
                        </div>
                    </section>

                    <section className="testimonials-section">
                        <h2>Voices from the Garden</h2>
                        <div className="testimonials-grid">
                            <div className="review-card">
                                <span className="quote-icon">“</span>
                                <p className="review-text">
                                    "I bought a tulip bouquet for my mother, and she was speechless. The detail is incredible, and the coquette theme matches my room perfectly!"
                                </p>
                                <div className="review-user">
                                    <div className="user-avatar">A</div>
                                    <span className="user-name">Anjali R.</span>
                                </div>
                            </div>
                            <div className="review-card">
                                <span className="quote-icon">“</span>
                                <p className="review-text">
                                    "The products are even more beautiful in person. Rosette's crochet work is so high quality, and it brings such a gentle vibe to my home."
                                </p>
                                <div className="review-user">
                                    <div className="user-avatar">P</div>
                                    <span className="user-name">Priya S.</span>
                                </div>
                            </div>
                            <div className="review-card">
                                <span className="quote-icon">“</span>
                                <p className="review-text">
                                    "Such a sweet experience shopping here. The 'Enter the Garden' entrance was so magical! My floor mat is plush and lovely."
                                </p>
                                <div className="review-user">
                                    <div className="user-avatar">M</div>
                                    <span className="user-name">Meera K.</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>

                <section className="cta-section">
                    <h2>Want something unique?</h2>
                    <p>Contact us for custom crochet commissions!</p>
                    <Link to="/" className="btn-premium">Back to Shop</Link>
                </section>
            </main>
        </div>
    );
}

export default About;
