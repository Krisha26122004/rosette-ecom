import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Contact.css";

function Contact({ cart }) {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setSubmitted(true);
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setSubmitted(false), 8000);
            } else {
                alert("Something went wrong. Please try again. 🌸");
            }
        } catch (err) {
            console.error(err);
            alert("Error connecting to server. 🌸");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
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

            <main className="contact-main">
                <section className="contact-hero animate-fade-in">
                    <h1>Get in Touch 💌</h1>
                    <p>Have a question or a custom crochet request? We'd love to hear from you!</p>
                </section>

                <div className="contact-container">
                    <div className="contact-info animate-slide-up">
                        <div className="info-card">
                            <h3>Email Us</h3>
                            <p>kishudarji2612@gmail.com</p>
                        </div>
                        <div className="info-card">
                            <h3>Follow Our Journey</h3>
                            <div className="social-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-icon"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                <span className="social-tag inst"> Rosette_Handmade</span>
                            </div>
                            <div className="social-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="social-icon"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.259 7.929-7.259 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592 0 12.017 0z" /></svg>
                                <span className="social-tag pin"> Rosette_Pins</span>
                            </div>
                        </div>
                        <div className="info-card-floral">
                            <p>Every piece is made with love in our small studio. 🌸</p>
                        </div>
                    </div>

                    <div className="contact-form-wrapper animate-slide-up">
                        {submitted ? (
                            <div className="success-message">
                                <h2>Thank you! ✨</h2>
                                <p>Your message has been sent. We'll bloom back into your inbox soon!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your lovely name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea
                                        placeholder="What's on your mind?..."
                                        rows="6"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="submit-btn-premium" disabled={loading}>
                                    {loading ? "Sending..." : "Send to Admin 🌸"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Contact;
