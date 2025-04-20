import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db, messagesCollection } from "@/Backend/firebase";
import { toast } from "@/components/ui/sonner";
import { NavHeader } from "@/components/nav-header";

const SendMessagePage = () => {
  const { id: listingId } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      if (!listingId) {
        navigate("/");
        return;
      }

      try {
        const docRef = doc(db, "listings", listingId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setListing({ id: docSnap.id, ...docSnap.data() });
        } else {
          toast.error("Listing not found");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
        toast.error("Failed to load listing");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId, navigate]);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    if (!user) {
      toast.error("You need to be logged in to send a message");
      return;
    }

    if (!listing) {
      toast.error("Listing information missing");
      return;
    }

    try {
      await addDoc(messagesCollection, {
        senderId: user.uid,
        receiverId: listing.userId,
        listingId: listing.id,
        content: message,
        status: "unread",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      toast.success("Message sent successfully");
      navigate(`/item/${listing.id}`);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <>
      <NavHeader />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Contact Owner</h1>
        <div className="space-y-4">
          <p className="text-gray-600">
            You're contacting the owner about: <strong>{listing?.title}</strong>
          </p>
          
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows={6}
            className="w-full"
          />

          <div className="flex gap-4">
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="flex-1"
            >
              Send Message
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(`/item/${listingId}`)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendMessagePage;