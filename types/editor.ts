export interface DesignInfo {
  themeType: string;
  themeColor: string;
  fontStyle: string;
  fontSize: string;
  mainImage: string;
}

export interface WeddingInfo {
  bride: {
    name: string;
    familyName: string;
    number: string;
    bank: string;
    account: string;
    parents: Array<{
      relation: string;
      name: string;
      number: string;
      bank: string;
      account: string;
    }> | null;
  };
  groom: {
    name: string;
    familyName: string;
    number: string;
    bank: string;
    account: string;
    parents: Array<{
      relation: string;
      name: string;
      number: string;
      bank: string;
      account: string;
    }> | null;
  };
  date: Date;
  time: {
    ampm: string;
    hour: number;
    minute: number;
  };
  location: string;
}