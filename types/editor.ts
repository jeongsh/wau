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
  isShowAccount: boolean;
}

interface Account{
  name: string;
  number: string;
  bank: string;
  kakaoPay: string | null;
}
interface Parents {
  relation: string;
  name: string;
  number: string | null;
  account: Account;
  isUseAccount: boolean;
  isDied: boolean;
}

export interface WeddingInfo {
  bride: {
    name: string;
    familyName: string;
    relation: string;
    number: string;
    account: Account;
    parents: Array<Parents>;
  };
  groom: {
    name: string;
    familyName: string;
    relation: string;
    number: string;
    account: Account;
    parents: Array<Parents>;
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