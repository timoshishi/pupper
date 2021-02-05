import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PuppyCard from './PuppyCard';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const PuppyProfileModal = ({ handleClose, open, dog }) => {
  const classes = useStyles();
  /* IN PARENT COMPONENT  SEE MatchList.js for example
  const [open, setOpen] = useState(false);
  const [dog, setDog] = useState(null);
  const handleOpen = (dog) => {
    setDog(dog);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  <PuppyProfileModal />
  <ComponentToClick onClick={handleOpen} dog={dog} handleOpen={handleOpen} />
*/

  // const [distance, setDistance] = useState(null);
  // const { userInfo } = useContext(UserContext);

  /*
  const getDistance = async () => {
    const proxyUrl = 'https://secure-island-98608.herokuapp.com/';
    var url = `https://www.zipcodeapi.com/rest/Lgz5EpY4q1TDKZbcPU4zfombbq4FdIwQV6lEDMgVNUsydGdkYsGzvudkDr1YNmLh/distance.json/48104/${dog.zip_code}/mile`;

    try {
      const response = await fetch(proxyUrl + url);
      const { distance } = await response.json();
      setDistance(distance);
      await console.log({ distance });
    } catch (err) {
      console.error('Error @getDistance', err.message);
    }
  };
  useEffect(() => {
    // getDistance();
  }, [dog]);

  */
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>{dog && <PuppyCard dog={dog} />}</Fade>
      </Modal>
    </div>
  );
};

export default PuppyProfileModal;
