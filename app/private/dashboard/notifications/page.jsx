"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

async function getNotifications({ status = "all", type = "all", page = 1 }) {
  const res = await fetch(
    `/api/notifications?status=${status}&type=${type}&page=${page}&limit=20`
  );
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}

export default function NotificationsPage() {
  const router = useRouter();
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);

  const {
    data = { notifications: [], totalPages: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications", status, type, page],
    queryFn: () => getNotifications({ status, type, page }),
  });

  const handleArchive = async (id) => {
    try {
      const res = await fetch("/api/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          action: "archive",
        }),
      });

      if (!res.ok) throw new Error("Failed to archive notification");
    } catch (error) {
      console.error("Error archiving notification:", error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-yellow-500";
      case "medium":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <div className="flex items-center gap-4">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="approval">Approval Required</SelectItem>
              <SelectItem value="verification">Verification Required</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={status} onValueChange={setStatus}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value={status}>
          {isLoading ? (
            <div className="text-center">Loading notifications...</div>
          ) : error ? (
            <div className="text-center text-red-500">
              Failed to load notifications
            </div>
          ) : data.notifications.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No notifications found
            </div>
          ) : (
            <div className="space-y-4">
              {data.notifications.map((notification) => (
                <Card
                  key={notification._id}
                  className="cursor-pointer p-4 transition-colors hover:bg-muted/50"
                  onClick={() => {
                    if (notification.actionUrl) {
                      router.push(notification.actionUrl);
                    }
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`h-2 w-2 rounded-full ${getPriorityColor(
                            notification.priority
                          )}`}
                        />
                        <h3 className="font-medium">{notification.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>
                          {format(new Date(notification.createdAt), "PPp")}
                        </span>
                        {notification.actionRequired && (
                          <>
                            <span>•</span>
                            <span className="font-medium text-primary">
                              Action Required
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    {status !== "archived" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArchive(notification._id);
                        }}
                      >
                        Archive
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {data.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {data.totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 