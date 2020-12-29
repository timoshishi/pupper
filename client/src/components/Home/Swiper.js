import React from 'react';
import SwiperCore, { Lazy } from 'swiper';
import PropTypes from 'prop-types';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import '../../../node_modules/swiper/components/lazy/lazy.scss';
import '../../../node_modules/swiper/components/lazy/lazy.min.css';
import Slide from './Slide';
SwiperCore.use([Lazy]);

const Swiper = ({ dogs }) => {
  return (
    <div>
      <h3>Swiper</h3>
      <ReactSwiper
        spaceBetween={20}
        slidesPerView={1}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
        preloadImages={false}
        lazy={true}>
        {dogs.length
          ? dogs.map((dog) => (
              <SwiperSlide key={`img_src_${dog.dog_id}`}>
                <Slide dog={dog} />
              </SwiperSlide>
            ))
          : null}
      </ReactSwiper>
      {dogs
        ? dogs.map((dog, i) => {
            return (
              <pre key={`dog_id_${dog.dog_id}`}>{`${JSON.stringify(dog)}`}</pre>
            );
          })
        : null}
    </div>
  );
};

Swiper.propTypes = {
  dogs: PropTypes.array.isRequired,
};

export default Swiper;
