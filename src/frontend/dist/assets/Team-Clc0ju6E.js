import { j as jsxRuntimeExports, c as cn } from "./index-C-Bt3bG-.js";
import { r as useTeamMembers, s as useTeamHealth, L as Layout, t as UserPlus, v as CircleCheck, T as TriangleAlert, A as Avatar, B as Badge } from "./useBackend-BkDdvppL.js";
import { c as createLucideIcon, B as Button } from "./textarea-D5l05Cbi.js";
import { T as TrendingUp, a as DeptTag } from "./DeptTag-3UswnkA0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
function MemberCard({ member }) {
  const completionRate = member.tasksCompleted && member.tasksCompleted + (member.tasksInProgress ?? 0) > 0 ? Math.round(
    member.tasksCompleted / (member.tasksCompleted + (member.tasksInProgress ?? 0)) * 100
  ) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-2xl border border-border p-5 hover:shadow-elevated transition-smooth",
      "data-ocid": `member-card-${member.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Avatar,
            {
              initials: member.initials,
              name: member.name,
              size: "lg",
              isOnline: member.isOnline
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-foreground text-sm truncate", children: member.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: cn(
                    "text-[10px] px-1.5 py-0",
                    member.role === "admin" || member.role === "owner" ? "text-primary border-primary/40 bg-primary/5" : "text-muted-foreground"
                  ),
                  children: member.role
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: member.email }),
            member.departmentId && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeptTag, { departmentId: member.departmentId }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-2.5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-foreground", children: member.tasksCompleted ?? 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: "Completed" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-2.5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-foreground", children: member.tasksInProgress ?? 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: "In Progress" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Completion rate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-semibold text-primary", children: [
              completionRate,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full rounded-full bg-primary transition-all duration-500",
              style: { width: `${completionRate}%` }
            }
          ) })
        ] })
      ]
    }
  );
}
function Team() {
  const { data: members = [] } = useTeamMembers();
  const { data: health } = useTeamHealth();
  const onlineCount = members.filter((m) => m.isOnline).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground", children: "Team" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          members.length,
          " members · ",
          onlineCount,
          " online now"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "bg-primary hover:bg-primary/90 gap-1.5",
          size: "sm",
          "data-ocid": "invite-member-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
            "Invite Member"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Team Health:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: cn(
              "text-sm font-bold",
              ((health == null ? void 0 : health.overallScore) ?? 0) >= 70 ? "text-green-600 dark:text-green-400" : "text-orange-600 dark:text-orange-400"
            ),
            children: [
              (health == null ? void 0 : health.overallScore) ?? 74,
              "/100"
            ]
          }
        )
      ] }),
      [
        {
          icon: CircleCheck,
          label: "On Track",
          value: (health == null ? void 0 : health.onTrackCount) ?? 7,
          color: "text-green-600 dark:text-green-400"
        },
        {
          icon: TriangleAlert,
          label: "Blocked",
          value: (health == null ? void 0 : health.blockedCount) ?? 1,
          color: "text-red-500 dark:text-red-400"
        },
        {
          icon: Clock,
          label: "Velocity",
          value: `${(health == null ? void 0 : health.completionRate) ?? 25}%`,
          color: "text-primary"
        },
        {
          icon: TrendingUp,
          label: "Trend",
          value: (health == null ? void 0 : health.velocityTrend) === "up" ? "↑ Up" : (health == null ? void 0 : health.velocityTrend) === "down" ? "↓ Down" : "→ Stable",
          color: "text-green-600 dark:text-green-400"
        }
      ].map(({ icon: Icon, label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("w-4 h-4", color) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          label,
          ":"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("font-semibold", color), children: value })
      ] }, label))
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: members.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MemberCard, { member: m }, m.id)) }) })
  ] }) });
}
export {
  Team as default
};
