import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

function Admin() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("bouquets");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ name, price: Number(price), description, image, category })
            });

            if (res.ok) {
                alert("Product added successfully! 🌸");
                setName("");
                setPrice("");
                setDescription("");
                setImage("");
                fetchProducts();
            } else {
                alert("Only admins can add products.");
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this product?")) return;
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (res.ok) {
                setProducts(products.filter(p => p._id !== id));
                alert("Product removed! ✨");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="product-details-page">
             <header className="nav-bar">
                <div className="logo">🌷 Rosette Admin</div>
                <div className="nav-right">
                    <Link to="/">Exit Admin</Link>
                </div>
            </header>

            <main className="details-container">
                <h1 style={{color: '#831843', marginBottom: '30px'}}>Dashboard</h1>
                
                <div className="details-grid" style={{alignItems: 'flex-start'}}>
                    {/* ADD PRODUCT FORM */}
                    <section className="add-review-form" style={{background: 'white'}}>
                        <h3>Add New Product 🎀</h3>
                        <form onSubmit={handleAddProduct} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                            <input 
                                type="text" 
                                placeholder="Product Name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                                style={{padding: '12px', borderRadius: '10px', border: '1px solid #fce7f3'}}
                            />
                            <input 
                                type="number" 
                                placeholder="Price (₹)" 
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)} 
                                required 
                                style={{padding: '12px', borderRadius: '10px', border: '1px solid #fce7f3'}}
                            />
                            <input 
                                type="text" 
                                placeholder="Image URL (e.g. /images/flower.jpg)" 
                                value={image} 
                                onChange={(e) => setImage(e.target.value)} 
                                required 
                                style={{padding: '12px', borderRadius: '10px', border: '1px solid #fce7f3'}}
                            />
                            <select 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                                style={{padding: '12px', borderRadius: '10px', border: '1px solid #fce7f3'}}
                            >
                                <option value="bouquets">Bouquets</option>
                                <option value="keychains">Keychains</option>
                                <option value="accessories">Accessories</option>
                            </select>
                            <textarea 
                                placeholder="Description" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                style={{height: '80px'}}
                            />
                            <button type="submit" className="add-to-cart-premium" disabled={loading}>
                                {loading ? "Creating..." : "Add Product 🌸"}
                            </button>
                        </form>
                    </section>

                    {/* PRODUCT LIST */}
                    <section className="reviews-section" style={{marginTop: 0, padding: '30px'}}>
                        <h3 style={{marginBottom: '20px'}}>Current Inventory ({products.length})</h3>
                        <div style={{maxHeight: '500px', overflowY: 'auto'}}>
                            {products.map((p) => (
                                <div key={p._id} className="review-card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                                        <img src={p.image} style={{width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover'}} />
                                        <div>
                                            <strong style={{fontSize: '14px'}}>{p.name}</strong>
                                            <p style={{margin: 0, fontSize: '12px', color: '#db2777'}}>₹{p.price}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(p._id)}
                                        style={{background: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold'}}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Admin;
