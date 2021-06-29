import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { get, post } from "services/AjaxService";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  GetAccountNumber,
  GetAccountNumberValueMainCodeKey,
} from "helper/CustomerData";
import { apiResponse } from "models/apiResponse";
import { Loader } from "pages/static/Loader";
import { toast } from "react-toastify";
import ConfirmDetailModal from "components/modals/bank-transfer/ConfirmDetailModal";
import MpinModal from "components/modals/bank-transfer/MpinModal";
import OTPModal from "components/modals/bank-transfer/OTPModal";
import SuccessModal from "components/modals/bank-transfer/SuccessModal";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { IconStyle } from "styling/common/IconStyling";
import { RiUserStarLine, RiBankLine } from "react-icons/ri";
import { bankBranchType, BankList, bankTransferFormDataType } from "./model";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bankTransferScheme } from "validation-schema/bankTransfer_validation";
import FavAccPopover from "components/FavAccPopover";
import { favAccListType } from "models/for-pages/favAcccount_PageModels";

export const BankTransfer2 = () => {
  const accountNumber = GetAccountNumber();
  const getAccountNumberValueMainCodeKey = GetAccountNumberValueMainCodeKey();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDetails, setSelectedDetails] = useState<favAccListType>();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<bankTransferFormDataType>({
    resolver: yupResolver(bankTransferScheme),
    mode: "all",
  });

  const onlyBankNameList = ["rbb", "kathmandu", "nabil"];

  const onSubmit = async (data: bankTransferFormDataType) => {
    console.log("form data: ", data);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Card className="card_Shadow">
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="fromAccount">
              <Form.Label className="font-weight-bold">From Account</Form.Label>
              <Form.Control as="select" {...register("fromAccount")}>
                {!getAccountNumberValueMainCodeKey ? (
                  <option></option>
                ) : (
                  getAccountNumberValueMainCodeKey?.map(
                    (accNum: any, index) => (
                      <option value={accNum.AccountNumber} key={index}>
                        {accNum.mainCode}
                      </option>
                    )
                  )
                )}
              </Form.Control>
              <Form.Text className="text-warning">
                {errors.fromAccount?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="destinationBank" aria-required>
              <Form.Label className="font-weight-bold">Select Bank</Form.Label>

              <Controller
                control={control}
                name="DESTBankName"
                render={({ field }) => (
                  <Typeahead
                    id="DESTBankName"
                    options={onlyBankNameList}
                    placeholder="Select Destination Bank... "
                    onChange={(e) => field.onChange(e[0])}
                    onBlur={(e) => field.onBlur()}
                  />
                )}
              />
              <Form.Text className="text-warning">
                {errors.DESTBankName?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="toAccountNumber">
              <Form.Label className="font-weight-bold">
                Account Number
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="destination bank account number..."
                autoComplete="off"
                {...register("toAccount")}
              />
              <Form.Text className="text-warning">
                {errors.DESTBankName
                  ? errors.DESTBankName.message
                  : "Please Insure the account number is correct before transaction"}
              </Form.Text>
              <FavAccPopover
                selectedDetails={(data) => setSelectedDetails(data)}
              />
            </Form.Group>

            <Form.Group controlId="DESTAccHolderName">
              <Form.Label className="font-weight-bold">
                Account Holder Name
              </Form.Label>
              <Form.Control
                type="text"
                {...register("destAccountHolderName")}
                placeholder="Account Holder Name..."
                autoComplete="off"
              />
              <Form.Text className="text-warning">
                {errors.destAccountHolderName?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="transctionAmount">
              <Form.Label className="font-weight-bold">Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Amount..."
                autoComplete="off"
                {...register("transctionAmount")}
                minLength={3}
                min={100}
              />
              <Form.Text className="text-warning">
                {errors.transctionAmount?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="bankTransfer">
              <Form.Label className="font-weight-bold">Remarks</Form.Label>
              <Form.Control
                type="text"
                {...register("remarks")}
                placeholder="remarks..."
                autoComplete="off"
              />
              <Form.Text className="text-warning">
                {errors.remarks?.message}
              </Form.Text>
            </Form.Group>

            <Button className="btn btn-warning" variant="primary" type="submit">
              Submit
            </Button>

            <Button
              className="btn btn-light"
              style={{ marginLeft: "20px" }}
              variant="secondary"
              type="reset"
            >
              Reset
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
