import { useState, useEffect } from 'react';

const useMessageEventListener = () => {
  const [message, setMessage] = useState(null);

  const handleMessageEvent = (event: { data: string; }) => {
    if (typeof event.data!== 'string') {
      return;
    }
    const data = JSON.parse(event.data);
    setMessage(data);
  };

  useEffect(() => {
    window.addEventListener('message', handleMessageEvent);
    return () => {
      window.removeEventListener('message', handleMessageEvent);
    };
  }, []);

  return message;
};

export default useMessageEventListener;