import fs from 'fs/promises'
import { readFileSync } from 'fs'
import { Request } from 'undici'

const site = 'https://ziling.space'

const ssr = './dist/server.js'
const route = JSON.parse(
  readFileSync('./dist/public/route-manifest.json', 'utf8')
)

async function patchServer () {
  let server = await await fs.readFile(ssr, 'utf8')
  server = server.replace('const entryServer =', 'export const entryServer =')
  server = server.replace('server.listen(PORT,', '(')

  await fs.writeFile(ssr, server)
  const { entryServer } = await import('.' + ssr)
  return entryServer
}

// If you have dynamic routes, please modify this function
async function getRoutes () {
  const routes = []
  for (const key in route) {
    if (key.startsWith('/')) {
      routes.push(key)
    }
  }
  return routes
}

async function makeMockRequest (url) {
  return {
    request: new Request(site + url),
    env: {
      manifest: route
    }
  }
}

async function main () {
  const entryServer = await patchServer()
  // Do prerender
  const routes = await getRoutes()
  const jobs = []
  let sitemap =
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  for (let route of routes) {
    const job = async () => {
      const req = await makeMockRequest(route)
      const resp = await entryServer(req)
      // Write to file

      if (route === '/*404') {
        route = '/404'
      } else {
        sitemap += `<url><loc>${site}${route}</loc></url>`
      }

      if (route.endsWith('/')) {
        route += 'index'
      }

      const path = './dist/public' + route + '.html'
      await fs.mkdir(path.substring(0, path.lastIndexOf('/')), {
        recursive: true
      })
      await fs.writeFile(path, resp.body)
    }
    jobs.push(job())
  }
  await Promise.all(jobs)
  sitemap += '</urlset>'

  // Do cleanup
  // Remove server.js
  await fs.unlink(ssr)

  // ./dist/public/* -> ./dist/*
  const files = await fs.readdir('./dist/public')
  for (const file of files) {
    await fs.rename('./dist/public/' + file, './dist/' + file)
  }
  // Remove ./dist/public
  await fs.rmdir('./dist/public')
  // Remove ./dist/manifet.json, ./dist/route-manifest.json, ./dist/ssr-manifest.json
  await fs.unlink('./dist/manifest.json')
  await fs.unlink('./dist/route-manifest.json')
  await fs.unlink('./dist/ssr-manifest.json')
  // Write sitemap
  await fs.writeFile('./dist/sitemap.xml', sitemap)
}

console.log('Prerendering...')
main().catch((e) => console.error(e))
console.log('Prerendered!')
