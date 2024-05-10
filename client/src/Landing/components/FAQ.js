import React, { useState } from 'react';
import './FAQ.css';
import Vnavbar from './Vnavbar';
import Footer from './Footer';

const FAQ = () => {
  const [isOpen, setIsOpen] = useState(Array(8).fill(false));

  const toggleDropdown = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
  };

  const handleMouseEnter = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = true;
    setIsOpen(newIsOpen);
  };

  const handleMouseLeave = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = false;
    setIsOpen(newIsOpen);
  };

  const questions = [
    'What are the initial investment costs involved in opening a Vinoot Herbals franchise?',
    'What training and support does Vinoot Herbals provide to its franchisees?',
    'What is the expected return on investment (ROI) for a Vinoot Herbals franchise?',
    'What is the target market for Vinoot Herbals franchises?',
    'What are the ongoing fees associated with the Vinoot Herbals franchise model?',
    'What is the term of the Vinoot Herbals franchise agreement?',
    'Can I learn more about specific franchise opportunities in my area?',
    'What are the territorial rights granted to Vinoot Herbals franchisees?',
  ];

  const answers = [
    'The initial investment varies depending on factors like location, size, and setup. We provide detailed investment information in our franchise disclosure document.',
    'We offer comprehensive training programs covering Ayurveda principles, treatment protocols, business operations, marketing, and franchise management. Ongoing support includes field visits, online resources, and regular communication.',
    'While we cannot guarantee specific results, we provide historical data and projections based on existing franchises. Your success will depend on various factors like your location, marketing efforts, and operational efficiency.',
    'Our franchises cater to individuals seeking natural solutions for hair loss, dandruff, scalp concerns, and overall hair wellness. This includes health-conscious individuals, busy professionals, and those open to Ayurveda and natural remedies.',
    'Franchise fees include an initial franchise fee, ongoing royalty fees, and marketing fees. We provide a detailed breakdown of all fees in our franchise disclosure document.',
    'The standard franchise agreement term is 10 years, with potential for renewal based on performance.',
    'Yes, please contact us directly to discuss your interest and schedule a consultation. We will share available opportunities and answer any further questions you may have.',
    'We offer exclusive territorial rights within a defined geographic area to protect your investment and market potential.',
  ];

  return (
    <div className='body-faq632s'>
      <Vnavbar />
      <div className='tot-faq632s'>
        <h2 className='head-faq632s'>FAQ's</h2>
        <div className="faq-container">

          <div className="faq-column">
            {questions.map((question, index) => (
              <div
                key={index}
                className="faq-item"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className="question">
                  {question}
                </div>
                {isOpen[index] && <div className="answer">{answers[index]}</div>}
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default FAQ;
