import { useEffect } from 'react';

const useInfiniteScroll = (onScroll: () => void, deps: React.DependencyList) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;

      const scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;

      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight;

      const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if (scrolledToBottom) {
        onScroll();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, deps);
};

export default useInfiniteScroll;
