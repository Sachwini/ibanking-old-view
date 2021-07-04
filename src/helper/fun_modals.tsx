import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IconStyle } from "styling/common/IconStyling";

export const handleEye = (show: boolean) => {
  if (show) {
    return (
      <IconStyle hover>
        <AiOutlineEyeInvisible size={18} />
      </IconStyle>
    );
  } else
    return (
      <IconStyle hover>
        <AiOutlineEye size={18} />
      </IconStyle>
    );
};
