import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

// Google Client ID
const GOOGLE_CLIENT_ID = '879616245300-bqtll6ar73n6o6lj1k2s5uqauum0vtrf.apps.googleusercontent.com';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export default function GoogleLogin({ onSuccess }: { onSuccess?: () => void }) {
  const { setUserInfo } = useApp();
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for Google API to load
    const checkGoogle = setInterval(() => {
      if (window.google?.accounts?.id && buttonRef.current) {
        clearInterval(checkGoogle);
        
        // Initialize Google Identity Services
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        // Render the button
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'center',
          width: 300,
        });
      }
    }, 100);

    return () => clearInterval(checkGoogle);
  }, []);

  const handleCredentialResponse = async (response: any) => {
    try {
      // Decode the JWT token
      const token = response.credential;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const { name, email, picture } = JSON.parse(jsonPayload);

      // Save user info
      setUserInfo({
        name,
        email,
        avatar: picture,
        isLoggedIn: true,
      });

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error decoding Google token:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div ref={buttonRef}></div>
    </div>
  );
}
