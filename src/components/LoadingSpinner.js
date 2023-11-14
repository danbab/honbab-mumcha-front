import React from 'react';

/**
 * axios 통신으로 값을 받아올때, 다 받아오기도 전에 값을 쓰려고하니 오류가 남.
 * 로딩을 줘서 값을 다 받아올때까지 로딩하라고 만든 로딩스피너.
 */

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-green-500 flex justify-center items-center">Loading</div>
    </div>
  );
};

export default LoadingSpinner;