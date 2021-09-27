export type ArticleExternal = {
  Id: string;
  D: Date;
  CC: number;
  DN: string;
  AA: {
    AuId: number;
    DAuN: string;
  }[];
  F: {
    FId: number;
    DFN: string;
  }[];
  J: {
    JId: number;
    JN: string;
  };
  IA: {
    IndexLength: number;
    InvertedIndex: {
      [key in string]: number[];
    };
  };
  S: {
    Ty: number;
    U: string;
  };
  FamId: string;
};

export type ArticleInternal = {
  id: string;
  date: string;
  citation: number;
  name: string;
  authors: {
    id: string;
    name: string;
  }[];
  tags: {
    id: string;
    name: string;
  }[];
  journal:
    | {
        id: string;
        name: string;
      }
    | undefined;
  source: {
    type: string;
    url: string;
  }[];
  abstract: string;
  status: "raw" | "edited" | "hidden";
};

export type ArticleMutation = {
  id: string;
  date: string;
  citation: number;
  name: string;
  abstract: string;
  authors: {
    connectOrCreate: {
      where: {
        id: string;
      };
      create: {
        id: string;
        name: string;
      };
    }[];
  };
  tags: {
    connectOrCreate: {
      where: {
        id: string;
      };
      create: {
        id: string;
        name: string;
      };
    }[];
  };
  journal:
    | {
        connectOrCreate: {
          where: {
            id: string;
          };
          create: {
            id: string;
            name: string;
          };
        };
      }
    | undefined;
  sources: {
    connectOrCreate: {
      where: {
        url: string;
      };
      create: {
        type: string;
        url: string;
      };
    };
  };
  status: "raw" | "edited" | "hidden";
};
