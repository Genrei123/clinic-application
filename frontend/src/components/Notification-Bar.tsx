import { useState, useRef, useEffect } from "react"
import { Bell } from "lucide-react"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
}

interface NotificationBellProps {
  notifications?: Notification[]
  className?: string
  onNotificationClick?: (notification: Notification) => void
  onMarkAllRead?: () => void
}

// utility function to combine class names
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// card components
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      {children}
    </div>
  )
}

function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
      {children}
    </div>
  )
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-2xl font-semibold leading-none tracking-tight">
      {children}
    </h3>
  )
}

function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  )
}

function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("p-6 pt-0", className)}>
      {children}
    </div>
  )
}

export default function NotificationBell({ 
  notifications = [], 
  className, 
  onNotificationClick,
  onMarkAllRead 
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [notificationList, setNotificationList] = useState<Notification[]>(notifications)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // update notifications when prop changes
  useEffect(() => {
    setNotificationList(notifications)
  }, [notifications])

  const unreadCount = notificationList.filter((notification) => !notification.read).length

  // handle outside clicks
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  // mark all as read
  const markAllAsRead = () => {
    const updatedNotifications = notificationList.map((notification) => ({
      ...notification,
      read: true,
    }))
    setNotificationList(updatedNotifications)
    onMarkAllRead?.()
  }

  // mark single notification as read
  const markAsRead = (notification: Notification) => {
    const updatedNotifications = notificationList.map((n) => 
      n.id === notification.id ? { ...n, read: true } : n
    )
    setNotificationList(updatedNotifications)
    onNotificationClick?.(notification)
  }

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        className="relative text-white hover:text-gray-300 transition-colors"
        onClick={toggleDropdown}
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 z-50 animate-in fade-in-0 zoom-in-95 slide-in-from-top-5 duration-200">
          <Card className="bg-slate-800 border-gray-700 text-white shadow-xl">
            <CardHeader className="pb-3 border-b border-gray-700">
              <div className="flex items-center justify-between">
                {unreadCount > 0 && (
                  <button
                    className="text-xs font-medium text-blue-300 hover:text-blue-200 hover:underline"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <CardDescription className="text-gray-300">
                You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-80 overflow-y-auto p-2">
              {notificationList.length > 0 ? (
                <div className="space-y-2">
                  {notificationList.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex items-start gap-4 rounded-lg p-3 transition-colors cursor-pointer",
                        !notification.read ? "bg-slate-700" : "hover:bg-slate-700",
                      )}
                      onClick={() => markAsRead(notification)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white">{notification.title}</h4>
                          {!notification.read && <span className="h-2 w-2 rounded-full bg-blue-400" />}
                        </div>
                        <p className="text-sm text-gray-300 mt-1">{notification.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center">
                  <p className="text-sm text-gray-300">No notifications</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}