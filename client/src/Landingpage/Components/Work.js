import React from "react";
// import PickMeals from "../Assets/pick-meals-image.png";
// import ChooseMeals from "../Assets/choose-image.png";
// import DeliveryMeals from "../Assets/delivery-image.png";
import Regrowth from "../Components/Regrowth";
const Work = () => {
  // const workInfoData = [
  //   {
  //     image: PickMeals,
  //     title: "Pick Meals",
  //     text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
  //   },
  //   {
  //     image: ChooseMeals,
  //     title: "Choose How Often",
  //     text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
  //   },
  //   {
  //     image: DeliveryMeals,
  //     title: "Fast Deliveries",
  //     text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
  //   },
  // ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <span className="primary-heading">How It Works</span>
        <p className="primary-text">
        Scalp cleaning with herbal powder, raising temperature, cleansing follicles, and spraying herbal solution.
        </p>
      </div>
      <div className="work-section-bottom">
        {/* {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))} */}
        <Regrowth/>
      </div>
    </div>
  );
};

export default Work;
