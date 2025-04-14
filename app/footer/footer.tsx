import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { Logo } from "@/components/logo";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo size="md" />
            <p className="mt-4 text-gray-600 text-sm">
              Order your daily needs from your nearby stores with super fast delivery.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-pastel-orange transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-pastel-orange transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-pastel-orange transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-pastel-orange transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">ParchuneWala</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-600 hover:text-pastel-orange">About Us</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:text-pastel-orange">Careers</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-pastel-orange">Blog</Link></li>
              <li><Link href="/press" className="text-gray-600 hover:text-pastel-orange">Press</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-pastel-orange">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">For Partners</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/partner" className="text-gray-600 hover:text-pastel-orange">Partner with us</Link></li>
              <li><Link href="/seller" className="text-gray-600 hover:text-pastel-orange">Become a Seller</Link></li>
              <li><Link href="/deliver" className="text-gray-600 hover:text-pastel-orange">Delivery Partner</Link></li>
              <li><Link href="/franchise" className="text-gray-600 hover:text-pastel-orange">Franchise</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Learn More</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-gray-600 hover:text-pastel-orange">Privacy</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-pastel-orange">Terms</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-pastel-orange">FAQs</Link></li>
              <li><Link href="/security" className="text-gray-600 hover:text-pastel-orange">Security</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-medium text-gray-900 mb-3">Download App</h3>
            <div className="flex flex-col space-y-2">
              <a href="#" className="bg-black text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-gray-800 transition">
                <span className="text-xs">Download on the</span>
                <span className="font-medium">App Store</span>
              </a>
              <a href="#" className="bg-black text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-gray-800 transition">
                <span className="text-xs">GET IT ON</span>
                <span className="font-medium">Google Play</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ParchuneWala. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-gray-500">
            <a href="#" className="hover:text-pastel-orange">Privacy Policy</a>
            <a href="#" className="hover:text-pastel-orange">Terms of Service</a>
            <a href="#" className="hover:text-pastel-orange">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
