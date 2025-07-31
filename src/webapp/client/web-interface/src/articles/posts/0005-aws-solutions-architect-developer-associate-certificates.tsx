import type { Article } from '../article.type'

export const Blog: () => Article = () => {
  const url =
    '/blog/posts/0005-aws-solutions-architect-developer-associate-certificates'
  const title = 'AWS Solutions Architect and Developer Associate Certificates'
  const summary =
    'Successfully earning AWS Solutions Architect and Developer Associate certifications'
  const releaseDate = new Date('2025-01-15')
  const content = (
    <>
      <p>
        After more than half a year, I successfully earned the AWS Solutions
        Architect and Developer Associate certifications. In this journey, I
        have learned a lot about AWS. Especially services I don't interact with
        in my day to day work. More importantly, I learned a lot about myself
        and how I can discipline myself. For the last eight months, most
        mornings were spent studying and watching videos. In the meantime I
        would see the progress bar slowly move to the right.
      </p>

      <h2>Why did I do this?</h2>
      <p>
        I wanted to deepen my understanding of AWS and its services. I also
        wanted to challenge myself and prove my skills in cloud computing. The
        certifications are a great way to validate my knowledge and enhance my
        career prospects.
      </p>

      <h2>What did I learn?</h2>
      <p>
        I learned a lot about AWS. Especially services I don't interact with in
        my day to day work. More importantly, I learned a lot about myself and
        how I can discipline myself. For the last eight months, most mornings
        were spent studying and watching videos. In the meantime I would see the
        progress bar slowly move to the right.
      </p>
      <h2>What is next?</h2>
      <p>
        I plan to continue my AWS journey by exploring more advanced topics and
        services. Additionally, I want to share my knowledge with others and
        help them on their own AWS journeys.
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
