import { createEffect, createSignal, Show } from 'solid-js'
import { Motion } from '@motionone/solid'
import { useIsRouting } from 'solid-start'

export default () => {
  const isRouting = useIsRouting()
  const [percent, setPercent] = createSignal(0)
  const [show, setShow] = createSignal(false)
  const [lazy, setLazy] = createSignal(false)

  createEffect(() => {
    // console.log('isRouting', isRouting())
    if (isRouting()) {
      setShow(true)
      setLazy(true)
      setPercent(90)
    } else {
      setPercent(100)
      setTimeout(() => {
        setShow(false)
        setTimeout(() => {
          setLazy(false)
          setPercent(0)
        }, 300)
      }, 600)
    }
  })
  return (
    <Show when={lazy()}>
      <Motion.div
        class="fixed top-0 h-2 z-10 left-0 bg-sky-5 op-0 w-0 transition"
        classList={{ 'op-60': show() }}
        animate={{
          width: percent() + '%'
        }}
        transition={{
          duration: isRouting() ? 10 : 0.5
        }}
      />
    </Show>
  )
}
