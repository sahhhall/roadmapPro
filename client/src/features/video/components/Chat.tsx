import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogDescription,
} from "@radix-ui/react-alert-dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { SendHorizontal, X } from "lucide-react";
import React, { useState } from "react";

interface Message {
  sender: string;
  text: string;
  yours: boolean;
}

interface IChatProps {
  toggleChat: () => void;
  messages: Message[];
  onSendMessage: (text: string) => void;
}

const Chat: React.FC<IChatProps> = ({
  toggleChat,
  messages,
  onSendMessage,
}) => {
  const [text, setText] = useState<string>("");
  const handleButtonClick = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText("");
    }
  };
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleButtonClick();
    }
  };

  return (
    <Card
      className={`absolute translate-x-0   right-6 bottom-5 sm:bottom-19 w-80 shadow-lg`}
    >
      <CardHeader className="flex flex-row space-y-0 pb-2 items-center justify-between ">
        <h3 className="font-medium">In-call messages</h3>
        <Button size="icon" onClick={toggleChat} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <AlertDialog>
          <AlertDialogDescription
            style={{ background: "#f1f3f4" }}
            className="text-xs rounded-md text-black p-3"
          >
            Unless they're pinned, messages can only be seen by people in the
            call when the message is sent. All messages are deleted when the
            call ends.
          </AlertDialogDescription>
        </AlertDialog>

        <ScrollArea className="h-80 pr-4 overflow-scroll scrollbar-hide">
          <div className="space-y-1">
            {messages.map((msg: any, index: any) => (
              <div
                key={index}
                className={`flex ${
                  msg.yours ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg p-1 px-4 ${
                    msg.yours ? "bg-gray-100" : "bg-blue-100"
                  } `}
                >
                  <div className="text-xs font-bold">
                    {msg.yours && messages[index - 1]?.yours
                      ? ""
                      : msg.yours
                      ? "You"
                      : !msg.yours &&
                        msg.sender &&
                        messages[index - 1].sender === msg.sender
                      ? ""
                      : msg.sender}
                  </div>

                  <div className="text-xs tracking-normal ">{msg.text}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="releative">
        <Input
          style={{ background: "#f1f3f4" }}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Send a message"
          className="flex-1 focus-visible:ring-0 border-none "
          onKeyDown={handleOnKeyDown}
        />
        <SendHorizontal
          onClick={handleButtonClick}
          className="h-5 hover:text-blue-800 cursor-pointer rounded  w-5 text-blue-600 absolute right-8"
        />
      </CardFooter>
    </Card>
  );
};

export default Chat;
