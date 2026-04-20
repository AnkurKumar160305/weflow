import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardList,
  Copy,
  Flag,
  Link2,
  Loader2,
  Plus,
  Rocket,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Layout } from "../components/Layout";
import {
  SprintStep1,
  SprintStep2,
  SprintStep3,
  StepIndicator,
  getDefaultDeadline,
  getMaxDeadlineFromStart,
  useSprintFormState,
} from "../components/NewSprintModal";
import { NewSprintModal } from "../components/NewSprintModal";
import { MOCK_MEMBERS } from "../data/mockData";
import {
  useAddSprintToMilestone,
  useCreateMilestone,
  useIsWorkspaceCreator,
  useMilestones,
  useUpdateMilestoneSprintAssignees,
  useWorkspace,
} from "../hooks/useBackend";
import type {
  CreateMilestoneArgs,
  Milestone,
  MilestoneSprintInfo,
  Sprint,
  SprintFormData,
  SprintTemplate,
  WorkspaceMember,
} from "../types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function daysBetween(a: string, b: string) {
  return Math.round(
    (new Date(b).getTime() - new Date(a).getTime()) / (1000 * 60 * 60 * 24),
  );
}

/** Returns the ISO start date for a given sprint index based on template. */
function sprintStartDate(
  milestoneStart: string,
  index: number,
  template: SprintTemplate,
): string {
  const d = new Date(milestoneStart);
  const durationDays = template === "TwoSprints" ? 15 : 7;
  d.setDate(d.getDate() + index * durationDays);
  return d.toISOString().slice(0, 10);
}

function sprintDurationDays(template: SprintTemplate): number {
  return template === "TwoSprints" ? 15 : 7;
}

// ─── Sprint Card ─────────────────────────────────────────────────────────────

function SprintCard({
  sprint,
  milestoneId,
  workspaceId,
  index,
}: {
  sprint: MilestoneSprintInfo;
  milestoneId: string;
  workspaceId: string;
  index: number;
}) {
  const [assignees, setAssignees] = useState(sprint.assignees);
  const [copied, setCopied] = useState(false);
  const updateAssignees = useUpdateMilestoneSprintAssignees();
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inviteLink =
    sprint.inviteLink ?? `https://weflow.app/invite/${sprint.id}`;

  function handleAssigneesChange(val: string) {
    setAssignees(val);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      updateAssignees.mutate({
        milestoneId,
        sprintId: sprint.id,
        assignees: val,
        workspaceId,
      });
    }, 600);
  }

  function handleCopy() {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const statusColors: Record<string, string> = {
    active: "bg-primary/10 text-primary border-primary/30",
    upcoming: "bg-muted text-muted-foreground border-border",
    completed:
      "bg-green-500/10 text-green-700 dark:text-green-400 border-green-300 dark:border-green-500/40",
  };

  return (
    <div
      className="bg-card rounded-xl border border-border p-5 space-y-4"
      data-ocid={`sprint-card.item.${index + 1}`}
    >
      {/* Header row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <ClipboardList className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm truncate font-display">
              {sprint.name}
            </p>
            {sprint.goalSummary && (
              <p className="text-xs text-muted-foreground truncate max-w-[220px]">
                {sprint.goalSummary}
              </p>
            )}
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              {fmt(sprint.startDate)} – {fmt(sprint.endDate)}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "text-[10px] flex-shrink-0 capitalize",
            statusColors[sprint.status],
          )}
        >
          {sprint.status}
        </Badge>
      </div>

      {/* Assignees */}
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          Assignees
        </Label>
        <Input
          value={assignees}
          onChange={(e) => handleAssigneesChange(e.target.value)}
          placeholder="e.g. Alex Chen / Engineer, Maya Patel / Designer"
          className="text-xs h-8 bg-background"
          data-ocid={`sprint-assignees.item.${index + 1}`}
        />
        <p className="text-[10px] text-muted-foreground">
          Use Name / Role format, comma-separated for multiple
        </p>
      </div>

      {/* Invite link */}
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
          <Link2 className="w-3.5 h-3.5" />
          Invite Link
        </Label>
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0 bg-muted/60 border border-border rounded-md px-3 py-1.5 flex items-center gap-2">
            <Link2 className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <span className="text-xs text-muted-foreground truncate font-mono">
              {inviteLink}
            </span>
          </div>
          <Button
            size="sm"
            variant="outline"
            className={cn(
              "h-8 px-3 text-xs gap-1.5 flex-shrink-0 transition-colors",
              copied
                ? "bg-green-500/10 border-green-400 text-green-600 dark:text-green-400"
                : "hover:bg-primary/5 hover:border-primary/40 hover:text-primary",
            )}
            onClick={handleCopy}
            data-ocid={`sprint-invite-copy.item.${index + 1}`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Milestone Detail View ────────────────────────────────────────────────────

function MilestoneDetail({
  milestone,
  workspaceId,
  onNewSprint,
}: {
  milestone: Milestone;
  workspaceId: string;
  onNewSprint: () => void;
}) {
  const duration = daysBetween(milestone.startDate, milestone.endDate);

  return (
    <div className="space-y-6">
      {/* Big milestone header */}
      <div className="bg-gradient-to-br from-primary/15 via-primary/8 to-transparent border border-primary/25 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-md">
            <Flag className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold font-display text-foreground break-words">
              {milestone.name}
            </h2>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-primary" />
                <span>
                  {fmt(milestone.startDate)} → {fmt(milestone.endDate)}
                </span>
              </span>
              <Badge className="bg-primary/10 text-primary border-primary/30 text-xs font-semibold">
                {duration} days · {milestone.sprints.length} sprints
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Sprint cards */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
            Sprints
          </h3>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs h-7 border-primary/40 text-primary hover:bg-primary/5 hover:border-primary/60"
            onClick={onNewSprint}
            data-ocid="milestone.add_sprint_button"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Sprint
          </Button>
        </div>
        <div className="space-y-3">
          {milestone.sprints.map((sprint, i) => (
            <SprintCard
              key={sprint.id}
              sprint={sprint}
              milestoneId={milestone.id}
              workspaceId={workspaceId}
              index={i}
            />
          ))}
          {milestone.sprints.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-border rounded-xl text-center"
              data-ocid="milestone.sprints.empty_state"
            >
              <ClipboardList className="w-8 h-8 text-muted-foreground/50 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                No sprints yet
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1 mb-4">
                Add a sprint to start tracking work
              </p>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 gap-1.5 text-xs"
                onClick={onNewSprint}
                data-ocid="milestone.sprints.empty_add_button"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Sprint
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Create Milestone Modal ───────────────────────────────────────────────────
//
// Flow:
//   Phase "milestone"  → Step 1 (details) → Step 2 (template selection)
//   Phase "sprints"    → for each sprint: Step 1 → Step 2 → Step 3 (inline sprint form)
//   After last sprint  → createMilestone with all collected data

interface CreateModalProps {
  workspaceId: string;
  onClose: () => void;
  onCreated: (m: Milestone) => void;
}

type ModalPhase = "milestone" | "sprints";

const TEMPLATE_CARDS: {
  id: SprintTemplate;
  title: string;
  subtitle: string;
  sprintDays: number;
  count: number;
}[] = [
  {
    id: "TwoSprints",
    title: "2 Sprints",
    subtitle: "30 days total",
    sprintDays: 15,
    count: 2,
  },
  {
    id: "FourSprints",
    title: "4 Sprints",
    subtitle: "28 days total",
    sprintDays: 7,
    count: 4,
  },
];

function CreateMilestoneModal({
  workspaceId,
  onClose,
  onCreated,
}: CreateModalProps) {
  // ── Milestone details phase ──────────────────────────────────────────────
  const [milestoneStep, setMilestoneStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [template, setTemplate] = useState<SprintTemplate | null>(null);
  const [phase, setPhase] = useState<ModalPhase>("milestone");

  // ── Sprint configuration phase ───────────────────────────────────────────
  const [currentSprintIndex, setCurrentSprintIndex] = useState(0);
  const [collectedSprints, setCollectedSprints] = useState<SprintFormData[]>(
    [],
  );
  const createMilestone = useCreateMilestone();

  const today = new Date().toISOString().split("T")[0];
  const totalSprints = template ? (template === "TwoSprints" ? 2 : 4) : 0;
  const durationDays = template ? sprintDurationDays(template) : 7;

  // Compute auto-filled deadline for the current sprint
  const currentSprintStart =
    template && startDate
      ? sprintStartDate(startDate, currentSprintIndex, template)
      : today;
  const currentSprintDeadline = getDefaultDeadline(
    currentSprintStart,
    durationDays,
  );
  const currentSprintMaxDeadline = getMaxDeadlineFromStart(currentSprintStart);

  // Sprint form state — reused for each sprint
  const sprintForm = useSprintFormState(currentSprintDeadline);

  // When the sprint index advances, reset the form with the new sprint's deadline
  const resetSprintForm = sprintForm.reset;
  useEffect(() => {
    if (phase === "sprints") {
      const newStart =
        template && startDate
          ? sprintStartDate(startDate, currentSprintIndex, template)
          : today;
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
    resetSprintForm,
  ]);

  // ── Milestone Phase Handlers ─────────────────────────────────────────────

  function handleMilestoneNext() {
    if (!name.trim() || !startDate || !endDate) return;
    setMilestoneStep(2);
  }

  function handleTemplateConfirm() {
    if (!template) return;
    // Enter sprint configuration phase
    setCollectedSprints([]);
    setCurrentSprintIndex(0);
    setPhase("sprints");
  }

  // ── Sprint Phase Handlers ─────────────────────────────────────────────────

  function handleSprintNext() {
    sprintForm.goNext();
  }

  async function handleSprintFinish() {
    // Collect current sprint data
    const currentData: SprintFormData = {
      goal: sprintForm.step1.goal.trim(),
      description: sprintForm.step1.description,
      deadline: sprintForm.step1.deadline,
      memberIds: sprintForm.selectedMemberIds,
      assignments: sprintForm.assignments,
    };
    const updatedSprints = [...collectedSprints, currentData];

    if (currentSprintIndex + 1 < totalSprints) {
      // Move to the next sprint
      setCollectedSprints(updatedSprints);
      setCurrentSprintIndex((i) => i + 1);
      // reset happens via useEffect above
    } else {
      // All sprints configured — build MilestoneSprintInfo list and create milestone
      if (!template) return;
      const milestoneId = `ms-${Date.now()}`;
      const configuredSprints: MilestoneSprintInfo[] = updatedSprints.map(
        (sd, i) => {
          const sStart = sprintStartDate(startDate, i, template);
          const members = MOCK_MEMBERS.filter((m) =>
            sd.memberIds.includes(m.id),
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
            memberIds: sd.memberIds,
          };
        },
      );

      const args: CreateMilestoneArgs = {
        name: name.trim(),
        startDate,
        endDate,
        template,
        workspaceId,
        configuredSprints,
      };
      const result = await createMilestone.mutateAsync(args);
      onCreated(result);
    }
  }

  // ── Sprint Step 3 "Create Sprint" — advances to next sprint or finishes ──

  function handleSprintStepCreate() {
    handleSprintFinish();
  }

  // ── Back from sprint step 1 → go back to template selection ─────────────

  function handleSprintPhaseBack() {
    if (sprintForm.step === 1) {
      if (currentSprintIndex > 0) {
        // Go back to previous sprint's step 3
        setCurrentSprintIndex((i) => i - 1);
        const prev = collectedSprints[currentSprintIndex - 1];
        // Remove last collected sprint
        setCollectedSprints((cs) => cs.slice(0, -1));
        // Restore previous form state — reset then populate manually
        const prevStart = sprintStartDate(
          startDate,
          currentSprintIndex - 1,
          template!,
        );
        const prevDeadline = getDefaultDeadline(prevStart, durationDays);
        resetSprintForm(prevDeadline);
        // Pre-fill with previously collected data
        sprintForm.setStep1({
          goal: prev.goal,
          description: prev.description,
          deadline: prev.deadline,
        });
      } else {
        // Back to template selection
        setPhase("milestone");
        setMilestoneStep(2);
      }
    } else {
      sprintForm.goBack();
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  const isMilestonePhase = phase === "milestone";
  const isSprintPhase = phase === "sprints";
  const isLastSprint = isSprintPhase && currentSprintIndex === totalSprints - 1;
  const isLastStep = isSprintPhase && sprintForm.step === 3;

  // Modal title / subtitle
  const modalTitle = isMilestonePhase
    ? "Create Milestone"
    : `Configure Sprint ${currentSprintIndex + 1} of ${totalSprints}`;

  const modalSubtitle = isMilestonePhase
    ? `Step ${milestoneStep} of 2 — ${milestoneStep === 1 ? "Details" : "Sprint template"}`
    : [
        "Set the sprint goal and timeline.",
        "Select who will work on this sprint.",
        "Assign tasks to your team members.",
      ][sprintForm.step - 1];

  return (
    <dialog
      open
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent border-none outline-none w-full h-full max-w-full max-h-full m-0 pointer-events-auto"
      data-ocid="create-milestone.dialog"
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm cursor-default"
        onClick={onClose}
        aria-label="Close dialog"
      />

      {/* Panel */}
      <div
        className={cn(
          "relative z-10 w-full bg-card rounded-2xl shadow-2xl border border-border overflow-hidden pointer-events-auto",
          isSprintPhase ? "max-w-[760px]" : "max-w-lg",
        )}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              {isSprintPhase ? (
                <Rocket className="w-4 h-4 text-primary-foreground" />
              ) : (
                <Flag className="w-4 h-4 text-primary-foreground" />
              )}
            </div>
            <div>
              <h2 className="font-bold text-foreground font-display text-base leading-tight">
                {modalTitle}
              </h2>
              <p className="text-xs text-muted-foreground">{modalSubtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            data-ocid="create-milestone.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── MILESTONE PHASE ───────────────────────────────────────────── */}
        {isMilestonePhase && (
          <>
            {/* Step indicator */}
            <div className="flex px-6 pt-4 gap-2">
              {[1, 2].map((s) => (
                <div
                  key={s}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-300",
                    s <= milestoneStep ? "bg-primary" : "bg-muted",
                  )}
                />
              ))}
            </div>

            {/* Step 1 — Details */}
            {milestoneStep === 1 && (
              <div className="px-6 py-5 space-y-4">
                <div className="space-y-1.5">
                  <Label
                    className="text-sm font-semibold"
                    htmlFor="milestone-name"
                  >
                    Milestone Name
                  </Label>
                  <Input
                    id="milestone-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Public Beta Launch"
                    className="bg-background"
                    autoFocus
                    data-ocid="create-milestone.name.input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label
                      className="text-sm font-semibold"
                      htmlFor="start-date"
                    >
                      Start Date
                    </Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      min={today}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-background"
                      data-ocid="create-milestone.start-date.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold" htmlFor="end-date">
                      End Date
                    </Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      min={startDate || today}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-background"
                      data-ocid="create-milestone.end-date.input"
                    />
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 gap-2 mt-2"
                  onClick={handleMilestoneNext}
                  disabled={!name.trim() || !startDate || !endDate}
                  data-ocid="create-milestone.next_button"
                >
                  Next: Choose Sprint Template
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Step 2 — Template */}
            {milestoneStep === 2 && (
              <div className="px-6 py-5 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Choose how your milestone will be divided into sprints:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {TEMPLATE_CARDS.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setTemplate(card.id)}
                      className={cn(
                        "border-2 rounded-xl p-4 text-left transition-all space-y-3",
                        template === card.id
                          ? "border-primary bg-primary/8 shadow-sm"
                          : "border-border bg-background hover:border-primary/40 hover:bg-primary/4",
                      )}
                      data-ocid={`create-milestone.template-${card.id.toLowerCase()}`}
                    >
                      <div>
                        <p className="font-bold text-foreground font-display text-base">
                          {card.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {card.subtitle}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {Array.from({ length: card.count }, (_, i) => (
                          <div
                            key={`${card.id}-sprint-${i + 1}`}
                            className={cn(
                              "h-5 rounded-md flex items-center px-2 text-[9px] font-bold",
                              template === card.id
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground",
                            )}
                          >
                            Sprint {i + 1} · {card.sprintDays} days
                          </div>
                        ))}
                      </div>
                      {template === card.id && (
                        <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                          <Check className="w-3.5 h-3.5" />
                          Selected
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 pt-1">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setMilestoneStep(1)}
                    data-ocid="create-milestone.back_button"
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 gap-2"
                    onClick={handleTemplateConfirm}
                    disabled={!template}
                    data-ocid="create-milestone.configure_sprints_button"
                  >
                    <Rocket className="w-4 h-4" />
                    Configure Sprints
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── SPRINT CONFIGURATION PHASE ───────────────────────────────── */}
        {isSprintPhase && (
          <>
            {/* Sprint progress bar */}
            <div className="px-6 pt-4 space-y-1.5">
              <div className="flex items-center gap-2 mb-1">
                {(["s1", "s2", "s3", "s4"] as const)
                  .slice(0, totalSprints)
                  .map((key, i) => (
                    <div
                      key={key}
                      className={cn(
                        "h-1.5 flex-1 rounded-full transition-colors duration-500",
                        i < currentSprintIndex
                          ? "bg-green-500"
                          : i === currentSprintIndex
                            ? "bg-primary"
                            : "bg-muted",
                      )}
                    />
                  ))}
              </div>
              <p className="text-[10px] text-muted-foreground text-right">
                {currentSprintIndex + 1} of {totalSprints} sprints configured
              </p>
            </div>

            {/* Sprint step indicator */}
            <div className="px-8 pt-2">
              <StepIndicator currentStep={sprintForm.step} />
            </div>

            {/* Sprint step content */}
            <div className="px-8 pb-2">
              {sprintForm.step === 1 && (
                <SprintStep1
                  data={sprintForm.step1}
                  onChange={sprintForm.setStep1}
                  error={sprintForm.goalError}
                  startDate={currentSprintStart}
                  helperText={`Based on ${template === "TwoSprints" ? "15-day" : "7-day"} sprint. Max ${currentSprintMaxDeadline}.`}
                />
              )}
              {sprintForm.step === 2 && (
                <SprintStep2
                  selectedIds={sprintForm.selectedMemberIds}
                  onToggle={sprintForm.toggleMember}
                  error={sprintForm.teamError}
                />
              )}
              {sprintForm.step === 3 && (
                <SprintStep3
                  selectedMembers={sprintForm.selectedMembers}
                  assignments={sprintForm.assignments}
                  onAssign={sprintForm.assignTask}
                  onUnassign={sprintForm.unassignTask}
                  onAddNewTask={sprintForm.addNewTask}
                />
              )}
            </div>

            {/* Sprint footer */}
            <div className="flex items-center justify-between px-8 py-5 border-t border-border bg-muted/20 mt-4">
              <Button
                type="button"
                variant={sprintForm.step === 1 ? "ghost" : "outline"}
                size="sm"
                onClick={handleSprintPhaseBack}
                data-ocid="create-milestone.sprint.back_button"
              >
                ← Back
              </Button>

              {!isLastStep ? (
                <Button
                  type="button"
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 font-semibold px-5"
                  onClick={handleSprintNext}
                  data-ocid="create-milestone.sprint.next_button"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </Button>
              ) : isLastSprint ? (
                <Button
                  type="button"
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 gap-2 shadow-md"
                  onClick={handleSprintStepCreate}
                  disabled={createMilestone.isPending}
                  data-ocid="create-milestone.sprint.create_button"
                >
                  {createMilestone.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating…
                    </>
                  ) : (
                    <>
                      <Flag className="w-4 h-4" />
                      Create Milestone 🚀
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 gap-2 shadow-md"
                  onClick={handleSprintStepCreate}
                  data-ocid="create-milestone.sprint.next_sprint_button"
                >
                  Save & Next Sprint <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}

function EmptyMilestones({
  isCreator,
  onCreate,
}: { isCreator: boolean; onCreate: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-16">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Flag className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold font-display text-foreground mb-2">
          No Milestones Yet
        </h2>
        <p className="text-muted-foreground text-sm mb-8">
          Milestones group sprints around a major product goal — launch, feature
          release, or any significant deliverable.
        </p>
        {isCreator && (
          <button
            type="button"
            onClick={onCreate}
            className="inline-flex flex-col items-center gap-3 w-full max-w-xs mx-auto p-6 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 transition-all group cursor-pointer"
            data-ocid="create-milestone.empty_state"
          >
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Plus className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <p className="font-bold text-foreground text-lg font-display">
                Create Milestone
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Set a name, dates, and sprint structure
              </p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Milestones() {
  const { data: workspace } = useWorkspace();
  const workspaceId = workspace?.id ?? "default";
  const { data: isCreator = false } = useIsWorkspaceCreator(workspaceId);
  const { data: milestones = [], isLoading } = useMilestones(workspaceId);
  const [showModal, setShowModal] = useState(false);
  const [showSprintModal, setShowSprintModal] = useState(false);
  const [activeMilestoneId, setActiveMilestoneId] = useState<string | null>(
    null,
  );
  const addSprintToMilestone = useAddSprintToMilestone();

  function handleCreated(m: Milestone) {
    setShowModal(false);
    setActiveMilestoneId(m.id);
  }

  useEffect(() => {
    if (milestones.length > 0 && !activeMilestoneId) {
      setActiveMilestoneId(milestones[0].id);
    }
  }, [milestones, activeMilestoneId]);

  const activeMilestone = milestones.find((m) => m.id === activeMilestoneId);
  const hasMultiple = milestones.length > 1;

  function handleAddSprint(
    sprint: Omit<Sprint, "id" | "taskIds" | "velocity">,
    _members: WorkspaceMember[],
  ) {
    if (!activeMilestoneId) return;
    const newSprint: MilestoneSprintInfo = {
      id: `${activeMilestoneId}-custom-${Date.now()}`,
      name: sprint.name,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      status: sprint.status,
      assignees: _members.map((m) => `${m.name} / ${m.role}`).join(", "),
      inviteLink: `https://weflow.app/invite/${activeMilestoneId}-custom-${Date.now()}`,
      goalSummary: sprint.goalSummary,
    };
    addSprintToMilestone.mutate({
      milestoneId: activeMilestoneId,
      workspaceId,
      sprint: newSprint,
    });
    setShowSprintModal(false);
  }

  return (
    <Layout>
      <div className="flex-1 overflow-y-auto bg-background flex flex-col">
        {/* Header */}
        <div className="bg-card border-b border-border px-6 py-4 flex-shrink-0">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
                <Flag className="w-5 h-5 text-primary" />
                Milestones
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Track major product goals across sprints
              </p>
            </div>
            {isCreator && (
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 gap-1.5 flex-shrink-0"
                onClick={() => setShowModal(true)}
                data-ocid="new-milestone.primary_button"
              >
                <Plus className="w-4 h-4" />
                New Milestone
              </Button>
            )}
          </div>
        </div>

        {/* Milestone tabs — only when there are multiple */}
        {hasMultiple && (
          <div className="bg-muted/30 border-b border-border px-6 py-2 flex-shrink-0">
            <div className="max-w-3xl mx-auto flex items-center gap-1.5 overflow-x-auto">
              {milestones.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveMilestoneId(m.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                    activeMilestoneId === m.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  data-ocid={`milestone-tab.${m.id}`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content area */}
        <div className="flex-1 flex flex-col">
          {isLoading ? (
            <div
              className="flex-1 flex items-center justify-center"
              data-ocid="milestones.loading_state"
            >
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : milestones.length === 0 ? (
            <EmptyMilestones
              isCreator={isCreator}
              onCreate={() => setShowModal(true)}
            />
          ) : activeMilestone ? (
            <div className="max-w-3xl mx-auto w-full px-6 py-6">
              <MilestoneDetail
                milestone={activeMilestone}
                workspaceId={workspaceId}
                onNewSprint={() => setShowSprintModal(true)}
              />
            </div>
          ) : null}
        </div>
      </div>

      {/* Create Milestone modal (includes inline sprint config phase) */}
      {showModal && (
        <CreateMilestoneModal
          workspaceId={workspaceId}
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}

      {/* New Sprint modal — for adding extra sprints to existing milestones */}
      <NewSprintModal
        open={showSprintModal}
        onClose={() => setShowSprintModal(false)}
        onAdd={handleAddSprint}
        nextSprintNumber={(activeMilestone?.sprints.length ?? 0) + 1}
        milestoneDeadline={
          activeMilestone ? new Date(activeMilestone.endDate) : undefined
        }
      />
    </Layout>
  );
}
