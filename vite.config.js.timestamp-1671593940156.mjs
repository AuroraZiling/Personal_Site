// vite.config.js
import solid from "file:///D:/Users/lihe07/Desktop/lihe.dev/node_modules/.pnpm/registry.npmmirror.com+solid-start@0.2.7_5dbkyhvd6f6wkinxbouilzufue/node_modules/solid-start/vite/plugin.js";
import unocss from "file:///D:/Users/lihe07/Desktop/lihe.dev/node_modules/.pnpm/registry.npmmirror.com+unocss@0.47.5_rollup@3.7.0+vite@3.2.5/node_modules/unocss/dist/vite.mjs";

// scripts/resolver.js
function resolveImages(code) {
  const reg = /_components\.img, {\s*src:\s*"\S+"/g;
  const nameReg = /(?!")\S+(?=")/g;
  const i = 0;
  for (let piece of code.matchAll(reg)) {
    piece = piece[0];
    const name = nameReg.exec(piece)[0];
    code = `import _img${i} from "@/assets/blog/${name}";
` + code.replace(piece, piece.replace(`"${name}"`, `_img${i}`));
  }
  return code;
}
var resolver_default = () => {
  return {
    name: "mdx-resolver",
    transform(src, id) {
      if (id.endsWith(".mdx")) {
        src = resolveImages(src);
        return {
          code: src,
          map: null
        };
      }
    }
  };
};

// scripts/replaceMath.js
function inlineMath(code) {
  const reg = /\$.+\$/g;
  let hasMath = false;
  for (let piece of code.matchAll(reg)) {
    piece = piece[0];
    code = code.replace(
      piece,
      "<Math>{String.raw`" + piece.substring(1, piece.length - 1) + "`}</Math>"
    );
    hasMath = true;
  }
  return [code, hasMath];
}
function mathBlock(code) {
  const reg = /\$\$[^$]+\$\$/g;
  let hasMath = false;
  for (let piece of code.matchAll(reg)) {
    piece = piece[0];
    code = code.replace(
      piece,
      "<Math block>{String.raw`" + piece.substring(2, piece.length - 2).trim() + "`}</Math>"
    );
    hasMath = true;
  }
  return [code, hasMath];
}
var replaceMath_default = () => {
  return {
    name: "replace-math",
    enforce: "pre",
    transform(src, id) {
      if (id.endsWith(".mdx")) {
        let hasBlock, hasInline;
        [src, hasBlock] = mathBlock(src);
        [src, hasInline] = inlineMath(src);
        if (hasBlock || hasInline) {
          src = "import Math from '@/components/blog/Math'\n\n" + src;
        }
        return {
          code: src,
          map: null
        };
      }
    }
  };
};

// vite.config.js
import { defineConfig } from "file:///D:/Users/lihe07/Desktop/lihe.dev/node_modules/.pnpm/registry.npmmirror.com+vite@3.2.5/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  server: {
    port: 3e3,
    host: "127.0.0.1"
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  plugins: [
    replaceMath_default(),
    {
      ...(await import("file:///D:/Users/lihe07/Desktop/lihe.dev/node_modules/.pnpm/registry.npmmirror.com+@mdx-js+rollup@2.1.5_rollup@3.7.0/node_modules/@mdx-js/rollup/index.js")).default({
        jsx: true,
        jsxImportSource: "solid-mdx",
        providerImportSource: "solid-mdx"
      }),
      enforce: "pre"
    },
    resolver_default(),
    solid({ extensions: [".mdx", ".md"] }),
    unocss()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAic2NyaXB0cy9yZXNvbHZlci5qcyIsICJzY3JpcHRzL3JlcGxhY2VNYXRoLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcVXNlcnNcXFxcbGloZTA3XFxcXERlc2t0b3BcXFxcbGloZS5kZXZcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFVzZXJzXFxcXGxpaGUwN1xcXFxEZXNrdG9wXFxcXGxpaGUuZGV2XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Vc2Vycy9saWhlMDcvRGVza3RvcC9saWhlLmRldi92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCBzb2xpZCBmcm9tICdzb2xpZC1zdGFydC92aXRlJ1xyXG5pbXBvcnQgdW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xyXG5pbXBvcnQgcmVzb2x2ZXIgZnJvbSAnLi9zY3JpcHRzL3Jlc29sdmVyJ1xyXG5pbXBvcnQgcmVwbGFjZU1hdGggZnJvbSAnLi9zY3JpcHRzL3JlcGxhY2VNYXRoJ1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDMwMDAsXHJcbiAgICBob3N0OiAnMTI3LjAuMC4xJ1xyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiAnL3NyYydcclxuICAgIH1cclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlcGxhY2VNYXRoKCksXHJcbiAgICB7XHJcbiAgICAgIC4uLihhd2FpdCBpbXBvcnQoJ0BtZHgtanMvcm9sbHVwJykpLmRlZmF1bHQoe1xyXG4gICAgICAgIGpzeDogdHJ1ZSxcclxuICAgICAgICBqc3hJbXBvcnRTb3VyY2U6ICdzb2xpZC1tZHgnLFxyXG4gICAgICAgIHByb3ZpZGVySW1wb3J0U291cmNlOiAnc29saWQtbWR4J1xyXG4gICAgICB9KSxcclxuICAgICAgZW5mb3JjZTogJ3ByZSdcclxuICAgIH0sXHJcbiAgICByZXNvbHZlcigpLFxyXG4gICAgc29saWQoeyBleHRlbnNpb25zOiBbJy5tZHgnLCAnLm1kJ10gfSksXHJcbiAgICB1bm9jc3MoKVxyXG4gIF1cclxufSlcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxVc2Vyc1xcXFxsaWhlMDdcXFxcRGVza3RvcFxcXFxsaWhlLmRldlxcXFxzY3JpcHRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxVc2Vyc1xcXFxsaWhlMDdcXFxcRGVza3RvcFxcXFxsaWhlLmRldlxcXFxzY3JpcHRzXFxcXHJlc29sdmVyLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Vc2Vycy9saWhlMDcvRGVza3RvcC9saWhlLmRldi9zY3JpcHRzL3Jlc29sdmVyLmpzXCI7ZnVuY3Rpb24gcmVzb2x2ZUltYWdlcyAoY29kZSkge1xyXG4gIGNvbnN0IHJlZyA9IC9fY29tcG9uZW50c1xcLmltZywge1xccypzcmM6XFxzKlwiXFxTK1wiL2dcclxuICBjb25zdCBuYW1lUmVnID0gLyg/IVwiKVxcUysoPz1cIikvZ1xyXG5cclxuICBjb25zdCBpID0gMFxyXG5cclxuICBmb3IgKGxldCBwaWVjZSBvZiBjb2RlLm1hdGNoQWxsKHJlZykpIHtcclxuICAgIHBpZWNlID0gcGllY2VbMF1cclxuICAgIGNvbnN0IG5hbWUgPSBuYW1lUmVnLmV4ZWMocGllY2UpWzBdXHJcbiAgICBjb2RlID1cclxuICAgICAgYGltcG9ydCBfaW1nJHtpfSBmcm9tIFwiQC9hc3NldHMvYmxvZy8ke25hbWV9XCI7XFxuYCArXHJcbiAgICAgIGNvZGUucmVwbGFjZShwaWVjZSwgcGllY2UucmVwbGFjZShgXCIke25hbWV9XCJgLCBgX2ltZyR7aX1gKSlcclxuICB9XHJcblxyXG4gIHJldHVybiBjb2RlXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ21keC1yZXNvbHZlcicsXHJcbiAgICB0cmFuc2Zvcm0gKHNyYywgaWQpIHtcclxuICAgICAgaWYgKGlkLmVuZHNXaXRoKCcubWR4JykpIHtcclxuICAgICAgICBzcmMgPSByZXNvbHZlSW1hZ2VzKHNyYylcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgY29kZTogc3JjLFxyXG4gICAgICAgICAgbWFwOiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcVXNlcnNcXFxcbGloZTA3XFxcXERlc2t0b3BcXFxcbGloZS5kZXZcXFxcc2NyaXB0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVXNlcnNcXFxcbGloZTA3XFxcXERlc2t0b3BcXFxcbGloZS5kZXZcXFxcc2NyaXB0c1xcXFxyZXBsYWNlTWF0aC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVXNlcnMvbGloZTA3L0Rlc2t0b3AvbGloZS5kZXYvc2NyaXB0cy9yZXBsYWNlTWF0aC5qc1wiO2Z1bmN0aW9uIGlubGluZU1hdGggKGNvZGUpIHtcclxuICBjb25zdCByZWcgPSAvXFwkLitcXCQvZ1xyXG4gIGxldCBoYXNNYXRoID0gZmFsc2VcclxuICBmb3IgKGxldCBwaWVjZSBvZiBjb2RlLm1hdGNoQWxsKHJlZykpIHtcclxuICAgIHBpZWNlID0gcGllY2VbMF1cclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoXHJcbiAgICAgIHBpZWNlLFxyXG4gICAgICAnPE1hdGg+e1N0cmluZy5yYXdgJyArIHBpZWNlLnN1YnN0cmluZygxLCBwaWVjZS5sZW5ndGggLSAxKSArICdgfTwvTWF0aD4nXHJcbiAgICApXHJcbiAgICBoYXNNYXRoID0gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFtjb2RlLCBoYXNNYXRoXVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYXRoQmxvY2sgKGNvZGUpIHtcclxuICBjb25zdCByZWcgPSAvXFwkXFwkW14kXStcXCRcXCQvZ1xyXG4gIGxldCBoYXNNYXRoID0gZmFsc2VcclxuICBmb3IgKGxldCBwaWVjZSBvZiBjb2RlLm1hdGNoQWxsKHJlZykpIHtcclxuICAgIHBpZWNlID0gcGllY2VbMF1cclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoXHJcbiAgICAgIHBpZWNlLFxyXG4gICAgICAnPE1hdGggYmxvY2s+e1N0cmluZy5yYXdgJyArXHJcbiAgICAgICAgcGllY2Uuc3Vic3RyaW5nKDIsIHBpZWNlLmxlbmd0aCAtIDIpLnRyaW0oKSArXHJcbiAgICAgICAgJ2B9PC9NYXRoPidcclxuICAgIClcclxuICAgIGhhc01hdGggPSB0cnVlXHJcbiAgfVxyXG4gIHJldHVybiBbY29kZSwgaGFzTWF0aF1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAncmVwbGFjZS1tYXRoJyxcclxuICAgIGVuZm9yY2U6ICdwcmUnLFxyXG4gICAgdHJhbnNmb3JtIChzcmMsIGlkKSB7XHJcbiAgICAgIGlmIChpZC5lbmRzV2l0aCgnLm1keCcpKSB7XHJcbiAgICAgICAgLy8gc3JjID0gXCJpbXBvcnQgTWF0aCBmcm9tICdAL2NvbXBvbmVudHMvYmxvZy9NYXRoJ1xcblxcblwiICsgc3JjXHJcbiAgICAgICAgbGV0IGhhc0Jsb2NrLCBoYXNJbmxpbmVcclxuICAgICAgICA7W3NyYywgaGFzQmxvY2tdID0gbWF0aEJsb2NrKHNyYylcclxuICAgICAgICA7W3NyYywgaGFzSW5saW5lXSA9IGlubGluZU1hdGgoc3JjKVxyXG4gICAgICAgIGlmIChoYXNCbG9jayB8fCBoYXNJbmxpbmUpIHtcclxuICAgICAgICAgIHNyYyA9IFwiaW1wb3J0IE1hdGggZnJvbSAnQC9jb21wb25lbnRzL2Jsb2cvTWF0aCdcXG5cXG5cIiArIHNyY1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgY29kZTogc3JjLFxyXG4gICAgICAgICAgbWFwOiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFIsT0FBTyxXQUFXO0FBQzlTLE9BQU8sWUFBWTs7O0FDRDZSLFNBQVMsY0FBZSxNQUFNO0FBQzVVLFFBQU0sTUFBTTtBQUNaLFFBQU0sVUFBVTtBQUVoQixRQUFNLElBQUk7QUFFVixXQUFTLFNBQVMsS0FBSyxTQUFTLEdBQUcsR0FBRztBQUNwQyxZQUFRLE1BQU07QUFDZCxVQUFNLE9BQU8sUUFBUSxLQUFLLEtBQUssRUFBRTtBQUNqQyxXQUNFLGNBQWMseUJBQXlCO0FBQUEsSUFDdkMsS0FBSyxRQUFRLE9BQU8sTUFBTSxRQUFRLElBQUksU0FBUyxPQUFPLEdBQUcsQ0FBQztBQUFBLEVBQzlEO0FBRUEsU0FBTztBQUNUO0FBRUEsSUFBTyxtQkFBUSxNQUFNO0FBQ25CLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFVBQVcsS0FBSyxJQUFJO0FBQ2xCLFVBQUksR0FBRyxTQUFTLE1BQU0sR0FBRztBQUN2QixjQUFNLGNBQWMsR0FBRztBQUN2QixlQUFPO0FBQUEsVUFDTCxNQUFNO0FBQUEsVUFDTixLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOzs7QUM5QnNULFNBQVMsV0FBWSxNQUFNO0FBQy9VLFFBQU0sTUFBTTtBQUNaLE1BQUksVUFBVTtBQUNkLFdBQVMsU0FBUyxLQUFLLFNBQVMsR0FBRyxHQUFHO0FBQ3BDLFlBQVEsTUFBTTtBQUNkLFdBQU8sS0FBSztBQUFBLE1BQ1Y7QUFBQSxNQUNBLHVCQUF1QixNQUFNLFVBQVUsR0FBRyxNQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDaEU7QUFDQSxjQUFVO0FBQUEsRUFDWjtBQUVBLFNBQU8sQ0FBQyxNQUFNLE9BQU87QUFDdkI7QUFFQSxTQUFTLFVBQVcsTUFBTTtBQUN4QixRQUFNLE1BQU07QUFDWixNQUFJLFVBQVU7QUFDZCxXQUFTLFNBQVMsS0FBSyxTQUFTLEdBQUcsR0FBRztBQUNwQyxZQUFRLE1BQU07QUFDZCxXQUFPLEtBQUs7QUFBQSxNQUNWO0FBQUEsTUFDQSw2QkFDRSxNQUFNLFVBQVUsR0FBRyxNQUFNLFNBQVMsQ0FBQyxFQUFFLEtBQUssSUFDMUM7QUFBQSxJQUNKO0FBQ0EsY0FBVTtBQUFBLEVBQ1o7QUFDQSxTQUFPLENBQUMsTUFBTSxPQUFPO0FBQ3ZCO0FBRUEsSUFBTyxzQkFBUSxNQUFNO0FBQ25CLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULFVBQVcsS0FBSyxJQUFJO0FBQ2xCLFVBQUksR0FBRyxTQUFTLE1BQU0sR0FBRztBQUV2QixZQUFJLFVBQVU7QUFDYixTQUFDLEtBQUssUUFBUSxJQUFJLFVBQVUsR0FBRztBQUMvQixTQUFDLEtBQUssU0FBUyxJQUFJLFdBQVcsR0FBRztBQUNsQyxZQUFJLFlBQVksV0FBVztBQUN6QixnQkFBTSxrREFBa0Q7QUFBQSxRQUMxRDtBQUNBLGVBQU87QUFBQSxVQUNMLE1BQU07QUFBQSxVQUNOLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7OztBRi9DQSxTQUFTLG9CQUFvQjtBQUU3QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSztBQUFBLElBQ1A7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxvQkFBWTtBQUFBLElBQ1o7QUFBQSxNQUNFLElBQUksTUFBTSxPQUFPLDhKQUFtQixRQUFRO0FBQUEsUUFDMUMsS0FBSztBQUFBLFFBQ0wsaUJBQWlCO0FBQUEsUUFDakIsc0JBQXNCO0FBQUEsTUFDeEIsQ0FBQztBQUFBLE1BQ0QsU0FBUztBQUFBLElBQ1g7QUFBQSxJQUNBLGlCQUFTO0FBQUEsSUFDVCxNQUFNLEVBQUUsWUFBWSxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUM7QUFBQSxJQUNyQyxPQUFPO0FBQUEsRUFDVDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
