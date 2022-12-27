import { createSignal, onCleanup } from 'solid-js'

import style from './Scrollbar.module.css'

export default (props) => {
  const [percent, setPercent] = createSignal(0)
  let ele

  function onScroll () {
    const { scrollTop, scrollHeight, clientHeight } = ele
    const percent = (scrollTop / (scrollHeight - clientHeight)) * 100
    setPercent(percent)
  }

  function useScrollbar (_ele) {
    ele = _ele
    ele.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
  }

  onCleanup(() => {
    window.removeEventListener('resize', onScroll)
  })

  return (
    <div class={'w-full h-screen relative'}>
      <div
        class={'w-full h-screen overflow-scroll relative ' + style.hide}
        id="scroll"
        ref={useScrollbar}
      >
        {props.children}
      </div>

      <div
        class="absolute w-2 right-0 bg-white bg-op-40 rounded-b-5 top-0"
        style={{
          height: `${percent()}%`
        }}
      />
    </div>
  )
}
