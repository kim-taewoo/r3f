import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <>
      <div className="fixed top-0 left-0 z-10" id="sidebar">
        {/* <div>
          <form id="search-form" role="search">
            <input id="q" aria-label="Search contacts" placeholder="Search" type="search" name="q" />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div> */}
        <nav>
          <ul>
            <li>
              <Link to={`/projects/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`/projects/2`}>Your Friend</Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* make element to take full page width and height */}
      <div id="detail" className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <Outlet />
      </div>
    </>
  )
}
