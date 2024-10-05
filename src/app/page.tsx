// @ts-nocheck

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Copy,
  Trash2,
  RefreshCw,
  ArrowLeft,
  Clock,
  Shield,
  Eye,
  EyeOff,
  Download,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface Message {
  id: number;
  from: string;
  subject: string;
  date: string;
}

interface MessageDetails extends Message {
  textBody: string;
  htmlBody: string;
  attachments: Attachment[];
}

interface Attachment {
  filename: string;
  contentType: string;
  size: number;
}

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 8.608V16.75C22 18.483 20.5564 19.8992 18.8125 19.9949L18.6667 20H5.33333C3.49238 20 2 18.5076 2 16.6667V8.60804L11.5554 14.6697C11.8241 14.8434 12.1759 14.8434 12.4446 14.6697L22 8.608ZM5.33333 4H18.6667C20.3981 4 21.8194 5.32783 21.9862 7.02354L12 13.3333L2.01379 7.02354C2.17695 5.38048 3.52206 4.08602 5.18253 4.00495L5.33333 4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<MessageDetails | null>(
    null
  );
  const [isEmailVisible, setIsEmailVisible] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(3600); // 1 hour in seconds
  const { toast } = useToast();
  const refreshIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateRandomEmail();
  }, []);

  useEffect(() => {
    if (username && domain) {
      const messageInterval = setInterval(fetchMessages, 5000);
      const timerInterval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(timerInterval);
            generateRandomEmail();
            return 3600;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(messageInterval);
        clearInterval(timerInterval);
      };
    }
  }, [username, domain]);

  const generateRandomEmail = async () => {
    try {
      const res = await fetch(
        "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1"
      );
      const [randomEmail] = await res.json();
      setEmail(randomEmail);
      const [newUsername, newDomain] = randomEmail.split("@");
      setUsername(newUsername);
      setDomain(newDomain);
      setTimeRemaining(3600);
      setMessages([]);
      setSelectedMessage(null);
    } catch (error) {
      console.error("Error generating random email:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(
        `https://www.1secmail.com/api/v1/?action=getMessages&login=${username}&domain=${domain}`
      );
      const messageData: Message[] = await res.json();
      setMessages(messageData);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    toast({
      title: "Email Copied",
      description: "The email address has been copied to your clipboard.",
    });
  };

  const refreshMessages = async () => {
    setIsRefreshing(true);
    await fetchMessages();
    setIsRefreshing(false);
  };

  const readMessage = async (messageId: number) => {
    try {
      const res = await fetch(
        `https://www.1secmail.com/api/v1/?action=readMessage&login=${username}&domain=${domain}&id=${messageId}`
      );
      const messageData: MessageDetails = await res.json();
      setSelectedMessage(messageData);
    } catch (error) {
      console.error("Error reading message:", error);
    }
  };

  const downloadAttachment = async (filename: string) => {
    try {
      const res = await fetch(
        `https://www.1secmail.com/api/v1/?action=download&login=${username}&domain=${domain}&id=${selectedMessage?.id}&file=${filename}`
      );
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading attachment:", error);
    }
  };

  const formatTimeRemaining = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Secure Temporary Email
          </h1>
          <p className="text-blue-300">Your shield against spam, made simple.</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="col-span-1 lg:col-span-2 bg-gray-800 border-gray-700">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-lg">
              <CardTitle className="text-2xl font-bold flex items-center justify-between">
                <div className="flex items-center text-xl md:text-2xl">
                  <MailIcon className="w-6 h-6 mr-2" />
                  Your Temporary Inbox
                </div>
                <div className="text-sm font-normal">
                  Time Remaining: {formatTimeRemaining(timeRemaining)}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="relative">
                  <Input
                    value={isEmailVisible ? email : email.replace(/./g, "•")}
                    readOnly
                    className="pr-24 bg-gray-700 border-gray-600 text-lg font-mono"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <Button
                      onClick={() => setIsEmailVisible(!isEmailVisible)}
                      variant="ghost"
                      size="sm"
                      className="mr-1"
                    >
                      {isEmailVisible ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      onClick={copyToClipboard}
                      variant="ghost"
                      size="sm"
                      className="mr-1"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={generateRandomEmail}
                      variant="ghost"
                      size="sm"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {selectedMessage ? (
                      <motion.div
                        key="message"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div>
                          <Button
                            onClick={() => setSelectedMessage(null)}
                            variant="ghost"
                            className="mb-4"
                          >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inbox
                          </Button>
                          <h2 className="text-lg font-bold">
                            {selectedMessage.subject}
                          </h2>
                          <p className="text-sm text-gray-400">
                            From: {selectedMessage.from}
                          </p>
                          <p className="text-sm text-gray-400 mb-4">
                            Date: {selectedMessage.date}
                          </p>
                          <div
                            className="prose prose-invert mb-4"
                            dangerouslySetInnerHTML={{
                              __html: selectedMessage.htmlBody,
                            }}
                          />
                          <div>
                            {selectedMessage.attachments.length > 0 && (
                              <div className="mt-4">
                                <h3 className="font-bold mb-2">
                                  Attachments:
                                </h3>
                                <ul className="space-y-2">
                                  {selectedMessage.attachments.map(
                                    (attachment) => (
                                      <li
                                        key={attachment.filename}
                                        className="flex items-center justify-between"
                                      >
                                        <span>{attachment.filename}</span>
                                        <Button
                                          onClick={() =>
                                            downloadAttachment(
                                              attachment.filename
                                            )
                                          }
                                          size="sm"
                                          variant="ghost"
                                          className="text-blue-400"
                                        >
                                          <Download className="h-4 w-4" />
                                        </Button>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.ul
                        key="inbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        {messages.length > 0 ? (
                          messages.map((message) => (
                            <li
                              key={message.id}
                              className={`bg-gray-700 p-4 rounded-lg hover:bg-gray-600 cursor-pointer transition ${shimmer}`}
                              onClick={() => readMessage(message.id)}
                            >
                              <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                  <h3 className="text-lg font-semibold">
                                    {message.subject}
                                  </h3>
                                  <p className="text-sm text-gray-400">
                                    From: {message.from}
                                  </p>
                                </div>
                                <p className="text-sm text-gray-400">
                                  {message.date}
                                </p>
                              </div>
                            </li>
                          ))
                        ) : (
                          <li className="text-center text-gray-400">
                            No messages found.
                          </li>
                        )}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-800 rounded-t-lg">
              <CardTitle className="text-2xl font-bold flex items-center justify-center">
                <Shield className="w-6 h-6 mr-2" />
                Security Features
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-400">Anonymous Usage</h3>
                    <p className="text-gray-400">No personal information required to use our service.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-400">End-to-End Encryption</h3>
                    <p className="text-gray-400">Your messages are encrypted and secure.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-400">Auto-Delete</h3>
                    <p className="text-gray-400">Emails are automatically deleted after 1 hour.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
