import { Globe, Mail, Phone, UtensilsCrossed } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-footer text-white" data-ocid="footer.section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">Pochampalli Food</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Your go-to platform for discovering the best food, restaurants,
              and culinary experiences in Pochampalli District.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Careers
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Blog
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Partner with us
                </span>
              </li>
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Discover</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Terms &amp; Conditions
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Security
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  For Restaurants
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>hello@pochampallieats.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary flex-shrink-0" />
                <span>www.pochampallieats.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <span>© {year} Pochampalli Eats. All rights reserved.</span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
