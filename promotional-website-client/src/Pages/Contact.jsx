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

import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import { useNavigate } from 'react-router-dom';

function Contact() {

  const navigate=useNavigate(null);

   const IconsList=[
    {id:1,src:Icon1,name:"Chat for product",des:"Speak to our friendly team",link:"ceo@trainingtrains.com",action:"mailto:ceo@trainingtrains.com"},
    {id:2,src:Icon2,name:"Chat to support",des:"We're here to help.",link:"ceo@trainingtrains.com",action:"mailto:ceo@trainingtrains.com"},
    {id:3,src:Icon3,name:"Visit us",des:"Visit our main branch.",link:"View on Google Maps",action:'https://maps.app.goo.gl/3sdWUmpFgnfLXrBm6'},
    {id:4,src:Icon4,name:"Call us",des:"Mon-Fri from 9am to 9pm.",link:"+91 94988-60729",action:'tel:+919498860729'},
   ]

   const QuestionsList=[
    {id:0,src:Icon5,head:"Is there any demo class availiable?",body:'Yes, experience our teaching style firsthand with a free demo class! Get a glimpse of our comprehensive curriculum. Sign up now and start your learning journey today!'},
    {id:1,src:Icon6,head:"Can I change my course in between?",body:'Yes, flexibility is key! You can switch courses anytime to better match your interests. We’re here to ensure your learning journey is smooth and fulfilling.'},
    {id:2,src:Icon7,head:"What is your cancellation payment?",body:'No worries, we\'ve got you covered! Our cancellation policy is hassle-free, with minimal charges. Get a full refund minus a small processing fee within the first 3 days.'},
    {id:3,src:Icon8,head:"How do I change my account email?",body:'To update your email, please contact our admin team. They’ll quickly assist you in making the change. Your account security is our top priority!'},
    {id:4,src:Icon9,head:"How does support work?",body:'Our support team is here for you 08/5! Reach out via chat, email, or phone for quick assistance. We’re dedicated to resolving your issues and answering all your questions.'},
    {id:5,src:Icon10,head:"How online classes work?",body:'Experience seamless online learning with our interactive classes! Join live sessions, access recorded lectures, and participate in discussions from anywhere. Learn at your own pace with flexible scheduling!'},
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
          <a href={item.action} target='_blank'>{item.link}</a>
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
        <article className='article-contact-container'>{data.body}</article>
        </details>
        ))}
      </div>
      <div className="contact-bottom-container">
      <button><p>Ask us <ChatBubbleOutlinedIcon style={{fontSize:"medium"}}/></p></button>
      <h2>Ready to level op your business and skills?</h2>
      <p>Start your career now</p>
      </div>
      <div className="contact-btn-container">
        <button onClick={()=>navigate('/product')}>Product</button>
        <button onClick={()=>navigate('/course')}>Course</button>
      </div>
      
      </center>

    </>
  )
}

export default Contact