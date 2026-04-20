import { j as jsxRuntimeExports, c as cn, u as useNavigate, r as reactExports } from "./index-C-Bt3bG-.js";
import { c as createLucideIcon, B as Button, I as Input, T as Textarea, X, L as Label } from "./textarea-D5l05Cbi.js";
import { P as Plus } from "./plus-BVEfGIu5.js";
import { L as Link2 } from "./link-2-BpJluLOK.js";
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
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const STEP_LABELS = ["Account", "Profile", "Workspace", "Team"];
function OnboardingProgress({
  currentStep,
  totalSteps = 4
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 mb-8", children: Array.from({ length: totalSteps }, (_, i) => {
    const step = i + 1;
    const isCompleted = step < currentStep;
    const isActive = step === currentStep;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
              isCompleted ? "bg-primary text-primary-foreground" : isActive ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : "bg-muted text-muted-foreground border border-border"
            ),
            "data-ocid": `step-indicator-${step}`,
            children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                width: "12",
                height: "12",
                viewBox: "0 0 12 12",
                fill: "none",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M2 6L5 9L10 3",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: step })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "text-[10px] font-medium whitespace-nowrap",
              isActive ? "text-primary" : isCompleted ? "text-primary/70" : "text-muted-foreground"
            ),
            children: STEP_LABELS[i]
          }
        )
      ] }),
      step < totalSteps && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "w-10 h-0.5 mb-4 transition-all duration-300",
            step < currentStep ? "bg-primary" : "bg-border"
          )
        }
      )
    ] }, step);
  }) });
}
const sizes = {
  sm: { icon: 28, text: "text-base", sub: "text-xs" },
  md: { icon: 36, text: "text-xl", sub: "text-sm" },
  lg: { icon: 48, text: "text-3xl", sub: "text-base" }
};
function WeFlowLogo({
  size = "md",
  showTagline = false,
  centered = false
}) {
  const s = sizes[size];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex flex-col items-${centered ? "center" : "start"} gap-0`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              width: s.icon,
              height: s.icon,
              viewBox: "0 0 40 40",
              fill: "none",
              role: "img",
              "aria-label": "WeFlow icon",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "rect",
                  {
                    x: "6",
                    y: "6",
                    width: "28",
                    height: "28",
                    rx: "8",
                    transform: "rotate(0 20 20)",
                    fill: "oklch(0.62 0.22 40)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M11 14 L14.5 26 L18 18 L21.5 26 L25 14",
                    stroke: "white",
                    strokeWidth: "2.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    fill: "none"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col leading-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `font-bold font-display text-foreground ${s.text} tracking-tight`,
                children: "WeFlow"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body mt-0.5", children: "by nHive" })
          ] })
        ] }),
        showTagline && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 font-body", children: "Your startup's workspace" })
      ]
    }
  );
}
function FieldGroup({
  label,
  htmlFor,
  error,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor, className: "text-sm font-medium text-foreground", children: label }),
    children,
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: error })
  ] });
}
function OrDivider() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "OR" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
  ] });
}
function Step1({
  data,
  onChange,
  errors
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold font-display text-foreground", children: "Create your account" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-border bg-card hover:bg-muted/40 transition-colors text-sm font-medium text-foreground shadow-sm",
        "data-ocid": "google-signin-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              width: "18",
              height: "18",
              viewBox: "0 0 18 18",
              role: "img",
              "aria-label": "Google logo",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M17.64 9.2a10.34 10.34 0 0 0-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91A8.78 8.78 0 0 0 17.64 9.2z",
                    fill: "#4285F4"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M9 18a8.6 8.6 0 0 0 5.96-2.18l-2.91-2.26A5.43 5.43 0 0 1 9 14.5a5.44 5.44 0 0 1-5.12-3.76H.89v2.33A9 9 0 0 0 9 18z",
                    fill: "#34A853"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M3.88 10.74A5.44 5.44 0 0 1 3.6 9a5.44 5.44 0 0 1 .28-1.74V4.93H.89A9 9 0 0 0 0 9a9 9 0 0 0 .89 4.07l2.99-2.33z",
                    fill: "#FBBC05"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M9 3.5a4.87 4.87 0 0 1 3.44 1.35l2.58-2.58A8.64 8.64 0 0 0 9 0a9 9 0 0 0-8.11 4.93l2.99 2.33A5.44 5.44 0 0 1 9 3.5z",
                    fill: "#EA4335"
                  }
                )
              ]
            }
          ),
          "Continue with Google"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OrDivider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Full Name", htmlFor: "full-name", error: errors.fullName, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        id: "full-name",
        value: data.fullName,
        onChange: (e) => onChange({ fullName: e.target.value }),
        placeholder: "Alex Johnson",
        autoFocus: true,
        "data-ocid": "account-name-input"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Email", htmlFor: "email", error: errors.email, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        id: "email",
        type: "email",
        value: data.email,
        onChange: (e) => onChange({ email: e.target.value }),
        placeholder: "alex@startup.com",
        "data-ocid": "account-email-input"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Password", htmlFor: "password", error: errors.password, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        id: "password",
        type: "password",
        value: data.password,
        onChange: (e) => onChange({ password: e.target.value }),
        placeholder: "Min. 8 characters",
        "data-ocid": "account-password-input"
      }
    ) })
  ] });
}
function Step2({
  data,
  onChange,
  errors
}) {
  const fileRef = reactExports.useRef(null);
  function handleFile(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange({ avatarPreview: url });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold font-display text-foreground", children: "Set up your profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Tell your team a bit about yourself" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = fileRef.current) == null ? void 0 : _a.click();
        },
        className: "relative w-24 h-24 rounded-full border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 transition-all flex flex-col items-center justify-center gap-1 group",
        "data-ocid": "avatar-upload-btn",
        "aria-label": "Upload profile photo",
        children: [
          data.avatarPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: data.avatarPreview,
              alt: "Avatar preview",
              className: "w-full h-full rounded-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6 text-primary/60 group-hover:text-primary transition-colors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-primary/60 group-hover:text-primary font-medium", children: "Add photo" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileRef,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: handleFile
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FieldGroup,
      {
        label: "Full Name",
        htmlFor: "profile-name",
        error: errors.fullName,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "profile-name",
            value: data.fullName,
            onChange: (e) => onChange({ fullName: e.target.value }),
            placeholder: "Alex Johnson",
            "data-ocid": "profile-name-input"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FieldGroup,
      {
        label: "Your Title",
        htmlFor: "profile-title",
        error: errors.title,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "profile-title",
            value: data.title,
            onChange: (e) => onChange({ title: e.target.value }),
            placeholder: "e.g. Co-Founder & CEO",
            "data-ocid": "profile-title-input"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Bio (optional)", htmlFor: "profile-bio", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Textarea,
      {
        id: "profile-bio",
        value: data.bio,
        onChange: (e) => onChange({ bio: e.target.value }),
        placeholder: "Tell your team what you're working on...",
        className: "resize-none h-20",
        "data-ocid": "profile-bio-input"
      }
    ) })
  ] });
}
function Step3({
  data,
  onChange,
  errors
}) {
  const fileRef = reactExports.useRef(null);
  function handleFile(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange({ logoPreview: url });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold font-display text-foreground", children: "Your startup workspace" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Set up your company's WeFlow home" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = fileRef.current) == null ? void 0 : _a.click();
        },
        className: "relative w-24 h-24 rounded-full border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 transition-all flex flex-col items-center justify-center gap-1 group",
        "data-ocid": "logo-upload-btn",
        "aria-label": "Upload workspace logo",
        children: [
          data.logoPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: data.logoPreview,
              alt: "Logo preview",
              className: "w-full h-full rounded-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-6 h-6 text-primary/60 group-hover:text-primary transition-colors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-primary/60 group-hover:text-primary font-medium", children: "Add logo" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileRef,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: handleFile
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Your Role", htmlFor: "workspace-role", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "select",
      {
        id: "workspace-role",
        value: data.workspaceRole,
        onChange: (e) => onChange({
          workspaceRole: e.target.value
        }),
        className: "w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
        "data-ocid": "workspace-role-select",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Creator", children: "Creator" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Co-creator", children: "Co-creator" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FieldGroup,
      {
        label: "Startup Name",
        htmlFor: "startup-name",
        error: errors.startupName,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "startup-name",
            value: data.startupName,
            onChange: (e) => onChange({ startupName: e.target.value }),
            placeholder: "e.g. Acme Inc., Velocity Labs",
            autoFocus: true,
            "data-ocid": "startup-name-input"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Tagline", htmlFor: "tagline", error: errors.tagline, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        id: "tagline",
        value: data.tagline,
        onChange: (e) => onChange({ tagline: e.target.value }),
        placeholder: "e.g. Building the future of work",
        "data-ocid": "tagline-input"
      }
    ) })
  ] });
}
const JOB_ROLES = [
  "Developer",
  "Designer",
  "Marketing",
  "Operations",
  "Manager"
];
const ACCESS_TYPES = ["Co-Creator", "Member", "Viewer"];
function Step4({
  invites,
  onAdd,
  onRemove
}) {
  const [form, setForm] = reactExports.useState({
    email: "",
    name: "",
    role: "Developer",
    access: "Co-Creator"
  });
  const [emailError, setEmailError] = reactExports.useState("");
  function handleAdd() {
    if (!form.email.includes("@")) {
      setEmailError("Enter a valid email address");
      return;
    }
    setEmailError("");
    onAdd({ ...form });
    setForm({ email: "", name: "", role: "Developer", access: "Co-Creator" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold font-display text-foreground", children: "Invite your team" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Add teammates to your workspace. You can skip this." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Email", htmlFor: "invite-email", error: emailError, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "invite-email",
          type: "email",
          value: form.email,
          onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
          placeholder: "teammate@company.com",
          "data-ocid": "invite-email-input"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Name", htmlFor: "invite-name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "invite-name",
          value: form.name,
          onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
          placeholder: "Full name",
          "data-ocid": "invite-name-input"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Job Role", htmlFor: "invite-role", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          id: "invite-role",
          value: form.role,
          onChange: (e) => setForm((f) => ({ ...f, role: e.target.value })),
          className: "w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
          "data-ocid": "invite-role-select",
          children: JOB_ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: r }, r))
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Access Type", htmlFor: "invite-access", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          id: "invite-access",
          value: form.access,
          onChange: (e) => setForm((f) => ({ ...f, access: e.target.value })),
          className: "w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
          "data-ocid": "invite-access-select",
          children: ACCESS_TYPES.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: a, children: a }, a))
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "flex-1 gap-2 border-primary/40 text-primary hover:bg-primary/5",
          onClick: handleAdd,
          "data-ocid": "add-invite-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
            "Add to List"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "flex-1 gap-2",
          "data-ocid": "get-invite-link-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-4 h-4" }),
            "Get Invite Link"
          ]
        }
      )
    ] }),
    invites.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 max-h-40 overflow-y-auto", children: invites.map((inv) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2.5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0", children: (inv.name || inv.email)[0].toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: inv.name || inv.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                inv.role,
                " · ",
                inv.access
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onRemove(inv.email),
              className: "text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 ml-2",
              "aria-label": `Remove ${inv.email}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ]
      },
      inv.email
    )) })
  ] });
}
function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = reactExports.useState(1);
  const [accountData, setAccountData] = reactExports.useState({
    fullName: "",
    email: "",
    password: ""
  });
  const [accountErrors, setAccountErrors] = reactExports.useState({});
  const [profileData, setProfileData] = reactExports.useState({
    fullName: "",
    title: "",
    bio: "",
    avatarPreview: null
  });
  const [profileErrors, setProfileErrors] = reactExports.useState({});
  const [workspaceData, setWorkspaceData] = reactExports.useState({
    workspaceRole: "Creator",
    startupName: "",
    tagline: "",
    logoPreview: null
  });
  const [workspaceErrors, setWorkspaceErrors] = reactExports.useState({});
  const [teamInvites, setTeamInvites] = reactExports.useState([]);
  function validateStep() {
    if (step === 1) {
      const errs = {};
      if (!accountData.fullName.trim()) errs.fullName = "Name is required";
      if (!accountData.email.includes("@")) errs.email = "Enter a valid email";
      if (accountData.password.length < 8) errs.password = "Min. 8 characters";
      setAccountErrors(errs);
      return Object.keys(errs).length === 0;
    }
    if (step === 2) {
      const errs = {};
      if (!profileData.fullName.trim()) errs.fullName = "Name is required";
      if (!profileData.title.trim()) errs.title = "Title is required";
      setProfileErrors(errs);
      return Object.keys(errs).length === 0;
    }
    if (step === 3) {
      const errs = {};
      if (!workspaceData.startupName.trim())
        errs.startupName = "Startup name is required";
      setWorkspaceErrors(errs);
      return Object.keys(errs).length === 0;
    }
    return true;
  }
  function handleContinue() {
    if (!validateStep()) return;
    if (step === 1) {
      setProfileData((p) => ({
        ...p,
        fullName: p.fullName || accountData.fullName
      }));
    }
    if (step === 3) {
      navigate({ to: "/milestones" });
      return;
    }
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      navigate({ to: "/dashboard" });
    }
  }
  function handleBack() {
    if (step > 1) setStep((s) => s - 1);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-card border-b border-border px-6 py-3.5 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WeFlowLogo, { size: "sm" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WeFlowLogo, { size: "lg", centered: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OnboardingProgress, { currentStep: step }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-8 shadow-elevated", children: [
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Step1,
          {
            data: accountData,
            onChange: (d) => setAccountData((p) => ({ ...p, ...d })),
            errors: accountErrors
          }
        ),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Step2,
          {
            data: profileData,
            onChange: (d) => setProfileData((p) => ({ ...p, ...d })),
            errors: profileErrors
          }
        ),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Step3,
          {
            data: workspaceData,
            onChange: (d) => setWorkspaceData((p) => ({ ...p, ...d })),
            errors: workspaceErrors
          }
        ),
        step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Step4,
          {
            invites: teamInvites,
            onAdd: (inv) => setTeamInvites((t) => [...t, inv]),
            onRemove: (email) => setTeamInvites((t) => t.filter((i) => i.email !== email))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex items-center mt-8 pt-6 border-t border-border",
              step === 1 ? "justify-center" : "justify-between"
            ),
            children: [
              step > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  onClick: handleBack,
                  className: "text-muted-foreground hover:text-foreground",
                  "data-ocid": "onboarding-back-btn",
                  children: "← Back"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    onClick: () => navigate({ to: "/dashboard" }),
                    className: "text-muted-foreground text-sm",
                    "data-ocid": "onboarding-skip-btn",
                    children: "Skip for now"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    onClick: handleContinue,
                    className: "bg-primary hover:bg-primary/90 text-primary-foreground px-6 gap-1.5",
                    "data-ocid": "onboarding-continue-btn",
                    children: step === 4 ? "Launch Workspace →" : step === 3 ? "Create Workspace →" : "Continue →"
                  }
                )
              ] })
            ]
          }
        )
      ] }),
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-5", children: [
        "Have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "text-primary font-medium hover:underline",
            "data-ocid": "signin-link",
            children: "Sign in"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  Onboarding as default
};
