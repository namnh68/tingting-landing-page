# Ting Ting Landing Page — Documentation Index

Welcome to the Ting Ting project documentation. This is your guide to understanding the codebase, architecture, and development workflow.

---

## Documentation Structure

### Core Documentation

#### 1. [Project Overview & PDR](./project-overview-pdr.md)
**For:** Product managers, stakeholders, developers (onboarding)
- Project context and value proposition
- Functional and non-functional requirements
- Acceptance criteria and success metrics
- Technical constraints and deployment pipeline
- Phase roadmap and risk assessment
- Definition of done and glossary

**Start here if:** You're new to the project or need to understand requirements.

#### 2. [System Architecture](./system-architecture.md)
**For:** Backend/frontend developers, architects
- Core architecture patterns (SSG, MDX, content system)
- Directory structure with detailed explanations
- Key technologies and their purposes
- Routing and SEO implementation
- Dark mode strategy
- Data flow and error handling
- Performance considerations

**Start here if:** You're implementing features or need to understand system design.

#### 3. [Code Standards & Codebase Structure](./code-standards.md)
**For:** All developers
- TypeScript and type naming conventions
- Component structure and props
- Tailwind CSS v4 patterns (CSS-first, dark mode)
- File organization and naming conventions
- Blog system implementation details
- Routing and SSG patterns
- JSON-LD structured data
- Common tasks and troubleshooting

**Start here if:** You're writing code or setting up a new feature.

#### 4. [Development Roadmap](./development-roadmap.md)
**For:** Project managers, developers, stakeholders
- Version history (v0.1.0 current, up to v1.0.0 planned)
- Phase-by-phase feature breakdown
- Priority tiers and timelines
- Dependencies and technical debt
- KPIs and release checklists
- Success criteria for v1.0.0

**Start here if:** You're planning features, assessing priorities, or tracking progress.

#### 5. [Project Changelog](./project-changelog.md)
**For:** Developers, QA, stakeholders
- Detailed log of all releases and changes
- What was added, changed, fixed in each version
- Migration guides between versions
- Known issues and workarounds
- Deployment history and performance metrics
- Release notes and testing checklists

**Start here if:** You need to know what changed or trace historical decisions.

### Implementation Guides

#### 6. [Blog Implementation Guide](./blog-guide.md)
**For:** Content creators, developers, editors
- Quick start for adding blog posts
- File structure and frontmatter reference
- Markdown syntax and MDX capabilities
- Writing best practices and SEO optimization
- Publishing workflow
- Managing and editing posts
- Troubleshooting common issues

**Start here if:** You're creating or editing blog posts.

---

## Quick Reference

### Project Type
- **Landing page** with integrated blog system
- **Static-first** (SSG via Next.js)
- **No backend required** (content on filesystem)

### Tech Stack Summary
```
Frontend:    React 19, Next.js 15, Tailwind CSS v4
Animations:  Framer Motion 11
Theme:       next-themes (dark/light mode)
Blog:        gray-matter (parsing), next-mdx-remote (rendering)
Hosting:     Vercel (or Cloudflare Workers)
```

### Key Directories
```
src/
├── app/              # Pages & routes
├── components/       # React components
├── hooks/            # Custom hooks
└── lib/              # Utilities & constants

content/
└── posts/            # Blog posts (*.mdx)

docs/                 # This documentation
```

### Critical Files
| File | Purpose |
|------|---------|
| `src/lib/constants.ts` | All content: stats, FAQ, testimonials, nav |
| `src/lib/posts.ts` | Blog post utilities |
| `src/app/globals.css` | Tailwind tokens, dark mode, utilities |
| `content/posts/*.mdx` | Blog post files (YAML frontmatter + markdown) |

---

## Common Tasks

### I want to...

**Add a blog post**
→ Read [Blog Implementation Guide](./blog-guide.md) → Quick Start section

**Understand the architecture**
→ Read [System Architecture](./system-architecture.md)

**Write a new component**
→ Read [Code Standards](./code-standards.md) → Component Structure section

**Deploy to production**
→ Read [Project Overview & PDR](./project-overview-pdr.md) → Deployment Pipeline section

**Track project progress**
→ Read [Development Roadmap](./development-roadmap.md)

**Update content (stats, FAQ, testimonials)**
→ Edit `src/lib/constants.ts` per [Code Standards](./code-standards.md)

**Understand what changed**
→ Read [Project Changelog](./project-changelog.md)

**Set up the project locally**
→ See [Root README.md](../README.md) (installation & build commands)

**Optimize performance**
→ Read [System Architecture](./system-architecture.md) → Performance Considerations section

---

## Development Workflow

### Standard Development Flow
```
1. Pick a task from GitHub Issues
2. Create feature branch (e.g., `feature/blog-comments`)
3. Read relevant documentation (this README helps point you)
4. Code & test locally
5. Run: npm run lint, npm run build
6. Commit with conventional message (feat:, fix:, docs:, etc.)
7. Push & create PR
8. Request code review
9. Merge to main → Auto-deploys to Vercel
```

### Before Committing
```bash
npm run lint      # ESLint check
npm run build     # Build & type check
npm start         # Test locally
```

### Adding New Content
1. Edit `src/lib/constants.ts` for static content (stats, FAQ, etc.)
2. Add blog post: `content/posts/your-slug.mdx`
3. Build & test: `npm run build && npm start`
4. Commit & push

---

## Naming Conventions

### File Naming
| Type | Convention | Example |
|------|-----------|---------|
| React components | PascalCase | `Header.tsx`, `BaiVietCard.tsx` |
| Utilities | kebab-case | `use-counter.ts`, `posts.ts` |
| Blog posts | kebab-case | `meo-mua-sam-shopee.mdx` |
| CSS classes | kebab-case | `text-primary`, `brand-orange` |

### Code Naming
| Entity | Convention | Example |
|--------|-----------|---------|
| Functions | camelCase | `getAllPosts()`, `calcReadingTime()` |
| Constants | UPPER_SNAKE_CASE | `POSTS_DIR`, `SITE_URL` |
| Interfaces | PascalCase | `PostFrontmatter`, `BaiVietCardProps` |
| URL slugs | kebab-case | `/bai-viet`, `meo-mua-sam` |

---

## Useful Links

### External Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Markdown Guide](https://markdownguide.org/)
- [MDX Documentation](https://mdxjs.com/)
- [gray-matter](https://github.com/jonschlinkert/gray-matter)

### Internal Links
- [Root README](../README.md) — Setup, build, deploy commands
- [package.json](../package.json) — Dependencies & scripts

---

## FAQ — Documentation

**Q: Where do I add new blog posts?**  
A: Create `.mdx` file in `content/posts/` with YAML frontmatter. See [Blog Implementation Guide](./blog-guide.md).

**Q: How do I update site content (stats, testimonials, etc.)?**  
A: Edit `src/lib/constants.ts` per [Code Standards](./code-standards.md) guide.

**Q: What's the deployment process?**  
A: Push to `main` → Vercel auto-builds & deploys. See [Project Overview & PDR](./project-overview-pdr.md).

**Q: How is dark mode implemented?**  
A: Class-based strategy using `next-themes`. See [System Architecture](./system-architecture.md) → Dark Mode Implementation.

**Q: Can I use React components in blog posts?**  
A: Yes! Posts are MDX files. See [Blog Implementation Guide](./blog-guide.md) → Markdown + React (MDX) section.

**Q: What's the blog post frontmatter?**  
A: `title`, `description`, `date`, `slug`, `tags`, `published`. See [Blog Implementation Guide](./blog-guide.md) → Frontmatter Reference.

---

## Versioning

Current version: **0.1.0** (released 2026-04-26)

Features:
- Landing page with all sections
- Blog system with MDX support
- SEO optimization with JSON-LD
- Dark/light mode
- Responsive design

See [Development Roadmap](./development-roadmap.md) for planned features.

---

## Support

### Getting Help
1. **Documentation:** Check the relevant guide above (this README helps you navigate)
2. **Code examples:** See existing components in `src/` directory
3. **Issues:** Create GitHub issue with details
4. **Code review:** Ask teammates in pull request comments
5. **Architecture questions:** Contact tech lead (Nam Nguyen)

### Reporting Issues
Include:
- What you were trying to do
- What happened (error message, unexpected behavior)
- Steps to reproduce
- Expected behavior
- Screenshots (if UI-related)

---

## Contributing

### Code Quality Standards
- TypeScript strict mode (no `any`)
- No linting errors (`npm run lint`)
- Builds without errors (`npm run build`)
- Meaningful commit messages (conventional commits)
- Updated documentation for features

### Documentation Standards
- Clear, concise writing
- Code examples where helpful
- Links to related docs
- Updated when code changes
- No grammar/spelling errors

---

## Version History

| Version | Release Date | Highlights |
|---------|-------------|-----------|
| 0.1.0 | 2026-04-26 | Blog system, MDX, SEO, JSON-LD |
| 0.0.1 | 2026-04-24 | Landing page MVP |

See [Project Changelog](./project-changelog.md) for detailed history.

---

## Document Maintenance

**Last updated:** 2026-04-26  
**Maintainer:** Nam Nguyen (namnh68)  
**Next review:** Before v0.2.0 release (estimated 2026-05-31)

To update this documentation, edit the relevant file and commit with `docs:` prefix.

---

**Happy coding! 🚀**

Start with the guide that matches your task (see "Common Tasks" section above).
