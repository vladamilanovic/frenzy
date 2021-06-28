import { useEffect } from 'react';
import NProgress from 'nprogress';
// import CircularLoading from 'src/components/CircularLoading';

function SuspenseLoader() {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center w-100 h-100 bg-transparent"></div>
  );
}

export default SuspenseLoader;
