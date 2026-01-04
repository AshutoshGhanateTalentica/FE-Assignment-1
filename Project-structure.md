# Project structure

Top-level
```
package.json
vite.config.ts
tsconfig.json
index.html
README.md
.gitignore
Project-structure.md
CHAT_HISTORY.md
src/
```

src/
```
src/
├─ api/                 # API wrappers (FakeStoreAPI)
├─ components/          # Presentational reusable components
│  ├─ Header/
│  ├─ ProductCard/
│  ├─ Pagination/
│  └─ ImageWithFallback/
├─ containers/          # Container (smart) components (page containers)
├─ pages/               # Page containers (ProductListing, ProductDetails, Cart)
├─ contexts/            # React context providers (Announcer)
├─ store/               # Redux store, reducers, actions, types
│  └─ cart/
├─ api/                 # API wrappers
├─ styles/              # Global and component CSS files
├─ utils/               # Utility functions
├─ hooks/               # Custom hooks
└─ index.tsx / main.tsx  # App entry
```

Notes
- Follow container/presentation pattern: `containers` (logic) vs `components` (UI).
- Persist cart state to `localStorage` in `src/store`.
- Keep plain CSS files colocated with presentation components when appropriate.
- Default dev server port: `3000` (see `vite.config.ts`).

