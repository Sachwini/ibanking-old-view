import FavAccPopover from "components/FavAccPopover";
import { getBranchList } from "helper/fun_FundTransfer";
import { getBranchDetail } from "helper/fun_FundTransfer";
import { favAccListType } from "models/for-pages/favAcccountModels";
import {
  branchDataDefaultValue,
  getBankBranchData_FundTransferType,
} from "models/for-pages/fundTransferModels";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  UseFormGetValues,
  UseFormSetValue,
  Controller,
} from "react-hook-form";
import { useRecoilValue } from "recoil";
import { getBankAccNo } from "state-provider/globalUserData";
import { v4 as uuidv4 } from "uuid";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  control: Control<any>;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
}

function FundTransferForm(props: Props) {
  const { register, errors, watch, getValues, setValue, control } = props;
  const bankAcclist = useRecoilValue(getBankAccNo);
  const [branchData, setBranchData] =
    useState<getBankBranchData_FundTransferType>(branchDataDefaultValue);

  const handleFavAccDetails = (data: favAccListType) => {
    setValue("toAccount", data.destinationAccountNumber);
    setValue("destinationAccountHolderName", data.destinationAccountHolderName);
  };

  useEffect(() => {
    let isSubscribed = true;
    const destinationBranchName = getValues("DESTBranchName");

    const init = async () => {
      const allBranch = await getBranchList();
      if (isSubscribed && allBranch) {
        setBranchData(allBranch);
        console.log("branch list data: ", allBranch);

        const branchDetail = getBranchDetail(
          destinationBranchName,
          allBranch?.branchList
        );
        setValue("DESTBranchID", branchDetail?.branchId);
        setValue("DESTBranchCode", branchDetail?.branchCode);
      }
    };

    init();
    return () => {
      isSubscribed = false;
    };
  }, [watch("DESTBranchName")]);

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

      {branchData && (
        <Form.Group controlId="DESTBranchName" className="form_group">
          <Form.Label>Select Destination Bank Branch</Form.Label>
          <Controller
            control={control}
            name="DESTBranchName"
            render={({ field }) => (
              <Typeahead
                id="DESTBranchName"
                options={branchData ? branchData.onlyBranchNameList : []}
                placeholder="Choose destination branch..."
                onChange={(e) => field.onChange(e[0])}
                onBlur={() => field.onBlur()}
                isInvalid={!!errors.DESTBranchName}
              />
            )}
          />
          <Form.Control.Feedback
            type="invalid"
            className={errors.DESTBranchName ? "d-block" : ""}
          >
            {errors.DESTBranchName?.message}
          </Form.Control.Feedback>
        </Form.Group>
      )}

      <Form.Group controlId="destAccountHolderName" className="form_group">
        <Form.Label>Destination AccountHolder Name</Form.Label>
        <Form.Control
          type="text"
          autoComplete="off"
          placeholder="AccountHolder Name..."
          {...register("destinationAccountHolderName")}
          isInvalid={!!errors.destinationAccountHolderName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.destinationAccountHolderName?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="amount" className="form_group">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          placeholder="Amount"
          autoComplete="off"
          {...register("amount")}
          isInvalid={!!errors.amount}
        />
        <Form.Control.Feedback type="invalid">
          {errors.amount?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="remarks" className="form_group">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="text"
          placeholder="remarks"
          autoComplete="off"
          {...register("remarks")}
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
}

export default FundTransferForm;
