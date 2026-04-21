export type TabType = 'bio' | 'records' | 'trophy' | 'links';

export type FlavorType =
  | 'rosso-corsa'
  | 'pistachio'
  | 'salted-caramel';

export interface FlavorDef {
  id: FlavorType;
  label: string;
  emoji: string;
  hex: string;
  rgb: string;
}

export interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

export interface AudioClip {
  id: string;
  label: string;
  emoji: string;
  freq: number;
}

export interface TimelineEvent {
  year: number;
  tag: string;
  title: string;
  desc: string;
}

export interface StatEntry {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface SeasonEntry {
  year: string;
  points: number;
  wins: number;
  podiums: number;
}

export interface WinEntry {
  gp: string;
  circuit: string;
  year: number;
  flag: string;
  memo: string;
  size: 'large' | 'medium' | 'small';
}
