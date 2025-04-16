import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Footer from "../footer/footer"
import { SharedHeader } from "@/components/shared-header"

export default function CookiePolicyPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <SharedHeader title="Cookie Policy" showBackButton={true} />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Cookie Policy</h2>
              <p className="text-sm text-gray-500">Last Updated: January 1, 2024</p>
            </div>

            <div className="prose max-w-none text-gray-600">
              <p>
                This Cookie Policy explains how ParchuneWala ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website and mobile application (collectively, "Services"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">What are cookies?</h3>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              <p>
                Cookies set by the website owner (in this case, ParchuneWala) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your device both when it visits the website in question and also when it visits certain other websites.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Why do we use cookies?</h3>
              <p>
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Services to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Services. Third parties serve cookies through our Services for advertising, analytics, and other purposes. This is described in more detail below.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Types of cookies we use</h3>
              
              <h4 className="text-lg font-medium text-gray-700 mt-4 mb-2">Essential Cookies</h4>
              <p>
                These cookies are strictly necessary to provide you with services available through our Services and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the Services, you cannot refuse them without impacting how our Services function.
              </p>
              
              <h4 className="text-lg font-medium text-gray-700 mt-4 mb-2">Performance and Functionality Cookies</h4>
              <p>
                These cookies are used to enhance the performance and functionality of our Services but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
              </p>
              
              <h4 className="text-lg font-medium text-gray-700 mt-4 mb-2">Analytics and Customization Cookies</h4>
              <p>
                These cookies collect information that is used either in aggregate form to help us understand how our Services are being used or how effective our marketing campaigns are, or to help us customize our Services for you in order to enhance your experience.
              </p>
              
              <h4 className="text-lg font-medium text-gray-700 mt-4 mb-2">Advertising Cookies</h4>
              <p>
                These cookies are used to make advertising messages more relevant to you and your interests. They also perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.
              </p>
              
              <h4 className="text-lg font-medium text-gray-700 mt-4 mb-2">Social Media Cookies</h4>
              <p>
                These cookies are used to enable you to share pages and content that you find interesting on our Services through third-party social networking and other websites. These cookies may also be used for advertising purposes.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">How can you control cookies?</h3>
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner or cookie policy notification.
              </p>
              <p>
                You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Services though your access to some functionality and areas of our Services may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.
              </p>
              <p>
                In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit <a href="http://www.aboutads.info/choices/" className="text-pastel-orange hover:underline">http://www.aboutads.info/choices/</a> or <a href="http://www.youronlinechoices.com" className="text-pastel-orange hover:underline">http://www.youronlinechoices.com</a>.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">How often will we update this Cookie Policy?</h3>
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              <p>
                The date at the top of this Cookie Policy indicates when it was last updated.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Where can you get further information?</h3>
              <p>
                If you have any questions about our use of cookies or other technologies, please email us at privacy@parchunewala.com or contact us at:
              </p>
              <p className="mt-2">
                <strong>ParchuneWala</strong><br />
                123 Main Street, Sector 63<br />
                Noida, UP 201301<br />
                India
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
} 