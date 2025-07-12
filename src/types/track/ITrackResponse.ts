export interface ITrackResponse {
  context: BecknContext;
  message: {
    tracking: {
      status: TrackingStatus;
      parcel_id: string;
      provider_id: string;
      description?: string;
      location: {
        gps: string;        // e.g., "28.6139,77.2090"
        timestamp: string;  // ISO 8601
      };
      history: TrackingCheckpoint[];
    };
  };
}

export interface BecknContext {
  domain: "nic2004:55204";
  country: "IND";
  city: string;
  action: "on_track";
  core_version: "0.9.1";
  bap_id: string;
  bap_uri: string;
  bpp_id: string;
  bpp_uri: string;
  transaction_id: string;
  message_id: string;
  timestamp: string;
}

export type TrackingStatus =
  | "order_placed"
  | "order_accepted"
  | "in_transit"
  | "arrived_at_hub"
  | "out_for_delivery"
  | "delivered";

export interface TrackingCheckpoint {
  status: TrackingStatus;
  gps: string;
  timestamp: string;
}
