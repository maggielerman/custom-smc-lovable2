import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[var(--softgray)] border-t">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold">DonorBookies</h3>
            <p className="mt-4 text-sm text-gray-600">
              Helping families share their unique stories with love, honesty, and
              beautiful illustrations.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Books</h3>
            <ul className="mt-4 space-y-2">
              {/* <li>
                <Link to="/book-types/donor-egg" className="text-sm text-gray-600 hover:text-primary">
                  Donor Egg Stories
                </Link>
              </li>
              <li>
                <Link to="/book-types/donor-sperm" className="text-sm text-gray-600 hover:text-primary">
                  Donor Sperm Stories
                </Link>
              </li>
              <li>
                <Link to="/book-types/donor-embryo" className="text-sm text-gray-600 hover:text-primary">
                  Donor Embryo Stories
                </Link>
              </li>
              <li>
                <Link to="/book-types/ivf" className="text-sm text-gray-600 hover:text-primary">
                  IVF Journey Stories
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-[var(--navy)] hover:text-[var(--blush)]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-[var(--navy)] hover:text-[var(--blush)]">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-sm text-[var(--navy)] hover:text-[var(--blush)]">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-[var(--navy)] hover:text-[var(--blush)]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-[var(--navy)] hover:text-[var(--blush)]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-[var(--navy)] hover:text-[var(--blush)]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} DonorBookies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
