import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Cart.css";

function Cart({ cart, setCart, orders }) {
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [shippingFee, setShippingFee] = useState(orders?.length === 0 ? 0 : 40);
    const [paymentMethod, setPaymentMethod] = useState("Credit Card");

    function removeItem(index) {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    }

    const itemsTotal = cart.reduce((total, item) => total + item.price, 0);
    const shipping = cart.length > 0 ? shippingFee : 0;
    const tax = (itemsTotal * 0.1).toFixed(2);
    const subtotal = itemsTotal + shipping + Number(tax);
    const finalDiscount = (subtotal * discount).toFixed(2);
    const orderTotal = (subtotal - finalDiscount).toFixed(2);
    const dynamicExpiry = new Date();
    dynamicExpiry.setDate(dynamicExpiry.getDate() + 20);

    const expiredExpiry = new Date();
    expiredExpiry.setDate(expiredExpiry.getDate() - 2);

    const validCoupons = {
        "ROSETTE10": { discount: 0.10, expiryDate: dynamicExpiry, title: "10% Off Entire Order" },
        "FRESH20": { discount: 0.20, expiryDate: dynamicExpiry, title: "20% Off Selected Items" },
        "FIRST50": { discount: 0.50, expiryDate: expiredExpiry, title: "50% Off First Deal" } 
    };

    const applyCoupon = () => {
        const code = couponCode.toUpperCase();
        const coupon = validCoupons[code];

        if (coupon) {
            const today = new Date();
            // Optional optimization: just strip the time to only compare dates
            today.setHours(0, 0, 0, 0); 
            
            if (today <= coupon.expiryDate) {
                setDiscount(coupon.discount);
                const discountPercentage = coupon.discount * 100;
                alert(`Coupon applied! ${discountPercentage}% discount added. ✨`);
            } else {
                alert(`This coupon code expired on ${coupon.expiryDate.toLocaleDateString()}. 😔`);
                setDiscount(0);
            }
        } else {
            alert("Invalid coupon code. 🥺");
            setDiscount(0);
        }
    };

    async function placeOrder() {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to place an order');
            return;
        }

        if (paymentMethod !== "Cash on Delivery") {
            alert(`Redirecting to secure ${paymentMethod} gateway... 🔒\nPayment processed successfully!`);
        } else {
            alert("Processing Cash on Delivery order...");
        }

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    items: cart.map(item => ({
                        product: item._id || item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image
                    })),
                    totalAmount: Number(orderTotal),
                    paymentMethod: paymentMethod
                })
            });

            if (res.ok) {
                const newOrder = await res.json();
                setCart([]);
                alert("Order placed successfully!");
            } else {
                const errData = await res.json();
                alert(errData.message);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        }
    }

    return (

        <div className="checkout-page">

            <h1 className="checkout-title">
                Checkout ({cart.length} items)
            </h1>

            {cart.length === 0 && (
                <div className="empty-cart">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" 
                      alt="Empty Cart" 
                      className="empty-cart-img" 
                    />
                    <h2>Your Cart is Empty 🌸</h2>
                    <p>Looks like you haven't added any lovely items yet.</p>
                    <Link to="/" className="shop-btn">Continue Shopping</Link>
                </div>
            )}

            {cart.length > 0 && (

                <div className="checkout-grid">

                    {/* LEFT SIDE - ORDER ITEMS */}

                    <div className="order-section">

                        <h2>Review your order</h2>

                        {cart.map((item, index) => (

                            <div key={index} className="order-card">

                                <img src={item.image} alt={item.name} />

                                <div className="order-info">

                                    <h3>{item.name}</h3>

                                    <p className="price">₹{item.price}</p>

                                    <button
                                        className="remove-btn"
                                        onClick={() => removeItem(index)}
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* RIGHT SIDE - PAYMENT SUMMARY */}

                    <div className="payment-summary">

                        <h2>Payment Summary</h2>

                        <p>Items ({cart.length}): <span>₹{itemsTotal.toFixed(2)}</span></p>

                        <div className="shipping-info" style={{margin: '15px 0', padding: '12px', background: '#fdf2f8', borderRadius: '12px', border: '1px dashed #f9a8d4'}}>
                            {orders?.length === 0 ? (
                                <p style={{margin: 0, color: '#db2777', fontWeight: '700', fontSize: '14px'}}>
                                    🌸 First Order Reward: Free Shipping Applied!
                                </p>
                            ) : (
                                <p style={{margin: 0, color: '#666', fontWeight: '600', fontSize: '14px'}}>
                                    Standard Shipping: ₹40
                                </p>
                            )}
                        </div>

                        <p>Shipping: <span>{orders?.length === 0 ? "FREE" : "₹40"}</span></p>

                        <p>Estimated tax (10%): <span>₹{tax}</span></p>

                        <div className="coupon-section" style={{marginTop: '20px', borderTop: '1px dashed #fce7f3', paddingTop: '15px'}}>
                            <p style={{fontSize: '14px', marginBottom: '8px'}}>Have a coupon?</p>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <input 
                                    type="text" 
                                    placeholder="Enter code..." 
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    style={{flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #fce7f3'}}
                                />
                                <button onClick={applyCoupon} style={{padding: '8px 15px', background: '#db2777', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>Apply</button>
                            </div>

                            <div className="available-coupons" style={{ marginTop: '15px' }}>
                                <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#db2777', marginBottom: '8px' }}>Available Coupons:</p>
                                {Object.entries(validCoupons).map(([code, details]) => {
                                    const isExpired = new Date() > details.expiryDate;
                                    return (
                                        <div key={code} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: isExpired ? '#f5f5f5' : '#fdf2f8', padding: '8px 10px', borderRadius: '6px', marginBottom: '6px', border: '1px dashed', borderColor: isExpired ? '#e5e5e5' : '#fbcfe8', opacity: isExpired ? 0.6 : 1 }}>
                                            <div>
                                                <span style={{ fontWeight: 'bold', color: isExpired ? '#666' : '#db2777', fontSize: '13px', cursor: isExpired ? 'default' : 'pointer', textDecoration: isExpired ? 'line-through' : 'none' }} onClick={() => !isExpired && setCouponCode(code)}>
                                                    {code}
                                                </span>
                                                <p style={{ fontSize: '11px', color: '#666', margin: '2px 0 0 0' }}>{details.title}</p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <span style={{ fontSize: '11px', color: isExpired ? '#ef4444' : '#059669', fontWeight: 'bold' }}>
                                                    {isExpired ? "Expired" : `Valid till ${details.expiryDate.toLocaleDateString()}`}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {discount > 0 && (
                            <p style={{color: '#059669', fontWeight: '600', marginTop: '10px'}}>Discount Savings: <span>- ₹{finalDiscount}</span></p>
                        )}

                        <hr />

                        <h3>
                            Order total: <span>₹{orderTotal}</span>
                        </h3>

                        <div className="payment-methods" style={{ marginTop: '20px', borderTop: '1px dashed #fce7f3', paddingTop: '15px', paddingBottom: '15px' }}>
                            <p style={{ fontSize: '14px', marginBottom: '12px', fontWeight: '600', color: '#db2777' }}>Select Payment Method:</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px', border: paymentMethod === 'Credit Card' ? '2px solid #f9a8d4' : '1px solid #fce7f3', borderRadius: '8px', background: paymentMethod === 'Credit Card' ? '#fdf2f8' : 'white', transition: 'all 0.2s' }}>
                                    <input type="radio" name="payment" value="Credit Card" checked={paymentMethod === "Credit Card"} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: '#db2777' }} />
                                    💳 Credit/Debit Card
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px', border: paymentMethod === 'UPI' ? '2px solid #f9a8d4' : '1px solid #fce7f3', borderRadius: '8px', background: paymentMethod === 'UPI' ? '#fdf2f8' : 'white', transition: 'all 0.2s' }}>
                                    <input type="radio" name="payment" value="UPI" checked={paymentMethod === "UPI"} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: '#db2777' }} />
                                    📱 UPI (GPay, PhonePe)
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px', border: paymentMethod === 'Cash on Delivery' ? '2px solid #f9a8d4' : '1px solid #fce7f3', borderRadius: '8px', background: paymentMethod === 'Cash on Delivery' ? '#fdf2f8' : 'white', transition: 'all 0.2s' }}>
                                    <input type="radio" name="payment" value="Cash on Delivery" checked={paymentMethod === "Cash on Delivery"} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: '#db2777' }} />
                                    💵 Cash on Delivery
                                </label>
                            </div>
                        </div>

                        <button
                            className="place-order-btn"
                            onClick={placeOrder}
                        >
                            Place your order
                        </button>

                    </div>

                </div>

            )}

        </div>

    );
}

export default Cart;