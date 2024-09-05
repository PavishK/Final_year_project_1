import React from 'react';
import Logo from '../images/development-sw.svg';
import Image1 from '../images/service_img/Business_web.svg';
import Image2 from '../images/service_img/Developer_activity.svg';
import Image3 from '../images/service_img/Mobile-bro.svg';
import Image4 from '../images/service_img/Mobile_development-bro.svg';
import './styledPage.css';

const details = [
  {
    id: 0,
    image: Image1,
    heading: "Business Websites",
    content: {
      "Multiple restaurants and Swiggy clone web and app": "Both Multiple restaurants and Swiggy clone web and app aim to provide a convenient and efficient way for customers to order food from their favorite restaurants and get it delivered to their doorstep.",
      "Binary MLM software": "Binary MLM software automates the entire process of managing a binary compensation plan, including tracking sales, managing commissions, and generating reports. It typically includes features such as user management, commission management, payment gateway integration, and reporting.",
      "Freelance Web application": "A freelance web application is a software application that allows freelance professionals to manage their work, projects, and clients from a single platform. It provides a range of features and tools to help freelancers streamline their workflows, communicate with clients, manage their time, and track their earnings."
    }
  },
  {
    id: 1,
    image: Image2,
    heading: "Software Development",
    content: {
      "E commerce": "A website that allows people to buy and sell physical goods, services, and digital products over the internet rather than at a brick-and-mortar location. Through an e-commerce website, a business can process orders, accept payments, manage shipping and logistics, and provide customer service.",
      "Apartment Management Software": "Apartment management software is a tool used to manage the day-to-day operations of apartment buildings and complexes. It helps landlords, property managers, and maintenance staff to streamline their work, reduce costs, and improve communication with tenants.",
      "Courier and Logistics Management Software": "It helps companies to optimize their delivery routes, manage their fleet of vehicles, track shipments, and monitor delivery status. The software can also handle tasks such as inventory management, order processing, and billing and invoicing."
    }
  },
  {
    id: 2,
    image: Image3,
    heading: "Android Apps",
    content: {
      "UberTaxi Clone": "Uber Taxi Clone can be customized to meet the specific needs of the business, and can be deployed on both Android and iOS platforms.",
      "Grocery Android App": "The Grocery Android App includes features such as discounts and offers, loyalty programs, and a rating and review system for products.",
      "Real Estate management": "It helps real estate businesses to streamline their operations and automate time-consuming tasks such as property listings, tenant management, rent collection, maintenance tracking, and financial reporting."
    }
  },
  {
    id: 4,
    image: Image4,
    heading: "App Development Training",
    content: {
      "Android App Training": "In Android app development, you have to learn and keep yourself updated with the latest features. Android always comes with a new version that has new features with better performance.",
      "Website Training": "With the curated Web Development syllabus, we assist our learners to focus on improving business along with coding skills that firms require. We encourage building technical skills through web development in our course.",
      "Ethical Hacking Training": "Government agencies and business organizations today are in constant need of ethical hackers to combat the growing threat to IT security. A lot of government agencies, professionals, and corporations now understand that if you want to protect a system, you cannot do it by just locking your doors."
    }
  }
];

function Service() {
  return (
    <div className="service-main-container">
      <header className="service-header">
        <h1 className="service-title">OurCompany <br />Service!</h1>
        <p className="service-description">
          We are a full-service digital agency that builds immersive user experiences. Our team creates exceptional visualization and thought-out functionality.
        </p>
      </header>
      <center>
        <section className="service-branding-section">
          <div className="service-section-item">
            <div className="service-left-container">
              <h2>Web & App Development Done Differently</h2>
              <p>
                What makes us unique in the development world is that we don't use WordPress, frameworks, or page builders. We meticulously write the code line by line. This gives us much more control over the design, and the website performs lightning fast because there's no bloated or messy code that slows it down.
              </p>
            </div>
          </div>
          <div className="service-section-item">
            <img src={Logo} alt="Services" />
          </div>
        </section>
      </center>
      <center><div className="page-end-line"></div></center>
      {details.map((item) => (
        <div className="service-item-container-main" key={item.id}>
          <img className='service-image' src={item.image} alt={item.heading} />
          <div className='service-description-container-item'>
            <h2 className='service-headings'>{item.heading}</h2>
            {Object.entries(item.content).map(([title, description], index) => (
              <details className='service-details' key={index}>
                <summary className='service-summary'>{title}</summary>
                <p className='service-desc'>{description}</p>
              </details>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Service;





    {/* <section className="service-branding-section">
    <div className="service-section-item">
    <div className="service-left-container">
       <h2>Internship And In-Plant Training</h2>
       <ul>
        <li>2 or more Certificates</li>
        <li>Project Exposure in Live Serve</li>
        <li>Post Support for your Project / Seminar / Presentation etc.</li>
        <li>Start Up India Campaign Guidance</li>
        <li>Free Interview Coaching</li>
        <li>Tips for getting selected in Campus Recruitment</li>
       </ul>
    </div>
     
    </div>
      <div className="service-section-item">
        <img src={Logo} alt="Services" />
      </div>
    </section>
    </div>

    <div className="service-item-container-main">
      <img src='' alt='Image'/>
      <div className='service-description-container-item'>
        
      </div> */}