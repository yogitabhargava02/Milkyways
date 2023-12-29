import React from 'react';
import "./Aboutus.css";
import about from "../../assets/about.png";

export default function Aboutus() {
    return (
        <div className='about'>
            <div className='contain contain-bg'>
                <h2 className='milky'>
                    The Brand!
                </h2>
                <p className='sec-para'>
                    Dairy-2-Door is a revolutionary platform connecting local milkmen with customers, modernizing the age-old tradition of doorstep dairy
                    delivery. Experience the convenience of personalized subscriptions, real-time communication, and secure transactions—all
                    while preserving the warmth of community-driven service.!
                </p>
            </div>
            <br></br>
            <div className="about__banner contain">
                <div className="ab-left">
                    <h3 className="milky sec-para">HOW IT WORKS</h3>
                    <h3 className="head-sec sec-para">Know the process</h3>
                    <p className="p-text sec-para">
                        <ul className="custom-bullet-list">
                            <li>Create an Account</li>
                            <li>Login to Your Account</li>
                            <li>Explore Local Milkmen</li>
                            <li>Personalize Your Subscription</li>
                            <li>Real-Time Communication</li>
                            <li>Secure Transactions</li>
                            <li>Doorstep Delivery</li>
                            <li>Rate and Review</li>
                            <li>Manage Subscriptions</li>
                        </ul>
                    </p>
                </div>
                <span className="ab-right">
                    <img src={about} alt="aboutbanner" />
                </span>
            </div>
            <br></br>
            <div className='contain contain-bg'>
                <h2 className='milky'>
                    The Mission!
                </h2>
                <p className='sec-para' style={{ textAlign: " center" }}>
                    <span>At Dairy-2-Door</span>, we're on a mission to transform daily dairy services. Our commitment is to seamlessly blend the warmth of local milkman practices with the efficiency of modern technology. We prioritize community, innovation, and user empowerment to redefine your daily dairy experience.
                    <br></br>
                    <br></br>
                    Core Values:
                    <br></br>
                    <br></br>
                    Community-Centric Approach: Strengthening the bond between local milkmen and their communities.
                    Efficiency and Modernization: Streamlining traditional practices with innovative solutions.
                    Customer Empowerment: Providing choices, flexibility, and a user-friendly platform for a personalized dairy experience.
                </p>
            </div>
        </div >
    )
}
