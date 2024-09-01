// src/hooks/useToggle.ts
import { useState } from 'react';

const useToggle = (initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const toggle = () => setIsOpen(!isOpen);
  return [isOpen, toggle] as const;
};

export default useToggle;
