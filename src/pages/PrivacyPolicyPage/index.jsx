import MaskGroup from '/imgs/common/mask_group.svg'

const PrivacyPolicyPage = () => {
    return (
        <section className="flex flex-col items-center gap-20 text-primary p-4 lg:p-20">
            <div className='w-full h-full inset-0 justify-center absolute z-0'>
                <div className='w-4/6 h-70 left-0 right-0 mx-auto absolute mt-12 hidden sm:block'>
                    <img
                        src={MaskGroup}
                    />
                </div>
                <img
                    src={MaskGroup}
                    className='w-full h-full sm:hidden absolute object-cover'
                />
            </div>
            <section className='flex flex-col gap-8 lg:gap-16 w-full z-10'>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <p className='text-4xl lg:text-[64px] font-bold text-center lg:text-left'>Privacy Policy</p>
                    <p className='text-base text-normal'>Welcome to Trooper! These Terms of Service ("Terms") govern your use of the Trooper platform, which operates as a web3 protocol. Please read these Terms carefully. By accessing or using our services, you agree to be bound by these Terms.</p>
                </div>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <p className='text-lg font-bold'>1. General</p>
                    <div className='flex flex-col gap-2 lg:gap-4'>
                        <p className='text-base text-normal'>1.1. Trooper Protocol: Trooper is a decentralised job market protocol that connects freelancers with web3 implementations and utilises an interest-bearing escrow business model.</p>
                        <p className='text-base text-normal'>1.2. Users: Users of Trooper include both freelancers seeking job opportunities and individuals or businesses looking to hire freelancers.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <p className='text-lg font-bold'>2. User Responsibilities</p>
                    <div className='flex flex-col gap-2 lg:gap-4'>
                        <p className='text-base text-normal'>2.1. Wallet Integration: To use Trooper, you must integrate a compatible web3 wallet with the protocol. You are responsible for ensuring the security and confidentiality of your wallet and associated private keys.</p>
                        <p className='text-base text-normal'>2.2. Prohibited Activities: You agree not to engage in any activities that violate applicable laws, regulations, or these Terms. Prohibited activities include but are not limited to fraud, impersonation, spamming, or any other activity that harms Trooper's reputation or functionality.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <p className='text-lg font-bold'>3. User Obligations</p>
                    <div className='flex flex-col gap-2 lg:gap-4'>
                        <p className='text-base text-normal'>3.1. Payment and Fees: Users of Trooper must adhere to the payment terms agreed upon for each job. Trooper may charge fees for its services, which will be communicated through smart contracts and decentralised mechanisms.</p>
                        <p className='text-base text-normal'>3.2. Dispute Resolution: In the event of a dispute between users, Trooper encourages open communication to reach a resolution. Smart contracts and decentralised mechanisms may be utilised for transparent and autonomous dispute resolution.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <p className='text-lg font-bold'>4. Trooper's Rights and Responsibilities</p>
                    <div className='flex flex-col gap-2 lg:gap-4'>
                        <p className='text-base text-normal'>4.1. Protocol Operation: Trooper strives to maintain the smooth operation of the protocol, but cannot guarantee uninterrupted access or flawless execution of smart contracts due to the inherent nature of decentralised systems.</p>
                        <p className='text-base text-normal'>4.2. Content Moderation: Trooper aims to ensure compliance with these Terms and applicable laws through decentralised content moderation mechanisms. Users may report inappropriate or violating content, which will be reviewed and acted upon following the protocol's guidelines.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <p className='text-lg font-bold'>5. Intellectual Property</p>
                    <div className='flex flex-col gap-2 lg:gap-4'>
                        <p className='text-base text-normal'>5.1. Ownership: Users retain ownership of their intellectual property rights related to the content they create. By using Trooper, users grant Trooper a non-exclusive, worldwide, royalty-free licence to display, modify, and distribute their content for the purpose of promoting and providing the protocol's services.</p>
                        <p className='text-base text-normal'>5.2. Infringement Claims: Trooper respects the intellectual property rights of others. If you believe your intellectual property rights have been infringed upon, please notify Trooper and provide the necessary information for a proper investigation.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <p className='text-lg font-bold'>6. Privacy</p>
                    <p className='text-base text-normal'>6.1. Data Protection: Trooper prioritises user privacy and data protection. The protocol operates with a privacy-first approach, ensuring that personal information is handled securely and in accordance with the protocol's privacy policy.</p>
                </div>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <p className='text-lg font-bold'>7. Termination</p>
                    <div className='flex flex-col gap-2 lg:gap-4'>
                        <p className='text-base text-normal'>7.1. Termination by Users: Users can discontinue using Trooper at any time by disconnecting their web3 wallet from the protocol.</p>
                        <p className='text-base text-normal'>7.2. Termination by Trooper: Trooper may restrict or terminate user access to the protocol if there is a violation of these Terms, unauthorised activity, or any other reason deemed necessary to protect the integrity and functionality of the protocol.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <p className='text-lg font-bold'>8. Limitation of Liability</p>
                    <p className='text-base text-normal'>8.1. To the extent permitted by applicable law, Trooper, as a decentralised protocol, disclaims liability for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with the use of its services or these Terms. Users acknowledge and accept the inherent risks associated with decentralised systems.</p>
                </div>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <p className='text-lg font-bold'>9. Governing Law and Dispute Resolution</p>
                    <div className='flex flex-col gap-2 lg:gap-4'>
                        <p className='text-base text-normal'>9.1. Governing Law: These Terms and any disputes arising from or relating to the use of Trooper shall be governed by and construed in accordance with the laws of Portugal. Any legal actions or proceedings brought against Trooper shall be exclusively held in the courts of Portugal.</p>
                        <p className='text-base text-normal'>9.2. Dispute Resolution: Trooper encourages users to resolve disputes amicably through open communication. In the event of a dispute that cannot be resolved, users agree to submit to binding arbitration in accordance with the rules and procedures set forth by Trooper. The arbitration shall take place in Portugal and the award rendered by the arbitrator shall be final and binding.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <p className='text-lg font-bold'>10. Amendments</p>
                    <p className='text-base text-normal'>10.1. Trooper reserves the right to modify or update these Terms at any time, at its sole discretion. Users will be notified of any material changes to the Terms. Continued use of Trooper after such notification constitutes acceptance of the modified Terms.</p>
                </div>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <p className='text-lg font-bold'>11. Miscellaneous</p>
                    <div className='flex flex-col gap-2 lg:gap-4'>
                        <p className='text-base text-normal'>11.1. Entire Agreement: These Terms constitute the entire agreement between the user and Trooper, superseding any prior agreements, communications, or understandings, whether oral or written, relating to the subject matter herein.</p>
                        <p className='text-base text-normal'>11.2. Severability: If any provision of these Terms is deemed invalid, illegal, or unenforceable, the validity, legality, and enforceability of the remaining provisions shall not be affected or impaired.</p>
                        <p className='text-base text-normal'>11.3. Waiver: The failure of Trooper to enforce any right or provision of these Terms shall not be considered a waiver of such right or provision.</p>
                        <p className='text-base text-normal'>11.4. Assignment: Users may not assign or transfer their rights or obligations under these Terms without the prior written consent of Trooper. Trooper may freely assign or transfer its rights and obligations under these Terms.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <p className='text-lg font-bold'>12. Interest-Bearing Escrow and Third-Party Protocols</p>
                    <div className='flex flex-col gap-2 lg:gap-4'>
                        <p className='text-base text-normal'>12.1. Interest-Bearing Escrow: Trooper employs an interest-bearing escrow as a business model, which involves holding and managing funds on behalf of users. The funds held in escrow may be utilised for investments or deposited into third-party protocols to generate interest or returns.</p>
                        <p className='text-base text-normal'>12.2. Third-Party Protocols: Trooper may engage with third-party protocols for the purpose of depositing funds and generating interest. These third-party protocols are external to Trooper and have their own terms of service and risk profiles.</p>
                        <p className='text-base text-normal'>12.3. Risk Disclaimer: Users acknowledge that engaging with third-party protocols involves inherent risks. Trooper does not guarantee the safety, security, or performance of any third-party protocol. Users are solely responsible for understanding and accepting the risks associated with their participation in such protocols.</p>
                        <p className='text-base text-normal'>12.4. Third-Party Hacks: Trooper takes reasonable measures to ensure the security of funds held in escrow and the integration with third-party protocols. However, in the event of a third-party hack or security breach, Trooper shall not be held responsible for any loss of funds or damages incurred. Users acknowledge and accept this risk.</p>
                        <p className='text-base text-normal'>12.5. Insurance: Trooper may maintain insurance coverage for the assets held in escrow and the risks associated with third-party protocols. The specific terms and coverage of the insurance policy will be communicated separately. However, the availability of insurance does not absolve users from their own due diligence and understanding of the risks involved.</p>
                        <p className='text-base text-normal'>12.5.1. The insurance coverage provided by Trooper is intended to offer an additional layer of protection for users' funds held in escrow. However, it is important to note that the availability of insurance does not absolve users from their own responsibilities, due diligence, and understanding of the risks involved in participating in the Trooper platform and interacting with third-party protocols.</p>
                        <p className='text-base text-normal'>12.5.2. Users are encouraged to carefully review and familiarise themselves with the terms and limitations of the insurance coverage provided by Trooper. This includes understanding any exclusions, deductibles, and claims processes associated with the insurance policy. Users should also consider obtaining independent advice or consulting with a professional to assess the adequacy of the insurance coverage for their specific needs and circumstances.</p>
                        <p className='text-base text-normal'>12.5.3. While Trooper strives to maintain appropriate insurance coverage, users acknowledge that insurance cannot fully eliminate the risks inherent in participating in the Trooper platform and engaging with third-party protocols. Users are responsible for making informed decisions and assessing their own risk tolerance before entering into any transactions or utilising the services provided by Trooper.</p>
                        <p className='text-base text-normal'>12.5.4. In the event of a claim for loss or damages covered by the insurance policy, users agree to cooperate with Trooper and any relevant insurance providers in the claims process. Users may be required to provide necessary documentation, evidence, and information to support the claim.</p>
                        <p className='text-base text-normal'>12.5.5. Trooper shall not be held liable for any claims, disputes, or losses arising from or related to the insurance coverage provided by third-party insurance providers. Any claims or issues regarding insurance coverage should be directed to the respective insurance provider, and users shall abide by the terms and procedures outlined by the insurance provider in question.</p>
                    </div>
                </div>
            </section>
            <section className='flex flex-col gap-8 lg:gap-16 w-full'>
                <p className='text-4xl text-[64px] font-bold text-center lg:text-left'>Terms of Service</p>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <p className='text-lg font-bold'>Acceptance of Terms</p>
                    <div className='flex flex-col gap-2 lg:gap-4'>
                        <p className='text-base text-normal'>By using Trooper, users agree to comply with these terms of service.<br />
                            Users must be at least 18 years old or have parental consent to use the platform.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <p className='text-lg font-bold'>User Conduct</p>
                    <p className='text-base text-normal'>Users are responsible for their actions and content shared on Trooper.<br />
                        Prohibited activities include harassment, fraud, infringement of intellectual property, and violation of privacy.</p>
                </div>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <p className='text-lg font-bold'>Account Registration:</p>
                    <p className='text-base text-normal'>Users must provide accurate and complete information during registration.<br />
                        Each user account is for individual use and cannot be shared with others.</p>
                </div>
            </section>
        </section>
    )
}

export default PrivacyPolicyPage