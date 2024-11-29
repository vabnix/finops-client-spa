// utils/auth0-config.ts
export const auth0Config = {
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN!,
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!,
    authorizationParams: {
      redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    },
  };