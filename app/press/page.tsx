import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Footer from "../footer/footer"
import { ArrowLeft, Calendar, Download, ExternalLink } from "lucide-react"
import { SharedHeader } from "@/components/shared-header"

export default function PressPage() {
  const pressReleases = [
    {
      id: "1",
      title: "ParchuneWala Secures $5 Million in Seed Funding to Revolutionize Local Grocery Shopping",
      date: "January 15, 2024",
      excerpt: "ParchuneWala today announced it has raised $5 million in seed funding led by Sequoia India, with participation from Y Combinator and several angel investors.",
      pdfLink: "#",
      image: "/press-release-1.jpg"
    },
    {
      id: "2",
      title: "ParchuneWala Expands Operations to 10 New Cities Across India",
      date: "December 5, 2023",
      excerpt: "Following successful operations in major metros, ParchuneWala announced today the expansion of its services to 10 additional tier-2 cities in India.",
      pdfLink: "#",
      image: "/press-release-2.jpg"
    },
    {
      id: "3",
      title: "ParchuneWala Launches New Partner Program for Local Retailers",
      date: "November 10, 2023",
      excerpt: "ParchuneWala introduced its enhanced Partner Program, offering improved benefits and support for local retailers joining the platform.",
      pdfLink: "#",
      image: "/press-release-3.jpg"
    }
  ]
  
  const mediaFeatures = [
    {
      id: "1",
      title: "How ParchuneWala is Digitizing the Corner Store Experience",
      publication: "TechCrunch",
      date: "January 20, 2024",
      excerpt: "The Indian startup is bringing neighborhood shops online, helping them compete in the digital era while preserving their unique community roles.",
      link: "https://techcrunch.com",
      logo: "/tech-crunch-logo.png"
    },
    {
      id: "2",
      title: "The Future of Grocery Shopping in India's Evolving Retail Landscape",
      publication: "Economic Times",
      date: "December 15, 2023",
      excerpt: "ParchuneWala's innovative approach connects consumers with local kirana stores, offering the convenience of e-commerce with the personal touch of neighborhood shopping.",
      link: "https://economictimes.com",
      logo: "/et-logo.png"
    },
    {
      id: "3",
      title: "Meet the Startup Helping Small Retailers Go Digital",
      publication: "YourStory",
      date: "November 25, 2023",
      excerpt: "ParchuneWala's founder shares insights on how the platform is empowering small business owners across India to compete in the digital marketplace.",
      link: "https://yourstory.com",
      logo: "/yourstory-logo.png"
    }
  ]

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <SharedHeader title="Press" showBackButton={true} />

      <div className="container mx-auto px-4 py-8">
        {/* Press hero section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">ParchuneWala Press Room</h2>
              <p className="text-gray-600 mb-6">
                Find the latest news, press releases, media resources, and contact information for press inquiries.
              </p>
              <div className="flex justify-center gap-4">
                <Button className="bg-pastel-orange text-white">
                  Press Kit
                </Button>
                <Button variant="outline">
                  Media Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Press Releases */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Press Releases</h2>
            <Link href="/press/all-releases">
              <Button variant="link" className="text-pastel-orange">
                View All
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {pressReleases.map(release => (
              <div 
                key={release.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={release.image} 
                    alt={release.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <Calendar size={14} className="mr-1" />
                    <span>{release.date}</span>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-2 line-clamp-2">
                    {release.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {release.excerpt}
                  </p>
                  <div className="mt-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full gap-1"
                    >
                      <Download size={14} />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Media Coverage */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">In the News</h2>
            <Link href="/press/media-coverage">
              <Button variant="link" className="text-pastel-orange">
                View All
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {mediaFeatures.map(feature => (
              <Link 
                key={feature.id} 
                href={feature.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 hover:shadow-md transition">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-gray-100 p-2 h-16 w-16 flex items-center justify-center flex-shrink-0">
                      <Image 
                        src={feature.logo} 
                        alt={feature.publication} 
                        width={48} 
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700">{feature.publication}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{feature.date}</span>
                        </div>
                        <ExternalLink size={16} className="text-gray-400" />
                      </div>
                      <h3 className="font-medium text-gray-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {feature.excerpt}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Media Resources */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Media Resources</h2>
            <p className="text-gray-600 mb-6">
              Download official logos, product images, executive headshots, and brand guidelines for media use.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-medium text-gray-800 mb-2">Logos & Brand Assets</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Download our official logos and brand assets in various formats.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Download
                </Button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-medium text-gray-800 mb-2">Product Images</h3>
                <p className="text-gray-600 text-sm mb-3">
                  High-resolution images of our app interfaces and product screenshots.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Download
                </Button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-medium text-gray-800 mb-2">Leadership Photos</h3>
                <p className="text-gray-600 text-sm mb-3">
                  High-resolution headshots of ParchuneWala's leadership team.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="bg-pastel-orange/10 rounded-lg p-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Press Contact
            </h2>
            <p className="text-gray-600 mb-4">
              For press inquiries, interview requests, or additional information, please contact our media relations team.
            </p>
            <div className="inline-block bg-white p-4 rounded-lg">
              <p className="font-medium text-gray-800">
                Media Relations
              </p>
              <p className="text-pastel-orange">
                press@parchunewala.com
              </p>
              <p className="text-gray-600">
                +91 98765 43213
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
} 