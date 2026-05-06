import React from 'react'

const BasicLayoutHeader = () => {
  return (
   <header id="rs-header" className="rs-header style2">
  <div className="topbar-area style2">
    <div className="container">
      <div className="row y-middle">
        <div className="col-lg-6">
          <ul className="topbar-contact">
            <li>
              <i className="flaticon-email" />
              <a href="mailto:info@dhantag.com">info@dhantag.com</a>
            </li>
            <li>
              <i className="flaticon-call" />
              <a href="tel:+91 8905520273" className="last"> +91 8905520273</a>
            </li>
          </ul>
        </div>
        <div className="col-lg-6 text-right">
          <div className="toolbar-sl-share">
            <ul>
              <li>
                <a href="https://www.facebook.com/dhantagindiapvtltd/" target="_blank">
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a href="https://x.com/Dhantag28810" target="_blank">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a href="https://wa.me/8905520273?"><i className="fa fa-whatsapp" aria-hidden="true" />
                </a>
              </li>
              <li className="opening">
                <em>
                  <a href="https://www.instagram.com/dhantag_india_pvt_ltd/" target="_blank">
                    <i className="fa fa-instagram" />
                  </a>
                </em>
              </li>
              <li className="opening">
                <i className="flaticon-clock" />
                <span id="dateDiv">Monday, 1 May, 2024</span>
              </li>
              <li className="app-btn d-lg-none">
                <a id="nav-expander" className="humburger nav-expander quote-btn" href="/auth/login">  Login Now</a>
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
            <a href="index.html"><img src="assets/web/img/logo.png" alt /></a>
          </div>
          <div className="login-btn-mobile">
            <div className="expand-btn-inner search-icon">
              <ul>
                <li><a className="quote-btn" href="/auth/login"> Login Now</a></li>
              </ul>
            </div>
          </div>
          <div className="mobile-menu">
            <a href="#" className="rs-menu-toggle rs-menu-toggle-close secondary">
              <i className="fa fa-bars" />
            </a>
          </div>
        </div>
        <div className="col-lg-9 text-right">
          <div className="rs-menu-area">
            <div className="main-menu">
              <nav className="rs-menu pr-50 lg-pr-50 md-pr-0 rs-menu-close">
                <div className="header-top">
                  <div className="logo">
                    <a href="index.html">
                      <img className="logo-light" src="assets/web/img/logo.png" alt="Logo" />
                      <img className="logo-dark" src="assets/web/img/logo.png" alt="Logo" />
                    </a>
                  </div>
                  <div className="close-menu">
                    <button className="close-button">
                      <i className="icon-73" />
                    </button>
                  </div>
                </div>
                <ul className="nav-menu">
                  <li><a href="index.html">Home</a></li>
                  <li><a href="about-us.html">About Us</a></li>
                  <li><a href="services.html">Services</a></li>
                  <li><a href="contact-us.html">Contact Us</a></li>
                </ul>
              </nav>
            </div>
            <div className="expand-btn-inner search-icon hidden-md">
              <ul>
                <li><a className="quote-btn" href="/auth/login"> Login Now</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

  )
}

export default BasicLayoutHeader
