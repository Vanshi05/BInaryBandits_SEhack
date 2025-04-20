import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { 
  query, 
  collection, 
  where, 
  orderBy, 
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  getDoc,
  addDoc
} from "firebase/firestore";
import { db } from "@/Backend/firebase";
import { NavHeader } from "@/components/nav-header";
import { toast } from "@/components/ui/sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timestamp } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  listingId: string;
  content: string;
  status: "unread" | "read" | "archived";
  createdAt: Timestamp;
  listingTitle?: string;
  senderName?: string;
  senderPhotoURL?: string;
}

const AlertsPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    if (!user?.uid) return;

    const fetchMessages = async () => {
      try {
        const q = query(
          collection(db, "messages"),
          where("receiverId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, async (snapshot) => {
          const messagesPromises = snapshot.docs.map(async (doc) => {
            const messageData = doc.data();
            const message: Message = {
              id: doc.id,
              senderId: messageData.senderId,
              receiverId: messageData.receiverId,
              listingId: messageData.listingId,
              content: messageData.content,
              status: messageData.status,
              createdAt: messageData.createdAt,
              listingTitle: messageData.listingTitle
            };

            // Fetch sender info
            try {
              const senderDoc = await getDoc(doc(db, "users", messageData.senderId));
              if (senderDoc.exists()) {
                message.senderName = senderDoc.data()?.displayName || "Unknown User";
                message.senderPhotoURL = senderDoc.data()?.photoURL;
              }
            } catch (err) {
              console.error("Error fetching sender info:", err);
            }

            return message;
          });

          const resolvedMessages = await Promise.all(messagesPromises);
          setMessages(resolvedMessages);
          setLoading(false);
        }, (error) => {
          console.error("Firestore error:", error);
          setError("Failed to load messages. Please try again.");
          setLoading(false);
        });

        return unsubscribe;
      } catch (err) {
        console.error("Initial fetch error:", err);
        setError("Failed to initialize messages. Please refresh the page.");
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user?.uid]);

  const markAsRead = async (messageId: string) => {
    try {
      await updateDoc(doc(db, "messages", messageId), {
        status: "read",
        updatedAt: serverTimestamp()
      });
      toast.success("Message marked as read");
    } catch (error) {
      console.error("Error marking message as read:", error);
      toast.error("Failed to update message status");
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadMessages = messages.filter(msg => msg.status === "unread");
      const updatePromises = unreadMessages.map(msg => 
        updateDoc(doc(db, "messages", msg.id), {
          status: "read",
          updatedAt: serverTimestamp()
        })
      );
      
      await Promise.all(updatePromises);
      toast.success(`Marked ${unreadMessages.length} messages as read`);
    } catch (error) {
      console.error("Error marking all as read:", error);
      toast.error("Failed to mark all messages as read");
    }
  };

  const handleReply = async () => {
    if (!replyingTo || !replyContent.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        senderId: user?.uid,
        receiverId: replyingTo.senderId,
        listingId: replyingTo.listingId,
        content: replyContent,
        status: "unread",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        listingTitle: replyingTo.listingTitle
      });

      toast.success("Reply sent successfully");
      setReplyingTo(null);
      setReplyContent("");
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply");
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <NavHeader />
        <div className="text-center py-12">
          <h2 className="text-xl font-medium">Please sign in to view your messages</h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <NavHeader />
        <div className="text-center py-12">
          <h2 className="text-xl font-medium">Loading messages...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <NavHeader />
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-red-500">{error}</h2>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter(msg => msg.status === "unread").length;

  return (
    <>
      <NavHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Messages</h1>
          {unreadCount > 0 && (
            <Button 
              variant="outline"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium">No messages yet</h2>
            <p className="text-gray-500 mt-2">When you receive messages, they'll appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <Card
                key={message.id}
                className={message.status === "unread" ? "border-l-4 border-blue-500 bg-blue-50" : ""}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {message.senderPhotoURL && (
                      <img 
                        src={message.senderPhotoURL} 
                        alt={message.senderName} 
                        className="h-10 w-10 rounded-full"
                      />
                    )}
                    <CardTitle>
                      <div>
                        <p className="font-medium">{message.senderName}</p>
                        <p className="text-sm font-normal text-gray-600">
                          {message.listingTitle ? `Regarding: ${message.listingTitle}` : "New Message"}
                        </p>
                      </div>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-700">{message.content}</p>
                  <div className="flex justify-between items-center">
                    <small className="text-gray-500">
                      {message.createdAt?.toDate().toLocaleString()}
                    </small>
                    <div className="flex gap-2">
                      {message.status === "unread" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => markAsRead(message.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setReplyingTo(message)}
                          >
                            Reply
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reply to {message.senderName}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <Textarea
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              placeholder="Type your reply here..."
                              rows={5}
                              className="w-full"
                            />
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline"
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyContent("");
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleReply}
                                disabled={!replyContent.trim()}
                              >
                                Send Reply
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AlertsPage;