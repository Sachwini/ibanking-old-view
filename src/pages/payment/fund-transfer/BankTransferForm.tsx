import FavAccPopover from "components/FavAccPopover";
import {
  getBankBranchID,
  GetBankBranchList,
  GetBankList,
  getDESTBankID,
} from "helper/fun_BankTransfer";
import { favAccListType } from "models/for-pages/favAcccountModels";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  UseFormReset,
  UseFormGetValues,
  Controller,
  UseFormSetValue,
} from "react-hook-form";
import { useRecoilValue } from "recoil";
import { getBankAccNo } from "state-provider/globalUserData";
import {
  getBankBranchDataDefaultValue,
  getBankBranchDataType,
  getBankListDefaultValue,
  getBankListType,
} from "models/for-pages/bankTransferModels";
import { v4 as uuidv4 } from "uuid";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  control: Control<any>;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  reset: UseFormReset<any>;
  destBankId: (id: string | "") => void;
  destBranchId: (id: string | "null") => void;
}

const BankTransferForm = (props: Props) => {
  // initializing props
  const {
    register,
    errors,
    watch,
    getValues,
    setValue,
    reset,
    control,
    destBankId,
    destBranchId,
  } = props;
  const bankAcclist = useRecoilValue(getBankAccNo);

  // For Bank Handle
  const [bankListData, setBankListData] = useState<getBankListType>(
    getBankListDefaultValue
  );
  const [DESTBankID, setDESTBankID] = useState<string>("");

  // For Branch Handle
  const [DESTBranchData, setDESTBranchData] = useState<getBankBranchDataType>(
    getBankBranchDataDefaultValue
  );

  useEffect(() => {
    let isSubscribed = true;
    const destBankName = getValues("DESTBankName");

    const loadBankList = async () => {
      const res = await GetBankList();
      if (res && isSubscribed) {
        setBankListData(res);

        // gettting selected bank id
        const id = getDESTBankID(destBankName, res?.bankList);
        if (id) {
          setDESTBankID(id);
          destBankId(id);
          setValue("DESTBankID", id);
        }
      }
    };

    const bankBranchList = async () => {
      if (DESTBankID) {
        const res = await GetBankBranchList(DESTBankID);
        if (res && isSubscribed) {
          setDESTBranchData(res);
        }
      }
    };

    loadBankList();
    bankBranchList();

    return () => {
      isSubscribed = false;
    };
  }, [watch("DESTBankName")]);

  useEffect(() => {
    let isSusbrided = true;

    const destBankBranchName = getValues("DESTBranchName");
    const branchId = getBankBranchID(
      destBankBranchName,
      DESTBranchData.bankBranchList
    );
    if (isSusbrided && branchId) {
      destBranchId(branchId);
      setValue("DESTBranchID", branchId);
    }

    return () => {
      isSusbrided = false;
    };
  }, [watch("DESTBranchName")]);

  const handleFavAccDetails = (data: favAccListType) => {
    setValue("toAccount", data.destinationAccountNumber);
    setValue("destAccountHolderName", data.destinationAccountHolderName);
  };

  // const resetClicked = () => {
  //   reset({
  //     fromAccount: "",
  //     DESTBankName: "",
  //     DESTBankID: "",
  //     toAccount: "",
  //     destAccountHolderName: "",
  //     DESTBranchName: "",
  //     DESTBranchID: "",
  //     transctionAmount: "",
  //     remarks: "",
  //   });
  // };

  return (
    <>
      <Form.Group controlId="fromAccount" className="form_group">
        <Form.Label>From Account</Form.Label>
        <Form.Control
          as="select"
          {...register("fromAccount")}
          isInvalid={!!errors.fromAccount}
        >
          {bankAcclist?.map((Acc) => {
            return (
              <option value={Acc.accNo} key={uuidv4()}>
                {Acc.mainCode}
              </option>
            );
          })}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.fromAccount?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="DESTBankName" className="form_group">
        <Form.Label>Select Bank</Form.Label>
        <Controller
          control={control}
          name="DESTBankName"
          render={({ field }) => (
            <Typeahead
              id="DESTBankName"
              options={bankListData.onlyBankNameList}
              placeholder="Select Destination Bank... "
              onChange={(e) => field.onChange(e[0])}
              onBlur={() => field.onBlur()}
              isInvalid={!!errors.DESTBankName}
            />
          )}
        />
        <Form.Control.Feedback
          type="invalid"
          className={errors.DESTBankName ? "d-block" : ""}
        >
          {errors.DESTBankName?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {DESTBranchData.onlyBankBranchNameList.length !== 0 && (
        <Form.Group controlId="DESTBranchName" className="form_group">
          <Form.Label>Select Destination Bank Branch</Form.Label>
          <Controller
            control={control}
            name="DESTBranchName"
            render={({ field }) => (
              <Typeahead
                id="DESTBranchName"
                options={DESTBranchData.onlyBankBranchNameList}
                placeholder="Choose destination branch..."
                onChange={(e) => field.onChange(e[0])}
                onBlur={() => field.onBlur()}
                isInvalid={!!errors.DESTBranchName}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.DESTBranchName?.message}
          </Form.Control.Feedback>
        </Form.Group>
      )}

      <Form.Group controlId="toAccount" className="form_group">
        <Form.Label>Account Number</Form.Label>
        <div className="d-flex">
          <Form.Control
            className="flex-grow-1"
            type="text"
            placeholder="destination bank account number..."
            autoComplete="off"
            {...register("toAccount")}
            isInvalid={!!errors.toAccount}
          />
          <div className="pl-3">
            <FavAccPopover
              selectedDetails={(data) => handleFavAccDetails(data)}
            />
          </div>
        </div>

        <Form.Control.Feedback
          type="invalid"
          className={errors.toAccount ? "d-block" : ""}
        >
          {errors.toAccount?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="destAccountHolderName" className="form_group">
        <Form.Label>Account Holder Name</Form.Label>
        <Form.Control
          type="text"
          {...register("destAccountHolderName")}
          placeholder="Account Holder Name..."
          autoComplete="off"
          isInvalid={!!errors.destAccountHolderName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.destAccountHolderName?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="transactionAmount" className="form_group">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          placeholder="transaction Amount..."
          autoComplete="off"
          {...register("transctionAmount")}
          minLength={3}
          min={100}
          isInvalid={!!errors.transctionAmount}
        />
        <Form.Control.Feedback type="invalid">
          {errors.transctionAmount?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="remarks" className="form_group">
        <Form.Label>Remarks</Form.Label>
        <Form.Control
          type="text"
          {...register("remarks")}
          placeholder="remarks..."
          autoComplete="off"
          isInvalid={!!errors.remarks}
        />
        <Form.Control.Feedback type="invalid">
          {errors.remarks?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="text-right mr-3">
        <Button variant="outline-success" type="submit" className="px-4">
          Submit
        </Button>

        <Button className="ml-5 px-4" variant="outline-danger" type="reset">
          Reset
        </Button>
      </div>
    </>
  );
};

export default BankTransferForm;
