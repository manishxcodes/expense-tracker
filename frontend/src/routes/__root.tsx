import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className='p-2 flex-gap'>
        <Link to="/" className="[&.active]:font-bold mx-4">Home</Link>
        <Link to="/about" className="[&.active]:font-bold">About</Link>
      </div>
      <Outlet />
    </React.Fragment>
  )
}
