import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navigation/Navbar.js'
import './Home.css'; // Ensure the CSS file is imported

export default function Home() {
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      console.log("ScrollY:", scrollTop);
      setScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  return (
    <>
      <header className={`home-header ${scrolled ? "scrolled-header" : ""}`}>
        <div className="home-logo-div">
          <img id="logo" src={require("../../images/fairShareHorizontalLogo-white2.webp")} alt="FairShare Logo" />
        </div>
        <Navbar location="home" />
      </header>

      <div className="hero-div">
        <img id="hero-image" src={require("../../images/home-image-1.webp")} alt="Teacher working with students" />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content-div">
        <h1 className="hero-header-div">Empower Educators, <br /> Elevate Learning</h1>
        <p className="hero-p-div">Track student progress, manage tasks, and gain valuable insights — all in one intuitive dashboard.</p>
        <button className="hero-button">
          <strong>Try it Now</strong>
        </button>
      </div>

      <div className="home-content">
        <div className="home-content-div">
          <h2>What is FairShare?</h2>
          <p>FairShare is a productivity app designed to help students and educators manage group projects more effectively.</p>
          <ul>
            <li>Assign tasks to group members</li>
            <li>Track progress on tasks</li>
            <li>View group member statistics</li>
            <li>And more!</li>
          </ul>
        </div>

        <div className="home-content-div">
          <h2>How Does FairShare Work?</h2>
          <p>Getting started with FairShare is easy! Just follow these simple steps:</p>
          <ol>
            <li>Sign up for an account</li>
            <li>Create a group</li>
            <li>Invite group members</li>
            <li>Start assigning tasks!</li>
          </ol>
        </div>
      </div>
    </>
  );
}
