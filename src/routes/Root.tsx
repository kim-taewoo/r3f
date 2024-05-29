import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <>
      <div className="fixed top-3 left-0 right-0 z-10" id="sidebar">
        <nav className="flex items-center gap-5 justify-center h-full">
          <Link to="/">Home</Link>
          <Link to="projects/physics">Physics</Link>
          <Link to="projects/3d-game">3D Game</Link>
          <Link to="projects/2d-game">2D Game</Link>
        </nav>
      </div>
      {/* make element to take full page width and height */}
      <div id="detail" className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <Outlet />
      </div>
    </>
  )
}
