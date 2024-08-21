import { useContext } from 'react';

import { bodyLockContext } from '../providers/BodyLockProvider';

export default function useBodyLock() {
  const context = useContext(bodyLockContext);
  if (!context) {
    throw new Error('useDarkTheme is null');
  }
  return context;
}
