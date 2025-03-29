import React from 'react'
import Navbar from '../../components/Navigation/Navbar.js'

export default function AboutUs() {

  return (
    <>
      <header className={'header about-header'}>
        <div className={'logo-div'}>
          <img id="logo" src={require("../../images/fairShareHorizontalLogo.webp")} alt="FairShare Logo" />
        </div>
        <Navbar location={'home'} user={localStorage.getItem('userId') ? true : false} />
      </header>
      <div className='about-wrapper-div'>
        <div className='top-about-div'></div>

        <div className='main-about-us-div'>
          <h2>About FairShare</h2>
          <img className='about-image' loading='lazy' src={require('../../images/aboutUsImage.webp')} alt='Teacher using computer' />

          <div className='about-div about-div'>
            <h3>Empowering Educators with AI-Driven Insights</h3>
            <p>At FairShare, we believe that technology should make teaching easier, not more complicated. Our mission is to bridge the gap between data and decision-making by providing AI-powered insights that help educators track student progress effortlessly.</p>
          </div>
          <div className='missing-div about-div'>
            <h3>Our Mission</h3>
            <p>We are dedicated to supporting teachers by reducing administrative workload, identifying struggling students early, and ensuring every learner gets the attention they need to succeed.</p>
          </div>
          <div className='why-built-div about-div'>
            <h3>Why We Built FairShare</h3>
            <ul>
              <li><strong>Educators First:</strong> We designed FairShare with direct input from teachers to ensure it meets real classroom needs.</li>
              <li><strong>AI with Purpose:</strong> Our AI-powered summaries transform raw student data into clear, actionable insights.</li>
              <li><strong>Efficiency & Impact:</strong> Less time spent tracking progress means more time spent teaching.</li>
            </ul>
          </div>
          <div className='actual-why-div about-div'>
            <h3>Why FairShare was actually built</h3>
            <p>Hi, my name is Haydon! I'm a software engineering student. Thank you for reading to this point! I build FairShare as my senior project in order to try out the MERN stack as well as develop my full-stack development skills. The idea of FairShare came to me as I thought about how I could improve how the educational experience for both students and educators. Groupwork can be frustrating for students as it does not always seem fair, though such is life. I think a lot of this percieved unfairness comes from the educator not being able to keep track of who does what or how students contribute. It would be difficult to stay on top of it all even if they really wanted to try. I developed FairShare to combat this issue. It is meant to deliver student and group information to educators in a helpful and efficient manner. Currenlty FairShare allows Educator users to create groups and tasks for Student users to join and do, and then delivers summaries of student and group progress on them. I consider this to be just a demo. I have a lot more ideas of things I would like to add such as features like group chats, grading helpers/measurements, and classes for groups, among many other things. There is also a lot of room for other improvments in things like styling, settings, and accessibility and I plan to continue making such improvments. Thank you for checking out FairShare!</p>
          </div>
        </div>
      </div>
    </>
  )
}
