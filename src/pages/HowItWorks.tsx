
import { Steps } from "@/components/steps"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Share2, Search, Calendar, Star } from "lucide-react"

const steps = [
  {
    icon: Share2,
    title: "List Your Items",
    description: "Share your items with the community. Set your own prices and availability.",
  },
  {
    icon: Search,
    title: "Browse & Find",
    description: "Discover items you need from trusted members in your area.",
  },
  {
    icon: Calendar,
    title: "Book & Connect",
    description: "Book items securely through our platform and connect with the owner.",
  },
  {
    icon: Star,
    title: "Share & Review",
    description: "After using an item, leave a review to help build trust in the community.",
  },
]

const HowItWorks = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How ShareForward Works</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Join our community of sharers and borrowers. It's simple to get started!
        </p>
      </div>

      <div className="grid gap-8 mb-12">
        <Steps items={steps} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">For Item Owners</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                • Turn unused items into income
              </li>
              <li className="flex items-start gap-2">
                • Set your own rental terms
              </li>
              <li className="flex items-start gap-2">
                • Meet great people in your community
              </li>
            </ul>
            <Button asChild className="w-full mt-6">
              <Link to="/share">List Your First Item</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">For Borrowers</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                • Save money by borrowing instead of buying
              </li>
              <li className="flex items-start gap-2">
                • Access items when you need them
              </li>
              <li className="flex items-start gap-2">
                • Support sustainable consumption
              </li>
            </ul>
            <Button asChild variant="secondary" className="w-full mt-6">
              <Link to="/browse">Start Browsing</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/share">Share an Item</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/browse">Browse Items</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
