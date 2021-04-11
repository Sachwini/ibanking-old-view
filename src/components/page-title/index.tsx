import "./page-title.css";

export const PageTitle = (props: { title: string; subTitle?: string }) => {
  return (
    <div className="page__title">
      <h1>{props.title}</h1>
      {props.subTitle ? <h6>{props.subTitle}</h6> : null}
    </div>
  );
};

export const AccountName = (props: { name: string; accountCode: number }) => {
  return (
    <div className="account__title">
      <h1 className="AccountName">
        {props.name} ({props.accountCode})
      </h1>
    </div>
  );
};
