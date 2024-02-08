import './buttonedit.css';
export const ButtonEdit = () => {
  return (
    <button className='buttonEdit'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width='24'
        height='24'
        className='bin'
      >
        <path fill='none' d='M0 0h24v24H0V0z' />
        <path
          className='path2'
          fill='#B5BAC1'
          d='M20.71 7.04l-3.75-3.75a.996.996 0 0 0-1.41 0l-12 12a.996.996 0 0 0-.29.53l-1 6a1 1 0 0 0 1.15 1.15l6-1c.19-.03.36-.11.5-.23l12-12a.996.996 0 0 0 0-1.41zM7.48 17.52l-1.48.25.25-1.48 8.27-8.27 1.23 1.23-8.27 8.27z'
        />
      </svg>
      <span className='tooltip'>Edit</span>
    </button>
  );
};
