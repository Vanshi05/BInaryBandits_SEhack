import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/image-upload";
import { useState, useEffect } from "react"; // Added useEffect
import { Image } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/Backend/firebase";

const listingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  price: z.string().min(1, "Please enter a price"),
  location: z.string().min(1, "Please enter your location"),
  images: z.array(z.string()).min(1, "Please upload at least one image")
});

const ListItem = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof listingSchema>>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: "",
      location: "",
      images: []
    },
  });

  // Fixed: Update form.images when images state changes
  useEffect(() => {
    form.setValue("images", images);
  }, [images, form]);

  const handleImageUpload = (imageUrl: string) => {
    setImages(prev => [...prev, imageUrl]);
  };

  const handleImageDelete = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  async function onSubmit(values: z.infer<typeof listingSchema>) {
    try {
      setIsSubmitting(true);
      const user = auth.currentUser;
      if (!user) throw new Error("Authentication required");

      const listingData = {
        title: String(values.title),
        description: String(values.description),
        category: String(values.category),
        price: Number(values.price) || 0,
        location: String(values.location),
        images: Array.isArray(images) ? images : [],
        userId: user.uid,
        status: "available",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, "listings"), listingData);
      console.log("Document written with ID: ", docRef.id);

      toast({ title: "Success!", description: "Item listed successfully" });
      form.reset();
      setImages([]);

    } catch (error) {
      console.error("Firestore error details:", error);
      toast({
        title: "Submission Error",
        description: error.message || "Failed to save listing",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">List Your Item</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="images"
              render={() => ( // Changed to render without field prop
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {images.map((img, index) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                            <img src={img} alt={`Product image ${index + 1}`} className="object-cover w-full h-full" />
                            <button
                              type="button"
                              onClick={() => handleImageDelete(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        {images.length < 4 && (
                          <ImageUpload
                            onUpload={handleImageUpload}
                            className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors"
                          >
                            <div className="flex flex-col items-center justify-center h-full gap-2">
                              <Image className="w-8 h-8 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Click to upload</p>
                            </div>
                          </ImageUpload>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Upload up to 4 images of your item
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter item title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your item"
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Select category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daily Rate ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter daily rate" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || images.length === 0}
            >
              {isSubmitting ? "Listing..." : "List Item"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ListItem;