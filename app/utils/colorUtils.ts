// 색상 목록 정의
export const COLOR_NAMES = [
  "blue", "red", "green", "yellow", "purple", "pink", "indigo", "teal",
  "orange", "gray", "cyan", "emerald", "violet", "fuchsia", "rose",
  "amber", "lime", "sky"
] as const;

export type ColorName = typeof COLOR_NAMES[number];

// 모든 색상에 대한 클래스를 명시적으로 정의 (Tailwind가 스캔할 수 있도록)
const colorClassMaps = {
  radio: {
    blue: { hoverBorder: "hover:border-blue-500 dark:hover:border-blue-500", indicatorBg: "bg-blue-500 dark:bg-blue-600" },
    red: { hoverBorder: "hover:border-red-500 dark:hover:border-red-500", indicatorBg: "bg-red-500 dark:bg-red-600" },
    green: { hoverBorder: "hover:border-green-500 dark:hover:border-green-500", indicatorBg: "bg-green-500 dark:bg-green-600" },
    yellow: { hoverBorder: "hover:border-yellow-500 dark:hover:border-yellow-500", indicatorBg: "bg-yellow-500 dark:bg-yellow-600" },
    purple: { hoverBorder: "hover:border-purple-500 dark:hover:border-purple-500", indicatorBg: "bg-purple-500 dark:bg-purple-600" },
    pink: { hoverBorder: "hover:border-pink-500 dark:hover:border-pink-500", indicatorBg: "bg-pink-500 dark:bg-pink-600" },
    indigo: { hoverBorder: "hover:border-indigo-500 dark:hover:border-indigo-500", indicatorBg: "bg-indigo-500 dark:bg-indigo-600" },
    teal: { hoverBorder: "hover:border-teal-500 dark:hover:border-teal-500", indicatorBg: "bg-teal-500 dark:bg-teal-600" },
    orange: { hoverBorder: "hover:border-orange-500 dark:hover:border-orange-500", indicatorBg: "bg-orange-500 dark:bg-orange-600" },
    gray: { hoverBorder: "hover:border-gray-500 dark:hover:border-gray-500", indicatorBg: "bg-gray-500 dark:bg-gray-600" },
    cyan: { hoverBorder: "hover:border-cyan-500 dark:hover:border-cyan-500", indicatorBg: "bg-cyan-500 dark:bg-cyan-600" },
    emerald: { hoverBorder: "hover:border-emerald-500 dark:hover:border-emerald-500", indicatorBg: "bg-emerald-500 dark:bg-emerald-600" },
    violet: { hoverBorder: "hover:border-violet-500 dark:hover:border-violet-500", indicatorBg: "bg-violet-500 dark:bg-violet-600" },
    fuchsia: { hoverBorder: "hover:border-fuchsia-500 dark:hover:border-fuchsia-500", indicatorBg: "bg-fuchsia-500 dark:bg-fuchsia-600" },
    rose: { hoverBorder: "hover:border-rose-500 dark:hover:border-rose-500", indicatorBg: "bg-rose-500 dark:bg-rose-600" },
    amber: { hoverBorder: "hover:border-amber-500 dark:hover:border-amber-500", indicatorBg: "bg-amber-500 dark:bg-amber-600" },
    lime: { hoverBorder: "hover:border-lime-500 dark:hover:border-lime-500", indicatorBg: "bg-lime-500 dark:bg-lime-600" },
    sky: { hoverBorder: "hover:border-sky-500 dark:hover:border-sky-500", indicatorBg: "bg-sky-500 dark:bg-sky-600" },
  },
  checkbox: {
    blue: { checkedBorder: "border-blue-500 dark:border-blue-600", indicatorText: "text-blue-500 dark:text-blue-400" },
    red: { checkedBorder: "border-red-500 dark:border-red-600", indicatorText: "text-red-500 dark:text-red-400" },
    green: { checkedBorder: "border-green-500 dark:border-green-600", indicatorText: "text-green-500 dark:text-green-400" },
    yellow: { checkedBorder: "border-yellow-500 dark:border-yellow-600", indicatorText: "text-yellow-500 dark:text-yellow-400" },
    purple: { checkedBorder: "border-purple-500 dark:border-purple-600", indicatorText: "text-purple-500 dark:text-purple-400" },
    pink: { checkedBorder: "border-pink-500 dark:border-pink-600", indicatorText: "text-pink-500 dark:text-pink-400" },
    indigo: { checkedBorder: "border-indigo-500 dark:border-indigo-600", indicatorText: "text-indigo-500 dark:text-indigo-400" },
    teal: { checkedBorder: "border-teal-500 dark:border-teal-600", indicatorText: "text-teal-500 dark:text-teal-400" },
    orange: { checkedBorder: "border-orange-500 dark:border-orange-600", indicatorText: "text-orange-500 dark:text-orange-400" },
    gray: { checkedBorder: "border-gray-500 dark:border-gray-600", indicatorText: "text-gray-500 dark:text-gray-400" },
    cyan: { checkedBorder: "border-cyan-500 dark:border-cyan-600", indicatorText: "text-cyan-500 dark:text-cyan-400" },
    emerald: { checkedBorder: "border-emerald-500 dark:border-emerald-600", indicatorText: "text-emerald-500 dark:text-emerald-400" },
    violet: { checkedBorder: "border-violet-500 dark:border-violet-600", indicatorText: "text-violet-500 dark:text-violet-400" },
    fuchsia: { checkedBorder: "border-fuchsia-500 dark:border-fuchsia-600", indicatorText: "text-fuchsia-500 dark:text-fuchsia-400" },
    rose: { checkedBorder: "border-rose-500 dark:border-rose-600", indicatorText: "text-rose-500 dark:text-rose-400" },
    amber: { checkedBorder: "border-amber-500 dark:border-amber-600", indicatorText: "text-amber-500 dark:text-amber-400" },
    lime: { checkedBorder: "border-lime-500 dark:border-lime-600", indicatorText: "text-lime-500 dark:text-lime-400" },
    sky: { checkedBorder: "border-sky-500 dark:border-sky-600", indicatorText: "text-sky-500 dark:text-sky-400" },
  },
  radioCard: {
    blue: { cardBorder: "border-blue-500 dark:border-blue-600", cardBg: "bg-blue-50 dark:bg-blue-900/20", indicatorBg: "bg-blue-500 dark:bg-blue-600", text: "text-blue-900 dark:text-blue-100" },
    red: { cardBorder: "border-red-500 dark:border-red-600", cardBg: "bg-red-50 dark:bg-red-900/20", indicatorBg: "bg-red-500 dark:bg-red-600", text: "text-red-900 dark:text-red-100" },
    green: { cardBorder: "border-green-500 dark:border-green-600", cardBg: "bg-green-50 dark:bg-green-900/20", indicatorBg: "bg-green-500 dark:bg-green-600", text: "text-green-900 dark:text-green-100" },
    yellow: { cardBorder: "border-yellow-500 dark:border-yellow-600", cardBg: "bg-yellow-50 dark:bg-yellow-900/20", indicatorBg: "bg-yellow-500 dark:bg-yellow-600", text: "text-yellow-900 dark:text-yellow-100" },
    purple: { cardBorder: "border-purple-500 dark:border-purple-600", cardBg: "bg-purple-50 dark:bg-purple-900/20", indicatorBg: "bg-purple-500 dark:bg-purple-600", text: "text-purple-900 dark:text-purple-100" },
    pink: { cardBorder: "border-pink-500 dark:border-pink-600", cardBg: "bg-pink-50 dark:bg-pink-900/20", indicatorBg: "bg-pink-500 dark:bg-pink-600", text: "text-pink-900 dark:text-pink-100" },
    indigo: { cardBorder: "border-indigo-500 dark:border-indigo-600", cardBg: "bg-indigo-50 dark:bg-indigo-900/20", indicatorBg: "bg-indigo-500 dark:bg-indigo-600", text: "text-indigo-900 dark:text-indigo-100" },
    teal: { cardBorder: "border-teal-500 dark:border-teal-600", cardBg: "bg-teal-50 dark:bg-teal-900/20", indicatorBg: "bg-teal-500 dark:bg-teal-600", text: "text-teal-900 dark:text-teal-100" },
    orange: { cardBorder: "border-orange-500 dark:border-orange-600", cardBg: "bg-orange-50 dark:bg-orange-900/20", indicatorBg: "bg-orange-500 dark:bg-orange-600", text: "text-orange-900 dark:text-orange-100" },
    gray: { cardBorder: "border-gray-500 dark:border-gray-600", cardBg: "bg-gray-50 dark:bg-gray-900/20", indicatorBg: "bg-gray-500 dark:bg-gray-600", text: "text-gray-900 dark:text-gray-100" },
    cyan: { cardBorder: "border-cyan-500 dark:border-cyan-600", cardBg: "bg-cyan-50 dark:bg-cyan-900/20", indicatorBg: "bg-cyan-500 dark:bg-cyan-600", text: "text-cyan-900 dark:text-cyan-100" },
    emerald: { cardBorder: "border-emerald-500 dark:border-emerald-600", cardBg: "bg-emerald-50 dark:bg-emerald-900/20", indicatorBg: "bg-emerald-500 dark:bg-emerald-600", text: "text-emerald-900 dark:text-emerald-100" },
    violet: { cardBorder: "border-violet-500 dark:border-violet-600", cardBg: "bg-violet-50 dark:bg-violet-900/20", indicatorBg: "bg-violet-500 dark:bg-violet-600", text: "text-violet-900 dark:text-violet-100" },
    fuchsia: { cardBorder: "border-fuchsia-500 dark:border-fuchsia-600", cardBg: "bg-fuchsia-50 dark:bg-fuchsia-900/20", indicatorBg: "bg-fuchsia-500 dark:bg-fuchsia-600", text: "text-fuchsia-900 dark:text-fuchsia-100" },
    rose: { cardBorder: "border-rose-500 dark:border-rose-600", cardBg: "bg-rose-50 dark:bg-rose-900/20", indicatorBg: "bg-rose-500 dark:bg-rose-600", text: "text-rose-900 dark:text-rose-100" },
    amber: { cardBorder: "border-amber-500 dark:border-amber-600", cardBg: "bg-amber-50 dark:bg-amber-900/20", indicatorBg: "bg-amber-500 dark:bg-amber-600", text: "text-amber-900 dark:text-amber-100" },
    lime: { cardBorder: "border-lime-500 dark:border-lime-600", cardBg: "bg-lime-50 dark:bg-lime-900/20", indicatorBg: "bg-lime-500 dark:bg-lime-600", text: "text-lime-900 dark:text-lime-100" },
    sky: { cardBorder: "border-sky-500 dark:border-sky-600", cardBg: "bg-sky-50 dark:bg-sky-900/20", indicatorBg: "bg-sky-500 dark:bg-sky-600", text: "text-sky-900 dark:text-sky-100" },
  },
  checkboxCard: {
    blue: { cardBorder: "border-blue-500 dark:border-blue-600", cardBg: "bg-blue-50 dark:bg-blue-900/20", checkboxCheckedBg: "data-[state=checked]:bg-blue-500", checkboxCheckedBorder: "border-blue-500 dark:border-blue-600", checkboxIndicatorText: "text-blue-500 dark:text-blue-400", text: "text-blue-900 dark:text-blue-100" },
    red: { cardBorder: "border-red-500 dark:border-red-600", cardBg: "bg-red-50 dark:bg-red-900/20", checkboxCheckedBg: "data-[state=checked]:bg-red-500", checkboxCheckedBorder: "border-red-500 dark:border-red-600", checkboxIndicatorText: "text-red-500 dark:text-red-400", text: "text-red-900 dark:text-red-100" },
    green: { cardBorder: "border-green-500 dark:border-green-600", cardBg: "bg-green-50 dark:bg-green-900/20", checkboxCheckedBg: "data-[state=checked]:bg-green-500", checkboxCheckedBorder: "border-green-500 dark:border-green-600", checkboxIndicatorText: "text-green-500 dark:text-green-400", text: "text-green-900 dark:text-green-100" },
    yellow: { cardBorder: "border-yellow-500 dark:border-yellow-600", cardBg: "bg-yellow-50 dark:bg-yellow-900/20", checkboxCheckedBg: "data-[state=checked]:bg-yellow-500", checkboxCheckedBorder: "border-yellow-500 dark:border-yellow-600", checkboxIndicatorText: "text-yellow-500 dark:text-yellow-400", text: "text-yellow-900 dark:text-yellow-100" },
    purple: { cardBorder: "border-purple-500 dark:border-purple-600", cardBg: "bg-purple-50 dark:bg-purple-900/20", checkboxCheckedBg: "data-[state=checked]:bg-purple-500", checkboxCheckedBorder: "border-purple-500 dark:border-purple-600", checkboxIndicatorText: "text-purple-500 dark:text-purple-400", text: "text-purple-900 dark:text-purple-100" },
    pink: { cardBorder: "border-pink-500 dark:border-pink-600", cardBg: "bg-pink-50 dark:bg-pink-900/20", checkboxCheckedBg: "data-[state=checked]:bg-pink-500", checkboxCheckedBorder: "border-pink-500 dark:border-pink-600", checkboxIndicatorText: "text-pink-500 dark:text-pink-400", text: "text-pink-900 dark:text-pink-100" },
    indigo: { cardBorder: "border-indigo-500 dark:border-indigo-600", cardBg: "bg-indigo-50 dark:bg-indigo-900/20", checkboxCheckedBg: "data-[state=checked]:bg-indigo-500", checkboxCheckedBorder: "border-indigo-500 dark:border-indigo-600", checkboxIndicatorText: "text-indigo-500 dark:text-indigo-400", text: "text-indigo-900 dark:text-indigo-100" },
    teal: { cardBorder: "border-teal-500 dark:border-teal-600", cardBg: "bg-teal-50 dark:bg-teal-900/20", checkboxCheckedBg: "data-[state=checked]:bg-teal-500", checkboxCheckedBorder: "border-teal-500 dark:border-teal-600", checkboxIndicatorText: "text-teal-500 dark:text-teal-400", text: "text-teal-900 dark:text-teal-100" },
    orange: { cardBorder: "border-orange-500 dark:border-orange-600", cardBg: "bg-orange-50 dark:bg-orange-900/20", checkboxCheckedBg: "data-[state=checked]:bg-orange-500", checkboxCheckedBorder: "border-orange-500 dark:border-orange-600", checkboxIndicatorText: "text-orange-500 dark:text-orange-400", text: "text-orange-900 dark:text-orange-100" },
    gray: { cardBorder: "border-gray-500 dark:border-gray-600", cardBg: "bg-gray-50 dark:bg-gray-900/20", checkboxCheckedBg: "data-[state=checked]:bg-gray-500", checkboxCheckedBorder: "border-gray-500 dark:border-gray-600", checkboxIndicatorText: "text-gray-500 dark:text-gray-400", text: "text-gray-900 dark:text-gray-100" },
    cyan: { cardBorder: "border-cyan-500 dark:border-cyan-600", cardBg: "bg-cyan-50 dark:bg-cyan-900/20", checkboxCheckedBg: "data-[state=checked]:bg-cyan-500", checkboxCheckedBorder: "border-cyan-500 dark:border-cyan-600", checkboxIndicatorText: "text-cyan-500 dark:text-cyan-400", text: "text-cyan-900 dark:text-cyan-100" },
    emerald: { cardBorder: "border-emerald-500 dark:border-emerald-600", cardBg: "bg-emerald-50 dark:bg-emerald-900/20", checkboxCheckedBg: "data-[state=checked]:bg-emerald-500", checkboxCheckedBorder: "border-emerald-500 dark:border-emerald-600", checkboxIndicatorText: "text-emerald-500 dark:text-emerald-400", text: "text-emerald-900 dark:text-emerald-100" },
    violet: { cardBorder: "border-violet-500 dark:border-violet-600", cardBg: "bg-violet-50 dark:bg-violet-900/20", checkboxCheckedBg: "data-[state=checked]:bg-violet-500", checkboxCheckedBorder: "border-violet-500 dark:border-violet-600", checkboxIndicatorText: "text-violet-500 dark:text-violet-400", text: "text-violet-900 dark:text-violet-100" },
    fuchsia: { cardBorder: "border-fuchsia-500 dark:border-fuchsia-600", cardBg: "bg-fuchsia-50 dark:bg-fuchsia-900/20", checkboxCheckedBg: "data-[state=checked]:bg-fuchsia-500", checkboxCheckedBorder: "border-fuchsia-500 dark:border-fuchsia-600", checkboxIndicatorText: "text-fuchsia-500 dark:text-fuchsia-400", text: "text-fuchsia-900 dark:text-fuchsia-100" },
    rose: { cardBorder: "border-rose-500 dark:border-rose-600", cardBg: "bg-rose-50 dark:bg-rose-900/20", checkboxCheckedBg: "data-[state=checked]:bg-rose-500", checkboxCheckedBorder: "border-rose-500 dark:border-rose-600", checkboxIndicatorText: "text-rose-500 dark:text-rose-400", text: "text-rose-900 dark:text-rose-100" },
    amber: { cardBorder: "border-amber-500 dark:border-amber-600", cardBg: "bg-amber-50 dark:bg-amber-900/20", checkboxCheckedBg: "data-[state=checked]:bg-amber-500", checkboxCheckedBorder: "border-amber-500 dark:border-amber-600", checkboxIndicatorText: "text-amber-500 dark:text-amber-400", text: "text-amber-900 dark:text-amber-100" },
    lime: { cardBorder: "border-lime-500 dark:border-lime-600", cardBg: "bg-lime-50 dark:bg-lime-900/20", checkboxCheckedBg: "data-[state=checked]:bg-lime-500", checkboxCheckedBorder: "border-lime-500 dark:border-lime-600", checkboxIndicatorText: "text-lime-500 dark:text-lime-400", text: "text-lime-900 dark:text-lime-100" },
    sky: { cardBorder: "border-sky-500 dark:border-sky-600", cardBg: "bg-sky-50 dark:bg-sky-900/20", checkboxCheckedBg: "data-[state=checked]:bg-sky-500", checkboxCheckedBorder: "border-sky-500 dark:border-sky-600", checkboxIndicatorText: "text-sky-500 dark:text-sky-400", text: "text-sky-900 dark:text-sky-100" },
  },
  toggleGroup: {
    blue: { onBg: "data-[state=on]:bg-blue-500 dark:data-[state=on]:bg-blue-600" },
    red: { onBg: "data-[state=on]:bg-red-500 dark:data-[state=on]:bg-red-600" },
    green: { onBg: "data-[state=on]:bg-green-500 dark:data-[state=on]:bg-green-600" },
    yellow: { onBg: "data-[state=on]:bg-yellow-500 dark:data-[state=on]:bg-yellow-600" },
    purple: { onBg: "data-[state=on]:bg-purple-500 dark:data-[state=on]:bg-purple-600" },
    pink: { onBg: "data-[state=on]:bg-pink-500 dark:data-[state=on]:bg-pink-600" },
    indigo: { onBg: "data-[state=on]:bg-indigo-500 dark:data-[state=on]:bg-indigo-600" },
    teal: { onBg: "data-[state=on]:bg-teal-500 dark:data-[state=on]:bg-teal-600" },
    orange: { onBg: "data-[state=on]:bg-orange-500 dark:data-[state=on]:bg-orange-600" },
    gray: { onBg: "data-[state=on]:bg-gray-500 dark:data-[state=on]:bg-gray-600" },
    cyan: { onBg: "data-[state=on]:bg-cyan-500 dark:data-[state=on]:bg-cyan-600" },
    emerald: { onBg: "data-[state=on]:bg-emerald-500 dark:data-[state=on]:bg-emerald-600" },
    violet: { onBg: "data-[state=on]:bg-violet-500 dark:data-[state=on]:bg-violet-600" },
    fuchsia: { onBg: "data-[state=on]:bg-fuchsia-500 dark:data-[state=on]:bg-fuchsia-600" },
    rose: { onBg: "data-[state=on]:bg-rose-500 dark:data-[state=on]:bg-rose-600" },
    amber: { onBg: "data-[state=on]:bg-amber-500 dark:data-[state=on]:bg-amber-600" },
    lime: { onBg: "data-[state=on]:bg-lime-500 dark:data-[state=on]:bg-lime-600" },
    sky: { onBg: "data-[state=on]:bg-sky-500 dark:data-[state=on]:bg-sky-600" },
  },
  tabs: {
    blue: { activeBorder: "data-[state=active]:border-blue-500 dark:data-[state=active]:border-blue-600", activeText: "data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400", activeBg: "data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20" },
    red: { activeBorder: "data-[state=active]:border-red-500 dark:data-[state=active]:border-red-600", activeText: "data-[state=active]:text-red-600 dark:data-[state=active]:text-red-400", activeBg: "data-[state=active]:bg-red-50 dark:data-[state=active]:bg-red-900/20" },
    green: { activeBorder: "data-[state=active]:border-green-500 dark:data-[state=active]:border-green-600", activeText: "data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400", activeBg: "data-[state=active]:bg-green-50 dark:data-[state=active]:bg-green-900/20" },
    yellow: { activeBorder: "data-[state=active]:border-yellow-500 dark:data-[state=active]:border-yellow-600", activeText: "data-[state=active]:text-yellow-600 dark:data-[state=active]:text-yellow-400", activeBg: "data-[state=active]:bg-yellow-50 dark:data-[state=active]:bg-yellow-900/20" },
    purple: { activeBorder: "data-[state=active]:border-purple-500 dark:data-[state=active]:border-purple-600", activeText: "data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400", activeBg: "data-[state=active]:bg-purple-50 dark:data-[state=active]:bg-purple-900/20" },
    pink: { activeBorder: "data-[state=active]:border-pink-500 dark:data-[state=active]:border-pink-600", activeText: "data-[state=active]:text-pink-600 dark:data-[state=active]:text-pink-400", activeBg: "data-[state=active]:bg-pink-50 dark:data-[state=active]:bg-pink-900/20" },
    indigo: { activeBorder: "data-[state=active]:border-indigo-500 dark:data-[state=active]:border-indigo-600", activeText: "data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400", activeBg: "data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/20" },
    teal: { activeBorder: "data-[state=active]:border-teal-500 dark:data-[state=active]:border-teal-600", activeText: "data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400", activeBg: "data-[state=active]:bg-teal-50 dark:data-[state=active]:bg-teal-900/20" },
    orange: { activeBorder: "data-[state=active]:border-orange-500 dark:data-[state=active]:border-orange-600", activeText: "data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-400", activeBg: "data-[state=active]:bg-orange-50 dark:data-[state=active]:bg-orange-900/20" },
    gray: { activeBorder: "data-[state=active]:border-gray-500 dark:data-[state=active]:border-gray-600", activeText: "data-[state=active]:text-gray-600 dark:data-[state=active]:text-gray-400", activeBg: "data-[state=active]:bg-gray-50 dark:data-[state=active]:bg-gray-900/20" },
    cyan: { activeBorder: "data-[state=active]:border-cyan-500 dark:data-[state=active]:border-cyan-600", activeText: "data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-400", activeBg: "data-[state=active]:bg-cyan-50 dark:data-[state=active]:bg-cyan-900/20" },
    emerald: { activeBorder: "data-[state=active]:border-emerald-500 dark:data-[state=active]:border-emerald-600", activeText: "data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400", activeBg: "data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20" },
    violet: { activeBorder: "data-[state=active]:border-violet-500 dark:data-[state=active]:border-violet-600", activeText: "data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400", activeBg: "data-[state=active]:bg-violet-50 dark:data-[state=active]:bg-violet-900/20" },
    fuchsia: { activeBorder: "data-[state=active]:border-fuchsia-500 dark:data-[state=active]:border-fuchsia-600", activeText: "data-[state=active]:text-fuchsia-600 dark:data-[state=active]:text-fuchsia-400", activeBg: "data-[state=active]:bg-fuchsia-50 dark:data-[state=active]:bg-fuchsia-900/20" },
    rose: { activeBorder: "data-[state=active]:border-rose-500 dark:data-[state=active]:border-rose-600", activeText: "data-[state=active]:text-rose-600 dark:data-[state=active]:text-rose-400", activeBg: "data-[state=active]:bg-rose-50 dark:data-[state=active]:bg-rose-900/20" },
    amber: { activeBorder: "data-[state=active]:border-amber-500 dark:data-[state=active]:border-amber-600", activeText: "data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400", activeBg: "data-[state=active]:bg-amber-50 dark:data-[state=active]:bg-amber-900/20" },
    lime: { activeBorder: "data-[state=active]:border-lime-500 dark:data-[state=active]:border-lime-600", activeText: "data-[state=active]:text-lime-600 dark:data-[state=active]:text-lime-400", activeBg: "data-[state=active]:bg-lime-50 dark:data-[state=active]:bg-lime-900/20" },
    sky: { activeBorder: "data-[state=active]:border-sky-500 dark:data-[state=active]:border-sky-600", activeText: "data-[state=active]:text-sky-600 dark:data-[state=active]:text-sky-400", activeBg: "data-[state=active]:bg-sky-50 dark:data-[state=active]:bg-sky-900/20" },
  },
  switch: {
    blue: { checkedBg: "data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-600" },
    red: { checkedBg: "data-[state=checked]:bg-red-500 dark:data-[state=checked]:bg-red-600" },
    green: { checkedBg: "data-[state=checked]:bg-green-500 dark:data-[state=checked]:bg-green-600" },
    yellow: { checkedBg: "data-[state=checked]:bg-yellow-500 dark:data-[state=checked]:bg-yellow-600" },
    purple: { checkedBg: "data-[state=checked]:bg-purple-500 dark:data-[state=checked]:bg-purple-600" },
    pink: { checkedBg: "data-[state=checked]:bg-pink-500 dark:data-[state=checked]:bg-pink-600" },
    indigo: { checkedBg: "data-[state=checked]:bg-indigo-500 dark:data-[state=checked]:bg-indigo-600" },
    teal: { checkedBg: "data-[state=checked]:bg-teal-500 dark:data-[state=checked]:bg-teal-600" },
    orange: { checkedBg: "data-[state=checked]:bg-orange-500 dark:data-[state=checked]:bg-orange-600" },
    gray: { checkedBg: "data-[state=checked]:bg-gray-500 dark:data-[state=checked]:bg-gray-600" },
    cyan: { checkedBg: "data-[state=checked]:bg-cyan-500 dark:data-[state=checked]:bg-cyan-600" },
    emerald: { checkedBg: "data-[state=checked]:bg-emerald-500 dark:data-[state=checked]:bg-emerald-600" },
    violet: { checkedBg: "data-[state=checked]:bg-violet-500 dark:data-[state=checked]:bg-violet-600" },
    fuchsia: { checkedBg: "data-[state=checked]:bg-fuchsia-500 dark:data-[state=checked]:bg-fuchsia-600" },
    rose: { checkedBg: "data-[state=checked]:bg-rose-500 dark:data-[state=checked]:bg-rose-600" },
    amber: { checkedBg: "data-[state=checked]:bg-amber-500 dark:data-[state=checked]:bg-amber-600" },
    lime: { checkedBg: "data-[state=checked]:bg-lime-500 dark:data-[state=checked]:bg-lime-600" },
    sky: { checkedBg: "data-[state=checked]:bg-sky-500 dark:data-[state=checked]:bg-sky-600" },
  },
} as const;

