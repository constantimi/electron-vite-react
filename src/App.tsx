import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

const App = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-row'>
                    <a
                        href='https://vite.dev'
                        target='_blank'
                        aria-label='Vite website'
                    >
                        <img src={viteLogo} className='logo' alt='Vite logo' />
                    </a>
                    <a
                        href='https://react.dev'
                        target='_blank'
                        aria-label='React website'
                    >
                        <img
                            src={reactLogo}
                            className='logo react'
                            alt='React logo'
                        />
                    </a>
                </div>
                <h1 className='font-semibold text-4xl'>
                    Electron + Vite + React
                </h1>
                <div className='p-2 flex flex-col items-center'>
                    <button
                        type='button'
                        className='p-1 px-2 w-32 bg-gray-100 rounded-md'
                        onClick={() => setCount(count + 1)}
                    >
                        count is {count}
                    </button>
                    <p>
                        Edit <code>src/App.tsx</code> and save to test HMR
                    </p>
                </div>
                <p className='text-gray-500'>
                    Click on the Vite and React logos to learn more
                </p>
            </div>
        </div>
    );
};

export default App;
