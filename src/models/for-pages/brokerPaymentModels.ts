import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  UseFormReset,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

export interface brokerFormPropsType {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  control: Control<any>;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  reset: UseFormReset<any>;
}

export interface brokerListType {
  code: string;
  name: string;
  logo: string | null;
}

export interface brokerDataType {
  brokerList: brokerListType[];
  onlyBrokerNameList: string[];
}

export interface brokerPaymentFormDataType {
  fromAccount: string;
  DESTBrokerName: string;
  clientID: string;
  clientName: string;
  mobileNumber: string;
  transctionAmount: string;
  remarks: string;
  brokerCode: string;
}
