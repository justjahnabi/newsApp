import React, { useContext, useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const links = ["Business", "General", "Sports", "Entertainment", "Science", "Health", "Technology"]
const Navbar = ({ setArticles }) => {
    const { theme, setTheme } = useContext(ThemeContext)
    const [open, setOpen] = useState(false)
    const handleSearch = async (e) => {
        const search = e.target.value
        try {
            const res = await axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=${import.meta.env.VITE_API_KEY}`)
            setArticles(res.data.articles)
        } catch (error) {
            console.log(error);

        }
    }
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
        }
        else {
            setTheme('light')
            localStorage.setItem('theme', 'light')
        }
    }

    return (
        <div className='w-full bg-white dark:bg-blue-900 fixed z-10 shadow-md'>
            <div className='flex items-center justify-between px-4 py-3 max-w-7xl mx-auto'>
                <Link to={'/'}>
                    <div className='text-lg font-bold md:text-2xl text-blue-600 dark:text-gray-100 cursor-pointer'>News App</div>
                </Link>
                <div className='hidden space-x-6 md:flex'>
                    {
                        links.map((link) => {
                            return <Link to={`/${link.toLocaleLowerCase()}`} key={link} className='text-gray-700 dark:text-gray-200 dark:hover:text-white hover:text-blue-600 transition'>{link}</Link>
                        })
                    }
                </div>
                <div className='flex items-center justify-center gap-4'>
                    <div className='relative bg-gray-200 p-2 rounded-lg '>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
                        <input onChange={handleSearch} type="text" placeholder='Search news...' className='md:pl-10 pl-7 w-30 md:w-64 outline-none focus:outline-none' />
                    </div>
                    <button onClick={toggleTheme} className='bg-gray-200 px-3 dark:bg-blue-500 dark:text-gray-200 py-2 rounded-lg cursor-pointer'>
                        {
                            theme === 'light' ? <FaMoon /> : <FaSun />
                        }

                    </button>
                    <button onClick={() => setOpen(!open)} className='md:hidden dark:text-gray-200'>
                        {
                            open ? <X size={25} /> : <Menu size={25} />
                        }
                    </button>
                </div>
            </div>
            <div>
                {open && (
            <div className="md:hidden px-4 pb-4">
                {
                    links.map((link) => {
                        return <Link
                            key={link}
                            to={`/${link.toLowerCase()}`}
                            onClick={() => setOpen(false)}
                            className="block py-2 text-gray-700 dark:text-gray-200 dark:hover:text-white hover:text-blue-600 transition"
                        >
                            {link}
                        </Link>
                    })
                }
            </div>
            )}
            </div>
        </div>
    )
}

export default Navbar
