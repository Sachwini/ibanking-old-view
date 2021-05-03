import { ReactNode } from "react";

export interface QpayService {
  id: number;
  name: string;
  imageUrl: string;
  isNew: boolean;
  services: userServices[];
  children?: ReactNode;
}

interface userServices {
  id: number;
  url: string;
  uniqueIdentifier: string;
  service: string;
  status: string;
  labelName: string;
  labelSize: string;
  labelSample: string;
  labelPrefix: string;
  instructions: string;
  fixedlabelSize: boolean;
  priceInput: boolean;
  notificationUrl: string;
  minValue: number;
  maxValue: number;
  icon: string;
  categoryId: number;
  serviceCategoryName: string;
  webView: true;
  isNew: boolean;
  cashBackView: string;
}
