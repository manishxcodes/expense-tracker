import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function Navbar() {
    return (
        <div className="w-full flex justify-center">
            <div className='max-w-6xl flex justify-center py-2'>
                <div className='flex w-96 justify-evenly'>
                    <Link to="/" className="[&.active]:font-bold">Home</Link>
                    <Link to="/about" className="[&.active]:font-bold">About</Link>
                    <Link to="/expenses" className="[&.active]:font-bold">Expenses</Link>
                    <Link to="/create-expense" className="[&.active]:font-bold">Create</Link>
                </div>
            </div>
        </div>
    )
}

function RootComponent() {
  return (
    <React.Fragment>
        <Navbar />
      <Outlet />
    </React.Fragment>
  )
}

