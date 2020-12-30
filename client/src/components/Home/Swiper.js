import React, { useState, useEffect } from 'react';
import SwiperCore, { Lazy } from 'swiper';
import PropTypes from 'prop-types';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import '../../../node_modules/swiper/components/lazy/lazy.scss';
import '../../../node_modules/swiper/components/lazy/lazy.min.css';
import Slide from './Slide';
SwiperCore.use([Lazy]);

const Swiper = ({ dogs }) => {
  const dogArr = [...dogs];
  const [currentDogId, setCurrentDogId] = useState(null);
  const [currentDogs, setCurrentDogs] = useState(dogArr.slice(0, 2));

  const handleDogs = (dir) => {
    if (dir === 'prev') {
      console.log(dir);
      dogArr.splice(0, 1);
      setCurrentDogs(dogArr.slice(0, 2));
      console.log({ dogArr, currentDogs });
    } else if (dir === 'next') {
      console.log(dir);
      //addMatch(currentDogs[0].dog_id);
      dogArr.splice(0, 1);
      setCurrentDogs(dogArr.slice(0, 2));
      console.log({ dogArr, currentDogs });
    }
  };

  return (
    <div>
      <h3>Swiper</h3>
      <ReactSwiper
        spaceBetween={20}
        slidesPerView={1}
        onSlideChange={(swipe) => {
          handleDogs(swipe.swipeDirection);
        }}
        onSwiper={(swiper) => {}}
        preloadImages={false}
        lazy={true}
        loop={true}>
        {currentDogs.length
          ? currentDogs.map((dog) => {
              return (
                <SwiperSlide key={`img_src_${dog.dog_id}`}>
                  <Slide dog={dog} />
                </SwiperSlide>
              );
            })
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
