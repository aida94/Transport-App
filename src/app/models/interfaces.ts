export type Nullable<T> = T | null;

export interface FavoriteList {
  readonly id: number;
  readonly name: string;
}

export interface Location {
  readonly id: number;
  readonly type: string;
  readonly latitude: number;
  readonly longitude: number;
}

export interface Products {
  readonly suburban: true;
  readonly subway: true;
  readonly tram: true;
  readonly bus: true;
  readonly ferry: false;
  readonly express: false;
  readonly regional: true;
}

