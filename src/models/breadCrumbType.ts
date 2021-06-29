import React from "react";

export interface breadCrumbPropsType {
  pageTitle?: pageTitleType;

  breadCrumbData?: breadCrumbType[];
}

export interface breadCrumbType {
  title: string;
  to: string;
}

export interface pageTitleType {
  title: string;
  subTitle?: string | React.ReactNode;
}
