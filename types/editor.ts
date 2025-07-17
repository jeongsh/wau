export interface DesignInfo {
  themeColor: string;
  fontStyle: string;
  fontSize: string;
  mainVisual: {
    type: string;
    image: string;
  };
  calendar:{
    isShowCalendar: boolean;
    isShowCountdown: boolean;
  }
}

export interface WeddingInfo {
  bride: {
    name: string;
    familyName: string;
    number: string;
    bank: string | null;
    account: string | null;
    parents: Array<{
      relation: string;
      name: string;
      number: string | null;
      bank: string | null;
      account: string | null;
      isDied: boolean;
    }> | null;
  };
  groom: {
    name: string;
    familyName: string;
    number: string;
    bank: string | null;
    account: string | null;
    parents: Array<{
      relation: string;
      name: string;
      number: string | null;
      bank: string | null;
      account: string | null;
      isDied: boolean;
    }> | null;
  };
  date: Date;
  time: {
    ampm: string;
    hour: number;
    minute: number;
  };
  location: {
    address: string;
    latitude: number;
    longitude: number;
    name: string;
    detail: string | null;
    number: string | null;
  };
}