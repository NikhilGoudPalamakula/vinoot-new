import React from 'react';
import './Feedback.css'; // Create a CSS file for styling

const Card = ({ imgSrc, title, description }) => {
  return (
    <div>
        
    <div className="card749s">
        
      <div className="face749s face1749s">
        <div className="content749s">
          <img src={imgSrc} alt={title} className='img-749s' style={{height:'150px',width:'150px'}}/>
          <h3 className='tit-749s'>{title}</h3>
        </div>
      </div>
      <div className="face749s face2749s">
        <div className="content749s">
          <p className='para-749s'>{description}</p>
          {/* <a href="#" className='anchor-749s'>Read More</a> */}
        </div>
      </div>
    </div>
    </div>
  );
};

const CardContainer = () => {
  const cardsData = [
    {
      imgSrc: 'https://img.freepik.com/premium-vector/realistic-vector-content-man-white-background_873925-470168.jpg?w=740',
      title: 'Sandy',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.'
    },
    {
      imgSrc: 'https://img.freepik.com/free-photo/young-man-happy-expression-business-desk-company-concept-ai-generated_1194-589229.jpg?t=st=1708750004~exp=1708753604~hmac=92b98c1dbcb184079b523820aacdcb3bb7e1a1cbff9252b594239c79013f34f4&w=900',
      title: 'Sunil',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.'
    },
    {
      imgSrc: 'https://img.freepik.com/free-photo/3d-rendering-beautiful-girl-superhero-costume-city_1142-54915.jpg?t=st=1708750065~exp=1708753665~hmac=ffb51d74abbfa69fd1144c29fb5f30a1f4558478a243510bd43c33d4a70dbca7&w=740',
      title: 'Sweety',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.'
    }
  ];

  return (
    <div>
        <h2 className='feed-642s'>Feedback</h2>
    <div className="container749s">
      {cardsData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
    </div>
  );
};

export default CardContainer;
