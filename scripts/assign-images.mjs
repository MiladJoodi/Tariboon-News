import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

// picsum seeds are reliable and always return an image
function articleImage(id, categorySlug) {
  const seed = `tariboon-${categorySlug}-${id}`
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/1200/675`
}

function authorAvatar(i) {
  return `https://picsum.photos/seed/tariboon-author-${i}/200/200`
}

const articlesPath = path.join(root, 'data', 'articles.ts')
let content = fs.readFileSync(articlesPath, 'utf8')

const blocks = content.split(/(?={\s*\n\s*id:\s*")/)
const out = []
for (const block of blocks) {
  if (!block.includes('categorySlug:')) {
    out.push(block)
    continue
  }
  const idMatch = block.match(/id:\s*"([^"]+)"/)
  const catMatch = block.match(/categorySlug:\s*"([^"]+)"/)
  const id = idMatch ? idMatch[1] : '0'
  const slug = catMatch ? catMatch[1] : 'news'
  const image = articleImage(id, slug)
  out.push(block.replace(/image:\s*"[^"]*"/, `image: "${image}"`))
}
fs.writeFileSync(articlesPath, out.join(''))
console.log('Articles images -> picsum')

const authorsPath = path.join(root, 'data', 'authors.ts')
let authors = fs.readFileSync(authorsPath, 'utf8')
let ai = 0
authors = authors.replace(/avatar:\s*'[^']*'/g, () => {
  ai++
  return `avatar: '${authorAvatar(ai)}'`
})
authors = authors.replace(/avatar:\s*"[^"]*"/g, () => {
  ai++
  return `avatar: "${authorAvatar(ai)}"`
})
fs.writeFileSync(authorsPath, authors)
console.log('Author avatars:', ai)
