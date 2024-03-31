export type Chartype = {
  id: string;
  projectName: string;
  state: number;
  createTime: string;
  createUserId: string;
  isDelete: number;
  indexImage: string;
  remarks: string | null;
}

export type ChartList = Chartype[]