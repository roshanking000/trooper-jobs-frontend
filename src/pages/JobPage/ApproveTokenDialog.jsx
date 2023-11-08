import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import RoundedButton from "/src/components/RoundedButton.jsx";

import usdcIcon from "/imgs/app/payment/usdc.svg";
import IntermediateProgress from "/imgs/common/intermediate.svg";
import CircleWavyCheckIcon from "/imgs/app/common/CircleWavyCheck.svg";
import CaretDownIcon from "/imgs/app/common/CaretDown.svg";
import shareNetworkIcon from "/imgs/app/common/ShareNetwork.svg";
import CloseIcon from "../../components/Icons/CloseIcon";

const ApproveTokenDialog = (props) => {
  const { paymentInfo, setApproveTokenDialogView, onTransferFundSuccess } = props;
  const navigate = useNavigate();

  const [step, setStep] = useState("approve token");
  const [text, setText] = useState(
    "The approval transaction has been broadcasted to the network, please follow instructions in your wallet to proceed."
  );
  const [explorerView, setExplorerView] = useState(false);

  useEffect(() => {
    setTimeout(transactionConfirmed, 3000);
  }, []);

  useEffect(() => {
    if (step === "transfer funds") setTimeout(transferFunds, 3000);
  }, [step]);

  const transactionConfirmed = () => {
    setText(
      "Transaction waiting to be confirmed, this can take few minutes depending on the network congestion."
    );
    setExplorerView(true);
    setTimeout(approvalSuccessful, 3000);
  };

  const approvalSuccessful = () => {
    setStep("approval successful");

    setText(
      "Your approval transaction has been validated on the blockchain. You can now proceed to deposit the funds."
    );
  };

  const transferFunds = () => {
    setTimeout(transferFundsSuccessful, 3000);
    setText(
      "Transaction waiting to be confirmed, this can take few minutes depending on the network congestion."
    );
    setExplorerView(true);
  };

  const transferFundsSuccessful = () => {
    setStep("transfer funds successful");
    setText("Your transaction has been validated on the blockchain.");
    onTransferFundSuccess();
  };

  return (
    <div
      className="fixed bg-blend-lighten top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
      onClick={() => setApproveTokenDialogView(false)}
    >
      <div
        className="relative max-w-3xl max-h-[50%] lg:max-h-[90%] m-auto top-1/2 transform -translate-y-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative shadow bg-app-normal rounded-[32px] border border-primary">
          <button
            type="button"
            className="lg:hidden absolute inline-flex top-3 right-3 text-gray-400 bg-transparent hover:bg-hover rounded-lg text-sm p-1 items-center"
            onClick={() => setApproveTokenDialogView(false)}
          >
            <CloseIcon />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="flex flex-col gap-6 lg:gap-8 px-2 lg:px-8 py-12 lg:py-6">
            <div className="flex flex-row justify-between items-center gap-4">
              {step === "approve token" && (
                <div className="hidden lg:flex flex-row items-center gap-4">
                  <img
                    className="border border-primary rounded-full p-1 w-10 h-10 animate-spin animate-infinite"
                    src={IntermediateProgress}
                  />
                  <p className="text-2xl text-primary font-bold">
                    Approve token
                  </p>
                </div>
              )}
              {step === "approval successful" && (
                <div className="hidden lg:flex flex-row items-center gap-4">
                  <img
                    className="border border-primary rounded-full p-1 w-10 h-10"
                    src={CircleWavyCheckIcon}
                  />
                  <p className="text-2xl text-primary font-bold">
                    Approval successful
                  </p>
                </div>
              )}
              {step === "transfer funds" && (
                <div className="hidden lg:flex flex-row items-center gap-4">
                  <img
                    className="border border-primary rounded-full p-1 w-10 h-10 animate-spin animate-infinite"
                    src={IntermediateProgress}
                  />
                  <p className="text-2xl text-primary font-bold">
                    Transfer funds
                  </p>
                </div>
              )}
              {step === "transfer funds successful" && (
                <div className="hidden lg:flex flex-row items-center gap-4">
                  <img
                    className="border border-primary rounded-full p-1 w-10 h-10"
                    src={CircleWavyCheckIcon}
                  />
                  <p className="text-2xl text-primary font-bold">
                    Transaction successful
                  </p>
                </div>
              )}
              <button
                type="button"
                className="hidden lg:inline-flex text-gray-400 bg-transparent hover:bg-hover rounded-lg text-sm p-1 items-center"
                onClick={() => setApproveTokenDialogView(false)}
              >
                <CloseIcon />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <p className="text-base text-normal">{text}</p>
            {explorerView === true && (
              <a target="_blank">
                <div className="flex flex-row items-center gap-2 w-screen">
                  <p className="text-base font-bold text-small">
                    Open transaction in explorer
                  </p>
                  <img src={CaretDownIcon} />
                </div>
              </a>
            )}
            {step == "approve token" && (
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
            )}
            {step == "approval successful" && (
              <div className="flex flex-row gap-3 items-center justify-between">
                <div className="flex flex-row gap-2">
                  <span className="text-primary text-xs font-medium">
                    Approval
                  </span>
                  <div className="bg-roadmap-current border border-mandatory h-4 w-4 rounded-full shadow"></div>
                </div>
                <div className="border border-primary w-full"></div>
                <div className="flex flex-row gap-2">
                  <div className="bg-grey border border-primary h-4 w-4 rounded-full shadow"></div>
                  <span className="text-normal text-xs font-medium">
                    Transfer
                  </span>
                </div>
              </div>
            )}
            {step == "transfer funds" && (
              <div className="flex flex-row gap-3 items-center justify-between">
                <div className="flex flex-row gap-2">
                  <span className="text-primary text-xs font-medium">
                    Approval
                  </span>
                  <div className="bg-roadmap-current border border-mandatory h-4 w-4 rounded-full shadow"></div>
                </div>
                <div className="border border-mandatory w-full"></div>
                <div className="flex flex-row gap-2">
                  <div className="bg-grey border border-mandatory h-4 w-4 rounded-full shadow"></div>
                  <span className="text-normal text-xs font-medium">
                    Transfer
                  </span>
                </div>
              </div>
            )}
            {step == "transfer funds successful" && (
              <div className="flex flex-row gap-3 items-center justify-between">
                <div className="flex flex-row gap-2">
                  <span className="text-primary text-xs font-medium">
                    Approval
                  </span>
                  <div className="bg-roadmap-current border border-mandatory h-4 w-4 rounded-full shadow"></div>
                </div>
                <div className="border border-mandatory w-full"></div>
                <div className="flex flex-row gap-2">
                  <div className="bg-roadmap-current border border-mandatory h-4 w-4 rounded-full shadow"></div>
                  <span className="text-normal text-xs font-medium">
                    Transfer
                  </span>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-6">
              <div className="border border-primary"></div>
              {step === "transfer funds successful" ? (
                <div className="flex flex-col xl:flex-row justify-end items-center gap-4">
                  <RoundedButton
                    padding={"px-4 lg:px-8 py-3"}
                    attrib={"!text-base"}
                    clickFunc={() => navigate("/jobs")}
                  >
                    Check my job offer
                  </RoundedButton>
                  <RoundedButton
                    padding={"px-4 lg:px-8 py-3 mx-auto"}
                    attrib={"!text-sm"}
                  >
                    <span>
                      <img src={shareNetworkIcon}></img>
                    </span>
                    Share job on socials
                  </RoundedButton>
                </div>
              ) : (
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
                  {step == "approve token" && (
                    <RoundedButton
                      padding={"px-4 lg:px-8 py-3"}
                      attrib={"hidden xl:block !text-base"}
                    >
                      Approving
                      <span>
                        <img
                          className="rounded-full w-6 h-6 animate-spin animate-infinite"
                          src={IntermediateProgress}
                        />
                      </span>
                    </RoundedButton>
                  )}
                  {step == "transfer funds" && (
                    <RoundedButton
                      padding={"px-4 lg:px-8 py-3"}
                      attrib={"hidden xl:block !text-base"}
                    >
                      Depositing
                      <span>
                        <img
                          className="rounded-full w-6 h-6 animate-spin animate-infinite"
                          src={IntermediateProgress}
                        />
                      </span>
                    </RoundedButton>
                  )}
                  {step == "approval successful" && (
                    <RoundedButton
                      padding={"px-4 lg:px-8 py-3"}
                      attrib={"hidden xl:block !text-base"}
                      clickFunc={() => {
                        setStep("transfer funds");
                        setText(
                          "Your payment transaction has been broadcasted to the network, please follow instructions in your wallet to proceed."
                        );
                        setExplorerView(false);
                      }}
                    >
                      Deposit now
                    </RoundedButton>
                  )}
                </div>
              )}
              {step == "approve token" && (
                <RoundedButton
                  padding={"px-4 lg:px-8 py-3"}
                  attrib={"xl:hidden mx-auto !text-base"}
                >
                  Approving
                  <span>
                    <img
                      className="rounded-full w-6 h-6 animate-spin animate-infinite"
                      src={IntermediateProgress}
                    />
                  </span>
                </RoundedButton>
              )}
              {step == "transfer funds" && (
                <RoundedButton
                  padding={"px-4 lg:px-8 py-3"}
                  attrib={"xl:hidden mx-auto !text-base"}
                >
                  Depositing
                  <span>
                    <img
                      className="rounded-full w-6 h-6 animate-spin animate-infinite"
                      src={IntermediateProgress}
                    />
                  </span>
                </RoundedButton>
              )}
              {step == "approval successful" && (
                <RoundedButton
                  padding={"px-4 lg:px-8 py-3"}
                  attrib={"xl:hidden mx-auto !text-base"}
                  clickFunc={() => {
                    setStep("transfer funds");
                    setText(
                      "Your payment transaction has been broadcasted to the network, please follow instructions in your wallet to proceed."
                    );
                    setExplorerView(false);
                  }}
                >
                  Deposit now
                </RoundedButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveTokenDialog;
