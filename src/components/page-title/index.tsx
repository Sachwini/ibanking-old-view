import "./page-title.css";

export const PageTitle = (props: { title: string; subTitle?: string }) => {
  return (
    <div className="page-title">
      <h1>{props.title}</h1>
      {props.subTitle ? <h6>{props.subTitle}</h6> : null}
    </div>
  );
};
