import { setLocale, addMethod, string, number } from "yup";
import {
  phoneNumberValidator,
  verifyIranianNationalId,
  verifyCardNumber,
} from "@persian-tools/persian-tools";
import { ErrorMessage } from "vee-validate";

export default defineNuxtPlugin(() => {
  setLocale({
    mixed: {
      default: "ورودی نامعتبر است",
      required: "${path}  را وارد کنید ",
    },
    string: {
      email: "ایمیل نامعتبر است",
      min: " حداقل مقدار ${path} ${min} کاراکتر است",
    },
    number: {
      min: " حداقل مقدار ${path} ${min} است",
    },
  });
  addMethod(string, "phoneNumber", function phoneNumber(phoneNumber: string) {
    return this.test(
      "phoneNumber",
      "شماره موبایل نامعتبر است",
      function (value) {
        if (value === undefined) return true;
        return phoneNumberValidator(value?.toString()!);
      }
    );
  });
  addMethod(string, "cardNumber", function cardNumber(cardNumber: string) {
    return this.test("cardNumber", " شماره کارت نامعتبر است", function (value) {
      if (value === undefined) return true;
      return verifyCardNumber(Number(value?.toString()!));
    });
  });
  addMethod(
    string,
    "nationalCode",
    function nationalCode(nationalCode: string) {
      return this.test("nationalCode", " کد ملی نامعتبر است", function (value) {
        if (value === undefined) return true;
        return verifyIranianNationalId(value?.toString()) ?? false;
      });
    }
  );
});
