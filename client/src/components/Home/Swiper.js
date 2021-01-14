import React, { useState, useContext } from 'react';
import SwiperCore, { Lazy, Navigation } from 'swiper';
import PropTypes from 'prop-types';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import '../../../node_modules/swiper/components/lazy/lazy.scss';
import '../../../node_modules/swiper/components/lazy/lazy.min.css';
import 'swiper/components/navigation/navigation.scss';
import { Box } from '@material-ui/core';
import Slide from './Slide';
import DogsContext from '../../context/dogs/dogsContext';
import ChatContext from '../../context/chat/chatContext';
import { useAuth0 } from '@auth0/auth0-react';
import woofBot from '../../utils/woofBot';
import PuppyModal from '../PuppyPopup/PuppyModal';
import LikeDislikeButtons from './LikeDislikeButtons';
SwiperCore.use([Lazy, Navigation]);

const Swiper = ({ dogs }) => {
  const dogArr = [...dogs];
  const [currentDogs, setCurrentDogs] = useState(dogArr.slice(0, 2));
  const { createMatch, incrementNewMatches } = useContext(DogsContext);
  const { incrementNewMessageCount, createMessage } = useContext(ChatContext);
  const { user } = useAuth0();

  const puppyMessage = () => {
    const messageObj = {
      from_human: false,
      user_id: user.sub,
      dog_id: dogArr[0].dog_id,
      body: woofBot(),
    };
    const timeout = Math.floor(Math.random() * (15000 - 3000) + 3000);
    setTimeout(async () => {
      await createMessage(messageObj);
      incrementNewMessageCount();
    }, timeout);
  };

  const [open, setOpen] = useState(false);
  const [dog, setDog] = useState(null);
  const handleOpen = (dog) => {
    setDog(dog);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDogs = (dir) => {
    if (dir === 'prev') {
      createMatch(user.sub, dogArr[0].dog_id);
      incrementNewMatches();
      //create a dummy message to user randomly at a random interval
      if (Math.random() > 0.7) {
        puppyMessage();
      }
      //reset the current dog that is in the swipe loop
      dogArr.splice(0, 1);
      setCurrentDogs(dogArr.slice(0, 1));
    } else if (dir === 'next') {
      dogArr.splice(0, 1);
      setCurrentDogs(dogArr.slice(0, 1));
    }
  };
  const handleClick = (type) => {
    if (type === 'like') {
      createMatch(user.sub, dogArr[0].dog_id);
      incrementNewMatches();
      //create a dummy message to user randomly at a random interval
      if (Math.random() > 0.7) {
        puppyMessage();
      }
      //reset the current dog that is in the swipe loop
      dogArr.splice(0, 1);
      setCurrentDogs(dogArr.slice(0, 1));
    } else {
      dogArr.splice(0, 1);
      setCurrentDogs(dogArr.slice(0, 1));
    }
  };
  return (
    <>
      <Box display='flex' align='center' my={5} style={{ zIndex: 1 }}>
        <PuppyModal
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
          dog={dog}
        />
        <ReactSwiper
          spaceBetween={20}
          slidesPerView={1}
          onSlideChange={(swipe) => {
            handleDogs(swipe.swipeDirection);
          }}
          onSwiper={(swiper) => {}}
          grabCursor={true}
          preloadImages={false}
          lazy={true}
          loop={true}
          navigation={{
            nextEl: '.likeButton',
            prevEl: '.dislikeButton',
          }}>
          {currentDogs.length
            ? currentDogs.map((dog) => {
                return (
                  <SwiperSlide key={`img_src_${dog.dog_id}`}>
                    <Slide dog={dog} setDog={setDog} handleOpen={handleOpen} />
                    <Box style={{ marginTop: '-5rem' }}>
                      <LikeDislikeButtons handleClick={handleClick} />
                    </Box>
                  </SwiperSlide>
                );
              })
            : null}
        </ReactSwiper>
      </Box>
    </>
  );
};

Swiper.propTypes = {
  dogs: PropTypes.array.isRequired,
};

export default Swiper;
