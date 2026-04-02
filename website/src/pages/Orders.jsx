import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/HomePage.css";

function Orders() {
    const [fetchedOrders, setFetchedOrders] = useState([]);
    const [activeTracking, setActiveTracking] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
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
                    const allItems = data.flatMap(order => order.items);
                    setFetchedOrders(allItems);
                }
            } catch (err) { console.error(err) }
        };
        fetchOrders();
    }, []);

    function trackParcel(index) {
        setActiveTracking(activeTracking === index ? null : index);
    }

    return (
        <div className="order-page-wrapper">
            {/* Navbar removed as requested by user */}
            <div style={{ padding: '20px 60px', textAlign: 'left', background: 'white', borderBottom: '1px solid #fce7f3' }}>
                <Link to="/" style={{ color: '#db2777', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>
                    🌷 Rosette • Back to Home
                </Link>
            </div>

            <div className="order">
                <div className="page">
                    <h1 className="page-title">Your Orders</h1>

                    {fetchedOrders.length === 0 ? (
                        <div className="empty-orders">
                            <div className="empty-orders-card">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                                    className="empty-img"
                                    alt="empty"
                                />
                                <h2>No Orders Yet</h2>
                                <p>You haven't placed any orders yet.</p>
                                <Link to="/">
                                    <button className="shop-btn">Start Shopping</button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="order-list-container">
                            {fetchedOrders.map((item, index) => (
                                <div key={index} className={`order-row-wrapper ${activeTracking === index ? 'active' : ''}`}>
                                    <div className="order-horizontal-card">
                                        <div className="order-main-info">
                                            <img src={item.image} className="order-thumb" alt={item.name} />
                                            <div className="order-text">
                                                <h3>{item.name}</h3>
                                                <p className="order-meta">₹{item.price} • ⭐ {item.rating || 99}</p>
                                            </div>
                                        </div>
                                        <div className="order-actions">
                                            <span className="order-status-tag">In Transit</span>
                                            <button className="track-btn-premium" onClick={() => trackParcel(index)}>
                                                {activeTracking === index ? 'Close Status' : 'Track Order 🚚'}
                                            </button>
                                        </div>
                                    </div>

                                    {activeTracking === index && (
                                        <div className="tracking-expansion">
                                            <div className="tracking-grid">
                                                <div className="tracking-timeline-vertical">
                                                    <div className="timeline-item completed">
                                                        <div className="timeline-dot">📦</div>
                                                        <div className="timeline-content">
                                                            <h4>Order Placed</h4>
                                                            <p>Your order has been received</p>
                                                            <span>10:30 AM, Today</span>
                                                        </div>
                                                    </div>
                                                    <div className="timeline-item active">
                                                        <div className="timeline-dot">🚚</div>
                                                        <div className="timeline-content">
                                                            <h4>Shipped</h4>
                                                            <p>Parcel is on the way to your city</p>
                                                            <span>02:15 PM, Today</span>
                                                        </div>
                                                    </div>
                                                    <div className="timeline-item">
                                                        <div className="timeline-dot">🛵</div>
                                                        <div className="timeline-content">
                                                            <h4>Out for Delivery</h4>
                                                            <p>Courier is nearby</p>
                                                            <span>Expected by 6 PM</span>
                                                        </div>
                                                    </div>
                                                    <div className="timeline-item">
                                                        <div className="timeline-dot">✅</div>
                                                        <div className="timeline-content">
                                                            <h4>Delivered</h4>
                                                            <p>Arrival confirmation</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tracking-map-container" style={{ height: '350px' }}>
                                                    <iframe
                                                        width="100%"
                                                        height="100%"
                                                        frameBorder="0"
                                                        style={{ border: 0 }}
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
                </div>
            </div>
        </div>
    );

}

export default Orders;