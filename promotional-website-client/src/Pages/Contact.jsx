import React from 'react'
import Logo from '../assets/Main-Logo.png';
import './styledPage.css';
import Icon1 from '../assets/Icons/smileChat.png';
import Icon2 from '../assets/Icons/chat.png';
import Icon3 from '../assets/Icons/location.png';
import Icon4 from '../assets/Icons/cell.png';

import Icon5 from '../assets/Icons/smaile.png';
import Icon6 from '../assets/Icons/equz.png';
import Icon7 from '../assets/Icons/paymentC.png';
import Icon8 from '../assets/Icons/mail.png';
import Icon9 from '../assets/Icons/msg.png';
import Icon10 from '../assets/Icons/play.png';

function Contact() {
   const IconsList=[
    {id:1,src:Icon1,name:"Chat for product",des:"Speak to our friendly team",link:"ceo@trainingtrains.com"},
    {id:2,src:Icon2,name:"Chat to support",des:"We're here to help.",link:"ceo@trainingtrains.com"},
    {id:3,src:Icon3,name:"Visit us",des:"Visit our main branch.",link:"View on Google Maps"},
    {id:4,src:Icon4,name:"Call us",des:"Mon-Fri from 9am to 9pm.",link:"+91 94988-60729"},
   ]

   const QuestionsList=[
    {id:0,src:Icon5,head:"Is there any demo class availiable?",body:''},
    {id:1,src:Icon6,head:"Can I change my course in between?",body:''},
    {id:2,src:Icon7,head:"What is your cancellation payment?",body:''},
    {id:3,src:Icon8,head:"How do I change my account email?",body:''},
    {id:4,src:Icon9,head:"How does support work?",body:''},
    {id:5,src:Icon10,head:"How online classes work?",body:''},
   ]

  return (
    <>
      <center><div className="whole-contact-container">
      <img src={Logo} alt='Training Trains'/>
        <h1>Contact our friendly team</h1>
        <p>Let us know how we can help.</p>
      </div></center>
      <div className="contact-section">
      {IconsList.map((item,key)=>(
        <div className="contact-section-item" key={item.id}>
          <img src={item.src} alt='Image'/>
          <br/>
          <h3>{item.name}</h3>
          <p>{item.des}</p>
          <br/>
          <a href=''>{item.link}</a>
        </div>
      ))}
      </div>
     <center> <div className="whole-contact-container-list">
        <h2>Frequently asked questions</h2>
        {QuestionsList.map((data,key)=>(

          <details key={key}>
        <summary>
        <div className='Contact-list-container'>
        <img src={data.src} alt={data.id}/>
        <p>{data.head}</p>
        </div>
        </summary>
        <article>{data.body}</article>
        </details>
        ))}
      </div></center>
    </>
  )
}

export default Contact