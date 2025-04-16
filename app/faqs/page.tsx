"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Footer from "../footer/footer"
import { SharedHeader } from "@/components/shared-header"
import { HelpCircle, Package, Truck, CreditCard, RotateCcw, User, ShoppingBag, Phone } from "lucide-react"

export default function FAQsPage() {
  const categories = [
    { 
      id: "ordering", 
      name: "Ordering", 
      icon: <ShoppingBag className="h-5 w-5 text-pastel-orange" />,
      faqs: [
        {
          question: "How do I place an order on ParchuneWala?",
          answer: "You can place an order by downloading our app or visiting our website, browsing through products from local stores, adding items to your cart, and proceeding to checkout where you'll select delivery options and payment methods."
        },
        {
          question: "Can I schedule my order for a later time?",
          answer: "Yes, during checkout you can choose between immediate delivery or schedule your order for a later time that's convenient for you."
        },
        {
          question: "Is there a minimum order value?",
          answer: "Minimum order values may vary depending on the store. The minimum order value, if applicable, will be displayed before you proceed to checkout."
        },
        {
          question: "Can I add special instructions for my order?",
          answer: "Yes, during checkout there's an option to add special instructions for both the store preparing your order and the delivery partner."
        }
      ]
    },
    { 
      id: "delivery", 
      name: "Delivery", 
      icon: <Truck className="h-5 w-5 text-pastel-orange" />,
      faqs: [
        {
          question: "How long will it take to deliver my order?",
          answer: "Delivery times vary depending on your location, store preparation time, and order volume. The estimated delivery time will be shown at checkout and you can track your order in real-time on our app."
        },
        {
          question: "Do you deliver to my area?",
          answer: "We deliver to many areas across major cities in India. To check if we deliver to your location, enter your address in the app or website and it will show you available stores in your area."
        },
        {
          question: "What happens if no one is available to receive the order?",
          answer: "Our delivery partners will attempt to contact you via phone. If unreachable, they'll wait for a reasonable time before leaving. For food items that need to be returned, you may be charged for the order."
        },
        {
          question: "Can I change the delivery address after placing an order?",
          answer: "Once an order is placed, you can't change the delivery address. If needed, you'll have to cancel the order (if still within the cancellation window) and place a new one with the correct address."
        }
      ]
    },
    { 
      id: "payment", 
      name: "Payment", 
      icon: <CreditCard className="h-5 w-5 text-pastel-orange" />,
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept various payment methods including credit/debit cards, UPI, net banking, digital wallets like Paytm and PhonePe, and cash on delivery (for eligible orders)."
        },
        {
          question: "Is it safe to save my card details on your platform?",
          answer: "Yes, we use industry-standard security measures and don't store your complete card information on our servers. Your payment data is encrypted and processed securely through our payment partners."
        },
        {
          question: "What is ParchuneWala Pay and how does it work?",
          answer: "ParchuneWala Pay is our in-app wallet that allows you to store money for faster checkout. You can add money to it via any payment method and also receive refunds and cashbacks directly into it."
        },
        {
          question: "Why was my payment declined?",
          answer: "Payments may be declined due to insufficient funds, exceeding card limits, network issues, or bank security protocols. Try using a different payment method or contact your bank for specific details."
        }
      ]
    },
    { 
      id: "returns", 
      name: "Returns & Refunds", 
      icon: <RotateCcw className="h-5 w-5 text-pastel-orange" />,
      faqs: [
        {
          question: "What is your return policy?",
          answer: "Our return policy varies by product category. Generally, we accept returns for damaged, defective, or incorrect items within 24-48 hours of delivery. Check specific return eligibility on the product page before ordering."
        },
        {
          question: "How do I return an item?",
          answer: "To return an item, go to 'My Orders' in the app, select the order containing the item, click on 'Return or Exchange', and follow the on-screen instructions. Our customer support or delivery partner will assist with the return process."
        },
        {
          question: "How long does it take to get a refund?",
          answer: "After your return is approved, refunds typically take 5-7 business days to reflect in your original payment method. Refunds to ParchuneWala Pay are processed within 24 hours."
        },
        {
          question: "Can I cancel my order after placing it?",
          answer: "Yes, you can cancel an order before it's prepared by the store. Go to 'My Orders' in the app and select 'Cancel Order'. Once the store starts preparing your order, cancellation may not be possible."
        }
      ]
    },
    { 
      id: "account", 
      name: "Account & Profile", 
      icon: <User className="h-5 w-5 text-pastel-orange" />,
      faqs: [
        {
          question: "How do I create a ParchuneWala account?",
          answer: "You can create an account by downloading our app or visiting our website, clicking on 'Sign Up', and following the registration process by providing your phone number, email, and other required details."
        },
        {
          question: "How can I reset my password?",
          answer: "On the login screen, click 'Forgot Password', enter your registered email or phone number, and follow the instructions sent to you to reset your password."
        },
        {
          question: "How do I update my profile information?",
          answer: "Log in to your account, go to 'My Profile' or 'Account Settings', and you can update your personal information, address, payment methods, and communication preferences."
        },
        {
          question: "Can I have multiple delivery addresses in my account?",
          answer: "Yes, you can save multiple delivery addresses in your account. During checkout, you'll be able to select which saved address you want your order delivered to, or add a new address."
        }
      ]
    },
    { 
      id: "products", 
      name: "Products & Pricing", 
      icon: <Package className="h-5 w-5 text-pastel-orange" />,
      faqs: [
        {
          question: "Why do prices on ParchuneWala differ from in-store prices?",
          answer: "Some stores may have different pricing on our platform due to convenience fees, operational costs, or special online promotions. We strive to keep prices as close to in-store prices as possible."
        },
        {
          question: "What happens if an item in my order is out of stock?",
          answer: "If an item is out of stock after you place your order, the store may suggest alternatives, or the item will be removed from your order and you'll be refunded for that item."
        },
        {
          question: "How accurate are the product images on your platform?",
          answer: "We try to provide accurate product images, but actual products may vary slightly in appearance. Product specifications and descriptions are provided by manufacturers or stores and we recommend reviewing them before purchasing."
        },
        {
          question: "Do you sell products with expiration dates?",
          answer: "Yes, for products like groceries and food items. Our partner stores maintain quality standards and typically provide products with reasonable shelf life. If you receive a near-expiry product, you can request a return or replacement."
        }
      ]
    }
  ]

  return (
    <main className="bg-gray-50 min-h-screen">
      <SharedHeader title="FAQs" showLogo={true} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-4 flex justify-center">
              <HelpCircle className="h-12 w-12 text-pastel-orange" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-700">
              Find answers to common questions about using ParchuneWala services
            </p>

            {/* Category Navigation */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <a 
                  key={category.id} 
                  href={`#${category.id}`}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm text-sm font-medium text-gray-700 hover:bg-pastel-orange hover:text-white transition-colors"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {categories.map((category) => (
              <div key={category.id} id={category.id} className="mb-12 scroll-mt-20">
                <div className="flex items-center mb-6">
                  <div className="bg-pastel-orange/10 p-2 rounded-full mr-3">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                </div>
                
                <div className="space-y-4">
                  {category.faqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-50 rounded-lg p-6 shadow-sm"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-start">
                        <span className="text-pastel-orange mr-2 flex-shrink-0">Q:</span>
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* More Questions Section */}
            <div className="bg-pastel-orange/10 rounded-lg p-8 text-center mt-12">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Still have questions?</h2>
              <p className="text-gray-600 mb-6">
                If you couldn't find the answer to your question, our support team is ready to help.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button className="bg-pastel-orange text-white hover:bg-pastel-orange/90 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
} 