# JAY STUDIO

Premium creative production studio website built with Next.js, React, TypeScript, and Tailwind CSS.

## Run locally

```bash
cd /Users/mac/Documents/JAY-STUDIO
npm run dev
```

Open `http://localhost:3000`.

Dependencies are already installed. If you need to reinstall them on this Mac,
use the isolated cache because the default npm cache currently has broken file
ownership:

```bash
npm_config_cache=/private/tmp/jay-studio-npm-cache npm install
```

## Replace media

Project images and video URLs live in `lib/content.ts`. The hero and wedding imagery are declared near their matching components in `components/studio-site.tsx`.

Replace any placeholder URL with a local file path placed under `public/media`, for example:

```ts
image: "/media/aurea-cover.jpg",
video: "/media/aurea-film.mp4"
```
