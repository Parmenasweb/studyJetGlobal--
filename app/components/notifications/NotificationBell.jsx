"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

async function getNotifications() {
  const res = await fetch("/api/notifications?status=unread&limit=5");
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}

export function NotificationBell() {
  const router = useRouter();

  const {
    data = { notifications: [], unreadCount: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const handleNotificationClick = (notification) => {
    // Mark as read
    fetch("/api/notifications", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: notification._id,
        action: "mark-read",
      }),
    });

    // Navigate to action URL if present
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          disabled={isLoading}
        >
          <Bell className="h-5 w-5" />
          {data.unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
            >
              {data.unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Notifications</p>
            <p className="text-xs text-muted-foreground">
              {data.unreadCount} unread notifications
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {isLoading ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Loading notifications...
          </div>
        ) : error ? (
          <div className="p-4 text-center text-sm text-red-500">
            Failed to load notifications
          </div>
        ) : data.notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No new notifications
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            {data.notifications.map((notification) => (
              <DropdownMenuItem
                key={notification._id}
                className="cursor-pointer p-4"
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`h-2 w-2 rounded-full ${getPriorityColor(
                        notification.priority
                      )}`}
                    />
                    <p className="font-medium">{notification.title}</p>
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
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/private/dashboard/notifications")}
        >
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 