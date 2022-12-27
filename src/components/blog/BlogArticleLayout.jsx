import { Outlet } from 'solid-start'
import './markdown.css'

export default () => {
  return (
    <main>
      <div class="h-100 w-full bg-slate-9 flex items-center justify-center">
        <h1 class="font-serif">TITLE + COVER + TAGS + DATE + BACK</h1>
      </div>
      <div class="p-x-10 mt-10">
        <article class="markdown-body ma max-w-300">
          <Outlet />
        </article>
      </div>
    </main>
  )
}
