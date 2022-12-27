import { Show } from 'solid-js'
import { Outlet, useLocation } from 'solid-start'
import BlogArticleLayout from '../components/blog/BlogArticleLayout'

export default () => {
  const location = useLocation()

  return (
    <>
      <Show when={location.pathname === '/blog'}>
        <Outlet />
      </Show>
      <Show when={location.pathname !== '/blog'}>
        <BlogArticleLayout />
      </Show>
    </>
  )
}
