import React from "react";
import { getRememberMe, setRememberMe } from "services/AuthService";

const RememberMe = () => {
  const rememberValue = getRememberMe();

  const handleRememberMe = (value: boolean) => {
    setRememberMe(value.toString());
  };

  return (
    <div className="input_wrapper">
      <input
        type="checkbox"
        id="remember"
        className="remember_meInput"
        defaultChecked={rememberValue === "true" ? true : false}
        onChange={(e) => handleRememberMe(e.target.checked)}
      />
      <label htmlFor="remember">Remember Me</label>
    </div>
  );
};

export default RememberMe;
