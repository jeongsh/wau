export interface DesignInfo {
  themeType: string;
  themeColor: string;
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
    }>;
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
    }>;
  };
}