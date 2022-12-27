function resolveImages (code) {
  const reg = /_components\.img, {\s*src:\s*"\S+"/g
  const nameReg = /(?!")\S+(?=")/g

  const i = 0

  for (let piece of code.matchAll(reg)) {
    piece = piece[0]
    const name = nameReg.exec(piece)[0]
    code =
      `import _img${i} from "@/assets/blog/${name}";\n` +
      code.replace(piece, piece.replace(`"${name}"`, `_img${i}`))
  }

  return code
}

export default () => {
  return {
    name: 'mdx-resolver',
    transform (src, id) {
      if (id.endsWith('.mdx')) {
        src = resolveImages(src)
        return {
          code: src,
          map: null
        }
      }
    }
  }
}
