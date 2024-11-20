import React, {useState, useEffect} from 'react';
import { BeakerIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    let Links = [
        { name: 'SignUp', link: '/signup'},
        { name: 'CreateBlog', link: '/create-post' },
        { name: 'BlogPost', link: '/posts' },
    ];

    const checkLoginStatus = () => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); 
    };

    useEffect(() => {
        checkLoginStatus();

        const handleStorageChange = () => checkLoginStatus();
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };

    },[]);

    const handleButtonClick = () => {
        if(isLoggedIn){
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            navigate('/login');
        }
        else{
            navigate('/login');
        }
    }

    return (
        <div className="shadow-md w-full fixed top-0 left-0">
            <div className="md:px-10 py-4 px-10 md:flex justify-between items-center bg-white py-4">
                <div className="flex text-2xl cursor-pointer items-center gap-2">
                    <BeakerIcon className='w-7 h-7 text-blue-600' />
                    <span className="font-bold">blogpost</span>
                </div>

                <ul className='md:flex pl-9 md:pl-0'>
                    {Links.map((link, index) => (
                        <li
                            key={index}
                            className='font-semibold my-7 md:my-0 md:ml-8'>
                            <a href={link.link}>{link.name}</a>
                        </li>
                    ))}
                    <button onClick={handleButtonClick} className='btn bg-blue-600 text-white py-1 px-3 md:ml-8 rounded md:static'>{isLoggedIn ? 'Log Out' : 'Log In'}</button>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
