import { Title } from 'solid-start'
import { For } from 'solid-js'
import { useNavigate } from 'solid-start'

import bg from '../assets/images/bg.webp'
import github from '../assets/icons/github.svg'
import email from '../assets/icons/email.svg'

const Left = () => {
  const navigate = useNavigate()
  return (
    <div>
      <p class="font-mono op-60 text-7 mt0 mb-5">Hi,</p>
      <p class="font-mono text-12 mt0">
        I'm Ziling, <br />
        a student who loves coding
      </p>
    </div>
  )
}

const socials = [
  {
    icon: github,
    href: 'https://github.com/AuroraZiling'
  },
  {
    icon: email,
    href: 'mailto:2935876049@qq.com'
  }
]

const Right = () => {
  return (
    <div class="flex flex-col items-center justify-center">
      <For each={socials}>
        {(social) => (
          <a
            href={social.href}
            target="_blank"
            class="bg-white bg-op-30 rounded-50% h-12 w-12 block flex items-center justify-center op-70 hover:op-100 active:scale-90 transition m-y-3"
          >
            <img width="28" height="28" src={social.icon} alt={social.href} />
          </a>
        )}
      </For>
    </div>
  )
}

export default function Home () {
  return (
    <main>
      <Title>ziling.space - Home</Title>

      <section
      class="h-screen w-full bg-center bg-cover"
      style={{ 'background-image': `url(${bg})` }}
    >
      <div class="h-full w-full backdrop-blur bg-black bg-op-50 flex items-center px-10 box-border op-0 animate-fade-in animate-duration-500 animate-mode-forwards">
        <div class="max-w-300 ma w-full flex justify-between">
          <Left />
          <Right />
        </div>
      </div>
    </section>
    </main>
  )
}
