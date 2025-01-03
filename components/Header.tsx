import Link from 'next/link';
import { PiUserCircle } from 'react-icons/pi';
import MenuList from './MenuList';
import AuthServerButton from './auth/AuthServerButton';

export default function Header() {
  return (
    <div className="navbar bg-base-100 shadow-md z-globalMenu fixed">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <MenuList />
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          HYAKUYAKU
        </Link>
        <div className="navbar-center hidden lg:flex ml-14">
          <ul className="menu menu-horizontal px-1">
            <MenuList />
          </ul>
        </div>
      </div>
      <div className="flex-none gap-2 navbar-end">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search.."
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="mb-0">
              <PiUserCircle size={30} color={'#000'} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href={'/beer'} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link href={'/settings'}>Settings</Link>
            </li>
            <li>
              <AuthServerButton />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
