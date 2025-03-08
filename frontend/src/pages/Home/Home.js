import React from "react"

export default function Home() {
  return (
    <>
      <div className="hero-div">
        <div className="hero-content-div">
          <img id="hero-image" src={require('../../images/hero-image.webp')} alt='Teacher working with students' />

          <button className="hero-button">
            <strong>Start Using FairShare Today!</strong>
          </button>
        </div>
        <div className='hero-overlay'></div>

      </div>
      <div className="home-content">
        <div className="home-content-div">
          <h2>What is FairShare?</h2>
          <p>FairShare is a productivity app designed to help students and educators manage group projects more effectively. With FairShare, you can:</p>
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
  )
}
