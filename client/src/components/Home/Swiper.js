import React from 'react';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Lazy } from 'swiper';
import PropTypes from 'prop-types';
import 'swiper/swiper.scss';
import '../../../node_modules/swiper/components/lazy/lazy.scss';
import '../../../node_modules/swiper/components/lazy/lazy.min.css';

SwiperCore.use([Lazy]);

const Swiper = ({ dogs }) => {
  return (
    <div>
      <h3>Swiper</h3>
      <ReactSwiper
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
        preloadImages={false}
        lazy={true}>
        {dogs.map((dog, i) => (
          <SwiperSlide key={`img_src_${i}`}>
            <img src={dog.photos[0]} alt='puppy' className='swiper-lazy' />
          </SwiperSlide>
        ))}
      </ReactSwiper>
      {dogs ? <pre>{`${JSON.stringify(dogs)}`}</pre> : null}
    </div>
  );
};

Swiper.propTypes = {
  dogs: PropTypes.array.isRequired,
};

export default Swiper;
