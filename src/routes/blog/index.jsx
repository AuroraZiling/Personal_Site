import { createResource, For } from 'solid-js'
import { Title, useRouteData } from 'solid-start'

export const routeData = () => {
  return createResource(async () => {
    const blogs = []

    const _blogs = import.meta.glob('./*.{mdx,md}')

    for (const path in _blogs) {
      const blog = await _blogs[path]()
      blogs.push({
        href: path
          .replace('./', '/blog/')
          .replace('.mdx', '')
          .replace('.md', ''),
        ...blog.meta
      })
    }

    return blogs
  })[0]
}

export default () => {
  const data = useRouteData()

  return (
    <main>
      <Title>lihe.dev - Blog</Title>
      <h1>Article List</h1>
      <pre>{JSON.stringify(data ? data() : '')}</pre>

      <For each={data ? data() : []}>
        {(blog) => (
          <div>
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
            <a href={blog.href}>Link</a>
          </div>
        )}
      </For>
    </main>
  )
}
