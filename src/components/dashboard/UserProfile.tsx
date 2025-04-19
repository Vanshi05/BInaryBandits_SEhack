
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { StarIcon } from "lucide-react"

interface UserProfileProps {
  name: string
  location: string
  rating: number
  reviews: number
  itemsListed: number
  rentals: number
  earned: number
  avatarUrl?: string
}

export const UserProfile = ({ 
  name, 
  location, 
  rating, 
  reviews,
  itemsListed,
  rentals,
  earned,
  avatarUrl
}: UserProfileProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-1">{name}</h2>
          <p className="text-muted-foreground mb-3">{location}</p>
          
          <div className="flex items-center gap-1 justify-center md:justify-start mb-4">
            <StarIcon className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="font-semibold">{rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviews} reviews)</span>
          </div>

          <Button variant="outline">Edit Profile</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 text-center">
        <div>
          <div className="text-2xl font-bold">{itemsListed}</div>
          <div className="text-sm text-muted-foreground">Items Listed</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{rentals}</div>
          <div className="text-sm text-muted-foreground">Rentals</div>
        </div>
        <div>
          <div className="text-2xl font-bold">${earned}</div>
          <div className="text-sm text-muted-foreground">Earned</div>
        </div>
      </div>
    </div>
  )
}
