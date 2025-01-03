import Link from 'next/link';

const Drawer: React.FC = () => {
  return (
    <div className="drawer-side fixed top-0 left-0 z-50">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <Link href="/" className="btn btn-ghost text-xl">
          HYAKUYAKU
        </Link>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/products">Beer List</Link>
        </li>
        <li>
          <Link href="/brewery">Brewery List</Link>
        </li>
        <li>
          <Link href="/customer">Customer List</Link>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <Link href={'/logout'}>Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
