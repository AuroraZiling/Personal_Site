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
        <Link rel="icon" href="data:image/webp;base64,UklGRpgIAABXRUJQVlA4WAoAAAAIAAAAMQAAMQAAVlA4ICIIAADQJACdASoyADIAPhUIg0EhBQMBqgQAUSyAF2ZlVrX5L+YehjV/7VrCJX+ub9f9yvwG9QHmAc4nzAfrp+uXu9/4D9qvdL6AH86/y3WH/1j/Jewt+w/ptex9+2H7gezjWNePvyT6/fulpDfxX7DfgvyZ/I3nt98eoF6b/vX5Oflzx+ORfsB6gXrL8z/xH5gf3L0gv4j0M7z/81/zHJqUAP43/SP97/ffyS+Kz/S/w35Ve0357/3v9//dX6A/5L/Pf83/cv3e/vP//8QfoZfqH/4TxcpcZlmaImv7Pj6XPzv/fMbZsk58E9FZWp/iuQb7ADnsv23d6ftXggmrFWQpXXgJIZapvReRBqw8yF47vBf78CBQO1KHjjjk0Ma6UeJA4Mz7LxXz3MA9VzxPWplKYoAA/v//Mt6mFNbZj5pAQJ+AivbvFMvo6itZ4XKX6et91XuLAtmj4+igEO4llMh5i9hsRpAXFwkUyAK5zuCqubRkK+QcZc/dPqYlSxuwKYDLQi5n1dTB/QbNbwjjVuRygC3M9XH3hIjDEN/fDNgyvJSRmLA8cKKW3y4QMhbFzTocfcp8EYLu6YA/F7w3t4heFvE2YLlTuNXQ1TQ07erlXy//vm1QzVY4TxTYL4jJ6f/KWx8nYX+m6AU/mNhv7jZXl0yxf7wngqTwL79liVwVYdab6w0aWdN00gmaraZiYdxt9/a9pNwBNoAOlZMNIOVN4vp1sJf1cqc9yJ2hUgF3Ag7buK9jq09yoQp33mXlUdg4o/+xvxucTw7jXCJQSzFn1ckcY/+GnWjpfsTwE34xv3vAS3pea2CjioZefnk8O2JO+oC/VdRwWyGF7bvw0oPuipkiqZ6jcp1cESEK+aTrShfbuB9IvCTJg/XwDcoTtcPZxcUvwdvu3ykEYdcc6tVzuwnfHC3n635KFpw0op2bLfYDn/rIl+c+qjVQQrlEAsYl2RX9FPjE+/mXBfS6Xq9OPF1m5UDmwsj/wtTnLOCPdcxA1mbreH4AHuoc3CPq24dAJe1JHZ2Li3j8Z/UQz8ZBXjk5tTsopaMAk1YNgM5tXg+W1/+FAfPUSf1Cn1tQ9pi56fITDxYB7gAyllSjS9rIz9rb10NaxJk2bXolKMPi3J7evBBAnViFe/f+ZTa+1CiMYU7NuWJ1P6qxT75f1+F5i/1ujO1Grz3awH9WsfE9l2dDpzz7Qi8+QhSBOIIsNHQx48u9cSnccogcsgKwfaU09JdPd3EaeeGP2CB8EfHoeZ/Bj688gwZ6vb3kLfFSi1QJ/Bf/LZBAerYBB9ipCHZf8ZhRB+IpTCQj9t49PUhf/9PViS3GlSX6VTP6UwviXsoLYs+c2aElRb/IVUrV7oa6kog+oAj8Oe6Zh6xdBKnbojqcnu/VaokX/EOZNu8TJeZr+q1fncQ9p+wWUo45Md9StoEFh4yftrugo4hV9dQ+KY5YzR/4YHRSOoS0/9gVCjnjNJ3KsMpWI1atZ8mSTp1Xbfzj1KrGGYZUaq60plq19blMa/8w/4EdykbH/wFCNNgON0b+12tOOMLh2IZl2t3p6gWkDi2LPX0e+I9dmChv2IDnNr5hKE1hTv5CbtwratHxrB8KlrKQtOrAAngZbbsoJj2E0X4vzsdpef5g0JifUOSBWxn/Nu9gzjFwW0S//yX1jrGOVAfl+w0wwnEx3YTqVnxRMP7TpCfG1ec7IYzxKujbtxqLDiF/daxgE2Ew/6jqDtcAqwYYomOBnxYtunKjVEM98+kz7sqH9csdS5MRv/+Ros7/BYLfXn3f78mZFRCWi4/9U4i9Q/pBE0DuT4WQuEqZU2nFpgNzBhxJjT+WMrd9Ay7QOywnlETJOOJ1f/9Lb+z5BvwlfZUz3cK/At1XAHXqwI8WF7Ktkqsvts6/vLQ3c1k7PqX8dL6D8pa6fFxqoX1eb6zM11Xo3yetX9K5vbnyUwO7zm6879NR6I8osCaEU3YWgRSymU8LWLTcs6dIWhGl7+TPd/g59OSbfuoOo7OBKyY0nCffmftGeDaT9wAl/+EBipiICrznH6kMvHCX96+f4Xdxp6ov+QYwG5CzD5R6hpkCXeU3vGpfTl3xvhfqwvlBaQ9uY+Awvme08407MbB8srW+re3iNivGsg5wnxGbOQyOzf2XS7ZB8Mb2HA9idEO5jFppP7uM33uLnU8vKqN8xjPindzo9SSxGbKIEI7DlI8wlyDZ/OcJ4o6f/g0TjYhpDw4BtUyKHOu1LYJvoTOmzMrIY8cB2C8ebIW/JLtDBHw9yu+AHKQu+u87E+ldRBGa/Q73iOFoAS7bbC45XHohV5UUwwA8uYuXauLfDQIHnVin7jlQgpwAPV9GHPyumUSt1IHOb8af6r36b7+JGnAFhWt4PsqqoUScFLKiO3eq1Irzd02bgGepI53QqJ6is4n8xuBTxK/pXII3ovUh/I5t2OPe0GXG498mUHPrGJ9kRiQUcxQ0229yqBKvW9yqBS/+7vH13xS9WZM/2eRSqzPJoBpKmGt1jltjDMLqp0BTWBkc21UDWfN4BI7LmN8/r20/+o+DxAzzTZ7vdFjrtertSziISWgv/7DituMpBSgxP/ZSva/+lkD9cWTZitM/EU4TABfObjx8SDWEi3cBoDkmAZSsxMRD0OZWfHXe8hyAi3Lz463meF3XSzSfd/+sJs+O05nA5VeGLfWahubojvRJlC+XNzXSFQD0KXQEhR1HZPlZ+M8Mo5VcZx3vCV5yezHB8ro86hDUepr0B7bdqHZKUUuDRDqwq7QAAAg5UOgAAABFWElGUAAAAE1NACoAAAAIAAIBEgADAAAAAQABAACHaQAEAAAAAQAAACYAAAAAAAOgAQADAAAAAQABAACgAgAEAAAAAQAACACgAwAEAAAAAQAACAAAAAAA" />
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
