import React, { } from 'react';
import { OktaAuth } from '@okta/okta-auth-js';

const oktaAuth = new OktaAuth({
  issuer: 'https://cis.demo-connect.us/oauth2/default',
  clientId: '0oa49zm0l8U4WHON5697',
  redirectUri: window.location.origin + '/callback'
});


async function Initiate() {
  await oktaAuth.signInWithRedirect();

  return (
    <div>
      <div>
        <h1>
          {' '}
          Logging you in...
          {' '}
        </h1>
      </div>
    </div>
  );
}

export default Initiate;