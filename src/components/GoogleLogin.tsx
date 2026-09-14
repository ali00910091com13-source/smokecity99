import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

// Google Client ID - Replace with your actual Google OAuth Client ID
// Get it from: https://console.cloud.google.com/apis/credentials
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

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
      {GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com' && (
        <div className="text-center text-sm text-orange-600 bg-orange-50 p-4 rounded-lg max-w-md">
          <p className="font-bold mb-2">⚠️ تنظیمات لازم برای ورود با گوگل:</p>
          <ol className="text-right space-y-1">
            <li>1. به <a href="https://console.cloud.google.com/apis/credentials" target="_blank" className="text-blue-600 underline">Google Cloud Console</a> بروید</li>
            <li>2. یک پروژه جدید بسازید یا پروژه موجود را انتخاب کنید</li>
            <li>3. OAuth 2.0 Client ID بسازید (Web application)</li>
            <li>4. دامنه خود را در Authorized JavaScript origins اضافه کنید</li>
            <li>5. Client ID را در فایل <code className="bg-gray-200 px-2 py-1 rounded">src/components/GoogleLogin.tsx</code> جایگزین کنید</li>
          </ol>
        </div>
      )}
    </div>
  );
}
