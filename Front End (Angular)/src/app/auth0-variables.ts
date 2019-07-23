interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
  }
  
  export const AUTH_CONFIG: AuthConfig = {
    clientID: 'QI0CyuHzzYhhEmBpu4D135LSrxACxa5u',
    domain: 'dylanmartin.eu.auth0.com',
    callbackURL: 'http://localhost:4200/callback'
  };