import React from 'react';
import Faq from 'react-faq-component';
import './Faqslan.css'; // Import your CSS file

const Faqslan = () => {
  const data = {
    title: "FAQ (How it works)",
    rows: [
      {
        title: "1. What are the initial investment costs involved in opening a Vinoot Herbals franchise?",
        content: (
          <div className="faq-content">
            The initial investment varies depending on factors like location, size, and setup. We provide detailed investment information in our franchise disclosure document.
          </div>
        )
      },
      {
        title: "2. What training and support does Vinoot Herbals provide to its franchisees?",
        content: (
          <div className="faq-content">
            We offer comprehensive training programs covering Ayurveda principles, treatment protocols, business operations, marketing, and franchise management. Ongoing support includes field visits, online resources, and regular communication.
          </div>
        )
      },
      {
        title: "3. What is the expected return on investment (ROI) for a Vinoot Herbals franchise?",
        content: (
          <div className="faq-content">
            While we can give guarantee specific results, we provide historical data and projections based on existing franchises. Your success will depend on various factors like your location, marketing efforts, and operational efficiency.
          </div>
        )
      },
      {
        title: "4. What is the target market for Vinoot Herbals franchises?",
        content: (
          <div className="faq-content">
            Our franchises cater to individuals seeking natural solutions for hair loss, dandruff, scalp concerns, and overall hair wellness. This includes health-conscious individuals, busy professionals, and those open to Ayurveda and natural remedies.
          </div>
        )
      },
      {
        title: "5. What are the ongoing fees associated with the Vinoot Herbals franchise model?",
        content: (
          <div className="faq-content">
            Franchise fees include an initial franchise fee, ongoing royalty fees, and marketing fees. We provide a detailed breakdown of all fees in our franchise disclosure document.
          </div>
        )
      },
      {
        title: "6. What is the term of the Vinoot Herbals franchise agreement?",
        content: (
          <div className="faq-content">
            The standard franchise agreement term is 10 years, with potential for renewal based on performance.
          </div>
        )
      },
      {
        title: "7. Can I learn more about specific franchise opportunities in my area?",
        content: (
          <div className="faq-content">
            Yes, please contact us directly to discuss your interest and schedule a consultation. We will share available opportunities and answer any further questions you may have.
          </div>
        )
      },
      {
        title: "8. What are the territorial rights granted to Vinoot Herbals franchisees?",
        content: (
          <div className="faq-content">
            We offer exclusive territorial rights within a defined geographic area to protect your investment and market potential.
          </div>
        )
      }
    ]
  };

  return (
    <div style={{ margin: '3rem' }}>
      <Faq data={data} />
    </div>
  );
};

export default Faqslan;
