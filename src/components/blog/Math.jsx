import { Show } from 'solid-js'
import katex from 'katex'
import 'katex/dist/katex.min.css'

export default (props) => {
  const rendered = () =>
    katex.renderToString(props.children.toString(), {
      displayMode: props.block
    })
  return (
    <>
      <Show when={props.block}>
        {/* eslint-disable-next-line solid/no-innerhtml */}
        <div class="w-full text-center m-y-10" innerHTML={rendered()} />
      </Show>
      <Show when={!props.block}>
        {/* eslint-disable-next-line solid/no-innerhtml */}
        <span innerHTML={rendered()} />
      </Show>
    </>
  )
}
