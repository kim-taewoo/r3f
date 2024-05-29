import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="w-full h-full">
      {/* Link to other pages on the center of the page */}
      <div className="flex flex-col gap-5 justify-center items-center h-full">
        <p className="text-lg">Select a project to view:</p>
        <div className="flex gap-5">
          <Link to="/projects/physics">
            <button className="p-2 bg-blue-500 text-white rounded-md">Physics</button>
          </Link>
          <Link to="/projects/3d-game">
            <button className="p-2 bg-blue-500 text-white rounded-md">3D Game</button>
          </Link>
          <Link to="/projects/2d-game">
            <button className="p-2 bg-blue-500 text-white rounded-md">2D Game</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
