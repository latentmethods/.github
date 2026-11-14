# Profile brand assets

- `mark.svg` is an unchanged copy of the existing company website favicon at
  [latentmethods.com/favicon.svg](https://latentmethods.com/favicon.svg).
- `latent-methods.svg` is a static GitHub banner using that same mark, the
  website's near-black and pale-blue palette, dot field, and IBM Plex Serif/Sans
  typography. Its lettering is outlined so it needs no external fonts or CSS.
- `latent-methods.png` is the 2400×640 raster export embedded in the public
  profile. Keep the SVG as the editable source. The PNG preserves the design
  while avoiding SVG rendering differences across browsers and embedded views.

Original artwork and typography checked against the website's `main` commit
`2bc69b268b21a2c3794217101a50537e5354243d` and live public site on 2026-10-22.
The banner includes no scripts, animation, external resources, or new logo.
Banner tagline updated on 2026-10-22 to the canonical company hero:
“Developing Paxlox, a personal AI agent built for privacy.” Keep the outlined
tagline and accessible description aligned with the website's public copy guide.
Website source and deployment remain in their existing private repository.

## Updating the banner

Use Node.js 22 or newer. After editing the SVG, regenerate and check its PNG:

```sh
npm ci --ignore-scripts
npm run build:banner
npm run check
```

Commit the SVG and generated PNG together. The renderer version is pinned in
`package-lock.json`; no external fonts or image service are needed. The PNG is
exported at twice the SVG's nominal resolution for sharp text on dense displays
and is limited to 500 kB. The check validates inline Markdown images, rejecting
missing or empty files, absent alt text, external image URLs, and vector embeds.
It also rejects a banner PNG that no longer matches the source. GitHub Actions
runs it on pull requests and changes to `main`.

Use inline Markdown image syntax (`![alt](assets/file.png)`) so the check can
validate the reference. Keep image paths relative to `profile/README.md`. GitHub resolves
them for both the repository preview and the organization page. Keep the product
description and links in ordinary Markdown too, so the introduction remains
useful when a reader cannot load images.

The previously reported mobile broken image was not reproduced: the original
SVG URL returned HTTP 200 with `image/svg+xml` for desktop and iPhone user
agents. This change reduces format compatibility risks; it cannot prevent
GitHub outages, blocked image requests, or other network failures. Before merging
a banner change, also view its GitHub-rendered README on a narrow and wide
screen; local export validation is not a browser test.
