import { breadCrumbPropsType } from "models/breadCrumbType";
import { Link } from "react-router-dom";
import {
  StaticBarContainer,
  BreadCrumbSection,
  StaticBarWrapper,
} from "styling/common/PageTitleStyling";
import { PageTitle } from "./PageTitle";

const StaticBar = (props: breadCrumbPropsType) => {
  const { pageTitle, breadCrumbData } = props;

  // finding breadcrumb data exist or not:
  let isBreadCrumbExist = "";
  if (breadCrumbData?.length === 0) {
    isBreadCrumbExist = "yes";
  } else isBreadCrumbExist = "no";

  return (
    <StaticBarContainer>
      <StaticBarWrapper>
        <PageTitle
          title={pageTitle?.title}
          subTitle={pageTitle?.subTitle}
          padding="0"
        />

        <BreadCrumbSection bgCtrl="yes">
          {breadCrumbData?.map((item) => {
            return (
              <Link to={item.to} key={item.title}>
                {item.title}
              </Link>
            );
          })}
        </BreadCrumbSection>
      </StaticBarWrapper>
    </StaticBarContainer>
  );
};

export default StaticBar;
