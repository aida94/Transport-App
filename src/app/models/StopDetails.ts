import { Stop, StopRaw } from 'models/Stop';
import { Products } from 'models/interfaces';


interface Operator {
  readonly type: string;
  readonly id: string;
  readonly name: string;
}

interface Color {
  readonly fg: string;
  readonly bg: string;
}

interface Icon {
  readonly type: string;
  readonly title: string;
}

interface Line {
  readonly type: string;
  readonly id: string;
  readonly fahrtNr: number;
  readonly name: string;
  readonly public: boolean;
  readonly adminCode: string;
  readonly mode: string;
  readonly product: string;
  readonly operator: Operator;
  readonly symbol: string;
  readonly nr: number;
  readonly metro: boolean;
  readonly express: boolean;
  readonly night: boolean;
  readonly color: Color;
}

interface Remarks {
  readonly id?: number;
  readonly type?: string;
  readonly code?: string;
  readonly summary?: string;
  readonly text?: string;
  readonly icon?: Icon;
  readonly priority?: number;
  readonly category?: string;
  readonly products?: Products;
  readonly validFrom?: Date;
  readonly validUntil?: Date;
  readonly modified?: Date;
}

export interface StopDetailsRaw {
  readonly tripId: string;
  readonly stop: StopRaw;
  readonly when: Date;
  readonly plannedWhen: Date;
  readonly delay: number;
  readonly platform: string;
  readonly plannedPlatform: string;
  readonly direction: string;
  readonly provenance: string;
  readonly line: Line;
  readonly remarks: Remarks[];
}

// arrivals and departures details
export class StopDetails {
  readonly tripId: string;
  readonly stop: Stop;
  readonly when: Date;
  readonly plannedWhen: Date;
  readonly delay: number;
  readonly platform: string;
  readonly plannedPlatform: string;
  readonly direction: string;
  readonly provenance: string;
  readonly line: Line;
  readonly remarks: Remarks[];

  constructor(data: StopDetailsRaw) {
    this.tripId = data.tripId;
    this.stop = data.stop;
    this.when = data.when;
    this.plannedWhen = data.plannedWhen;
    this.delay = data.delay;
    this.plannedPlatform = data.plannedPlatform;
    this.direction = data.direction;
    this.provenance = data.provenance;
    this.line = data.line;
    this.remarks = data.remarks;
  }
}
