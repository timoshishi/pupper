import React from 'react';

const logo = 'https://cdn.auth0.com/blog/auth0-react-sample/assets/logo.png';

const Hero = () => (
  <div>
    <img src={logo} alt='React logo' width='120' />
    <h1>React Sample Project</h1>
    <p>
      This is a sample application that demonstrates an authentication flow for
      an SPA, using{' '}
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://auth0.com/docs/quickstart/spa/react'>
        React
      </a>
    </p>
  </div>
);

export default Hero;
