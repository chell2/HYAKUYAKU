import Link from 'next/link';
import React from 'react';

export default function MenuList() {
  return (
    <>
      <li>
        <Link href={'/'}>Dashboard</Link>
      </li>
      <li>
        <Link href={'/beer'}>Beer List</Link>
      </li>
      <li>
        <Link href={'/brewery'}>Brewery List</Link>
      </li>
      <li>
        <Link href={'/order'}>Order List</Link>
      </li>
      <li>
        <details>
          <summary>Clients Page</summary>
          <ul className="p-2">
            <li>
              <Link href={'/deliveries'}>飲食店</Link>
            </li>
            <li>
              <Link href={'/hairsalon'}>美容室</Link>
            </li>
            <li>
              <Link href={'/nailsalon'}>ネイルサロン</Link>
            </li>
            <li>
              <Link href={'/liquarstore'}>酒屋</Link>
            </li>
          </ul>
        </details>
      </li>
    </>
  );
}
