import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Footer from "../footer/footer"
import { SharedHeader } from "@/components/shared-header"
import { FileText, AlertCircle } from "lucide-react"

export default function TermsOfServicePage() {
  const lastUpdated = "April 15, 2025"

  return (
    <main className="bg-gray-50 min-h-screen">
      <SharedHeader title="Terms of Service" showLogo={true} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-4 flex justify-center">
              <FileText className="h-12 w-12 text-pastel-orange" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-700">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg">
              <p className="lead text-gray-600">
                Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the ParchuneWala website and mobile application (the "Service") operated by ParchuneWala ("us", "we", or "our").
              </p>
              
              <p className="text-gray-600">
                Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
              
              <p className="text-gray-600 mb-6">
                <strong>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.</strong>
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Accounts</h2>
              <p className="text-gray-600 mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              
              <p className="text-gray-600 mb-4">
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
              </p>
              
              <p className="text-gray-600 mb-4">
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Use of the Service</h2>
              <p className="text-gray-600 mb-4">
                Our Service allows you to place orders for products from local stores, track deliveries, and make payments.
              </p>
              
              <p className="text-gray-600 mb-4">
                You are prohibited from:
              </p>
              
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li>Using the Service for any illegal purpose or in violation of any laws</li>
                <li>Violating any regulations, rules, or procedures of the stores available on our platform</li>
                <li>Interfering with or disrupting the Service or servers or networks connected to the Service</li>
                <li>Attempting to gain unauthorized access to any portion of the Service or any other systems or networks connected to the Service</li>
                <li>Using the Service to send unsolicited communications (spam)</li>
                <li>Impersonating or attempting to impersonate ParchuneWala, a ParchuneWala employee, another user, or any other person or entity</li>
                <li>Using the Service in any manner that could disable, overburden, damage, or impair the Service</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Orders and Payments</h2>
              <p className="text-gray-600 mb-4">
                By placing an order through our Service, you agree to pay the listed price for the products, applicable taxes, and delivery fees. You represent and warrant that you have the legal right to use any payment method you provide in connection with any order.
              </p>
              
              <p className="text-gray-600 mb-4">
                We reserve the right to refuse or cancel your order if we suspect fraud, unauthorized or illegal activity, or if products are mispriced, out of stock, or unavailable.
              </p>
              
              <p className="text-gray-600 mb-4">
                Once an order is placed, you may be able to cancel it within a limited time frame as specified in our cancellation policy. After that time, cancellation may not be possible or may incur cancellation fees.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Delivery and Product Quality</h2>
              <p className="text-gray-600 mb-4">
                We strive to ensure timely delivery of orders and the quality of products. However, delivery times are estimates and may be affected by factors beyond our control such as weather, traffic, and store operations.
              </p>
              
              <p className="text-gray-600 mb-4">
                While we work with reputable stores, we do not manufacture or produce the products available on our platform. We are not responsible for product quality, although we will assist with resolving quality issues with the stores.
              </p>
              
              <p className="text-gray-600 mb-4">
                If you are not satisfied with the product quality or if there is an issue with your delivery, please contact our customer support as detailed in our Refund and Return Policy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of ParchuneWala and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries.
              </p>
              
              <p className="text-gray-600 mb-4">
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ParchuneWala.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Termination</h2>
              <p className="text-gray-600 mb-4">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              
              <p className="text-gray-600 mb-4">
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or delete your account through the app settings.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                In no event shall ParchuneWala, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Disclaimer</h2>
              <p className="text-gray-600 mb-4">
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
              </p>
              
              <p className="text-gray-600 mb-4">
                ParchuneWala, its subsidiaries, affiliates, and licensors do not warrant that the Service will function uninterrupted, secure, or available at any particular time or location; that any errors or defects will be corrected; that the Service is free of viruses or other harmful components; or that the results of using the Service will meet your requirements.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Governing Law</h2>
              <p className="text-gray-600 mb-4">
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
              
              <p className="text-gray-600 mb-4">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              
              <p className="text-gray-600 mb-4">
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-600">
                  <strong>Email:</strong> legal@parchunewala.com<br />
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
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className="h-5 w-5 text-pastel-orange mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">Need more information?</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Check out our complementary policies to better understand how we operate.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/privacy-policy">
                <Button variant="outline" className="border-pastel-orange text-pastel-orange hover:bg-pastel-orange/10">
                  Privacy Policy
                </Button>
              </Link>
              <Link href="/refund-policy">
                <Button variant="outline" className="border-pastel-orange text-pastel-orange hover:bg-pastel-orange/10">
                  Refund Policy
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-pastel-orange text-white hover:bg-pastel-orange/90">
                  Contact Support
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