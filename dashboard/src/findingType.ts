export interface Begin {
  line: number;
}

export interface Positions {
  begin: Begin;
}

export interface Location {
  path: string;
  positions: Positions;
}

export interface Metadata {
  description: string;
  severity: string;
}

export interface Finding {
  type: string;
  ruleId: string;
  location: Location;
  metadata: Metadata;
}

export interface FindingData {
  findings: Finding[];
}
