import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageGallery } from "@/components/image-gallery";
import { OwnerInfo } from "@/components/owner-info";
import { doc, getDoc } from "firebase/firestore";
import { db, rentalsCollection, serverTimestamp } from "@/Backend/firebase";
import { useAuth } from "@/hooks/useAuth";
import { NavHeader } from "@/components/nav-header";
import { addDoc, updateDoc } from "firebase/firestore";
import { Label } from "@/components/ui/label";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  images: string[];
  status: "available" | "rented" | "unavailable";
  userId: string;
  createdAt: any;
  updatedAt: any;
}

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [itemData, setItemData] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigator = useNavigate()

  // Fetch item data from Firestore
  useEffect(() => {
    const fetchItemData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const docRef = doc(db, "listings", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setItemData({
            id: docSnap.id,
            title: data.title || "Untitled",
            description: data.description || "",
            price: data.price || 0,
            category: data.category || "other",
            location: data.location || "Unknown location",
            images: data.images || [],
            status: data.status || "available",
            userId: data.userId,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          });
        } else {
          setError('Item not found');
        }
      } catch (err) {
        setError('Failed to fetch item data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItemData();
  }, [id]);

  // Update end date when start date changes
  useEffect(() => {
    if (date) {
      const newEndDate = new Date(date);
      newEndDate.setDate(newEndDate.getDate() + 1); // Default 1 day rental
      setEndDate(newEndDate);
    }
  }, [date]);

  const handleConfirmBooking = async () => {
    try {
      if (!user || !date || !endDate || !itemData) {
        throw new Error("Missing required booking information");
      }

      if (date >= endDate) {
        throw new Error("End date must be after start date");
      }

      // Calculate total price
      const days = Math.ceil((endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      const totalPrice = days * itemData.price;

      // Create rental document with proper timestamp conversion
      const rentalData = {
        listingId: itemData.id,
        renterId: user.uid,
        ownerId: itemData.userId,
        startDate: Timestamp.fromDate(date), // Use imported Timestamp
        endDate: Timestamp.fromDate(endDate), // Use imported Timestamp
        totalPrice,
        status: "confirmed",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await addDoc(rentalsCollection, rentalData);
      await updateDoc(doc(db, "listings", itemData.id), {
        status: "rented",
        updatedAt: serverTimestamp()
      });

      setOpen(false);
      toast.success("Booking Confirmed");

    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      navigator('/booking-confirmed')
    }
  };

  // Calculate minimum selectable date (today)
  const minSelectableDate = new Date();
  minSelectableDate.setHours(0, 0, 0, 0);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!itemData) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <NavHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <ImageGallery images={itemData.images} title={itemData.title} />

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{itemData.title}</h1>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-2xl font-semibold">₹{itemData.price}/day</p>
                <span className="px-2 py-1 text-xs rounded-full bg-sage/20 text-sage">
                  {itemData.category}
                </span>
                <span className="text-gray-500">{itemData.location}</span>
              </div>
              {itemData.status !== "available" && (
                <div className="mt-2 text-red-500">Currently unavailable</div>
              )}
            </div>

            <p className="text-gray-600 whitespace-pre-line">
              {itemData.description || "No description provided"}
            </p>

            {itemData.status === "available" ? (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">Book Now</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Book Item</DialogTitle>
                    <DialogDescription>
                      Select your rental dates and confirm your booking.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < minSelectableDate}
                          className="rounded-md border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => !date || date <= (date || new Date())}
                          className="rounded-md border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Daily rate:</span>
                        <span>₹{itemData.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span>
                          {date && endDate ?
                            `${Math.ceil((endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))} days` :
                            "Select dates"}
                        </span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span className="text-gray-700">Total:</span>
                        <span className="text-sage font-semibold">
                          {date && endDate ?
                            `₹${Math.ceil((endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)) * itemData.price}` :
                            "₹0"}
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-2"
                      onClick={handleConfirmBooking}
                      disabled={!date || !endDate || !user}
                    >
                      {!user ? 'Sign in to book' : 'Confirm Booking'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <Button className="w-full" disabled>
                Currently Unavailable
              </Button>
            )}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">About the Owner</h2>
          <div className="max-w-md">
            <OwnerInfo userId={itemData.userId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetail;