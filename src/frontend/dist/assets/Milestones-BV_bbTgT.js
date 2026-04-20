import { r as reactExports, j as jsxRuntimeExports, c as cn } from "./index-C-Bt3bG-.js";
import { i as useWorkspace, n as useIsWorkspaceCreator, j as useMilestones, o as useAddSprintToMilestone, L as Layout, F as Flag, B as Badge, p as useCreateMilestone, q as useUpdateMilestoneSprintAssignees, U as Users, l as MOCK_MEMBERS } from "./useBackend-BkDdvppL.js";
import { c as createLucideIcon, B as Button, X, L as Label, I as Input } from "./textarea-D5l05Cbi.js";
import { N as NewSprintModal, d as CalendarDays, g as getDefaultDeadline, e as getMaxDeadlineFromStart, f as useSprintFormState, b as ChevronRight, C as Check, S as StepIndicator, h as SprintStep1, i as SprintStep2, j as SprintStep3 } from "./NewSprintModal-DQJQgR-0.js";
import { P as Plus } from "./plus-BVEfGIu5.js";
import { L as Link2 } from "./link-2-BpJluLOK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
      key: "m3kijz"
    }
  ],
  [
    "path",
    {
      d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
      key: "1fmvmk"
    }
  ],
  ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", key: "1f8sc4" }],
  ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" }]
];
const Rocket = createLucideIcon("rocket", __iconNode);
function fmt(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function daysBetween(a, b) {
  return Math.round(
    (new Date(b).getTime() - new Date(a).getTime()) / (1e3 * 60 * 60 * 24)
  );
}
function sprintStartDate(milestoneStart, index, template) {
  const d = new Date(milestoneStart);
  const durationDays = template === "TwoSprints" ? 15 : 7;
  d.setDate(d.getDate() + index * durationDays);
  return d.toISOString().slice(0, 10);
}
function sprintDurationDays(template) {
  return template === "TwoSprints" ? 15 : 7;
}
function SprintCard({
  sprint,
  milestoneId,
  workspaceId,
  index
}) {
  const [assignees, setAssignees] = reactExports.useState(sprint.assignees);
  const [copied, setCopied] = reactExports.useState(false);
  const updateAssignees = useUpdateMilestoneSprintAssignees();
  const saveTimer = reactExports.useRef(null);
  const inviteLink = sprint.inviteLink ?? `https://weflow.app/invite/${sprint.id}`;
  function handleAssigneesChange(val) {
    setAssignees(val);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      updateAssignees.mutate({
        milestoneId,
        sprintId: sprint.id,
        assignees: val,
        workspaceId
      });
    }, 600);
  }
  function handleCopy() {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    });
  }
  const statusColors = {
    active: "bg-primary/10 text-primary border-primary/30",
    upcoming: "bg-muted text-muted-foreground border-border",
    completed: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-300 dark:border-green-500/40"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-xl border border-border p-5 space-y-4",
      "data-ocid": `sprint-card.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate font-display", children: sprint.name }),
              sprint.goalSummary && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-[220px]", children: sprint.goalSummary }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3 h-3" }),
                fmt(sprint.startDate),
                " – ",
                fmt(sprint.endDate)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: cn(
                "text-[10px] flex-shrink-0 capitalize",
                statusColors[sprint.status]
              ),
              children: sprint.status
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-muted-foreground flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
            "Assignees"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: assignees,
              onChange: (e) => handleAssigneesChange(e.target.value),
              placeholder: "e.g. Alex Chen / Engineer, Maya Patel / Designer",
              className: "text-xs h-8 bg-background",
              "data-ocid": `sprint-assignees.item.${index + 1}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Use Name / Role format, comma-separated for multiple" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-muted-foreground flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-3.5 h-3.5" }),
            "Invite Link"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 bg-muted/60 border border-border rounded-md px-3 py-1.5 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate font-mono", children: inviteLink })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: cn(
                  "h-8 px-3 text-xs gap-1.5 flex-shrink-0 transition-colors",
                  copied ? "bg-green-500/10 border-green-400 text-green-600 dark:text-green-400" : "hover:bg-primary/5 hover:border-primary/40 hover:text-primary"
                ),
                onClick: handleCopy,
                "data-ocid": `sprint-invite-copy.item.${index + 1}`,
                children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
                  "Copied!"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                  "Copy"
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function MilestoneDetail({
  milestone,
  workspaceId,
  onNewSprint
}) {
  const duration = daysBetween(milestone.startDate, milestone.endDate);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-br from-primary/15 via-primary/8 to-transparent border border-primary/25 rounded-2xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-6 h-6 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold font-display text-foreground break-words", children: milestone.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              fmt(milestone.startDate),
              " → ",
              fmt(milestone.endDate)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/10 text-primary border-primary/30 text-xs font-semibold", children: [
            duration,
            " days · ",
            milestone.sprints.length,
            " sprints"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-muted-foreground uppercase tracking-widest", children: "Sprints" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "gap-1.5 text-xs h-7 border-primary/40 text-primary hover:bg-primary/5 hover:border-primary/60",
            onClick: onNewSprint,
            "data-ocid": "milestone.add_sprint_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
              "Add Sprint"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        milestone.sprints.map((sprint, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SprintCard,
          {
            sprint,
            milestoneId: milestone.id,
            workspaceId,
            index: i
          },
          sprint.id
        )),
        milestone.sprints.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-10 border-2 border-dashed border-border rounded-xl text-center",
            "data-ocid": "milestone.sprints.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-8 h-8 text-muted-foreground/50 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "No sprints yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-1 mb-4", children: "Add a sprint to start tracking work" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "bg-primary hover:bg-primary/90 gap-1.5 text-xs",
                  onClick: onNewSprint,
                  "data-ocid": "milestone.sprints.empty_add_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                    "Add Sprint"
                  ]
                }
              )
            ]
          }
        )
      ] })
    ] })
  ] });
}
const TEMPLATE_CARDS = [
  {
    id: "TwoSprints",
    title: "2 Sprints",
    subtitle: "30 days total",
    sprintDays: 15,
    count: 2
  },
  {
    id: "FourSprints",
    title: "4 Sprints",
    subtitle: "28 days total",
    sprintDays: 7,
    count: 4
  }
];
function CreateMilestoneModal({
  workspaceId,
  onClose,
  onCreated
}) {
  const [milestoneStep, setMilestoneStep] = reactExports.useState(1);
  const [name, setName] = reactExports.useState("");
  const [startDate, setStartDate] = reactExports.useState("");
  const [endDate, setEndDate] = reactExports.useState("");
  const [template, setTemplate] = reactExports.useState(null);
  const [phase, setPhase] = reactExports.useState("milestone");
  const [currentSprintIndex, setCurrentSprintIndex] = reactExports.useState(0);
  const [collectedSprints, setCollectedSprints] = reactExports.useState(
    []
  );
  const createMilestone = useCreateMilestone();
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const totalSprints = template ? template === "TwoSprints" ? 2 : 4 : 0;
  const durationDays = template ? sprintDurationDays(template) : 7;
  const currentSprintStart = template && startDate ? sprintStartDate(startDate, currentSprintIndex, template) : today;
  const currentSprintDeadline = getDefaultDeadline(
    currentSprintStart,
    durationDays
  );
  const currentSprintMaxDeadline = getMaxDeadlineFromStart(currentSprintStart);
  const sprintForm = useSprintFormState(currentSprintDeadline);
  const resetSprintForm = sprintForm.reset;
  reactExports.useEffect(() => {
    if (phase === "sprints") {
      const newStart = template && startDate ? sprintStartDate(startDate, currentSprintIndex, template) : today;
      const newDeadline = getDefaultDeadline(newStart, durationDays);
      resetSprintForm(newDeadline);
    }
  }, [
    phase,
    currentSprintIndex,
    template,
    startDate,
    durationDays,
    today,
    resetSprintForm
  ]);
  function handleMilestoneNext() {
    if (!name.trim() || !startDate || !endDate) return;
    setMilestoneStep(2);
  }
  function handleTemplateConfirm() {
    if (!template) return;
    setCollectedSprints([]);
    setCurrentSprintIndex(0);
    setPhase("sprints");
  }
  function handleSprintNext() {
    sprintForm.goNext();
  }
  async function handleSprintFinish() {
    const currentData = {
      goal: sprintForm.step1.goal.trim(),
      description: sprintForm.step1.description,
      deadline: sprintForm.step1.deadline,
      memberIds: sprintForm.selectedMemberIds,
      assignments: sprintForm.assignments
    };
    const updatedSprints = [...collectedSprints, currentData];
    if (currentSprintIndex + 1 < totalSprints) {
      setCollectedSprints(updatedSprints);
      setCurrentSprintIndex((i) => i + 1);
    } else {
      if (!template) return;
      const milestoneId = `ms-${Date.now()}`;
      const configuredSprints = updatedSprints.map(
        (sd, i) => {
          const sStart = sprintStartDate(startDate, i, template);
          const members = MOCK_MEMBERS.filter(
            (m) => sd.memberIds.includes(m.id)
          );
          return {
            id: `sprint-${i + 1}`,
            name: `Sprint ${i + 1}`,
            startDate: sStart,
            endDate: sd.deadline,
            status: i === 0 ? "active" : "upcoming",
            assignees: members.map((m) => `${m.name} / ${m.role}`).join(", "),
            inviteLink: `https://weflow.app/invite/${milestoneId}-sprint-${i + 1}`,
            goalSummary: sd.goal,
            description: sd.description,
            memberIds: sd.memberIds
          };
        }
      );
      const args = {
        name: name.trim(),
        startDate,
        endDate,
        template,
        workspaceId,
        configuredSprints
      };
      const result = await createMilestone.mutateAsync(args);
      onCreated(result);
    }
  }
  function handleSprintStepCreate() {
    handleSprintFinish();
  }
  function handleSprintPhaseBack() {
    if (sprintForm.step === 1) {
      if (currentSprintIndex > 0) {
        setCurrentSprintIndex((i) => i - 1);
        const prev = collectedSprints[currentSprintIndex - 1];
        setCollectedSprints((cs) => cs.slice(0, -1));
        const prevStart = sprintStartDate(
          startDate,
          currentSprintIndex - 1,
          template
        );
        const prevDeadline = getDefaultDeadline(prevStart, durationDays);
        resetSprintForm(prevDeadline);
        sprintForm.setStep1({
          goal: prev.goal,
          description: prev.description,
          deadline: prev.deadline
        });
      } else {
        setPhase("milestone");
        setMilestoneStep(2);
      }
    } else {
      sprintForm.goBack();
    }
  }
  const isMilestonePhase = phase === "milestone";
  const isSprintPhase = phase === "sprints";
  const isLastSprint = isSprintPhase && currentSprintIndex === totalSprints - 1;
  const isLastStep = isSprintPhase && sprintForm.step === 3;
  const modalTitle = isMilestonePhase ? "Create Milestone" : `Configure Sprint ${currentSprintIndex + 1} of ${totalSprints}`;
  const modalSubtitle = isMilestonePhase ? `Step ${milestoneStep} of 2 — ${milestoneStep === 1 ? "Details" : "Sprint template"}` : [
    "Set the sprint goal and timeline.",
    "Select who will work on this sprint.",
    "Assign tasks to your team members."
  ][sprintForm.step - 1];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      open: true,
      "aria-modal": "true",
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent border-none outline-none w-full h-full max-w-full max-h-full m-0 pointer-events-auto",
      "data-ocid": "create-milestone.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm cursor-default",
            onClick: onClose,
            "aria-label": "Close dialog"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "relative z-10 w-full bg-card rounded-2xl shadow-2xl border border-border overflow-hidden pointer-events-auto",
              isSprintPhase ? "max-w-[760px]" : "max-w-lg"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-primary flex items-center justify-center", children: isSprintPhase ? /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "w-4 h-4 text-primary-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-4 h-4 text-primary-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-foreground font-display text-base leading-tight", children: modalTitle }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: modalSubtitle })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                    "data-ocid": "create-milestone.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              isMilestonePhase && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex px-6 pt-4 gap-2", children: [1, 2].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "h-1 flex-1 rounded-full transition-colors duration-300",
                      s <= milestoneStep ? "bg-primary" : "bg-muted"
                    )
                  },
                  s
                )) }),
                milestoneStep === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        className: "text-sm font-semibold",
                        htmlFor: "milestone-name",
                        children: "Milestone Name"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "milestone-name",
                        value: name,
                        onChange: (e) => setName(e.target.value),
                        placeholder: "e.g. Public Beta Launch",
                        className: "bg-background",
                        autoFocus: true,
                        "data-ocid": "create-milestone.name.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Label,
                        {
                          className: "text-sm font-semibold",
                          htmlFor: "start-date",
                          children: "Start Date"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "start-date",
                          type: "date",
                          value: startDate,
                          min: today,
                          onChange: (e) => setStartDate(e.target.value),
                          className: "bg-background",
                          "data-ocid": "create-milestone.start-date.input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold", htmlFor: "end-date", children: "End Date" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "end-date",
                          type: "date",
                          value: endDate,
                          min: startDate || today,
                          onChange: (e) => setEndDate(e.target.value),
                          className: "bg-background",
                          "data-ocid": "create-milestone.end-date.input"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      className: "w-full bg-primary hover:bg-primary/90 gap-2 mt-2",
                      onClick: handleMilestoneNext,
                      disabled: !name.trim() || !startDate || !endDate,
                      "data-ocid": "create-milestone.next_button",
                      children: [
                        "Next: Choose Sprint Template",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                      ]
                    }
                  )
                ] }),
                milestoneStep === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Choose how your milestone will be divided into sprints:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: TEMPLATE_CARDS.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setTemplate(card.id),
                      className: cn(
                        "border-2 rounded-xl p-4 text-left transition-all space-y-3",
                        template === card.id ? "border-primary bg-primary/8 shadow-sm" : "border-border bg-background hover:border-primary/40 hover:bg-primary/4"
                      ),
                      "data-ocid": `create-milestone.template-${card.id.toLowerCase()}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground font-display text-base", children: card.title }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: card.subtitle })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1.5", children: Array.from({ length: card.count }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: cn(
                              "h-5 rounded-md flex items-center px-2 text-[9px] font-bold",
                              template === card.id ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                            ),
                            children: [
                              "Sprint ",
                              i + 1,
                              " · ",
                              card.sprintDays,
                              " days"
                            ]
                          },
                          `${card.id}-sprint-${i + 1}`
                        )) }),
                        template === card.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs font-semibold text-primary", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
                          "Selected"
                        ] })
                      ]
                    },
                    card.id
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        className: "flex-1",
                        onClick: () => setMilestoneStep(1),
                        "data-ocid": "create-milestone.back_button",
                        children: "Back"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        className: "flex-1 bg-primary hover:bg-primary/90 gap-2",
                        onClick: handleTemplateConfirm,
                        disabled: !template,
                        "data-ocid": "create-milestone.configure_sprints_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "w-4 h-4" }),
                          "Configure Sprints"
                        ]
                      }
                    )
                  ] })
                ] })
              ] }),
              isSprintPhase && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pt-4 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-1", children: ["s1", "s2", "s3", "s4"].slice(0, totalSprints).map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "h-1.5 flex-1 rounded-full transition-colors duration-500",
                        i < currentSprintIndex ? "bg-green-500" : i === currentSprintIndex ? "bg-primary" : "bg-muted"
                      )
                    },
                    key
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground text-right", children: [
                    currentSprintIndex + 1,
                    " of ",
                    totalSprints,
                    " sprints configured"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-8 pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { currentStep: sprintForm.step }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 pb-2", children: [
                  sprintForm.step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SprintStep1,
                    {
                      data: sprintForm.step1,
                      onChange: sprintForm.setStep1,
                      error: sprintForm.goalError,
                      startDate: currentSprintStart,
                      helperText: `Based on ${template === "TwoSprints" ? "15-day" : "7-day"} sprint. Max ${currentSprintMaxDeadline}.`
                    }
                  ),
                  sprintForm.step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SprintStep2,
                    {
                      selectedIds: sprintForm.selectedMemberIds,
                      onToggle: sprintForm.toggleMember,
                      error: sprintForm.teamError
                    }
                  ),
                  sprintForm.step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SprintStep3,
                    {
                      selectedMembers: sprintForm.selectedMembers,
                      assignments: sprintForm.assignments,
                      onAssign: sprintForm.assignTask,
                      onUnassign: sprintForm.unassignTask,
                      onAddNewTask: sprintForm.addNewTask
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-8 py-5 border-t border-border bg-muted/20 mt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: sprintForm.step === 1 ? "ghost" : "outline",
                      size: "sm",
                      onClick: handleSprintPhaseBack,
                      "data-ocid": "create-milestone.sprint.back_button",
                      children: "← Back"
                    }
                  ),
                  !isLastStep ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 font-semibold px-5",
                      onClick: handleSprintNext,
                      "data-ocid": "create-milestone.sprint.next_button",
                      children: [
                        "Next ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                      ]
                    }
                  ) : isLastSprint ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      className: "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 gap-2 shadow-md",
                      onClick: handleSprintStepCreate,
                      disabled: createMilestone.isPending,
                      "data-ocid": "create-milestone.sprint.create_button",
                      children: createMilestone.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                        "Creating…"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-4 h-4" }),
                        "Create Milestone 🚀"
                      ] })
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      className: "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 gap-2 shadow-md",
                      onClick: handleSprintStepCreate,
                      "data-ocid": "create-milestone.sprint.next_sprint_button",
                      children: [
                        "Save & Next Sprint ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                      ]
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function EmptyMilestones({
  isCreator,
  onCreate
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center px-6 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-10 h-10 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold font-display text-foreground mb-2", children: "No Milestones Yet" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8", children: "Milestones group sprints around a major product goal — launch, feature release, or any significant deliverable." }),
    isCreator && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: onCreate,
        className: "inline-flex flex-col items-center gap-3 w-full max-w-xs mx-auto p-6 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 transition-all group cursor-pointer",
        "data-ocid": "create-milestone.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-7 h-7 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-lg font-display", children: "Create Milestone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Set a name, dates, and sprint structure" })
          ] })
        ]
      }
    )
  ] }) });
}
function Milestones() {
  const { data: workspace } = useWorkspace();
  const workspaceId = (workspace == null ? void 0 : workspace.id) ?? "default";
  const { data: isCreator = false } = useIsWorkspaceCreator(workspaceId);
  const { data: milestones = [], isLoading } = useMilestones(workspaceId);
  const [showModal, setShowModal] = reactExports.useState(false);
  const [showSprintModal, setShowSprintModal] = reactExports.useState(false);
  const [activeMilestoneId, setActiveMilestoneId] = reactExports.useState(
    null
  );
  const addSprintToMilestone = useAddSprintToMilestone();
  function handleCreated(m) {
    setShowModal(false);
    setActiveMilestoneId(m.id);
  }
  reactExports.useEffect(() => {
    if (milestones.length > 0 && !activeMilestoneId) {
      setActiveMilestoneId(milestones[0].id);
    }
  }, [milestones, activeMilestoneId]);
  const activeMilestone = milestones.find((m) => m.id === activeMilestoneId);
  const hasMultiple = milestones.length > 1;
  function handleAddSprint(sprint, _members) {
    if (!activeMilestoneId) return;
    const newSprint = {
      id: `${activeMilestoneId}-custom-${Date.now()}`,
      name: sprint.name,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      status: sprint.status,
      assignees: _members.map((m) => `${m.name} / ${m.role}`).join(", "),
      inviteLink: `https://weflow.app/invite/${activeMilestoneId}-custom-${Date.now()}`,
      goalSummary: sprint.goalSummary
    };
    addSprintToMilestone.mutate({
      milestoneId: activeMilestoneId,
      workspaceId,
      sprint: newSprint
    });
    setShowSprintModal(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto bg-background flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-6 py-4 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold font-display text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-5 h-5 text-primary" }),
            "Milestones"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Track major product goals across sprints" })
        ] }),
        isCreator && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "bg-primary hover:bg-primary/90 gap-1.5 flex-shrink-0",
            onClick: () => setShowModal(true),
            "data-ocid": "new-milestone.primary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "New Milestone"
            ]
          }
        )
      ] }) }),
      hasMultiple && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-b border-border px-6 py-2 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto flex items-center gap-1.5 overflow-x-auto", children: milestones.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveMilestoneId(m.id),
          className: cn(
            "px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
            activeMilestoneId === m.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
          ),
          "data-ocid": `milestone-tab.${m.id}`,
          children: m.name
        },
        m.id
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex-1 flex items-center justify-center",
          "data-ocid": "milestones.loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-primary" })
        }
      ) : milestones.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyMilestones,
        {
          isCreator,
          onCreate: () => setShowModal(true)
        }
      ) : activeMilestone ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto w-full px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        MilestoneDetail,
        {
          milestone: activeMilestone,
          workspaceId,
          onNewSprint: () => setShowSprintModal(true)
        }
      ) }) : null })
    ] }),
    showModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateMilestoneModal,
      {
        workspaceId,
        onClose: () => setShowModal(false),
        onCreated: handleCreated
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      NewSprintModal,
      {
        open: showSprintModal,
        onClose: () => setShowSprintModal(false),
        onAdd: handleAddSprint,
        nextSprintNumber: ((activeMilestone == null ? void 0 : activeMilestone.sprints.length) ?? 0) + 1,
        milestoneDeadline: activeMilestone ? new Date(activeMilestone.endDate) : void 0
      }
    )
  ] });
}
export {
  Milestones as default
};