// 범용 색상 클래스 생성 함수
export const getColorClasses = (
  color: string,
  type: "radio" | "checkbox" | "radioCard" | "checkboxCard" | "toggleGroup" | "tabs" | "switch"
): Record<string, string> => {
  const validColor = (COLOR_NAMES.includes(color as ColorName) ? color : "blue") as ColorName;
  const colorMap = colorClassMaps[type];
  return colorMap[validColor] || colorMap.blue;
};

// 기존 함수 호환성을 위한 래퍼 함수들
export const getRadioColorClasses = (color: string) => getColorClasses(color, "radio");
export const getCheckboxColorClasses = (color: string) => getColorClasses(color, "checkbox");
export const getRadioCardColorClasses = (color: string) => getColorClasses(color, "radioCard");
export const getCheckboxCardColorClasses = (color: string) => getColorClasses(color, "checkboxCard");
export const getToggleGroupColorClasses = (color: string) => getColorClasses(color, "toggleGroup");
export const getTabsColorClasses = (color: string) => getColorClasses(color, "tabs");
export const getSwitchColorClasses = (color: string) => getColorClasses(color, "switch");

// Focus 클래스 생성 함수들
export const getSelectFocusClasses = (baseColor: string) => {
  const validColor = COLOR_NAMES.includes(baseColor as ColorName) ? baseColor : "blue";
  return `focus:outline-none focus:ring-2 focus:ring-${validColor}-500 focus:border-transparent`;
};

export const getAutocompleteFocusClasses = (baseColor: string) => {
  const validColor = COLOR_NAMES.includes(baseColor as ColorName) ? baseColor : "blue";
  return `focus-within:outline-none focus-within:ring-2 focus-within:ring-${validColor}-500 focus-within:border-transparent`;
};

