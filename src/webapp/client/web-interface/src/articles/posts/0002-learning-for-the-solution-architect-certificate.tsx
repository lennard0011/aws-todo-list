import type { Article } from './../article.type'

export const Blog: () => Article = () => {
  const url = '/blog/posts/0002-learning-for-the-solution-architect-certificate'
  const title = 'Learning for the Solution Architect certificate'
  const summary =
    'To fortify my knowledge of AWS, I decided to pursue the Solution Architect certificate.'
  const releaseDate = new Date('2025-03-23')
  const content = (
    <>
      <p>
        In 2024 I got quite the exposure to AWS in my work and personal
        projects. To bring structure to this learning process, I decided to get
        the Cloud Practitioneer (CP) certificate. This was a great way to get a
        broad overview of the services AWS offers. To fortify my knowledge of
        AWS, I decided to pursue the Solution Architect (SA) certificate. Once I
        had this, I put my target on the Solution Architect Professional -
        Associate certificate.
      </p>
      <p>
        Whereas the CP certificate can be gotten in a quick whim, the SA
        certificate requires more planning. Namely the course I followed for CP
        was one video fo 14 hours. However, the SA course is 80 hours. This
        required more discipline and planning. I decided to follow the course
        every morning before I go to office. This way I could ensure that I had
        a fixed time to study which would not easily be interrupted by other
        work.
      </p>
      <p>
        I have learned some interesting bits of AWS. For example that Lambda has
        a excecution concurrency limit of 1000 per account. That means that if
        you use Lambda as an backend with API gateway, you can only handle 1000
        requests concurrently. This concurrency limitation is not per function,
        it is really per account (
        <a
          href='https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html'
          target='_blank'
          rel='noreferrer'
        >
          source
        </a>
        ).
      </p>
      <p>
        Next to that, you apparently have to remember by heart the IP address
        for an EC2 instance to reach the meta data service. For reference, it is
        169.254.169.254.
      </p>
      <p>
        Overall the course is delivers a deepening level relative to the CP
        level. The course takes the time to combine the theory with practical
        demo&apos;s. This is in my opinion a key difference which will set me up
        for success in my career and will differentiate me from others who have
        just put the facts in their memory. The content is not too complex, the
        difficulty is mainly in the amount of content. I am now at 70% of the
        course and I am confident I will pass the exam. I will keep you updated
        on my progress.
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
