# Capitol Artists

Modern website for Capitol Artists — a Southern Gospel & Bluegrass Gospel concert booking agency.

Built with Next.js 16, Tailwind CSS 4, and TypeScript. Designed to deploy on Vercel.

## Quick Deploy to Vercel

1. **Install the Vercel CLI** (if you don't have it):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy** (from the project root):
   ```bash
   vercel
   ```

4. **Deploy to production**:
   ```bash
   vercel --prod
   ```

5. **Connect your domain** (www.capitol-artists.com):
   - Go to your Vercel project dashboard
   - Settings → Domains
   - Add `capitol-artists.com` and `www.capitol-artists.com`
   - Update your DNS records to point to Vercel (Vercel will show you exactly what to add)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
```

## Project Structure

```
src/
  app/
    page.tsx              # Homepage (hero, roster, booking process, about, contact)
    layout.tsx           # Root layout (fonts, navbar, footer)
    not-found.tsx         # 404 page
    artists/[slug]/       # Individual artist pages (8 artists)
  components/
    Navbar.tsx           # Sticky nav with mobile menu
    Footer.tsx           # Footer with contact info
    ArtistCard.tsx       # Artist card for roster grid
    BookingProcess.tsx   # 3-step booking process section
  data/
    artists.ts           # All artist data (bios, genres, links, highlights)
```

## Artists

1. Adoration Quartet — Southern Gospel
2. Adam's Voice — Southern Gospel / Christian Country
3. Common Bond Quartet — Southern Gospel
4. Daryl Mosley — Bluegrass Gospel
5. Gloryway — Southern Gospel
6. Sacred Harmony — Progressive Southern Gospel
7. Southern Plainsmen — Southern Gospel
8. Westward Road — Southern Gospel / Modern Worship

## Custom Domain Setup

After deploying, point `www.capitol-artists.com` to Vercel:
1. In Vercel dashboard → your project → Settings → Domains
2. Add both `capitol-artists.com` and `www.capitol-artists.com`
3. Vercel will provide DNS instructions (typically an A record and CNAME)
4. Update DNS at your domain registrar
5. SSL is automatic
