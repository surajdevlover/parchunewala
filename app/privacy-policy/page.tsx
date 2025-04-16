import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Footer from "../footer/footer"
import { SharedHeader } from "@/components/shared-header"
import { Shield, Lock, FileText, AlertCircle } from "lucide-react"

export default function PrivacyPolicyPage() {
  const lastUpdated = "April 15, 2025"

  return (
    <main className="bg-gray-50 min-h-screen">
      <SharedHeader title="Privacy Policy" showLogo={true} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-4 flex justify-center">
              <Shield className="h-12 w-12 text-pastel-orange" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-700">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Policy Content */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg">
              <p className="lead text-gray-600">
                At ParchuneWala, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Personal Data</h3>
              <p className="text-gray-600 mb-4">
                We may collect personally identifiable information, such as your:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Delivery address</li>
                <li>Billing information</li>
                <li>Date of birth</li>
                <li>Demographic information</li>
              </ul>
              <p className="text-gray-600 mb-4">
                We collect this information when you register on our site, place an order, subscribe to a newsletter, respond to a survey, fill out a form, or enter information on our site.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Usage Data</h3>
              <p className="text-gray-600 mb-4">
                We may also collect information on how the website is accessed and used. This usage data may include:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li>Your computer's Internet Protocol address (e.g., IP address)</li>
                <li>Browser type</li>
                <li>Browser version</li>
                <li>Pages of our website that you visit</li>
                <li>Time and date of your visit</li>
                <li>Time spent on those pages</li>
                <li>Unique device identifiers</li>
                <li>Other diagnostic data</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">
                We use the information we collect in various ways, including to:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li>Provide, operate, and maintain our website and services</li>
                <li>Improve, personalize, and expand our website and services</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners</li>
                <li>Process your transactions</li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
                <li>For compliance with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Disclosure of Your Information</h2>
              <p className="text-gray-600 mb-4">
                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">By Law or to Protect Rights</h3>
              <p className="text-gray-600 mb-4">
                If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Third-Party Service Providers</h3>
              <p className="text-gray-600 mb-4">
                We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Marketing Communications</h3>
              <p className="text-gray-600 mb-4">
                With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Business Transfers</h3>
              <p className="text-gray-600 mb-4">
                We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Security of Your Information</h2>
              <p className="text-gray-600 mb-4">
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Rights Regarding Your Information</h2>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Your Choices</h3>
              <p className="text-gray-600 mb-4">
                You may at any time review or change the information in your account by:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li>Logging into your account settings and updating your account</li>
                <li>Contacting us using the contact information provided below</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Opting Out</h3>
              <p className="text-gray-600 mb-4">
                You can choose to receive or not receive certain communications from us. If you'd like to opt-out of receiving communications from us, please follow the instructions in those communications or contact us directly.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-600">
                  <strong>Email:</strong> privacy@parchunewala.com<br />
                  <strong>Address:</strong> ParchuneWala Headquarters, 123 Main Street, Sector 63, Noida, UP 201301, India<br />
                  <strong>Phone:</strong> +91 98765 43210
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Have questions about our privacy practices?</h3>
            <p className="text-gray-600 mb-6">
              We're committed to protecting your privacy and providing transparency about our data practices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-pastel-orange text-white hover:bg-pastel-orange/90">
                  Contact Us
                </Button>
              </Link>
              <Link href="/faqs">
                <Button variant="outline" className="border-pastel-orange text-pastel-orange hover:bg-pastel-orange/10">
                  View FAQs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
} 