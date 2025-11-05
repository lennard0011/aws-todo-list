import { Article } from '../article.type'

export const Blog: () => Article = () => {
  const url = '/blog/posts/0006-following-the-process'
  const title = 'Following the Process'
  const summary =
    'The balance between following the process and going out of bounds in software development'
  const releaseDate = new Date('2025-11-5')
  const content = (
    <>
      <p>
        In software development we like to invent processes for common problems.
        For example:
      </p>
      <ul>
        <li>
          To reach out to another team, post a message in their team chat. When
          you are done with a
        </li>
        <li>
          If you find a bug, create a Jira ticket and assign it to the correct
          team.
        </li>
        <li>
          If you have a PR needing for review, you let it automatically be
          posted in the PR channel and let it sit for at least 24 hours.
        </li>
      </ul>

      <p>
        If the process doesn't provide the expected result, then you escalate.
        You write a message in the thread in the same channel with a bit more
        active tone. If that doesn't work, you start tagging the team lead or
        people who have context of the issue. By that time, you often get the
        attention on the request you need. This is proof that the process works.
      </p>

      <p>
        At the beginning of my career I started to appreciate processes like
        this. I felt it made work streamlined and made sure prioritization was
        based on rationale. Not on who screams the loudest.
      </p>

      <p>
        Recently I started to look back at this mindset. Every once in a while,
        following the process results in a lot of time passing. Some of my
        coworkers never seem to get stuck in these issues which interested me.
        This seems to come from the fact that sometimes breaking out of the
        process greatly reduces the leadtime on requests. If you know a
        particular engineer in another team will have your answer, you can
        directly send them a message and sometimes have an answer within
        seconds. This goes against the process and sometimes you will get
        passive aggressive reactions from people redirecting you back to the
        process. That is a price which is worth the result.
      </p>

      <p>
        The coming period I am goint to experiment more with this balance. I
        noticed that by using more direct messages, it is a lot easier to find
        alignment between teams and act as champions for an initiative. It also
        enables me to get to know other engineers better. This makes sure they
        find it easy to find me as well. Instead of relying on people to follow
        the process, we can rely on bonds and relations between engineers. With
        that as a foundation, I feel people put in more effort to go the extra
        mile and go for the best solution instead of just getting the ticket to
        done.
      </p>
    </>
  )

  return { url, title, summary, releaseDate, content }
}
