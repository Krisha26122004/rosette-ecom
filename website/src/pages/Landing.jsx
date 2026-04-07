import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Landing.css";

function Landing() {
    const navigate = useNavigate();
    const [isExiting, setIsExiting] = useState(false);

    const enterGarden = () => {
        setIsExiting(true);
        setTimeout(() => {
            navigate("/home");
        }, 750); // wait for exit animation to finish
    };

    return (
        <div className={`splash-wrapper ${isExiting ? "exiting" : ""}`}>
            {/* Background Pétales et Sparkles */}
            <div className="bg-petal" style={{ top: '10%', left: '15%' }}>🌸</div>
            <div className="bg-petal" style={{ top: '20%', right: '20%' }}>🧺</div>
            <div className="bg-petal" style={{ bottom: '25%', left: '20%' }}>🧸</div>
            <div className="bg-petal" style={{ bottom: '15%', right: '15%' }}>🧶</div>

            {/* Sparkles */}
            <div className="sparkle" style={{ top: '30%', left: '40%', animationDelay: '0.2s' }}></div>
            <div className="sparkle" style={{ top: '60%', right: '35%', animationDelay: '1.2s' }}></div>
            <div className="sparkle" style={{ bottom: '40%', left: '50%', animationDelay: '0.7s' }}></div>

            <main className="splash-content">
                <span className="blooming-tulip">🌷</span>
                <h1 className="splash-title">Rosette</h1>
                <p className="splash-tagline">Welcome to our blooming crochet world ✨</p>

                <button
                    className="enter-btn-premium"
                    onClick={enterGarden}
                >
                    Explore Our Collection 🧺
                </button>
            </main>

            <footer style={{ position: 'absolute', bottom: '30px', color: '#db2777', fontSize: '0.85rem', fontWeight: 600, opacity: 0.7 }}>
                Handcrafted with ♡ by Krisha
            </footer>
        </div>
    );
}

export default Landing;
