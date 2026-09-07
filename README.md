# da-frame-set

Device frames for React. Laptops, phones, tablets, monitors and browser chrome, drawn entirely in CSS — no images, no sprites.

Built for previews: the page renders at the device's **real CSS viewport** and the whole frame is then scaled to fit its container. Scaling rather than narrowing is the point — a 402px-wide phone layout stays a phone layout at any size, so the preview shows the breakpoint the real device would land in.

## Install

```sh
npm install da-frame-set
```

## Use

```tsx
import { DeviceFrame } from 'da-frame-set';
import 'da-frame-set/styles.css';

<DeviceFrame device="iphone-pro" scale={0.5}>
  <YourPage />
</DeviceFrame>;
```

### Fitting a container

`useFitScale` measures an element and returns the largest scale at which the frame fits inside it, capped at 1:1 — content is shrunk to fit but never blown up.

```tsx
import { DeviceFrame, frameSize, getDevice, useFitScale } from 'da-frame-set';

function Preview({ device, children }) {
  const size = frameSize(getDevice(device));
  const { ref, scale, measured } = useFitScale({
    contentWidth: size.width,
    contentHeight: size.height,
    padding: { x: 24, y: 24 },
  });

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <DeviceFrame device={device} scale={scale} hidden={!measured}>
        {children}
      </DeviceFrame>
    </div>
  );
}
```

`hidden` keeps the frame laid out but unpainted until the fit has been measured — without it the mock appears once at full size and overflows its container.

It returns a **callback ref**, deliberately: these previews often live in modals or panels that render nothing until they open. With an object ref the measuring effect runs while the ref is still empty and never runs again, leaving the frame unmeasured forever.

## Devices

| Family | Devices |
| --- | --- |
| Apple | `macbook-air`, `macbook-pro-16`, `imac`, `ipad-pro`, `ipad-air`, `ipad-mini`, `iphone-pro`, `iphone`, `iphone-se` |
| Android | `pixel-pro`, `pixel`, `galaxy-ultra`, `galaxy`, `galaxy-tab` |
| Windows | `surface-laptop`, `desktop-monitor` |
| Generic | `browser` |

Widths are CSS viewports, not panel resolutions — a Pixel 9 has a 1080px-wide panel but lays out at 412 CSS pixels, and previewing at 1080 would show a tablet layout on a phone. Sizes are a little smaller than the real hardware where the real figure would dominate a preview pane; the layout breakpoint each one lands in is what matters, not millimetre fidelity.

### Building a picker

```tsx
import { devicesInFamily, DEVICE_IDS, getDevice } from 'da-frame-set';

devicesInFamily('android').map((spec) => spec.label); // Pixel Pro, Pixel, …
```

## Props

| Prop | Type | Default | |
| --- | --- | --- | --- |
| `device` | `DeviceId` | — | Which device to draw. |
| `scale` | `number` | `1` | Shrinks the mock; the page inside still renders at full CSS width. |
| `hidden` | `boolean` | `false` | Laid out but not painted, while a fit is measured. |
| `url` | `string` | `example.com` | Shown in the address bar of the `browser` chassis. Ignored elsewhere. |
| `className` | `string` | — | |
| `style` | `CSSProperties` | — | |

## Notes

The screen is a scroll container with its scrollbar hidden — the mock stands in for hardware, and a scrollbar down its screen edge reads as chrome rather than as part of the page.

Every measurement that affects the mock's outer size (bezel, radii, chrome heights, overhang) is set inline from the device spec, so `frameSize()` and the rendered frame cannot drift apart. The stylesheet only supplies the material: the metal, the glass, the shadows.

## Licence

MIT
