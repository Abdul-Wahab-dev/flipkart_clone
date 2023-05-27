import React from "react";

const Footer = (props) => {
  return (
    <footer>
      <div className="container">
        <div className="d-flex footer-uls-container">
          <ul className="footer-ul">
            <li className="footer-ul-heading">ABOUT</li>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
          <ul className="footer-ul">
            <li className="footer-ul-heading">HELP</li>
            <li>Payment</li>
            <li>Shipping</li>
            <li>Cancellation & Return</li>
            <li>FAQ</li>
          </ul>
          <ul className="footer-ul">
            <li className="footer-ul-heading">POLICY</li>
            <li>Return Policy</li>
            <li>Terms of use</li>
            <li>Security</li>
            <li>Privacy</li>
            <li>Sitemap</li>
            <li>EPR Compliance</li>
          </ul>
          <ul className="footer-ul">
            <li className="footer-ul-heading">Soical</li>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Youtube</li>
          </ul>
          <ul className="footer-ul footer-ul-border-left">
            <li className="footer-ul-heading">Mail Us:</li>
            <li>
              Flipkart Internet Private Limited, Buildings Alyssa, Begonia &
              Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli
              Village, Bengaluru, 560103, Karnataka, India
            </li>
          </ul>
          <ul className="footer-ul footer-ul-office-add">
            <li className="footer-ul-heading">Registered Office Address:</li>
            <li>
              Flipkart Internet Private Limited, Buildings Alyssa, Begonia &
              Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli
              Village, Bengaluru, 560103, Karnataka, India CIN :
              U51109KA2012PTC066107 Telephone: 1800 202 9898
            </li>
          </ul>
        </div>
        <div className="footer-last">
          <ul className="footer-last-ul">
            <li>Sell On Flipkart</li>
            <li>Advertise</li>
            <li>Gift Cards</li>
            <li>Help Center</li>
            <li>© 2007-2021 Flipkart.com</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
