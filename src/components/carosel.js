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
          src="https://st2.depositphotos.com/1015337/5539/i/600/depositphotos_55398757-stock-photo-business-accounting.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  className='slider'>
        <img
          className="d-block w-100"
          src="https://www.necc.mass.edu/newsroom/wp-content/uploads/sites/2/2020/07/accounting-1-facebook.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  className='slider'>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YWNjb3VudGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel></div>
  );
}
export default Slider;