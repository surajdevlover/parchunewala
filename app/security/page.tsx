import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Footer from "../footer/footer"
import { Shield, Lock, Server, Bell, Users, KeyRound } from "lucide-react"
import { SharedHeader } from "@/components/shared-header"

export default function SecurityPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <SharedHeader title="Security" showBackButton={true} />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Security at ParchuneWala</h2>
              <p className="text-gray-600">
                At ParchuneWala, keeping your data secure is a top priority. We've implemented comprehensive security measures to ensure the privacy and protection of your personal information.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-pastel-orange text-white p-3 rounded-full">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Data Protection</h3>
                    <p className="text-gray-600">
                      We implement industry-standard encryption protocols to protect your data during transmission and storage. Your personal information, including payment details and addresses, are encrypted and stored securely.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-pastel-orange text-white p-3 rounded-full">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Secure Transactions</h3>
                    <p className="text-gray-600">
                      All payment transactions are processed through secure payment gateways that comply with PCI DSS standards. We don't store your complete credit card information on our servers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-pastel-orange text-white p-3 rounded-full">
                    <Server size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Infrastructure Security</h3>
                    <p className="text-gray-600">
                      Our applications are hosted on secure cloud infrastructure with multiple layers of security controls. We regularly update our systems and conduct security assessments to identify and address potential vulnerabilities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-pastel-orange text-white p-3 rounded-full">
                    <Bell size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Security Monitoring</h3>
                    <p className="text-gray-600">
                      We employ continuous monitoring systems to detect and respond to unusual activities. Our security team reviews logs and alerts to identify potential security incidents in real-time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-pastel-orange text-white p-3 rounded-full">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Vendor Security</h3>
                    <p className="text-gray-600">
                      We carefully select our third-party service providers and ensure they maintain high security standards. We regularly review their security practices and compliance with relevant regulations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-pastel-orange text-white p-3 rounded-full">
                    <KeyRound size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Account Security</h3>
                    <p className="text-gray-600">
                      We recommend using strong, unique passwords for your ParchuneWala account. We also implement measures to prevent unauthorized access, including login notifications and suspicious activity alerts.
                    </p>
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700 mb-2">Tips for keeping your account secure:</h4>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Use a strong, unique password</li>
                        <li>Don't share your login credentials with others</li>
                        <li>Be cautious of phishing attempts — we'll never ask for your password via email</li>
                        <li>Regularly monitor your account for unusual activity</li>
                        <li>Log out when using shared devices</li>
                        <li>Keep your device and apps updated</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <h3 className="text-xl font-medium text-gray-800 mb-3">Reporting Security Issues</h3>
              <p className="text-gray-600 mb-4">
                If you discover a security vulnerability or have concerns about the security of your account, please contact our security team immediately.
              </p>
              <div className="bg-pastel-orange/10 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> security@parchunewala.com<br />
                  <strong>Phone:</strong> +91 98765 43212 (Security Helpline)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
} 