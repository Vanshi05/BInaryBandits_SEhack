
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IdCard } from "lucide-react"

const formSchema = z.object({
  aadharNumber: z
    .string()
    .length(12, "Aadhar number must be exactly 12 digits")
    .regex(/^\d+$/, "Aadhar number must only contain numbers"),
})

const AadharVerification = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aadharNumber: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <IdCard className="h-6 w-6 text-sage" />
            <CardTitle className="text-2xl font-soria">Aadhar Verification</CardTitle>
          </div>
          <CardDescription>
            Please enter your 12-digit Aadhar number for verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="aadharNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aadhar Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your 12-digit Aadhar number"
                        {...field}
                        maxLength={12}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-sage hover:bg-navy text-warm-cream"
              >
                Verify Aadhar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AadharVerification
