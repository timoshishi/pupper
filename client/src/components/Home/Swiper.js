import React, { useState, useContext, useEffect } from 'react';
import SwiperCore, { Lazy } from 'swiper';
import PropTypes from 'prop-types';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import '../../../node_modules/swiper/components/lazy/lazy.scss';
import '../../../node_modules/swiper/components/lazy/lazy.min.css';
import Slide from './Slide';
import DogsContext from '../../context/dogs/dogsContext';
import { useAuth0 } from '@auth0/auth0-react';

SwiperCore.use([Lazy]);

const Swiper = ({ dogs }) => {
  const dogArr = [...dogs];
  const [currentDogs, setCurrentDogs] = useState(dogArr.slice(0, 2));
  const { createMatch } = useContext(DogsContext);
  const { user } = useAuth0();
  //FIXME: Not rendering dogs correctly, need to figure out bugs;
  const handleDogs = (dir) => {
    if (dir === 'prev') {
      createMatch(user.sub, dogArr[0].dog_id);
      dogArr.splice(0, 1);
      setCurrentDogs(dogArr.slice(0, 1));
    } else if (dir === 'next') {
      dogArr.splice(0, 1);
      setCurrentDogs(dogArr.slice(0, 1));
    }
  };

  useEffect(() => {});

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
