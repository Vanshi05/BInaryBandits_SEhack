import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { addDoc, serverTimestamp } from "@/Backend/firebase";
import { messagesCollection } from "@/Backend/firebase";
import { toast } from "@/components/ui/sonner";

interface ContactOwnerDialogProps {
  ownerId: string;
  listingId: string;
  listingTitle: string;
}

export const ContactOwnerDialog = ({
  ownerId,
  listingId,
  listingTitle,
}: ContactOwnerDialogProps) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    if (!user) {
      toast.error("You need to be logged in to send a message");
      return;
    }

    setIsSending(true);
    try {
      await addDoc(messagesCollection, {
        senderId: user.uid,
        receiverId: ownerId,
        listingId,
        content: message,
        read: false,
        createdAt: serverTimestamp(),
      });
      toast.success("Message sent successfully");
      setMessage("");
      setOpen(false);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Contact Owner</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Owner</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            You're contacting the owner about: <strong>{listingTitle}</strong>
          </p>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows={5}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isSending || !message.trim()}
            className="w-full"
          >
            {isSending ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};