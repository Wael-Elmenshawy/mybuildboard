function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#"
          className="text-2xl font-extrabold tracking-tight transition hover:opacity-80"
        >
          <span className="text-primary">My</span>BuildBoard
        </a>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a
            href="#features"
            className="transition-colors duration-300 hover:text-primary"
          >
            Features
          </a>

          <a
            href="#portfolio"
            className="transition-colors duration-300 hover:text-primary"
          >
            Portfolio
          </a>

          <a
            href="#integrations"
            className="transition-colors duration-300 hover:text-primary"
          >
            Integrations
          </a>

          <a
            href="#pricing"
            className="transition-colors duration-300 hover:text-primary"
          >
            Pricing
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-muted">
            Login
          </button>

          <button className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
