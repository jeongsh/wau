export interface DesignInfo {
  themeColor: string;
  fontStyle: string;
  fontSize: string;
  intro: {
    isUseIntro: boolean;
    isShowIntro: boolean;
    type: string | null;
    text: string | null;
    textColor: string | null;
    textSize: string | null;
    image: string | null;
  }
  mainVisual: {
    type: string;
    image: string;
  };
  greeting : string,
  designPage: string | null,
  calendar:{
    isShowCalendar: boolean;
    isShowCountdown: boolean;
  }
}

export interface WeddingInfo {
  bride: {
    name: string;
    familyName: string;
    relation: string;
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
    }>;
  };
  groom: {
    name: string;
    familyName: string;
    relation: string;
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
    }>;
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