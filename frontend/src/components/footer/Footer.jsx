import "./footer.css";
import React from 'react';


const AirbnbFooter = () => {
  return (
    <footer className="footer">
  <div className="footer-content">
    <div className="footer-logo"><img src="https://1ststepaccounting.com/wp-content/uploads/2017/07/airbnb-logo.png" style={{width:"50px"}}/></div>
    <div className="footer-links">
      <a href="#" className="footer-link">Home</a>
      <a href="#" className="footer-link">About</a>
      <a href="#" className="footer-link">Contact</a>
      <a href="#" className="footer-link">Terms</a>
      <a href="#" className="footer-link">Privacy</a>
    </div>
    <div className="footer-text">© 2023 Your Company. All rights reserved.</div>
  </div>
</footer>

  );
};

export default AirbnbFooter;