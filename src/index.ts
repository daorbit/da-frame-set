import './styles/frames.css';

export { DeviceFrame } from './DeviceFrame';
export type { DeviceFrameProps } from './DeviceFrame';

export { DEVICES, DEVICE_IDS, getDevice, devicesInFamily } from './devices';
export type { DeviceId } from './devices';

export { frameSize } from './types';
export type { DeviceSpec, ChassisKind, CameraKind } from './types';

export { useFitScale } from './useFitScale';
