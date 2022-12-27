function inlineMath (code) {
  const reg = /\$.+\$/g
  let hasMath = false
  for (let piece of code.matchAll(reg)) {
    piece = piece[0]
    code = code.replace(
      piece,
      '<Math>{String.raw`' + piece.substring(1, piece.length - 1) + '`}</Math>'
    )
    hasMath = true
  }

  return [code, hasMath]
}

function mathBlock (code) {
  const reg = /\$\$[^$]+\$\$/g
  let hasMath = false
  for (let piece of code.matchAll(reg)) {
    piece = piece[0]
    code = code.replace(
      piece,
      '<Math block>{String.raw`' +
        piece.substring(2, piece.length - 2).trim() +
        '`}</Math>'
    )
    hasMath = true
  }
  return [code, hasMath]
}

export default () => {
  return {
    name: 'replace-math',
    enforce: 'pre',
    transform (src, id) {
      if (id.endsWith('.mdx')) {
        // src = "import Math from '@/components/blog/Math'\n\n" + src
        let hasBlock, hasInline
        ;[src, hasBlock] = mathBlock(src)
        ;[src, hasInline] = inlineMath(src)
        if (hasBlock || hasInline) {
          src = "import Math from '@/components/blog/Math'\n\n" + src
        }
        return {
          code: src,
          map: null
        }
      }
    }
  }
}
