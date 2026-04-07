import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Orders.css";

function Orders() {
    const [fetchedOrders, setFetchedOrders] = useState([]);
    const [activeTracking, setActiveTracking] = useState(null);
    const username = localStorage.getItem("username");

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const res = await fetch('/api/orders', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    // Keep the full order structure for grouping
                    setFetchedOrders(data);
                }
            } catch (err) { console.error(err) }
        };
        fetchOrders();
    }, []);

    function trackParcel(index) {
        setActiveTracking(activeTracking === index ? null : index);
    }

    const formatDate = (dateString) => {
        return new Intl.DateTimeFormat('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(new Date(dateString));
    }

    return (
        <div className="order-page-wrapper">
            <header className="order-header-minimal">
                <Link to="/" className="back-home-btn">
                   <span>←</span> Back to Rosette
                </Link>
                <div style={{ color: '#db2777', fontWeight: '800', fontStyle: 'italic' }}>🎀 {username}'s Boutique</div>
            </header>

            <main className="order-container">
                <h1 className="page-title-premium">Your Purchases 🌷</h1>

                {fetchedOrders.length === 0 ? (
                    <div className="empty-orders-premium">
                        <span className="empty-icon-coquette">🧺</span>
                        <h2>Bag is empty!</h2>
                        <p>Your orders will appear here once you start your blooming journey.</p>
                        <Link to="/" className="shop-now-btn-premium">Shop New Arrivals</Link>
                    </div>
                ) : (
                    <div className="order-groups-list">
                        {fetchedOrders.map((order, orderIdx) => (
                            <div key={orderIdx} className="order-group-card">
                                <header className="order-group-header">
                                    <div className="order-id-badge">#{order._id.slice(-6).toUpperCase()}</div>
                                    <div className="order-date">Planted on {formatDate(order.createdAt)}</div>
                                </header>

                                <div className="order-items-list">
                                    {order.items.map((item, itemIdx) => (
                                        <div key={itemIdx} className="order-item-row">
                                            <div className="item-main">
                                                <img src={item.image} className="item-img-premium" alt={item.name} />
                                                <div className="item-info-premium">
                                                    <h4>{item.name}</h4>
                                                    <p className="item-meta-premium">₹{item.price}</p>
                                                </div>
                                            </div>
                                            <div className="item-status-tag">
                                              <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.8rem' }}>READY</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <footer className="order-footer-premium">
                                    <div className="status-indicator">
                                        <span style={{ fontSize: '1.2rem' }}>🚚</span>
                                        <span>In Transit • Arriving Soon</span>
                                    </div>
                                    <button className="track-btn-elegant" onClick={() => trackParcel(orderIdx)}>
                                        {activeTracking === orderIdx ? 'Close Tracker' : 'Live Status ✨'}
                                    </button>
                                </footer>

                                {activeTracking === orderIdx && (
                                    <div className="tracking-details-expanded">
                                        <div className="tracking-timeline-premium">
                                            <div className="timeline-vertical-modern">
                                                <div className="timeline-step completed">
                                                    <h5>Order Confirmed</h5>
                                                    <p>Your bouquet is being prepared</p>
                                                    <span className="timeline-time">10:30 AM</span>
                                                </div>
                                                <div className="timeline-step completed">
                                                    <h5>Package Shipped</h5>
                                                    <p>Out for local sorting</p>
                                                    <span className="timeline-time">02:20 PM</span>
                                                </div>
                                                <div className="timeline-step">
                                                    <h5>Out for Delivery</h5>
                                                    <p>Our courier is on the way</p>
                                                    <span className="timeline-time">Expected by 6 PM</span>
                                                </div>
                                            </div>
                                            <div className="map-card-premium">
                                                <iframe
                                                    width="100%"
                                                    height="250"
                                                    frameBorder="0"
                                                    style={{ border: 0, borderRadius: '15px' }}
                                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15082.951566810237!2d72.8441113!3d19.0759837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Orders;