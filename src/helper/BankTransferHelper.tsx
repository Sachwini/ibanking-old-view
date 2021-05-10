import { apiResponse } from "models/apiResponse";
import { BankList } from "models/BankListType";
import { useEffect, useState } from "react";
import { get } from "services/AjaxService";

export const GetBankList = () => {
  const [bankList, setBankList] = useState<BankList[]>([]);

  useEffect(() => {
    let isSubscribed = true;

    const loadBankList = async () => {
      const res = await get<apiResponse<BankList[]>>("/api/ips/bank");
      if (isSubscribed) {
        setBankList(res.data.details);
      }
    };

    loadBankList();
    return () => {
      isSubscribed = false;
    };
  }, []);

  //   let onlyBankName: string[] = [];
  //   bankList?.map((list) => {
  //     return onlyBankName.push(list.bankName);
  //   });

  return bankList;
};

export const getBankId = (list: BankList[], Bname: string) => {
  let bankId = "";

  for (let i = 0; i <= list.length; i++) {
    if (list[i].bankName === Bname) {
      return (bankId = list[i].bankId);
    }
  }
};
