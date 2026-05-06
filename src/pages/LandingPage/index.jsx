import React, { useEffect } from 'react';

const LandingPage = () => {
  useEffect(() => {
    // Load external CSS files
    const cssFiles = [
      '/assets/web/css/bootstrap.min.css',
      '/assets/web/css/font-awesome.min.css',
      '/assets/web/css/flaticon.css',
      '/assets/web/css/owl.carousel.css',
      '/assets/web/css/magnific-popup.css',
      '/assets/web/css/rsmenu-main.css',
      '/assets/web/css/icomoon.css',
      '/assets/web/css/rs-spacing.css',
      '/assets/web/css/style.css',
      '/assets/web/css/responsive.css'
    ];

    cssFiles.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    });

    // Load external JS files
    const jsFiles = [
      '/assets/web/js/jquery.min.js',
      '/assets/web/js/bootstrap.min.js',
      '/assets/web/js/rsmenu-main.js',
      '/assets/web/js/owl.carousel.min.js',
      '/assets/web/js/wow.min.js',
      '/assets/web/js/main.js',
      '/assets/web/js/jquery.counterup.min.js'
    ];

    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    };

    // Load scripts sequentially
    const loadScripts = async () => {
      for (const src of jsFiles) {
        await loadScript(src);
      }
      
      // Initialize carousel after scripts are loaded
      if (window.$ && window.$.fn.owlCarousel) {
        window.$('.testimonial-slider').owlCarousel({
          loop: true,
          margin: 30,
          nav: false,
          dots: true,
          autoplay: false,
          responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 4 }
          }
        });
      }
    };

    loadScripts();

    // Cleanup function
    return () => {
      // Remove added CSS and JS files when component unmounts
      cssFiles.forEach(href => {
        const link = document.querySelector(`link[href="${href}"]`);
        if (link) link.remove();
      });
    };
  }, []);

  return (
    <div className="defult-home">
      <div className="offwrap"></div>
      <div id="scrollUp"></div>
      
      <div className="main-content">
        {/* Header */}
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
                        <li>
                          <a href="https://www.facebook.com/dhantagindiapvtltd/" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://x.com/Dhantag28810" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://wa.me/8905520273?">
                            <i className="fa fa-whatsapp" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li className="opening">
                          <em>
                            <a href="https://www.instagram.com/dhantag_india_pvt_ltd/" target="_blank" rel="noopener noreferrer">
                              <i className="fa fa-instagram"></i>
                            </a>
                          </em>
                        </li>
                        <li className="opening">
                          <i className="flaticon-clock"></i>
                          <span id="dateDiv">Monday, 1 May, 2024</span>
                        </li>
                        <li className="app-btn d-lg-none">
                          <a href="/auth/login" className="humburger nav-expander quote-btn">Login Now</a>
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
                      <a href="/"><img src="/assets/web/img/logo.png" alt="Dhantag Logo" /></a>
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
                            <li><a href="/about-us.html">About Us</a></li>
                            {/* <li><a href="/services.html">Services</a></li> */}
                            <li><a href="/contact-us.html">Contact Us</a></li>
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

        {/* Hero Section */}
        {/* <div id="slider" className="rs-slider style1 slider-element slider-parallax min-vh-100 dark include-header home-banner-slider">
          <div className="rs-carousel owl-carousel slider-inner" data-loop="true" data-items="1" data-margin="0" data-autoplay="true" data-hoverpause="true" data-autoplay-timeout="5000" data-smart-speed="800" data-dots="false" data-nav="false">
            <div className="slider-content">
              <div className="video-wrap no-placeholder">
                <video poster="/files/videos/asclepius-sniss-intro.jpg" preload="auto" loop autoPlay muted playsInline>
                  <source src='/assets/web/videos/dhantagvideo1-1.mp4' type='video/mp4' />
                  <source src='/assets/web/videos/dhantagvideo1-1.mp4.webm' type='video/webm' />
                </video>
                <div className="video-overlay" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}></div>
              </div>
            </div>
          </div>
        </div> */}
        <div classname="slider-content ">
  <div classname="video-wrap no-placeholder">
    <video poster="files/videos/asclepius-sniss-intro.jpg" preload="auto" loop autoPlay muted playsInline>
      <source src="assets/web/videos/dhantagvideo1-1.mp4" type="video/mp4" />
      <source src="assets/web/videos/dhantagvideo1-1.mp4.webm" type="video/webm" />
    </video>
    {/* <div className="video-overlay" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} /> */}
  </div>
</div>


        {/* Product Categories */}
        <div className="testimonial-area our-product-categories py-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div className="site-heading text-center">
                  <h2 className="site-title">Our Product <span>Categories</span></h2>
                  <div className="heading-divider"></div>
                </div>
              </div>
            </div>
            <div className="our-product-categories testimonial-slider owl-carousel owl-theme">
              <div className="testimonial-single">
                <div className="opc-single">
                  <div className="opc-img">
                    <img src="/assets/web/img/logo.png" alt="" />
                  </div>
                  <h4 className="opc-title">APPARELS</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="testimonial-area OurBestSellingProducts py-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div className="site-heading text-center">
                  <h2 className="site-title">Our Best Selling <span>Products</span></h2>
                  <div className="heading-divider"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="shop row gutter-30 justify-content-center">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="product col-lg-3 col-md-4 col-sm-6 col-12">
                  <div className="grid-inner">
                    <div className="product-image">
                      <a href="/product-details.html" className="product-img-1">
                        <img src="/assets/web/img/logo.png" alt="" />
                      </a>
                      <a href="/product-details.html" className="product-img-2">
                        <img src="/assets/web/img/logo.png" alt="" />
                      </a>
                    </div>
                    <div className="product-desc">
                      <div className="product-title">
                        <h3><a href="/product-details.html">SHIITAKE SHAKE (RABDI FALOODA)</a></h3>
                      </div>
                      <div className="product_content">
                        <span className="current_price">MRP : ₹678.00 &nbsp; DP : ₹503.00 &nbsp; SP : 2.00 </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="clear mb-4"></div>
          </div>
        </div>

        {/* About Section */}
        <section className="gradient-bg2" id="counters">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 pl-lg-4 order-lg-2 wow fadeInRight" style={{
                visibility:"visible"
              }}>
                <div className="heading-area">
                  <span className="sub-title text-white">Welcome to Dhantag India Private Limited</span>
                  <h2 className="title text-white">
                    Together <span className="js-rotating morphext" style={{color: 'black'}}>
                      <span className="flipInX">You and Us</span>
                    </span> Let's Create a <span className="js-rotating morphext">
                      <span className="flipInX">Digital Future</span>
                    </span>
                  </h2>
                  <p>
                    Dhantag India Private Limited is committed to bringing smart digital solutions that 
                    help individuals and businesses grow with confidence. Our goal is to empower people 
                    with modern technology, reliable services, and seamless digital experiences. 
                    By joining us, you step into a world of new opportunities, innovation, and long-term 
                    growth. Together, we aim to build a stronger and more connected digital India where 
                    progress becomes accessible for everyone.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 wow fadeInLeft">
                <div className="half-img mt-5 pt-4 mt-lg-0 pt-lg-0">
                  <img alt="vector" src="/assets/web/img/contact-comment.png" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="security-wrap pt-60 pb-80 gray-color">
          <div className="container">
            <div className="row gx-5 align-items-center">
              <div className="col-lg-6">
                <div className="security-content">
                  <div className="sec-title mb-30">
                    <div className="sub-text style4-bg">E-Commerce Security</div>
                    <h2>Smart, Secure & Fast Solutions for Your Online Business</h2>
                    <p>
                      We provide a highly secure and efficient digital ecosystem that helps your 
                      online store operate smoothly. From safe payments to instant order processing, 
                      our system ensures a seamless and trusted e-commerce experience for your customers.
                    </p>
                  </div>

                  <div className="feature-item-wrap">
                    <div className="feature-item">
                      <div className="feature-icon">
                        <img src="/assets/web/img/security-icon-1.png" alt="Image" />
                      </div>
                      <div className="feature-text">
                        <h3>Secure Online Payments</h3>
                        <p>
                          All customer payments are protected with advanced encryption and 
                          fraud-prevention technology. Your online transactions remain fully secure, 
                          ensuring trust and confidence in your brand.
                        </p>
                      </div>
                    </div>

                    <div className="feature-item">
                      <div className="feature-icon">
                        <img src="/assets/web/img/security-icon-2.png" alt="Image" />
                      </div>
                      <div className="feature-text">
                        <h3>Instant Order Processing</h3>
                        <p>
                          Manage orders faster than ever. Real-time updates, automated processing, 
                          and quick confirmations help you deliver a smooth shopping experience 
                          to your customers—without delays.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="security-img-wrap">
                  <img src="/assets/web/img/security-1.png" alt="Image" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <div className="testimonial-area py-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div className="site-heading text-center">
                  <span className="site-title-tagline">Testimonials</span>
                  <h2 className="site-title">What Our leader <span>Say's</span></h2>
                  <div className="heading-divider"></div>
                </div>
              </div>
            </div>
            <div className="testimonial-slider owl-carousel owl-theme">
              {[
                { name: "Sylvia H Green", image: "/assets/web/img/221.jpg" },
                { name: "Gordo Novak", image: "/assets/web/img/222.jpg" },
                { name: "Reid E Butt", image: "/assets/web/img/223.jpg" },
                { name: "Parker Jimenez", image: "/assets/web/img/224.jpg" },
                { name: "Heruli Nez", image: "/assets/web/img/225.jpg" }
              ].map((testimonial, index) => (
                <div key={index} className="testimonial-single">
                  <div className="testimonial-content">
                    <div className="testimonial-author-img">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className="testimonial-author-info">
                      <h4>{testimonial.name}</h4>
                      <p>Customer</p>
                    </div>
                  </div>
                  <div className="testimonial-quote">
                    <span className="testimonial-quote-icon"><i className="flaticon-quote"></i></span>
                    <p>
                      There are many variations of passages available but the majority have
                      suffered to the alteration in some injected.
                    </p>
                  </div>
                  <div className="testimonial-rate">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className="fa fa-star"></i>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <section className="newslatter gray-color">
          <div className="container">
            <div className="row text-center">
              <div className="col-lg-8 col-md-12 ml-auto mr-auto">
                <div className="section-title3">
                  <h2 className="title">Subscribe Our Newsletter</h2>
                </div>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-lg-8 col-md-10 ml-auto mr-auto">
                <div className="subscribe-form">
                  <form id="mc-form" className="group d-md-flex align-items-center">
                    <input 
                      type="email" 
                      name="EMAIL" 
                      className="email" 
                      id="mc-email" 
                      placeholder="Enter Email Address" 
                      required 
                    />
                    <input 
                      className="btn btn-theme" 
                      type="submit" 
                      name="subscribe" 
                      value="Subscribe" 
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="rs-footer" className="rs-footer">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12 footer-widget">
                  <div className="footer-logo mb-30" style={{marginBottom: '10px !important'}}>
                    <a href="/"><img src="/assets/web/img/logo.png" alt="" /></a>
                  </div>
                  <div className="textwidget pb-30">
                    <p className="mt-0" style={{textAlign: 'justify'}}>Welcome to Dhantag India Private Limited Join a lifetime business opportunity with Dhantag India.</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 md-mb-30">
                  <h3 className="widget-title">Quick Links</h3>
                  <ul className="site-map">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about-us.html">About Us</a></li>
                    {/* <li><a href="/services.html">Services</a></li> */}
                    <li><a href="/contact-us.html">Contact Us</a></li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 pl-45 md-pl-15 md-mb-30">
                  <h3 className="widget-title">Policies</h3>
                  <ul className="site-map">
                    <li><a href="/privacy-policy.html">Privacy Policy</a></li>
                    <li><a href="/terms-and-conditions.html">Term & Condition</a></li>
                    <li><a href="/shipping-policy.html">Shipping Policy</a></li>
                    <li><a href="/refund-policy.html">Refund Policy</a></li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 footer-widget">
                  <h3 className="widget-title">Contact Us</h3>
                  <ul className="address-widget">
                    <li>
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                      <div className="desc">G-23, MJB Height Manglam Block C, Kalwar Road Hatoj Jhotwara Jaipur Rajasthan Pin Code : 302012</div>
                    </li>
                    <li>
                      <i className="fa fa-phone" aria-hidden="true"></i>
                      <div className="desc">
                        <a target="_blank" href="https://wa.me/8905520273?" rel="noopener noreferrer"> +91 8905520273</a>
                      </div>
                    </li>
                    <li>
                      <i className="fa fa-envelope-o" aria-hidden="true"></i>
                      <div className="desc">
                        <a href="mailto:info@dhantag.com">info@dhantag.com</a>
                      </div>
                    </li>
                  </ul>
                  <ul className="footer-social md-mb-30">
                    <li>
                      <a href="https://www.facebook.com/dhantagindiapvtltd/" target="_blank" rel="noopener noreferrer"><span><i className="fa fa-facebook"></i></span></a>
                    </li>
                    <li>
                      <a href="https://x.com/Dhantag28810" target="_blank" rel="noopener noreferrer"><span><i className="fa fa-twitter"></i></span></a>
                    </li>
                    <li>
                      <a href="https://wa.me/8905520273?" target="_blank" rel="noopener noreferrer"><span><i className="fa fa-whatsapp" aria-hidden="true"></i></span></a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/dhantag_india_pvt_ltd/" target="_blank" rel="noopener noreferrer"><span><i className="fa fa-instagram"></i></span></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="row y-middle">
                <div className="col-lg-12">
                  <div className="copyright text-center">
                    <p>
                      © {new Date().getFullYear()} All Rights Reserved. Dhantag India Private Limited
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <div id="scrollUp" className="orange-color">
        <i className="fa fa-angle-up"></i>
      </div>
    </div>
  );
};

export default LandingPage;