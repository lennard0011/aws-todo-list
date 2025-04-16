import type { Article } from '../article.type'
import summitAwsCardImage from './../../assets/summit-aws-card.jpg'
import summitAwsCakeImage from './../../assets/summit-aws-cake.jpg'
import summitSlidesLessonsLearnedImage from './../../assets/summit-slides-lessons-learned.jpg'

export const Blog: () => Article = () => {
  const url = '/blog/posts/0003-how-to-get-the-most-out-of-aws-summit'
  const title = 'How to get the most out of AWS Summit?'
  const summary =
    'To fortify my knowledge of AWS, I decided to pursue the Solution Architect certificate.'
  const releaseDate = new Date('2025-04-16')
  const content = (
    <>
      <img width={'250px'} src={summitAwsCardImage}></img>
      <img width={'250px'} src={summitAwsCakeImage}></img>
      <img width={'250px'} src={summitSlidesLessonsLearnedImage}></img>
      <p>
        Yesterday I had the privilege to visit AWS Summit Amsterdam 2025. My
        employer provides me with the time to attent events like this to
        motivate personal development and gathering outside knowledge. The
        summit takes time out of your workday and requires significantly more
        energy, however it can be great resource of knowledge and networking.
      </p>
      <ol>
        <li>
          Skip the keynote. The day starts with the keynote, so even though the
          venue worked very efficient, a lot of people are arriving at the same
          time causing busy corridors. The keynote itself was not interesting
          and takes a big portion out of the day. Next time, I would visit the
          venue after the keynote started and make use of the availability at
          the different stands at the expo.
        </li>
        <li>
          Do not bring your laptop. It has no use for the sessions. If you bring
          it, you will need to go through the slow queue with bag inspection and
          is just a risk to lose or break it. If you want to take some notes,
          just bring a small notepad in the pocket of your jacket. Be aware that
          most slides and resources are also shared after. It is perfectly fine
          to spend all attention watching and listening.
        </li>
        <li>
          Visit the stands! Even though most partner stands are just there to
          find leads, the AWS stands are fun. We got to play a nice game of
          trying to beat an Auto Scaling Group in a beerpong style (no drinking
          though). Everyone is trying to evade the sales people, but just try to
          speak for one of them for 5 minutes. Worst case, you had a nice
          conversation. Best case, they tell you about a solution you never
          found which could be very helpful to resolve an challenge you have at
          work.
        </li>
        <li>
          If you are interested to visit two overlapping sessions, check if one
          of them is already on YouTube. Most of the generic sessions have
          already been performed at other events and been recorded. Although it
          is much nicer to see a live human doing the presentation, it is a
          satisfactory solution to skip the session and watch it later.
        </li>
      </ol>
      <p>
        To finish up with an open door; preparation. At least the day before,
        make a travel plan, check which sessions you think are interesting and
        make an agenda. Look through the list of partner stands to check which
        could be interesting to visit.
      </p>
    </>
  )

  return {
    url,
    title,
    summary,
    releaseDate,
    content
  }
}
