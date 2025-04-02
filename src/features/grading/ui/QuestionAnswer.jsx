import { Card } from "antd";
import AudioPlayers from "./AudioPlayer";

export const QuestionAnswer = ({
  quesntionsAnswerData = {},
  isSpeaking = false,
  fileName = "",
  speakingPartFour = [],
  currentPart = "",
  currentQuestionIndex = -1,
}) => {
  const studentAnswers = () => {
    if (isSpeaking) {
      const fakeSpeakingAnswers = {
        1: [
          "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3",
          "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3",
          "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3",
        ],
        2: [
          "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
          "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
          "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
        ],
        3: [
          "http://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3",
          "http://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3",
          "http://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3",
        ],
        4: [
          "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
        ]
      };
      return (
        <div className="place-self-center self-center">
          <AudioPlayers
            audioUrl={fakeSpeakingAnswers[currentPart][currentQuestionIndex]}
            audioFileName={fileName}
          />
        </div>
      );
    }
    const fakeWritingAnswers = {
      1: [
        "Early morning.",
        "At the local coffee shop.",
        "Watched a movie.",
        "A modern apartment.",
        "The kitchen.",
      ],
      2: [
        "My ideal house is a serene haven by the sea, featuring large glass windows to invite natural light and offer breathtaking views. With cozy, minimalist decor and lush greenery surrounding it, it embodies peace and tranquility.",
      ],
      3: [
        "Hi Hannah! Thanks for the warm welcome. I absolutely enjoy watching TV programs about houses too! It’s so fascinating to see different interior designs, renovations, and creative ideas. Shows like Grand Designs or Home Town inspire me a lot. They make me want to experiment with styling my own home. What’s your favorite program?",
        "Hi Jack! Luckily, I’ve had pretty good neighbors so far, but there were small issues like noise at odd hours or parking disputes in the past. I believe good communication is the key to resolving such problems. How about you? Have you faced any challenges with your neighbors?",
        "Nira, absolutely! Building environmentally friendly homes is essential for protecting our planet while creating beautiful spaces. Using sustainable materials, energy-efficient designs, and incorporating green spaces can reduce environmental impact significantly. These practices benefit both homeowners and communities, ensuring a healthier future. What eco-friendly elements do you think are most important in a home’s design? I’d love to hear your thoughts!",
      ],
      4: [
        `Subject: Exciting News!

        Hey Sam,

        Did you hear about the club’s new partnership with the city council? I think it’s an amazing opportunity to grow our projects! Maybe we could suggest hosting workshops or events to take full advantage of it. Let’s brainstorm more ideas soon.

        Talk soon,  
        Jordan `,
        `
        Subject: Thoughts and Suggestions on the Recent News

        Dear Alex,

        I hope this email finds you well.I recently came across the news regarding the new partnership our club has formed with the city council, and I wanted to share my thoughts and a few suggestions.

        To be honest, this news left me feeling very excited about the opportunities it could bring to our club.It’s clear that this partnership could significantly enhance our resources and outreach, but I also think it’s important to ensure the entire club is aligned on its goals and expectations. 

        In light of this, I’d like to propose a dedicated meeting where we can discuss this partnership in detail, share ideas, and brainstorm how we can make the most out of it.Additionally, providing regular updates via email or during club meetings would help keep everyone informed and engaged. 

        Please let me know how I can contribute further.I truly believe this is a great step forward for our community!

        Looking forward to your response.

        Warm regards,
        Jordan Smith  
        jsmith@email.com`
        ,
      ],
    };

    return <div className="whitespace-pre-line">{fakeWritingAnswers[currentPart][currentQuestionIndex]}</div>;
  };
  return (
    <Card
      variant="borderless"
      className="rounded-lg overflow-hidden"
      styles={{ body: { padding: 0 } }}
    >
      <div className="bg-[#E6F0FA] px-[4.375rem] py-[2.125rem] leading-6 text-base">
        <div className="flex">
          <div className="font-bold">Question:</div>
          <div>&nbsp;{quesntionsAnswerData?.Content || ""}</div>
        </div>
        {quesntionsAnswerData?.ImageKeys?.length > 0 && (
          <div className="mt-3 flex gap-1 flex-wrap">
            {quesntionsAnswerData?.ImageKeys?.map((image, index) => (
              <img
                key={index}
                src={image || ""}
                alt="speaking image"
                className="w-1/2"
              />
            ))}
          </div>
        )}
        {speakingPartFour[0]?.ImageKeys?.length > 0 && (
          <div className="mt-3 flex gap-1 flex-wrap">
            {speakingPartFour[0]?.ImageKeys?.map((image, index) => (
              <img
                key={index}
                src={image || ""}
                alt="speaking image"
                className="w-1/2"
              />
            ))}
          </div>
        )}
        {speakingPartFour?.length > 0 && (
          <div className="flex flex-col gap-2 py-2">
            {speakingPartFour.map((quest) => (
              <p key={quest.ID}>{quest?.Content || ""}</p>
            ))}
          </div>
        )}
      </div>

      <div className="py-[1.875rem] px-[4.375rem] leading-6 text-base">
        <div className="font-bold mb-2">Student answer</div>
        {studentAnswers()}
      </div>
    </Card>
  );
};
