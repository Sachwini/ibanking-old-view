import { PageTitleContainer } from "styling/common/PageTitleStyling";

export const PageTitle = (props: {
  title?: string;
  subTitle?: string | React.ReactNode;
  padding?: string;
  align?: string;
}) => {
  return (
    <PageTitleContainer padding={props.padding} align={props.align}>
      <h5 className="page__title">{props.title}</h5>
      {props.subTitle ? (
        <div className="page_subTitle">{props.subTitle}</div>
      ) : null}
    </PageTitleContainer>
  );
};

export const AccountName = (props: { name: string; accountCode: number }) => {
  return (
    <div className="account__title">
      <h4 className="AccountName">
        {props.name} ({props.accountCode})
      </h4>
    </div>
  );
};
