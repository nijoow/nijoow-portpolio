import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * 클라이언트 마운트 여부를 반환한다.
 * 서버/최초 렌더에서는 false, 클라이언트 하이드레이션 이후 true.
 * useState+useEffect 패턴과 달리 effect 내 setState 캐스케이드 없이 동작한다.
 */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
