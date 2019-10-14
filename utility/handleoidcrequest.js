const registered_tool = require('../registered_data/tool.json');
const keys = require('../registered_data/keys.json');
const jwt = require('jsonwebtoken');

function handleOIDCQueryParam(queryParams){
    
    // Verify OIDC auth request 
    let tool = validateAuthRequest(queryParams);
    return createAuthResponse(queryParams, tool);
}

function validateAuthRequest(params) {

    const {
        scope,
        response_type,
        client_id,
        redirect_uri,
        login_hint,
        lti_message_hint,
        state,
        response_mode,
        nonce,
        prompt
    } = params;

    // VALIDATE MANDATORY PARAMS ARE PRESENT 
    {

        if (!scope) {
            throw new Error('Bad request - "scope" missing');
        }

        if (!response_type) {
            throw new Error('Bad request - "response_type" missing');
        }

        if (!client_id) {
            throw new Error('Bad request - "client_id" missing');
        }

        if (!redirect_uri) {
            throw new Error('Bad request - "redirect_uri" missing');
        }

        if (!login_hint) {
            throw new Error('Bad request - "login_hint" missing');
        }

        if (!response_mode) {
            throw new Error('Bad request - "response_mode" missing');
        }

        if (!nonce) {
            throw new Error('Bad request - "nonce" missing');
        }

        if (!prompt) {
            throw new Error('Bad request - "prompt" missing');
        }
    }

    // VALIDATE FIXED PARAMETERS

   {
       if (scope !== 'openid') {
           throw new Error('Bad request - invalid "scope", must be "openid"');
       }

       if (response_type !== 'id_token') {
           throw new Error('Bad request - invalid "response_type", must have value "id_token"');
       }

       if (response_mode !== 'form_post') {
           throw new Error('Bad request - invalid "response_mode", must have value "form_post"');
       }

       if (prompt !== 'none') {
           throw new Error('Bad request - invalid "prompt", must have value "id_token"');
       }
   }

   // VALIDATE redirect_uri
    {
        let tool;
        registered_tool.forEach((item) => {
            if (item.client_id === client_id) {
                tool = item;
            }
        });

        if (!tool) {
            throw new Error('Unauthorized client_id');
        }

        if (!tool.redirect_uris.includes(redirect_uri)) {
            throw new Error('Unregistered redirect_uri');
        }

        return tool;
    }
    
}

function createAuthResponse (queryParams, tool) {

    const {
        scope,
        response_type,
        client_id,
        redirect_uri,
        login_hint,
        lti_message_hint,
        state,
        response_mode,
        nonce,
        prompt
    } = queryParams;

    const currentTime = parseInt(Date.now()/1000);
    const expirationWindow = 60*10
    
    const expirationTIme = currentTime + expirationWindow;

    let authPrams = {
        iss: 'https://lti-1-3-platform.herokuapp.com/',
        aud: tool.client_id,
        iat: currentTime,
        exp: expirationTIme,
        //need to study
        sub: login_hint,
        nonce: nonce,
        'https://purl.imsglobal.org/spec/lti/claim/message_type': 'LtiResourceLinkRequest',
        'https://purl.imsglobal.org/spec/lti/claim/version': '1.3.0',

        'https://purl.imsglobal.org/spec/lti/claim/deployment_id': tool.deployment_id,
        //same as OIDC third party initiated login request
        'https://purl.imsglobal.org/spec/lti/claim/target_link_uri': tool.initiate_login_uri,
        'https://purl.imsglobal.org/spec/lti/claim/resource_link': { id: 'course_1', title: 'course for 10th standard'}

    }
        

    const id_token = createIDToken(authPrams);

    return {
        id_token: id_token,
        state: state,
        action: redirect_uri
    }
}

function createIDToken (authPrams) {
    return jwt.sign(authPrams, keys.private_key, { algorithm: 'RS256', keyid:"eb611f26-46df-4eeb-ab8e-1d11896b456b" });
}

module.exports = {
    handleOIDCQueryParam: handleOIDCQueryParam
}