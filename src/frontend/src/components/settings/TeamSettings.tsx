import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

type Role = "Admin" | "Manager" | "Member" | "Viewer";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: Role;
  lastActive: string;
  initials: string;
  avatarCls: string;
}

const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Arjun Sharma",
    email: "arjun@bigbucksinnovation.com",
    role: "Admin",
    lastActive: "Just now",
    initials: "AS",
    avatarCls: "bg-blue-50 text-primary",
  },
  {
    id: 2,
    name: "Priya Nair",
    email: "priya@bigbucksinnovation.com",
    role: "Manager",
    lastActive: "2 hours ago",
    initials: "PN",
    avatarCls: "bg-amber-50 text-amber-600",
  },
  {
    id: 3,
    name: "Rohit Verma",
    email: "rohit@bigbucksinnovation.com",
    role: "Member",
    lastActive: "Yesterday",
    initials: "RV",
    avatarCls: "bg-emerald-50 text-emerald-600",
  },
  {
    id: 4,
    name: "Sneha Pillai",
    email: "sneha@bigbucksinnovation.com",
    role: "Member",
    lastActive: "3 days ago",
    initials: "SP",
    avatarCls: "bg-purple-50 text-purple-600",
  },
  {
    id: 5,
    name: "Dev Kapoor",
    email: "dev@bigbucksinnovation.com",
    role: "Viewer",
    lastActive: "1 week ago",
    initials: "DK",
    avatarCls: "bg-muted text-muted-foreground",
  },
];

const ROLE_BADGE: Record<Role, string> = {
  Admin: "bg-primary text-white border-0",
  Manager: "bg-amber-50 text-amber-600 border-amber-200",
  Member: "bg-blue-50 text-blue-600 border-blue-200",
  Viewer: "bg-muted text-muted-foreground border-border",
};

export function TeamSettings() {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);

  const handleRoleChange = (id: number, role: Role) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
    toast.success("Role updated.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">
            {members.length} members
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage roles and access for your team.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-primary/30 text-primary hover:bg-blue-50 hover:border-primary"
          data-ocid="team.invite_member_button"
          onClick={() => toast.info("Invite flow coming soon.")}
        >
          <UserPlus className="w-3.5 h-3.5" />
          Invite Member
        </Button>
      </div>

      {/* Member list */}
      <div
        className="divide-y divide-border border border-border rounded-xl overflow-hidden"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
      >
        {members.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-3 px-4 py-3 bg-card transition-smooth"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor =
                "#EFF6FF";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor = "";
            }}
            data-ocid={`team.item.${i + 1}`}
          >
            <Avatar className="w-9 h-9 shrink-0">
              <AvatarFallback
                className={`text-xs font-semibold ${member.avatarCls}`}
              >
                {member.initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {member.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {member.email}
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {member.lastActive}
            </div>

            {member.role === "Admin" ? (
              <Badge
                variant="secondary"
                className={`shrink-0 border text-xs ${ROLE_BADGE[member.role]}`}
                data-ocid={`team.role_badge.${i + 1}`}
              >
                {member.role}
              </Badge>
            ) : (
              <Select
                value={member.role}
                onValueChange={(v) => handleRoleChange(member.id, v as Role)}
              >
                <SelectTrigger
                  className="w-28 h-7 text-xs border-border bg-white"
                  data-ocid={`team.role_select.${i + 1}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            )}
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center py-1">
        Role changes take effect immediately. Admins can be managed only by the
        organization owner.
      </p>
    </motion.div>
  );
}
