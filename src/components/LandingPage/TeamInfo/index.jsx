import twitterImg from '/imgs/landing/twitter.png'
import linkedinImg from '/imgs/landing/linkedin.png'
import websiteImg from '/imgs/landing/website.png'

import gamerTwitter from '/imgs/landing/gamer_twitter.png'
import gamerDiscord from '/imgs/landing/gamer_discord.png'
import gamerTelegram from '/imgs/landing/gamer_telegram.png'

const TeamInfo = () => {
  return (
    <>
      <section id="team" className="flex flex-col items-center justify-center gap-16 px-4 py-12 lg:px-[96px] lg:py-[128px] bg-mandatory">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-base bg-clip-text text-transparent bg-gradient-to-r from-[#F36890] to-[#515fff]">Team</h1>
          <h1 className="text-3xl lg:text-5xl font-bold text-primary">Who is behind Trooper?</h1>
          <h1 className="text-base lg:text-xl text-normal font-medium lg:w-[60%]">A team of top professionals with a vast track record of successful IT and Business project implementation, covering all relevant areas of expertise in Finance, Law, and Regulatory Compliance.</h1>
        </div>
        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-16'>
          {
            teamMember.map((item, index) => {
              return (
                <div key={index} className='flex flex-col justify-between w-[288px] gap-4'>
                  <div className='flex flex-col items-center p-2 gap-6'>
                    <img src={item.avatar} />
                    <div className='flex flex-col items-center gap-4'>
                      <div className='flex flex-col items-center gap-2'>
                        <h1 className='text-xl font-bold text-primary'>{item.name}</h1>
                        <h1 className="text-lg text-small">{item.role}</h1>
                      </div>
                    </div>
                  </div>
                  <h1 className='text-base font-normal text-normal text-center'>{item.description}</h1>
                  <div className='flex flex-col justify-between items-center gap-4'>
                    <div className='flex flex-row justify-center items-center gap-5'>
                      {item.twitter != "" && (
                        <a href={item.twitter} target='_blank'>
                          <img src={twitterImg} />
                        </a>
                      )}
                      {item.linkedin != "" && (
                        <a href={item.linkedin} target='_blank'>
                          <img src={linkedinImg} />
                        </a>
                      )}
                      {item.web != "" && (
                        <a href={item.web} target='_blank'>
                          <img src={websiteImg} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
      <section className='flex flex-col justify-center items-center px-4 py-4 lg:px-[96px] lg:py-[128px] bg-mandatory'>
        <div className='flex flex-col items-center p-8 gap-8 bg-secondary rounded-2xl w-4/5'>
          <div className='flex flex-col items-center gap-4 text-center lg:w-2/3'>
            <h1 className='text-xl font-semibold text-primary'>Connect with other freelancers and companies</h1>
            <h1 className='text-base font-normal text-normal'>
              Don&rsquo;t miss any updates about job opportunities <br/>
              and connect with the Trooper community
            </h1>
          </div>
          <div className='flex flex-row gap-4'>
            <a href="https://twitter.com/Trooperjobs" target='_blank'>
              <img src={gamerTwitter} />
            </a>
            <a href="https://discord.gg/NTUdHWQJWb" target='_blank'>
              <img src={gamerDiscord} />
            </a>
            <a href="https://t.me/+fh8lUp4XSgdjNjY0" target='_blank'>
              <img src={gamerTelegram} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default TeamInfo

const teamMember = [
  {
    name: "Timo Becker",
    avatar: "/imgs/landing/team member/Timo Becker.png",
    role: "Co founder",
    description: "Lifelong gamer, the inventor of Trooper and co founded run a startup in 2017. 10 years involved in web3",
    linkedin: "https://www.linkedin.com/in/timo-becker-11988515a",
    twitter: "https://twitter.com/0xTimoBecker",
    web: "",
  },
  {
    name: "Manon Brousse",
    avatar: "/imgs/landing/team member/Manon Brousse.png",
    role: "Co founder",
    description: "Design talent, winner of multiple awards and involved in the crypto space since 2018.",
    linkedin: "",
    twitter: "https://twitter.com/ninjafire_",
    web: "",
  },
  {
    name: "Jonstance Etiosa",
    avatar: "/imgs/landing/team member/Jonstance Etiosa.png",
    role: "Co founder",
    description: "Software Engineer with 4 years experience in web3. Involved in the education scene in Africa.",
    linkedin: "https://www.linkedin.com/in/constanceetiosa",
    twitter: "https://twitter.com/constancejco",
    web: "",
  }
]