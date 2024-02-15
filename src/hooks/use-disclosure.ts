import { useCallback, useState } from 'react';

export const useDisclosure = (defaultIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, open, close, toggle };
};
