
import { LucideIcon } from "lucide-react"

interface Step {
  icon: LucideIcon
  title: string
  description: string
}

interface StepsProps {
  items: Step[]
}

export const Steps = ({ items }: StepsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {items.map((step, index) => (
        <div key={index} className="text-center">
          <div className="relative mb-4">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <step.icon className="w-6 h-6 text-primary" />
            </div>
            {index < items.length - 1 && (
              <div className="hidden md:block absolute top-1/2 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px bg-border" />
            )}
          </div>
          <h3 className="font-semibold mb-2">{step.title}</h3>
          <p className="text-sm text-muted-foreground">{step.description}</p>
        </div>
      ))}
    </div>
  )
}
