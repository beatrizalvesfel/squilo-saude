export interface NotificationModel {
  type: String;
  userName: String;
  examName: String;
  meta: any;
  timeOfNotification: any
}

export interface MetaModel {
  examID: String;
  receivedFromUSer: String
}
