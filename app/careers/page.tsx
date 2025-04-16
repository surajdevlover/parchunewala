import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Footer from "../footer/footer"
import { ChevronRight, Clock, MapPin, ArrowUpRight } from "lucide-react"
import { SharedHeader } from "@/components/shared-header"

export default function CareersPage() {
  const jobOpenings = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Noida, India",
      type: "Full-time",
      experience: "3-5 years",
      postedDate: "2 weeks ago"
    },
    {
      id: "2",
      title: "Backend Engineer",
      department: "Engineering",
      location: "Remote, India",
      type: "Full-time",
      experience: "2-4 years",
      postedDate: "1 week ago"
    },
    {
      id: "3",
      title: "Product Manager",
      department: "Product",
      location: "Noida, India",
      type: "Full-time",
      experience: "4+ years",
      postedDate: "3 weeks ago"
    },
    {
      id: "4",
      title: "UX/UI Designer",
      department: "Design",
      location: "Noida, India",
      type: "Full-time",
      experience: "2-5 years",
      postedDate: "5 days ago"
    },
    {
      id: "5",
      title: "Operations Manager",
      department: "Operations",
      location: "Delhi, India",
      type: "Full-time",
      experience: "5+ years",
      postedDate: "1 month ago"
    },
    {
      id: "6",
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Noida, India",
      type: "Full-time",
      experience: "2-4 years",
      postedDate: "2 weeks ago"
    }
  ]
  
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <SharedHeader title="Careers" showBackButton={true} />

      <div className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="relative h-64 w-full">
            <Image 
              src="/careers-hero.jpg" 
              alt="Join Our Team" 
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Team</h1>
                  <p className="text-white text-lg mb-6">
                    Help us transform local commerce and build the future of neighborhood shopping.
                  </p>
                  <Button className="bg-pastel-orange text-white">
                    View Open Positions
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Culture & Values */}
          <div className="p-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Culture & Values</h2>
              <p className="text-gray-600 mb-6">
                At ParchuneWala, we're building a team of passionate individuals who are committed to our mission of empowering local businesses and serving communities. We foster a culture of innovation, collaboration, and continuous learning.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Innovation</h3>
                  <p className="text-gray-600 text-sm">
                    We encourage creative thinking and bold ideas to solve complex problems and create impactful solutions.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Collaboration</h3>
                  <p className="text-gray-600 text-sm">
                    We believe that diverse perspectives lead to better outcomes. We work together across teams to achieve our goals.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Impact</h3>
                  <p className="text-gray-600 text-sm">
                    We focus on creating meaningful change for our users, partners, and communities through our work.
                  </p>
                </div>
              </div>
              
              {/* Benefits */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Benefits & Perks</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="text-pastel-orange mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Competitive Compensation</h3>
                    <p className="text-gray-600 text-sm">
                      We offer competitive salaries and equity options to ensure you share in our success.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-pastel-orange mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Health Insurance</h3>
                    <p className="text-gray-600 text-sm">
                      Comprehensive health, dental, and vision coverage for you and your family.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-pastel-orange mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Flexible Work</h3>
                    <p className="text-gray-600 text-sm">
                      Hybrid work options with flexible schedules to help you achieve work-life balance.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-pastel-orange mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Learning & Development</h3>
                    <p className="text-gray-600 text-sm">
                      Budget for courses, conferences, and professional growth opportunities.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-pastel-orange mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Paid Time Off</h3>
                    <p className="text-gray-600 text-sm">
                      Generous vacation policy and paid holidays to help you recharge.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-pastel-orange mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Team Events</h3>
                    <p className="text-gray-600 text-sm">
                      Regular team outings, celebrations, and social activities to foster connections.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Job Openings */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Open Positions</h2>
              <div className="space-y-4">
                {jobOpenings.map(job => (
                  <div 
                    key={job.id}
                    className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition p-4"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">{job.title}</h3>
                        <p className="text-gray-500 text-sm">{job.department}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium bg-pastel-orange/10 text-pastel-orange px-2 py-1 rounded">
                        <Clock size={12} />
                        <span>{job.postedDate}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{job.location}</span>
                      </div>
                      <div>{job.type}</div>
                      <div>{job.experience}</div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Link href={`/careers/${job.id}`}>
                        <Button 
                          variant="outline" 
                          className="text-pastel-orange border-pastel-orange hover:bg-pastel-orange/10 gap-1"
                        >
                          View Details <ArrowUpRight size={14} />
                        </Button>
                      </Link>
                      <Link href={`/careers/apply?jobId=${job.id}&title=${job.title}`} className="ml-2">
                        <Button className="bg-pastel-orange text-white">
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Unsolicited Applications */}
              <div className="mt-8 bg-gray-50 p-6 rounded-lg text-center">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Don't see a role that fits?</h3>
                <p className="text-gray-600 mb-4">
                  We're always looking for talented individuals to join our team. Send us your resume and we'll keep it on file for future opportunities.
                </p>
                <Link href="/careers/apply">
                  <Button className="bg-pastel-orange text-white">
                    Submit General Application
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