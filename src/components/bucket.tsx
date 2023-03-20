import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import { Header } from 'semantic-ui-react';
import { S3Client,S3 } from "@aws-sdk/client-s3"
import { ListObjectsCommand, GetObjectCommand } from "@aws-sdk/client-s3"
// const {fromIni} = require("@aws-sdk/credential-providers");
// Resolve Amplify Build issue
import { fromWebToken } from "@aws-sdk/credential-providers";


const oktaAuth = new OktaAuth({
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri:
    process.env.REACT_APP_OKTA_BASE_REDIRECT_URI + "/callback"
});

// function openIdProvider() {
//   var access_token = "";
//   const { oktaAuth } = useOktaAuth()
//   oktaAuth.tokenManager.get("accessToken")
//   .then(function(access_token) {
//     // console.log(access_token);
//     // console.log(access_token.scopes);
//     return access_token
//     // JSON.stringify(jwt_decode(token), null, 4); 
//   })
//   .catch(function(err) {
//     console.log("Unable to retrieve accessToken from local storage");
//   });
//    return access_token;
// }

// function callS3() {

//   const bucketInfo = {
//     'Bucket': 'airforceweathersensordatabucket'
//   }
//   console.log(s3client.listObjects(bucketInfo));

// // e.g.: example.okta.com
// var AWS_OIDC_PROVIDER_URL = 'arn:aws:iam::204352680806:oidc-provider/cis.demo-connect.us/oauth2/aus40obabgLlOrR4x697';
// // e.g.: arn:aws:iam::123456789012:role/OktaSampleRole
// var AWS_ROLE_ARN = 'arn:aws:iam::204352680806:role/OktaOIDCroleReadS3';
// // e.g.: us-east-1
// var AWS_REGION = 'us-east-2';
// // e.g.: example-s3-bucket
// var AWS_S3_BUCKET_NAME = 'airforceweathersensordatabucket';

// // e.g.: https://example.okta.com
// var OKTA_ORG_URL = 'https://cis.demo-connect.us';
// // e.g.: aBCdEf0GhiJkLMno1pq2
// var OKTA_CLIENT_ID = '0oa4fj6bv2EyiLEER697';

// // const s3Client = new S3Client({
// //   region: "us-east-2"
// // });

// // const s3 = new S3({
// //   region: "us-east-2",
// //   credentials: fromIni({profile: 'demookta'})
// // });

// // WORKS with local creds
// // const s3 = new S3({
// //   region: "us-east-2",
// //   credentials: {
// //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// //   },
// // });
  
  
  
//   // uploadButton.addEventListener('click', function () {
//   //   var file = fileChooser.files[0];
//   //   if (file) {
//   //     results.innerHTML = '';
//   //     // e.g.: "okta-00u0abcd1eFghIJKl2m3/Ajax-loader.gif"
//   //     var objKey = 'okta-' + oktaUserId + '/' + file.name;
//   //     var params = {
//   //       Key: objKey,
//   //       ContentType: file.type,
//   //       Body: file,
//   //       ACL: 'public-read'
//   //     };
//   //     bucket.putObject(params, function (err, data) {
//   //       if (err) {
//   //         results.innerHTML = 'ERROR: ' + err;
//   //       } else {
//   //         listObjs();
//   //       }
//   //     });
//   //   } else {
//   //     results.innerHTML = 'Nothing to upload.';
//   //   }
//   // }, false);
  

// }

// function listObjs() {
//   var prefix = 'okta-' + oktaUserId;
//   bucket.listObjects({ Prefix: prefix }, function (err, data) {
//     if (err) {
//       results.innerHTML = 'ERROR: ' + err;
//     } else {
//       var objKeys = "";
//       data.Contents.forEach(function (obj) {
//         objKeys += obj.Key + "<br>";
//       });
//       results.innerHTML = objKeys;
//     }
//   });
// }

