export default function Footer() {
    return (
        <>
            {/* FULL WIDTH APP DOWNLOAD SECTION */}
            <section className="app-download-full">
                <div className="container-fluid">
                    <div className="app-card-full">
                        <div className="app-info">
                            <div className="app-logo">
                                <img src="/Images/logo.jpg" alt="Dhantag App" />
                            </div>

                            <div className="app-details">
                                <h2>Download Dhantag App</h2>
                                <p>Fast • Secure • Trusted Investment Platform</p>

                                <div className="app-rating">
                                    <div className="stars">
                                        {[...Array(5)].map((_, i) => (
                                            <i key={i} className="fa fa-star"></i>
                                        ))}
                                    </div>
                                    <span>4.8 | 50K+ Downloads</span>
                                </div>

                                <div className="download-buttons">
                                    <a
                                        href="https://play.google.com/store/apps/details?id=com.dhantag"
                                        target="_blank"
                                        className="play-store-btn"
                                    >
                                        <i className="fa fa-google-play"></i>
                                        <div>
                                            <span>GET IT ON</span>
                                            <strong>Google Play</strong>
                                        </div>
                                    </a>

                                    <a
                                        href="http://backend.dhantag.com/uploads/app-release.apk"
                                        target="_blank"
                                        className="app-store-btn"
                                    >
                                        {/* <i className="fa fa-apple"></i> */}
                                        <div>
                                            <span>Download Apk</span>
                                            {/* <strong>App Store</strong> */}
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer id="rs-footer" className="rs-footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-3 footer-widget">
                                <div className="footer-logo mb-20">
                                    <a href="/"><img src="/assets/web/img/logo.png" alt="" /></a>
                                </div>
                                <p>
                                    Welcome to Dhantag India Private Limited.
                                    Join a lifetime business opportunity with Dhantag India.
                                </p>
                            </div>

                            <div className="col-lg-2">
                                <h3 className="widget-title">Quick Links</h3>
                                <ul className="site-map">
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/about-us">About Us</a></li>
                                    <li><a href="/services">Services</a></li>
                                    <li><a href="/contact-us">Contact Us</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-2">
                                <h3 className="widget-title">Policies</h3>
                                <ul className="site-map">
                                    <li><a href="/privacy-policy">Privacy Policy</a></li>
                                    <li><a href="/terms-and-conditions">Terms & Conditions</a></li>
                                    <li><a href="/shipping-policy">Shipping Policy</a></li>
                                    <li><a href="/refund-policy">Refund Policy</a></li>
                                    <li><a href="/refund-policy">Download Informatin </a></li>
                                </ul>
                            </div>

                            <div className="col-lg-5">
                                <h3 className="widget-title">Contact Us</h3>
                                <ul className="address-widget">
                                    <li>
                                        <i className="fa fa-map-marker"></i>
                                        G-23, MJB Height Manglam Block C, Kalwar Road,
                                        Jaipur Rajasthan 302012
                                    </li>
                                    <li>
                                        <i className="fa fa-phone"></i>
                                        <a href="https://wa.me/8905520273" target="_blank">
                                            +91 8905520273
                                        </a>
                                    </li>
                                    <li>
                                        <i className="fa fa-envelope"></i>
                                        <a href="mailto:info@dhantag.com">
                                            info@dhantag.com
                                        </a>
                                    </li>
                                </ul>

                                <ul className="footer-social">
                                    <li><a href="https://www.facebook.com/dhantagindiapvtltd/" target="_blank"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="https://x.com/Dhantag28810" target="_blank"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="https://wa.me/8905520273" target="_blank"><i className="fa fa-whatsapp"></i></a></li>
                                    <li><a href="https://www.instagram.com/dhantag_india_pvt_ltd/" target="_blank"><i className="fa fa-instagram"></i></a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="container text-center">
                        © {new Date().getFullYear()} Dhantag India Private Limited. All Rights Reserved.
                    </div>
                </div>
            </footer>

            {/* STYLES */}
            <style jsx>{`
                .app-download-full {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    padding: 60px 20px;
                    color: white;
                }

                .app-card-full {
                    max-width: 1200px;
                    margin: auto;
                }

                .app-info {
                    display: flex;
                    align-items: center;
                    gap: 30px;
                    flex-wrap: wrap;
                }

                .app-logo {
                    background: #fff;
                    padding: 15px;
                    border-radius: 15px;
                }

                .app-logo img {
                    width: 80px;
                }

                .stars {
                    color: gold;
                }

                .download-buttons {
                    display: flex;
                    gap: 15px;
                    margin-top: 15px;
                }

                .play-store-btn, .app-store-btn {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(255,255,255,0.2);
                    padding: 12px 18px;
                    border-radius: 8px;
                    color: #fff;
                    text-decoration: none;
                }

                @media(max-width: 768px) {
                    .app-info {
                        text-align: center;
                        justify-content: center;
                    }
                    .download-buttons {
                        flex-direction: column;
                    }
                }
            `}</style>
        </>
    );
}
