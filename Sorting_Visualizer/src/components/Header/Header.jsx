import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="shadow sticky z-50 top-0 bg-gray-700">
      <nav className="bg-gray-700 border-gray-200 px-4 lg:px-6 py-2.5 text-white">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>

          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 ${isActive ? 'text-orange-700' : 'text-white'} pl-3 duration-200 
                    border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 
                    hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/BubbleSort"
                  className={({ isActive }) =>
                    `block py-2 pr-4 ${isActive ? 'text-orange-700' : 'text-white'} pl-3 duration-200 
                    border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 
                    hover:text-orange-700 lg:p-0`
                  }
                >
                  BubbleSort
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/SelectionSort"
                  className={({ isActive }) =>
                    `block py-2 pr-4 ${isActive ? 'text-orange-700' : 'text-white'} pl-3 duration-200 
                    border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 
                    hover:text-orange-700 lg:p-0`
                  }
                >
                  SelectionSort
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/InsertionSort"
                  className={({ isActive }) =>
                    `block py-2 pr-4 ${isActive ? 'text-orange-700' : 'text-white'} pl-3 duration-200 
                    border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 
                    hover:text-orange-700 lg:p-0`
                  }
                >
                  InsertionSort
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex items-center lg:order-2">
            <Link
              to="#"
              className="text-gray-800 hover:bg-gray-50 
              focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 
              mr-2 focus:outline-none"
            >
              Log in
            </Link>
            <Link
              to="#"
              className="text-white bg-orange-700 hover:bg-orange-800 
              focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 
              mr-2 focus:outline-none"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
