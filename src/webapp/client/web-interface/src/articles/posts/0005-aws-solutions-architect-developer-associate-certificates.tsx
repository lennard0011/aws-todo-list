import type { Article } from '../article.type'

export const Blog: () => Article = () => {
  const url =
    '/blog/posts/0005-aws-solutions-architect-developer-associate-certificates'
  const title =
    'Achieving the AWS Solutions Architect and Developer Associate Certificates'
  const summary =
    'Successfully earning AWS Solutions Architect and Developer Associate certifications'
  const releaseDate = new Date('2025-08-14')
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
        certifications are a great way to validate my knowledge, have a clear
        milestone and enhance my career prospects.
      </p>

      <h2>How did I do this?</h2>
      <p>
        I created a study plan and followed it diligently. I used various
        resources such as online courses such as the course from Adrian Cantrill
        and practise exams from Tutorial Dojo. I can heavily recommend these
        resources.
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
        First of all, I will take a break for studying. I will enjoy some time
        off and focus on developing myself on other fields like collaboration
        and impact. Later this year I do plan to pursue a CKAD certificate from
        Kubernetes.
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