function  Bucket() {
  const { authState, oktaAuth } = useOktaAuth();
  const [bucketContents, setBucketContents] = useState(null);

// oktaAuth.tokenManager.get("accessToken")
//   .then(function(access_token) {
//     console.log('TOKEN ' + access_token + ' END');
//     // accessToken = JSON.stringify(access_token);
//     // console.log(typeof(accessToken));  //String
//     // console.log(typeof(access_token));  //Object Token
//     // console.log(accessToken);
//   })
//   .catch(function(err) {
//     console.log("Unable to retrieve accessToken from local storage");
//   });

  // oktaAuth.tokenManager.get("idToken")
  // .then(function(token) {
  //   console.log(token);
  // })
  // .catch(function(err) {
  //    console.log("Unable to retrieve idToken from local storage");
  // });
  


  // const getTokenFromOkta = async () =>  {
  //   const okta_token = await oktaAuth.tokenManager.get("accessToken");
  //   console.log(okta_token.accessToken);
  //   return okta_token.accessToken;
  // }
  
  const getTokenFromOkta = async () =>  {
    const okta_token = await oktaAuth.tokenManager.get("idToken");
    // console.log(jwt_decode(okta_token.idToken));
    // return jwt_decode(okta_token.idToken);
    const token_value = okta_token.idToken;

    console.log(token_value);
    return(token_value);

  }

  const getObjectFromS3 = async () =>  {
    const command = new GetObjectCommand(objectInput);
    console.log(await s3client.send(command));
  }

  var oidcCredentials = fromWebToken({
    roleArn: "arn:aws:iam::204352680806:role/OktaOIDCroleReadS3",
    roleSessionName: "session_124",
    durationSeconds: 7200,
    // webIdentityToken: "eyJraWQiOiJBRzg2VVNNUHQydU54Uzd0NVhqZ2dGUEN1LWhRMVJGMkJPQVdZSEhCaHRnIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMHUzeHM3MHpwWDJPaUgxbjY5NyIsIm5hbWUiOiJNYXR0IENhcnRlciIsImVtYWlsIjoibWF0dC5jYXJ0ZXJAb2t0YS5jb20iLCJ2ZXIiOjEsImlzcyI6Imh0dHBzOi8vZGVtby0tY2lzZm9yZmVkcHJlcC5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6IjBvYTQ5em0wbDhVNFdIT041Njk3IiwiaWF0IjoxNjc5MzMyNTU3LCJleHAiOjE2NzkzMzYxNTcsImp0aSI6IklELjVGLXR6RktEOGpZeFBNa1gwc0U4T1A2WEJSbzBGeGg3bUhMcDU0Y2dZYzgiLCJhbXIiOlsic3drIl0sImlkcCI6IjAwbzN4czcwcW5yVld6ZUpmNjk3Iiwibm9uY2UiOiJRN0I2bnVIbG5EOWZPRzFwY0VjV1MxYW5aZmh4cjM0b3MzeE5TWGlDQTY3MlJKdnBEa0lYNnJHYTA0ckxSQWFmIiwicHJlZmVycmVkX3VzZXJuYW1lIjoibWF0dC5jYXJ0ZXJAb2t0YS5jb20iLCJhdXRoX3RpbWUiOjE2NzkzMzI1NTUsImF0X2hhc2giOiJ5WlhSd2ktOXloMXZQTlRQQW1zc1ZRIn0.djlqlKHJeQeDBLz_evfe8j01KuDnH-YT6n3RsmNXnbF8REXWlhjpbkdj0za2ZOTKuNtCZ3D2zo42OUKR8J-J1XWiYxiM2E6z52iELUWF_edgH6JNPIeysWke4ZKrOAknkVvWUlOm9H_xlOaeBkhVfClCdIZ7-xWG9agMG2mxxFQjmh1IH3GyfhuISy7hPsxMmmRSyOlm-eShLA_nDa_OAXMlt_e2Dij_fysdL0XtJD-zRLvvAFNrC_jfoS2q-R81cediwZjb_Gu6l-E_0PZynLS1L6sz7yPSoh1EkJesGuKzQb2I7A_HP3KiplLEX-f6o-ql4c7QZhuLxNGO4U7b5A"
    webIdentityToken:  getTokenFromOkta()
  })
  // console.log(oidcCredentials);

  const s3client = new S3({
    region: "us-east-2",
    credentials:  oidcCredentials,
    // credentials: fromWebToken({
    //   // Required. ARN of the role that the caller is assuming.
    //   roleArn: "arn:aws:iam::204352680806:role/OktaOIDCroleReadS3",
    //   // Required. The OAuth 2.0 access token or OpenID Connect ID token that is provided by the
    //   // identity provider.
      
    //   // Optional. Custom STS client configurations overriding the default ones.
    //   // clientConfig: { region },
    //   // Optional. A function that assumes a role with web identity and returns a promise fulfilled
    //   // with credentials for the assumed role.
    //   // roleAssumerWithWebIdentity,
    //   // Optional. An identifier for the assumed role session.
    //   roleSessionName: "session_123",
    //   // Optional. The fully qualified host component of the domain name of the identity provider.
    //   providerId: "cis.demo-connect.us",
    //   // Optional. ARNs of the IAM managed policies that you want to use as managed session.
    //   policyArns: [{ arn: "arn:aws:iam::204352680806:policy/S3writeToBucket" }],
    //   // Optional. An IAM policy in JSON format that you want to use as an inline session policy.
    //   // policy: "JSON_STRING",
    //   // Optional. The duration, in seconds, of the role session. Default to 3600.
    //   durationSeconds: 7200,
    //   webIdentityToken:  ""
    // }),
  });
  
  const input = {
    "Bucket": "airforceweathersensordatabucket"
  };

  const objectInput = {
    "Bucket": "airforceweathersensordatabucket",
    "Key": "turtle-sculpture-3.jpg"
  }

  useEffect(() => {
    if (!authState) {
      // When user isn't authenticated, forget any user info
      setBucketContents(null);
      
    } else {
      // callS3();
      // console.log(s3client.listObjects(input));
      getObjectFromS3();

     //setBucketContents('foobar');
      // Call AWS API
      // oktaAuth.getUser().then((info) => {
      //   setBucketContents(info);
      // });
    }
  }, [authState, input]); // Update if authState changes

  if (!bucketContents) {
    return (
      <div>
        <p>Fetching S3 bucket contents...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>
          {' '}
          Okta-Protected S3 Buckets
          {' '}
        </h1>
      </div>
    </div>
  );
};
export default Bucket;