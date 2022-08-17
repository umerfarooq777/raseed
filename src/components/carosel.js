import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
    <Carousel activeIndex={index} onSelect={handleSelect} variant="dark" className='slider'>
      <Carousel.Item  className='slider'>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-vector/tiny-people-auditors-accountant-with-magnifier-during-examination-financial-report-audit-service-financial-audit-consulting-service-concept-illustration_335657-2539.jpg?w=2000"
          alt="First slide"
        />
      
      </Carousel.Item>
      <Carousel.Item  className='slider'>
        <img
          className="d-block w-100"
          src="https://static.vecteezy.com/system/resources/previews/002/416/699/non_2x/financial-management-or-accounting-illustration-vector.jpg"
          alt="Second slide"
        />

        
      </Carousel.Item>
      <Carousel.Item  className='slider'>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-vector/briefcase-calculator-accountants-working-with-graphs-laptop-illustration_335657-251.jpg?w=2000"
          alt="Third slide"
        />

        
      </Carousel.Item>
    </Carousel></div>
  );
}
export default Slider;