import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navigation/Navbar.js'
import { Link } from 'react-router-dom';
import './Home.css'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [scrolledToBottom, setScrolledToBottom] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      console.log(scrollPosition)
      setScrolled(scrollPosition > 50)
      setScrolledToBottom(scrollPosition > 1000)
    };

    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, []);

  return (
    <>
      <header className={`home-header ${scrolled ? 'scrolled-header' : ''}`}>
        <div className='home-logo-div'>
          <img id='logo' src={require('../../images/fairShareHorizontalLogo-white2.webp')} alt='FairShare Logo' />
        </div>
        <Navbar location={'home'} />
      </header>

      <div className='hero-div'>
        <img id='hero-image' src={require('../../images/home-image-1.webp')} alt='Teacher working with students' />
        <div className="hero-overlay"></div>
      </div>
      {scrolledToBottom ?
        <>
          <div className={`hero-content-div ${scrolledToBottom ? 'bottom-hero-section' : ''}`}>
            <h1 className='hero-header-div'>Unlock Smarter Teaching, <br />  Effortless Tracking</h1>
            <p className='hero-p-div white-texty'>Create your free account today and start gaining AI-powered insights into student progress.</p>
            <Link to='/sign-in'>
              <button className='hero-button'>
                <strong>Create Your Free Account</strong>
              </button>
            </Link>
          </div>
        </>
        :
        <>
          <div className={'hero-content-div'}>
            <h1 className='hero-header-div'>Empower Educators, <br /> Elevate Learning</h1>
            <p className='hero-p-div'>Track student progress, manage tasks, and gain valuable insights — all in one intuitive dashboard.</p>
            <Link to='/sign-in'>
              <button className='hero-button'>
                <strong>Try it Now</strong>
              </button>
            </Link>
          </div>
        </>
      }


      <div className='home-content'>
        <div className='home-middle-content-div'>
          <div className='home-image-div'>
            <img className='home-image' loading='lazy' src={require('../../images/fairShare-AI.webp')} alt="Teacher working with students" />
          </div>
          <div className='ai-text-div'>
            <h4>AI and Educators come together with FairShare</h4>
            <p>FairShare combines AI-driven insights with educator expertise to track student progress and enhance learning.</p>
            <ul>
              <li><strong>AI-Powered Insights</strong> – Get smart summaries of student progress to identify learning trends</li>
              <li><strong>Support Where It’s Needed</strong> – Identify struggling students early for timely intervention.</li>
              <li><strong>Educator-Centered Design</strong> – Provides actionable data without overwhelming details.</li>
            </ul>
          </div>
        </div>

        <div className="home-middle-content-div">
          <div className='why-text-divider-div'>
            <div className='space-divider-div'></div>
            <div className='why-text-div'>
              <h4>Why FairShare?</h4>
              <p>Getting started with FairShare is easy! Just follow these simple steps:</p>
              <ul>
                <li><strong>Assign & Track</strong> – Educators assign tasks, and FairShare monitors progress in real time.</li>
                <li><strong>AI-Powered Summaries</strong> – Get clear, concise insights into student performance.</li>
                <li><strong>Less Time, More Impact</strong> – Reduce manual tracking so educators can focus on teaching.</li>
                <li><strong>Personalized Support</strong> – Identify students who need help and provide targeted guidance.</li>
              </ul>
            </div>
          </div>
          <div className='home-image-div'>
            <img className='home-image' loading='lazy' src={require('../../images/teacher-using-computer.webp')} alt='Teacher using computer' />
          </div>
        </div>

      </div>
      <div className='home-final-div'>
      </div>
    </>
  );
}
