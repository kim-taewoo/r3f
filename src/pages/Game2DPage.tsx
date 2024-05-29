export function Game2DPage() {
  return (
    <div className="w-full h-full">
      {/* Link to other outside project domain */}
      <div className="flex items-center justify-center w-full h-full">
        <a href="https://2d-canvas-shoot.netlify.app/" target="_blank" rel="noreferrer">
          <h1 className="text-4xl font-bold text-center">2D Shooting Game →</h1>
          <img src="/img/2dshootgame.png" width={550} className="mt-4" alt="" />
        </a>
      </div>
    </div>
  )
}
