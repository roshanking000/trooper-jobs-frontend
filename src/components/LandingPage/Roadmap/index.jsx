import RoadmapImg from "/imgs/landing/roadmap.png";

const Roadmap = () => {
  return (
    <>
      <section
        id="roadmap"
        className="flex flex-col items-center justify-center gap-16 px-4 lg:px-[96px] py-12 lg:py-[128px] bg-secondary"
      >
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-3xl lg:text-5xl font-bold text-primary">
            Roadmap
          </h1>
          <h1 className="text-lg lg:text-xl text-normal font-medium text-center">
            Our roadmap takes us through a series of exciting phases, each designed to bring us closer to our vision.
            With each step, we're boosting the job industry forward, redefining what's possible
            and opening up a world of endless opportunities.
          </h1>
        </div>
        <div className="hidden lg:block h-full w-full py-16">
          <div className="container mx-auto">
            <dh-component>
              <div className="w-[80%] mx-auto">
                <div className="bg-gray h-1 flex items-center justify-between">
                  <span className="absolute bg-roadmap-current text-primary text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                    Current
                  </span>
                  <div className="w-1/4 flex justify-end">
                    <div className="bg-grey h-4 w-4 rounded-full shadow"></div>
                  </div>
                  <div className="w-1/4 flex justify-end">
                    <div className="bg-grey h-4 w-4 rounded-full shadow"></div>
                  </div>
                  <div className="w-1/4 flex justify-end">
                    <div className="bg-grey h-4 w-4 rounded-full shadow"></div>
                  </div>
                  <div className="w-1/4 flex justify-end"></div>
                </div>
                <div className="flex flex-row justify-start items-start pt-10 gap-4">
                  <div className="w-1/4 flex flex-col items-start gap-2">
                    <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#F36890] to-[#515fff]">
                      V1 2023
                    </h1>
                    <h1 className="text-base font-medium text-normal">
                      Trooper Launch.
                      <br />
                      Medal Token.
                    </h1>
                  </div>
                  <div className="w-1/4 flex flex-col items-start gap-2">
                    <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#F36890] to-[#515fff]">
                      β 2023
                    </h1>
                    <h1 className="text-base font-medium text-normal">
                      AI implementations.
                      <br />
                      Chains expansion: Lukso - ZkSync.
                      <br />
                      Implement connections to
                      <br />
                      education platforms and simulators.
                      <br />
                      Marketing & impact metrics.
                    </h1>
                  </div>
                  <div className="w-1/4 flex flex-col items-start gap-2">
                    <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#F36890] to-[#515fff]">
                      γ 2023
                    </h1>
                    <h1 className="text-base font-medium text-normal">
                      IDO and TGE.
                      <br />
                      Profit estimation tools & analytics.
                      <br />
                      Token listing in EX & DEX.
                      <br />
                      Metaverse office / Hall of fame.
                      <br />
                      Token airdrop for early users.
                    </h1>
                  </div>
                  <div className="w-1/4 flex flex-col items-start gap-2">
                    <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#F36890] to-[#515fff]">
                      δ 2024
                    </h1>
                    <h1 className="text-base font-medium text-normal">
                      Trooper games studio: Development of education games.
                      <br />
                      DAO creation and tokenization.
                      <br />
                      Expansion to other chains.
                      <br />
                      Expand to other job types.
                      <br />
                      White label solutions.
                    </h1>
                  </div>
                </div>
              </div>
            </dh-component>
          </div>
        </div>
        <div className="block lg:hidden h-full w-full">
          <div className="container flex flex-row mx-auto px-8 gap-4">
            <dh-component>
              <div className="w-1">
                <div className="bg-gray h-[1000px] flex flex-col items-center justify-between">
                  <div className="w-1/4 flex justify-center">
                    <span className="bg-roadmap-current text-primary text-xs font-medium mt-[-20px] px-2.5 py-0.5 rounded-full">
                      Current
                    </span>
                  </div>
                  <div className="w-1/4 flex flex-col items-center justify-end">
                    <div className="bg-grey h-4 w-4 rounded-full shadow"></div>
                  </div>
                  <div className="w-1/4 flex flex-col items-center justify-end">
                    <div className="bg-grey h-4 w-4 rounded-full shadow"></div>
                  </div>
                  <div className="w-1/4 flex flex-col items-center justify-end">
                    <div className="bg-grey h-4 w-4 rounded-full shadow"></div>
                  </div>
                  <div className="w-1/4 flex flex-col items-center justify-end"></div>
                </div>
              </div>
            </dh-component>
            <div className="flex flex-col justify-start items-start gap-32">
              <div className="flex flex-col items-start gap-2">
                <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#F36890] to-[#515fff]">
                  V1 2023
                </h1>
                <h1 className="text-base font-medium text-normal">
                  Trooper Launch.
                  <br />
                  Medal Token.
                </h1>
              </div>
              <div className="flex flex-col items-start gap-2 pt-6">
                <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#F36890] to-[#515fff]">
                  β 2023
                </h1>
                <h1 className="text-base font-medium text-normal">
                  AI implementations.
                  <br />
                  Chains expansion: Lukso - ZkSync.
                  <br />
                  Implement connections to
                  <br />
                  education platform and simulators.
                  <br />
                  Marketing & impact metrics.
                </h1>
              </div>
              <div className="flex flex-col items-start gap-2 !-mt-8">
                <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#F36890] to-[#515fff]">
                  γ 2023
                </h1>
                <h1 className="text-base font-medium text-normal">
                  IDO and TGE.
                  <br />
                  Profit estimation tools & analytics.
                  <br />
                  Token listing in EX & DEX.
                  <br />
                  Metaverse office / Hall of fame.
                  <br />
                  Token airdrop for early users.
                </h1>
              </div>
              <div className="flex flex-col items-start gap-2 -mt-[30px]">
                <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#F36890] to-[#515fff]">
                  δ 2024
                </h1>
                <h1 className="text-base font-medium text-normal">
                  Trooper games studio: Development of education games.
                  <br />
                  DAO creation and tokenization.
                  <br />
                  Expansion to other chains.
                  <br />
                  Expand to other job types.
                  <br />
                  White label solutions.{" "}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Roadmap;
