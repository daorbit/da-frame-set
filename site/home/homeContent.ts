import {
  Bug,
  CodeXml,
  Layers,
  LayoutTemplate,
  Maximize2,
  Monitor,
  Presentation,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { DEVICE_IDS, DEVICES, type DeviceId, type DeviceSpec } from '../../src';

export const INSTALL = 'npm install da-frame-set';
export const NPM_URL = 'https://www.npmjs.com/package/da-frame-set';
export const GITHUB_URL = 'https://github.com/daorbit/da-frame-set';
export const ISSUES_URL = 'https://github.com/daorbit/da-frame-set/issues';
export const FEEDBACK_FORM_SRC = 'https://forms.daorbit.in/form/6aa79aa7eafa25640d94f63e/view';

export const SHOWCASE: DeviceId[] = ['macbook-pro-16', 'ipad-air', 'iphone-pro', 'browser'];

export const TRUST = ['React 18 & 19', 'TypeScript types', 'MIT licensed'];

export type FamilyFilter = DeviceSpec['family'] | 'all';

export const FAMILY_TABS: { id: FamilyFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'apple', label: 'Apple' },
  { id: 'android', label: 'Android' },
  { id: 'windows', label: 'Windows' },
  { id: 'generic', label: 'Generic' },
];

const ALL_SPECS = DEVICE_IDS.map((id) => DEVICES[id] as DeviceSpec);

export const STATS = [
  { value: String(DEVICE_IDS.length), label: 'Devices ready to use' },
  { value: String(new Set(ALL_SPECS.map((spec) => spec.chassis)).size), label: 'Chassis styles' },
  { value: '0', label: 'Images or fonts' },
  { value: '1', label: 'Component to learn' },
];

export interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
}

export const FEATURES: Feature[] = [
  {
    icon: Monitor,
    title: 'Real viewports',
    body: 'Widths are CSS viewports, not panel resolutions. A Pixel has a 1080px panel but lays out at 412 CSS pixels, so you see the layout the phone really gets.',
  },
  {
    icon: Maximize2,
    title: 'Scaled, not squeezed',
    body: 'The frame shrinks to fit its container; the page inside never does. The breakpoint you see is the one the real device lands in.',
  },
  {
    icon: Layers,
    title: 'No assets',
    body: 'Every chassis is gradients, shadows and border radii. A few kilobytes of CSS, with no images, sprite sheets or fonts to load.',
  },
  {
    icon: ShieldCheck,
    title: 'One source of truth',
    body: 'Bezels, radii and chrome heights come from the device spec, so the rendered frame and its measured size cannot drift apart.',
  },
];

export interface Step {
  title: string;
  body: string;
  code: string;
}

export const STEPS: Step[] = [
  {
    title: 'Install',
    body: 'One package, with React as the only peer dependency.',
    code: INSTALL,
  },
  {
    title: 'Wrap',
    body: 'Import the component and its stylesheet, then put anything on the screen.',
    code: `import { DeviceFrame } from 'da-frame-set';
import 'da-frame-set/styles.css';

<DeviceFrame device="iphone-pro" scale={0.5}>
  <YourPage />
</DeviceFrame>`,
  },
  {
    title: 'Fit',
    body: 'useFitScale measures the container and returns the scale that fits.',
    code: `const size = frameSize(getDevice(device));
const { ref, scale, measured } = useFitScale({
  contentWidth: size.width,
  contentHeight: size.height,
});`,
  },
];

export interface UseCase {
  icon: LucideIcon;
  title: string;
  body: string;
}

export const USE_CASES: UseCase[] = [
  {
    icon: LayoutTemplate,
    title: 'Landing pages',
    body: 'Show your product on the hardware your customers use, live instead of a screenshot that goes stale.',
  },
  {
    icon: CodeXml,
    title: 'Docs and demos',
    body: 'Wrap component examples in a phone or browser so readers see them in context.',
  },
  {
    icon: Bug,
    title: 'Responsive QA',
    body: 'Check a route at every real viewport side by side, without resizing a browser window.',
  },
  {
    icon: Presentation,
    title: 'Client previews',
    body: 'Frame a staging URL for reviews and pitches, so feedback is about the layout the device gets.',
  },
];

export const FAQS = [
  {
    question: 'Is da-frame-set free?',
    answer: 'Yes. It is open source under the MIT licence, for personal and commercial projects.',
  },
  {
    question: 'Does it work with Next.js, Vite and Remix?',
    answer: 'Yes. It is a plain React component and a stylesheet, so any React 18 or 19 setup that can import CSS works.',
  },
  {
    question: 'Can I frame a live website?',
    answer: 'Put an iframe on the screen. Many sites refuse to be embedded, so frame your own app or a localhost URL for reliable results.',
  },
  {
    question: 'Why does the page not shrink with the frame?',
    answer: 'That is the point. The page renders at the device’s real CSS width and the whole mock is scaled, so the breakpoint stays honest.',
  },
  {
    question: 'How heavy is it?',
    answer: 'There are no images or fonts. The chassis are drawn with a few kilobytes of CSS.',
  },
];
