import RoundedButton from "/src/components/RoundedButton.jsx";

import usdcIcon from "/imgs/app/payment/usdc.svg";
import CloseIcon from "../../components/Icons/CloseIcon";

const SecurePaymentDialog = (props) => {
  const { paymentInfo, setSecurePaymentDialogView, setApproveTokenDialogView } =
    props;

  return (
    <div
      className="fixed bg-blend-lighten top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
      onClick={() => setSecurePaymentDialogView(false)}
    >
      <div
        className="relative max-w-3xl max-h-[50%] lg:max-h-[90%] m-auto top-1/2 transform -translate-y-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative shadow bg-app-normal rounded-[32px] border border-primary">
          <button
            type="button"
            className="lg:hidden absolute inline-flex top-3 right-3 text-gray-400 bg-transparent hover:bg-hover rounded-lg text-sm p-1 items-center"
            onClick={() => setSecurePaymentDialogView(false)}
          >
            <CloseIcon />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="flex flex-col gap-6 lg:gap-8 px-2 lg:px-8 py-12 lg:py-6">
            <div className="flex flex-row justify-between items-center gap-4">
              <div className="flex flex-row items-center gap-4">
                <p className="text-2xl text-primary font-bold">
                  Secure payment
                </p>
              </div>
              <button
                type="button"
                className="hidden lg:inline-flex text-gray-400 bg-transparent hover:bg-hover rounded-lg text-sm p-1 items-center"
                onClick={() => setSecurePaymentDialogView(false)}
              >
                <CloseIcon />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <p className="text-base text-normal">
              To guarantee a secure and transparent deal, we kindly request that
              you deposit the total payment amount for the job offer. This
              ensures that the funds will be held securely on our protocol until
              the job is completed, providing peace of mind to both parties.
            </p>
            <p className="text-base text-normal">
              In the event of a dispute, rest assured that the funds will be
              returned to you, ensuring a fair resolution process. To learn
              more, please read our{" "}
              <span className="text-small underline underline-offset-1">
                Terms and Conditions
              </span>
              .
            </p>
            <div className="flex flex-row gap-3 items-center justify-between">
              <div className="flex flex-row gap-2">
                <span className="text-primary text-xs font-medium">
                  Approval
                </span>
                <div className="bg-grey border border-mandatory h-4 w-4 rounded-full shadow"></div>
              </div>
              <div className="border border-primary w-full"></div>
              <div className="flex flex-row gap-2">
                <div className="bg-grey border border-primary h-4 w-4 rounded-full shadow"></div>
                <span className="text-normal text-xs font-medium">
                  Transfer
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="border border-primary"></div>
              <div className="flex flex-row justify-end items-center gap-4">
                <p className="text-xs font-medium text-small">
                  {"~$" + paymentInfo.usd_budget}
                </p>
                <p className="text-base text-primary font-bold">
                  {paymentInfo.usdc_budget}
                </p>
                <img
                  className="p-1 rounded-full border border-primary"
                  src={usdcIcon}
                />
                <p className="text-sm text-normal">
                  {paymentInfo.gamer_per_amount}/gamer
                </p>
                <RoundedButton
                  padding={"px-4 lg:px-8 py-3"}
                  attrib={"hidden xl:block !text-base"}
                  clickFunc={() => {
                    setApproveTokenDialogView(true);
                    setSecurePaymentDialogView(false);
                  }}
                >
                  Approve token
                </RoundedButton>
              </div>
              <RoundedButton
                width={"w-1/2"}
                padding={"px-4 lg:px-8 py-3"}
                attrib={"xl:hidden mx-auto !text-base"}
                clickFunc={() => {
                  setApproveTokenDialogView(true);
                  setSecurePaymentDialogView(false);
                }}
              >
                Approve token
              </RoundedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurePaymentDialog;
