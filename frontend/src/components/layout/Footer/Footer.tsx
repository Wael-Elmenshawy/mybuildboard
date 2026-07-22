function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:flex-row lg:justify-between">
        {/* Left */}
        <div className="max-w-sm">
          <h2 className="text-2xl font-black text-primary">
            MyBuildBoard
          </h2>

          <p className="mt-4 text-muted-foreground">
            One place to showcase your GitHub, projects, certifications,
            experience and everything you've built.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <h3 className="mb-4 font-bold">Product</h3>

            <ul className="space-y-2 text-muted-foreground">
              <li>Features</li>
              <li>Templates</li>
              <li>Pricing</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Resources</h3>

            <ul className="space-y-2 text-muted-foreground">
              <li>Documentation</li>
              <li>Blog</li>
              <li>Support</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Company</h3>

            <ul className="space-y-2 text-muted-foreground">
              <li>About</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MyBuildBoard. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
