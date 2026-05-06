import { useEffect } from 'react';

export default function Navbar() {
    useEffect(() => {
        // Mobile menu functionality
        const handleMenuToggle = () => {
            document.querySelector('.main-menu')?.classList.add('active');
        };

        const handleMenuClose = () => {
            document.querySelector('.main-menu')?.classList.remove('active');
        };

        const menuToggle = document.querySelector('.rs-menu-toggle');
        const menuClose = document.querySelector('.close-menu');

        if (menuToggle) menuToggle.addEventListener('click', handleMenuToggle);
        if (menuClose) menuClose.addEventListener('click', handleMenuClose);

        return () => {
            if (menuToggle) menuToggle.removeEventListener('click', handleMenuToggle);
            if (menuClose) menuClose.removeEventListener('click', handleMenuClose);
        };
    }, []);

    return (
        <div className="full-width-header">
            <header id="rs-header" className="rs-header style2">
                <div className="topbar-area style2">
                    <div className="container">
                        <div className="row y-middle">
                            <div className="col-lg-6">
                                <ul className="topbar-contact">
                                    <li>
                                        <i className="flaticon-email"></i>
                                        <a href="mailto:info@dhantag.com">info@dhantag.com</a>
                                    </li>
                                    <li>
                                        <i className="flaticon-call"></i>
                                        <a href="tel:+91 8905520273" className="last"> +91 8905520273</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-6 text-right">
                                <div className="toolbar-sl-share">
                                    <ul>
                                        <li><a href="https://www.facebook.com/dhantagindiapvtltd/" target="_blank"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="https://x.com/Dhantag28810" target="_blank"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="https://wa.me/8905520273?"><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                                        <li className="opening">
                                            <em><a href="https://www.instagram.com/dhantag_india_pvt_ltd/" target="_blank"><i className="fa fa-instagram"></i></a></em>
                                        </li>
                                        <li className="opening">
                                            <i className="flaticon-clock"></i>
                                            <span>Monday, 1 May, 2024</span>
                                        </li>
                                        <li className="app-btn d-lg-none">
                                            <a className="humburger nav-expander quote-btn" href="/auth/login">Login Now</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="menu-area menu-sticky">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3" style={{position: 'relative'}}>
                                <div className="logo-part">
                                    <a href="/"><img src="/assets/web/img/logo.png" alt="" /></a>
                                </div>
                                <div className="login-btn-mobile">
                                    <div className="expand-btn-inner search-icon">
                                        <ul>
                                            <li><a className="quote-btn" href="/auth/login">Login Now</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mobile-menu">
                                    <a href="#" className="rs-menu-toggle rs-menu-toggle-close secondary">
                                        <i className="fa fa-bars"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-9 text-right">
                                <div className="rs-menu-area">
                                    <div className="main-menu">
                                        <nav className="rs-menu pr-50 lg-pr-50 md-pr-0 rs-menu-close">
                                            <div className="header-top">
                                                <div className="logo">
                                                    <a href="/">
                                                        <img className="logo-light" src="/assets/web/img/logo.png" alt="Logo" />
                                                        <img className="logo-dark" src="/assets/web/img/logo.png" alt="Logo" />
                                                    </a>
                                                </div>
                                                <div className="close-menu">
                                                    <button className="close-button">
                                                        <i className="icon-73"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <ul className="nav-menu">
                                                <li><a href="/">Home</a></li>
                                                <li><a href="/about-us">About Us</a></li>
                                                {/* <li><a href="/services">Services</a></li> */}
                                                <li><a href="/contact-us">Contact Us</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="expand-btn-inner search-icon hidden-md">
                                        <ul>
                                            <li><a className="quote-btn" href="/auth/login">Login Now</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}