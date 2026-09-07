/** The chassis drawing a device uses. Several devices share one silhouette. */
export type ChassisKind =
  | 'laptop'
  | 'monitor'
  | 'tablet'
  | 'phone'
  | 'watch'
  | 'tv'
  | 'browser';

/** Where a device's front camera sits, and what shape it is. */
export type CameraKind =
  /** A wide cutout the display wraps around (MacBook, iPhone notch era). */
  | 'notch'
  /** A pill floating over the page (iPhone Dynamic Island). */
  | 'island'
  /** A small circle in the bezel (iPad, Surface). */
  | 'dot'
  /** A circle punched through the display itself (Pixel, Galaxy). */
  | 'punch-hole'
  | 'none';

/**
 * The window chrome a browser chassis draws. Only the title-bar controls and
 * the tab shape differ; the address bar is common to all of them.
 */
export type BrowserChrome = 'mac' | 'windows';

/** The finish a chassis is drawn in. */
export type Material =
  /** Cool silver-grey, the default. */
  | 'aluminium'
  /** Lighter and harder-edged, for phone bands. */
  | 'titanium'
  /** Near-black, for TVs and darker phones. */
  | 'graphite';

export interface DeviceSpec {
  /** Stable id used as the `device` prop and in CSS class names. */
  id: string;
  /** Shown in a device picker. */
  label: string;
  /** Family the device belongs to, for grouping a picker. */
  family: 'apple' | 'android' | 'windows' | 'generic';
  /** Silhouette to draw. */
  chassis: ChassisKind;
  /**
   * The device's real CSS viewport — what the page inside actually reflows
   * against. Not its physical pixel count: a phone with a 1179px-wide panel
   * still lays out at 393 CSS pixels.
   */
  width: number;
  height: number;
  /** Chassis thickness around the screen, on every side. */
  bezel: number;
  /** Extra chassis below the screen — a laptop's base, a monitor's stand. */
  chromeBelow: number;
  /** Extra chassis above the screen — the strip a notch or dot sits in. */
  chromeAbove: number;
  /** How far the chassis sticks out past the screen on each side. */
  overhang: number;
  /** Corner radius of the screen itself. */
  screenRadius: number;
  /** Corner radius of the outer chassis. */
  chassisRadius: number;
  camera: CameraKind;
  /** Chassis finish. Defaults to the one that suits the chassis kind. */
  material?: Material;
  /** Draws the side buttons a phone has. */
  sideButtons?: boolean;
  /** Draws the home indicator bar over the bottom of a phone screen. */
  homeIndicator?: boolean;
  /** Draws the camera bump on the back edge, visible past the chassis. */
  cameraBump?: boolean;
  /** Draws speaker grilles either side of a laptop keyboard, or under a TV. */
  speakers?: boolean;
  /** Which window controls a browser chassis draws. */
  browserChrome?: BrowserChrome;
  /** Draws the digital crown and side button of a watch. */
  crown?: boolean;
  /** A tall, narrow screen the page can be scrolled in — foldables, unfolded. */
  foldSeam?: boolean;
}

/**
 * Outer size of the whole mock, chassis included — what a fit-to-container
 * scale measures against.
 *
 * These have to agree with the stylesheet exactly: any space the CSS adds and
 * this does not becomes dead margin once the frame is centered.
 */
export function frameSize(spec: DeviceSpec): { width: number; height: number } {
  return {
    width: spec.width + spec.bezel * 2 + spec.overhang * 2,
    height: spec.height + spec.bezel * 2 + spec.chromeAbove + spec.chromeBelow,
  };
}
