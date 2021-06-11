import "./page-title.css";

export const PageTitle = (props: { title: string; subTitle?: string }) => {
  return (
    <div className="page__title">
      <h5>{props.title}</h5>
      {props.subTitle ? <h6>{props.subTitle}</h6> : null}
    </div>
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
