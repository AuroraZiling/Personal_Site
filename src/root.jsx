// @refresh reload
import { Suspense } from 'solid-js'
import {
  Body,
  FileRoutes,
  Head,
  Html,
  Meta,
  Link,
  Routes,
  Scripts
} from 'solid-start'
import 'uno.css'
import Scrollbar from './components/Scrollbar'
import Header from './components/Header'

export default function Root () {
  return (
    <Html lang="en">
      <Head>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="description" content="SolidStart - Bare" />
        <Meta name="keywords" content="solid, solidjs, solid-start" />
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      <Body class="m0 bg-black color-white">
        <Scrollbar>
          <Header />
          <Suspense fallback={<h1>Loading</h1>}>
            <Routes>
              <FileRoutes />
            </Routes>
          </Suspense>
        </Scrollbar>

        <Scripts />
      </Body>
    </Html>
  )
}
