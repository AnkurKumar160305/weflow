import { c as createLucideIcon } from "./textarea-D5l05Cbi.js";
import { j as jsxRuntimeExports, c as cn } from "./index-C-Bt3bG-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const DEPT_COLORS = {
  orange: {
    bg: "bg-orange-500/10 dark:bg-orange-400/15",
    text: "text-orange-700 dark:text-orange-300",
    dot: "bg-orange-500 dark:bg-orange-400"
  },
  blue: {
    bg: "bg-blue-500/10 dark:bg-blue-400/15",
    text: "text-blue-700 dark:text-blue-300",
    dot: "bg-blue-500 dark:bg-blue-400"
  },
  green: {
    bg: "bg-green-500/10 dark:bg-green-400/15",
    text: "text-green-700 dark:text-green-300",
    dot: "bg-green-500 dark:bg-green-400"
  },
  purple: {
    bg: "bg-purple-500/10 dark:bg-purple-400/15",
    text: "text-purple-700 dark:text-purple-300",
    dot: "bg-purple-500 dark:bg-purple-400"
  },
  pink: {
    bg: "bg-pink-500/10 dark:bg-pink-400/15",
    text: "text-pink-700 dark:text-pink-300",
    dot: "bg-pink-500 dark:bg-pink-400"
  },
  teal: {
    bg: "bg-teal-500/10 dark:bg-teal-400/15",
    text: "text-teal-700 dark:text-teal-300",
    dot: "bg-teal-500 dark:bg-teal-400"
  },
  red: {
    bg: "bg-red-500/10 dark:bg-red-400/15",
    text: "text-red-700 dark:text-red-300",
    dot: "bg-red-500 dark:bg-red-400"
  },
  yellow: {
    bg: "bg-yellow-500/10 dark:bg-yellow-400/15",
    text: "text-yellow-700 dark:text-yellow-300",
    dot: "bg-yellow-500 dark:bg-yellow-400"
  }
};
const DEPARTMENTS = [
  {
    id: "engineering",
    name: "Engineering",
    color: "blue",
    abbreviation: "ENG"
  },
  { id: "design", name: "Design", color: "purple", abbreviation: "DES" },
  { id: "product", name: "Product", color: "orange", abbreviation: "PRD" },
  { id: "marketing", name: "Marketing", color: "pink", abbreviation: "MKT" },
  { id: "data", name: "Data", color: "teal", abbreviation: "DAT" },
  { id: "ops", name: "Operations", color: "green", abbreviation: "OPS" }
];
function DeptTag({
  departmentId,
  showLabel = true,
  size = "sm",
  className
}) {
  const dept = DEPARTMENTS.find((d) => d.id === departmentId);
  if (!dept) return null;
  const colors = DEPT_COLORS[dept.color];
  if (!showLabel) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: cn(
          "rounded-full flex-shrink-0",
          size === "sm" ? "w-2 h-2" : "w-3 h-3",
          colors.dot,
          className
        ),
        title: dept.name,
        "aria-label": dept.name
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm",
        colors.bg,
        colors.text,
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "rounded-full flex-shrink-0",
              size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2",
              colors.dot
            )
          }
        ),
        dept.abbreviation
      ]
    }
  );
}
export {
  DEPARTMENTS as D,
  TrendingUp as T,
  DeptTag as a
};
