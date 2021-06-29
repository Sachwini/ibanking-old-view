import FavAccPopover from "components/FavAccPopover";
import { GetAccountNumberValueMainCodeKey } from "helper/CustomerData";
import { favAccListType } from "models/for-pages/favAcccount_PageModels";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
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
import { getBankBranches } from "services/BankServices";
import { getBankAccNo } from "state-provider/globalUserData";
import { v4 as uuidv4 } from "uuid";

interface selectItem {
  label: string;
  value: string;
}

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  control: Control<any>;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  destBankId: (id: string | "") => void;
  destBranchId: (id: string | "null") => void;
}

function FundTransferForm(props: Props) {
  const {
    register,
    errors,
    watch,
    getValues,
    setValue,
    control,
    destBranchId,
  } = props;
  const bankAcclist = useRecoilValue(getBankAccNo);
  const [branch, setBranch] = useState<selectItem[]>([]);

  const handleFavAccDetails = (data: favAccListType) => {
    setValue("toAccount", data.destinationAccountNumber);
    setValue("destAccountHolderName", data.destinationAccountHolderName);
  };

  useEffect(() => {
    let isSubscribed = true;

    const init = async () => {
      const branch = await getBankBranches();
      if (isSubscribed) {
        const branchData: selectItem[] = [];
        if (branch) {
          branch.forEach((x: any) =>
            branchData.push({ label: x.name, value: x.id.toString() })
          );
          setBranch(branchData);
          // setLoading(false);
        }
      }
    };
    init();
    // getAccountNumberValueMainCodeKey();
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      <Form.Group controlId="fromAccount">
        <Form.Label className="font-weight-bold">From Account</Form.Label>
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

      <Form.Group controlId="toAccountNumber" className="">
        <Form.Label className="font-weight-bold">Account Number</Form.Label>
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

        <Form.Control.Feedback type="invalid">
          {errors.toAccount?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {DESTBranchList && (
        <Form.Group controlId="bankTransfer">
          <Form.Label className="font-weight-bold">
            Select Destination Bank Branch
          </Form.Label>
          <Controller
            control={control}
            name="DESTBranchName"
            render={({ field }) => (
              <Typeahead
                id="DESTBranchName"
                options={
                  DESTBranchList ? DESTBranchList.onlyBankBranchNameList : []
                }
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

      <Form.Group controlId="formGridAddress1">
        <Form.Label className="font-weight-bold">
          Select Destination Bank Branch
        </Form.Label>
        <Typeahead
          options={branch}
          id="my-typeahead-id"
          placeholder="Choose destination branch..."
          onChange={handleBranchID}
        />
        <Form.Text className="text-warning">
          {bankBranchId
            ? `bankBranchId: ${bankBranchId}`
            : "selected none (please select one... )"}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formGridAddress1">
        <Form.Label className="font-weight-bold">
          Destination AccountHolder Name
        </Form.Label>
        <Form.Control
          type="text"
          autoComplete="off"
          placeholder="Enter your Destination AccountHolder Name"
          {...register("destinationAccountHolderName")}
          // value={destinationAccountHolderName}
          // required
          // onChange={(e) =>
          //   setDestinationAccountHolderName(e.target.value)
          // }
        />
      </Form.Group>

      <Form.Group controlId="formGridAddress1">
        <Form.Label className="font-weight-bold">Amount</Form.Label>
        <Form.Control
          type="number"
          placeholder="Amount"
          {...register("amount")}
          // value={amount}
          // required
          // autoComplete="off"
          // min={0}
          // onChange={(e) => setAmount(e.target.value)}
        />
      </Form.Group>

      <Button variant="success" type="submit">
        Submit
      </Button>

      <Button className="ml-5" variant="danger" type="reset">
        Reset
      </Button>
    </>
  );
}

export default FundTransferForm;
