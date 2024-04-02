export interface ExamModel {
  ownerID: any;
  examID: string;
  examName: string;
  examDescription: string;
  examProperties: {
    blobUrl: string,
    blobName: string
  };
  date: string;
}
