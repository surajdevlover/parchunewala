import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Footer from "../footer/footer"
import { SharedHeader } from "@/components/shared-header"
import { Bike, Clock, DollarSign, MapPin, Calendar, Shield, CheckCircle, Award, Star, Phone, Sparkles } from "lucide-react"

export default function DeliveryPartnerPage() {
  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-pastel-orange" />,
      title: "Flexible Hours",
      description: "Choose when you want to work. Log in and start earning on your own schedule."
    },
    {
      icon: <DollarSign className="h-6 w-6 text-pastel-orange" />,
      title: "Competitive Earnings",
      description: "Earn competitive payouts per delivery plus tips, with weekly settlements."
    },
    {
      icon: <MapPin className="h-6 w-6 text-pastel-orange" />,
      title: "Work Locally",
      description: "Deliver within your neighborhood. No need to travel long distances."
    },
    {
      icon: <Calendar className="h-6 w-6 text-pastel-orange" />,
      title: "Quick Payment",
      description: "Get paid weekly directly to your bank account with transparent earnings."
    }
  ]

  const requirements = [
    "Age 18 or older",
    "Valid driving license",
    "Smartphone with internet connection",
    "Vehicle (bike, scooter, or car)",
    "Background verification clearance"
  ]

  const faqs = [
    {
      question: "How do I get started?",
      answer: "Sign up through our online form, complete the verification process, attend a brief orientation, and you're ready to start delivering!"
    },
    {
      question: "How much can I earn?",
      answer: "Earnings vary based on the number of deliveries completed, distance traveled, and time of day. Many partners earn between ₹15,000 to ₹30,000 per month."
    },
    {
      question: "Do I need my own vehicle?",
      answer: "Yes, you need your own bike, scooter, or car to make deliveries. We don't provide vehicles to delivery partners."
    },
    {
      question: "When and how do I get paid?",
      answer: "We process payments weekly. Earnings are directly transferred to your registered bank account every Monday for the previous week's work."
    },
    {
      question: "Can I work part-time?",
      answer: "Absolutely! Many of our delivery partners work part-time while pursuing education or alongside other jobs."
    },
    {
      question: "What support do you provide?",
      answer: "We provide comprehensive training, customer service support, and insurance coverage while you're making deliveries."
    }
  ]

  const testimonials = [
    {
      quote: "Being a delivery partner with ParchuneWala has given me the flexibility to earn while pursuing my studies. The app is easy to use, and the support team is always helpful.",
      name: "Rahul Singh",
      location: "Delhi",
      image: "/images/delivery-partner-1.jpg",
      rating: 5
    },
    {
      quote: "I started as a part-time delivery partner and now do it full-time. The consistent earnings have helped me support my family and save for the future.",
      name: "Priya Sharma",
      location: "Mumbai",
      image: "/images/delivery-partner-2.jpg",
      rating: 4
    },
    {
      quote: "The flexibility is what I love the most. I can work whenever I want and earn extra income to supplement my regular job.",
      name: "Mohammed Iqbal",
      location: "Hyderabad",
      image: "/images/delivery-partner-3.jpg",
      rating: 5
    }
  ]

  return (
    <main className="bg-gray-50 min-h-screen">
      <SharedHeader title="Become a Delivery Partner" showLogo={true} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="max-w-md">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
                  Deliver With ParchuneWala
                </h1>
                <p className="text-lg text-gray-700 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Earn on your schedule. Enjoy the freedom to work when you want and earn competitive pay for each delivery.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <CheckCircle className="text-pastel-orange h-5 w-5 flex-shrink-0" />
                    <span className="text-gray-700">Flexible hours, be your own boss</span>
                  </div>
                  <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <CheckCircle className="text-pastel-orange h-5 w-5 flex-shrink-0" />
                    <span className="text-gray-700">Competitive pay with weekly settlements</span>
                  </div>
                  <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <CheckCircle className="text-pastel-orange h-5 w-5 flex-shrink-0" />
                    <span className="text-gray-700">Deliver within your neighborhood</span>
                  </div>
                </div>
                <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <Link href="#registration">
                    <Button size="lg" className="bg-pastel-orange text-white hover:bg-pastel-orange/90">
                      Sign Up Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative animate-float">
              <div className="relative h-80 w-full md:h-96 md:w-96 mx-auto">
                <Image
                  src="/images/delivery-partner.jpg"
                  alt="Delivery Partner"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-md animate-bounce-in" style={{ animationDelay: '0.8s' }}>
                  <div className="flex items-center gap-2">
                    <DollarSign className="text-pastel-orange h-5 w-5" />
                    <div>
                      <div className="text-xs text-gray-500">Avg. Monthly Earnings</div>
                      <div className="text-lg font-bold text-gray-900">₹25,000+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Become a Delivery Partner?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of delivery partners who are enjoying the benefits of working with ParchuneWala.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-6 transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]"
              >
                <div className="bg-pastel-orange/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started as a delivery partner is simple and straightforward
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-pastel-orange/20"></div>
              
              {/* Timeline Items */}
              <div className="space-y-12 relative">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Sign Up</h3>
                    <p className="text-gray-600">
                      Fill out our simple online form with your details. It takes less than 5 minutes.
                    </p>
                  </div>
                  <div className="bg-pastel-orange w-10 h-10 rounded-full flex items-center justify-center text-white font-bold z-10">
                    1
                  </div>
                  <div className="md:w-1/2 md:pl-12 hidden md:block">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <Image
                        src="/images/delivery-signup.jpg"
                        alt="Sign Up Process"
                        width={300}
                        height={200}
                        className="rounded"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="md:w-1/2 md:pr-12 hidden md:block">
                    <div className="bg-white p-4 rounded-lg shadow-sm md:float-right">
                      <Image
                        src="/images/delivery-verification.jpg"
                        alt="Verification Process"
                        width={300}
                        height={200}
                        className="rounded"
                      />
                    </div>
                  </div>
                  <div className="bg-pastel-orange w-10 h-10 rounded-full flex items-center justify-center text-white font-bold z-10">
                    2
                  </div>
                  <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0 md:text-left">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Verification</h3>
                    <p className="text-gray-600">
                      Upload documents for verification. We'll process your application within 24-48 hours.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Orientation</h3>
                    <p className="text-gray-600">
                      Attend a brief online orientation to learn about the app and delivery process.
                    </p>
                  </div>
                  <div className="bg-pastel-orange w-10 h-10 rounded-full flex items-center justify-center text-white font-bold z-10">
                    3
                  </div>
                  <div className="md:w-1/2 md:pl-12 hidden md:block">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <Image
                        src="/images/delivery-training.jpg"
                        alt="Orientation Training"
                        width={300}
                        height={200}
                        className="rounded"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="md:w-1/2 md:pr-12 hidden md:block">
                    <div className="bg-white p-4 rounded-lg shadow-sm md:float-right">
                      <Image
                        src="/images/delivery-active.jpg"
                        alt="Start Delivering"
                        width={300}
                        height={200}
                        className="rounded"
                      />
                    </div>
                  </div>
                  <div className="bg-pastel-orange w-10 h-10 rounded-full flex items-center justify-center text-white font-bold z-10">
                    4
                  </div>
                  <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0 md:text-left">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Start Delivering</h3>
                    <p className="text-gray-600">
                      Download the app, log in, and start accepting delivery requests on your schedule.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Requirements</h2>
              <p className="text-gray-600">
                Here's what you need to become a delivery partner with ParchuneWala
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="bg-pastel-orange/10 rounded-full p-2">
                      <CheckCircle className="h-5 w-5 text-pastel-orange" />
                    </div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Partner Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from people who are already delivering with ParchuneWala
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm p-6 relative"
              >
                <div className="absolute -top-5 right-6 bg-white rounded-full p-2 shadow-md">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <blockquote className="text-gray-600 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image 
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get answers to the most common questions about being a delivery partner
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`border-b border-gray-200 p-6 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-pastel-orange" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div id="registration" className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Join Our Delivery Team</h2>
              <p className="text-gray-600 mb-8 text-center">
                Fill out this form to start your journey as a ParchuneWala delivery partner.
              </p>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                      placeholder="Your contact number"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                    placeholder="Your email address"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      id="city"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                      placeholder="Your city"
                    />
                  </div>
                  <div>
                    <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                    <select
                      id="vehicleType"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                    >
                      <option value="">Select vehicle type</option>
                      <option value="bike">Bike</option>
                      <option value="scooter">Scooter</option>
                      <option value="cycle">Bicycle</option>
                      <option value="car">Car</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">Preferred Working Hours</label>
                  <select
                    id="availability"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                  >
                    <option value="">Select preferred hours</option>
                    <option value="morning">Morning (8 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 8 PM)</option>
                    <option value="night">Night (8 PM - 12 AM)</option>
                    <option value="flexible">Flexible Hours</option>
                    <option value="fulltime">Full Time</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="h-4 w-4 text-pastel-orange focus:ring-pastel-orange border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <Link href="/terms" className="text-pastel-orange hover:underline">Terms and Conditions</Link>
                  </label>
                </div>
                
                <div>
                  <Button type="submit" className="w-full bg-pastel-orange text-white hover:bg-pastel-orange/90">
                    Submit Application
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Support */}
      <div className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center">
            <Phone className="h-10 w-10 text-pastel-orange mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Need help signing up?</h3>
            <p className="text-gray-600 mb-4">
              Call our partner support team at <span className="font-semibold">1800-123-4567</span><br />
              Available Mon-Sat, 9 AM to 8 PM
            </p>
            <Button variant="outline" className="border-pastel-orange text-pastel-orange hover:bg-pastel-orange/10">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
} 