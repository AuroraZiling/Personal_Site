import { For } from 'solid-js'
import { A, useLocation } from 'solid-start'

import avatar from '@/assets/images/avatar.50x50.webp'
import ProgressBar from './ProgressBar'

const routes = [
  {
    name: 'Study',
    path: '/study'
  },
  {
    name: 'Projects',
    path: '/projects'
  },
  {
    name: 'Blog',
    path: '/blog'
  },
  {
    name: 'About',
    path: '/about'
  }
]

export default () => {
  const location = useLocation()

  const isIndex = () => location.pathname === '/'

  return (
    <header
      class="w-full font-sans z-1 box-border px-10 py-5 transition-all"
      classList={{
        'absolute top-15 left-0': isIndex(),
        'relative top-0': !isIndex()
      }}
    >
      {/* ProgressBar */}
      <ProgressBar />
      {/* Main */}
      <div class="max-w-300 w-full ma flex justify-between items-center">
        <div class="flex items-center">
          <img src={avatar} alt="Avatar" class="w-10 h-10 rounded-50%" />
          <A
            class="ml-5 text-5 font-mono color-white decoration-none transition"
            href="/"
            classList={{
              'op-100': isIndex(),
              'op-70 hover:op-100 active:scale-90': !isIndex()
            }}
          >
            ziling.space
          </A>
        </div>
        <div class="flex items-center">
          <For each={routes}>
            {(route) => (
              <div class="ml-5 w-20 flex items-center justify-center">
                <A
                  href={route.path}
                  class="text-5 color-white decoration-none transition"
                  inactiveClass="op-70 hover:op-100 active:scale-90"
                  activeClass="op-100"
                >
                  {route.name}
                </A>
              </div>
            )}
          </For>
        </div>
      </div>
    </header>
  )
}
