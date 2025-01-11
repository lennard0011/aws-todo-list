import type { Article } from './../article.type'

export const Blog: () => Article = () => {
  const url = '/blog/posts/0001-building-aws-cloud-resume-challenge'
  const title = 'Taking on the AWS Cloud Resume Challenge'
  const summary =
    'I took interest in AWS. I took on this challenge to get hands on experience.'
  const releaseDate = new Date('2025-01-05')
  const content = (
    <>
      <h2>{title}</h2>
      <p>
        While studying about software engineering I decided in May 2024 to learn
        more about the one cloud platform (almost) everyone is using, Amazon Web
        Services (AWS). I believe one of the best ways to learn about something
        is to use it. Therefore I took on the project of creating an application
        using AWS.
      </p>
      <h3>Step 1: Determine what to make</h3>
      <p>
        While searching online for inspiration, I found the AWS Cloud Resume
        Challenge. It seemed like a great starting point as I appreciate how it
        sets some guidelines, but doesn&apos;t explain every step. Instead of
        creating the actual online resume with the viewer counter, I wanted to
        make something else. To make this exercise really focussed on AWS, I
        created something which I already created before with different
        technologies. It was of course the standard to-do list.
      </p>
      <h3>Step 2: Design the architecture </h3>
      <p>
        This simple application could have been created with a single EC2
        instance, but that wouldn&apos;t bring too much challenge. I wanted to
        challenge to use as much of the serverless infrastructure of AWS. This
        brings us to the following design:
      </p>
      <img
        width={600}
        style={{ backgroundColor: 'white', display: 'block' }}
        src='https://docs.aws.amazon.com/images/wellarchitected/latest/serverless-applications-lens/images/reference-architecture-for-web-application.png'
      ></img>
      <p>
        When searching the domain <i>lennardvanderplas.com/to-do-list</i>, the
        user is directed to CloudFront which uses S3 as a source for the bundle.
        CloudFront will also cache the result, making the response faster. To
        use the application, the client creates an account with Cognito using
        the Hosted UI feature. Once logged in, the user can create a task which
        sends a request to API Gateway. API Gateway checks if the passed token
        is from a valid user and passes on the user id to the backend. The
        backend receives the request and runs on AWS Lambda. To create the task,
        Lambda interacts with DynamoDB to persist the state. Other services used
        are Route 53 where I have bought the domain and registered the routes to
        CloudFront, Cognito and API Gateway. To maintain the infrastructure I
        use AWS CDK. CDK on itself is then using AWS CloudFormation. CDK makes
        it much simpler to declare the infrastructure than CloudFormation json
        files. I can highly recommend it. To use the CDK pipeline integration, I
        use Secret Service to store the Github Access Token.
      </p>
      <h3>Step 3: Implementing it</h3>
      <p>
        In total it took me 8 months to implement this application with 58
        commits. The reason for the long time was because I pursued the AWS
        certifications in the meantime and switched jobs which made me switch
        focus onto learning Java Spring Boot.
      </p>
      <p>
        Towards the end of the implementation I also started to include Github
        features in the development work. I now use Github Issues to write down
        the tasks I want to do. Each issue creates a feature branch. By merging
        the branch, the issue gets closed automatically. Next to that, I
        implemented two Github Actions. One to check if the code is according to
        the linting and formatting style, a second to run the test. I
        implemented these to see how Github Actions worked. I do appreciate the
        linting check, however I do not make full use of the tester check as I
        only have one unit test in the whole repository. Reason being is that I
        know how to add automated tests, but didn&apos;t want to slow down the
        progress of this project by reaching a 100% code coverage. Don&apos;t
        understand me wrong, I&apos;m a big fan of writing tests, however the
        main benefit is in working with teams and product used by paying
        customers. The benefit is minimal with personal pet projects.
      </p>
      <h3>Conclusion</h3>
      <p>
        I can recommend to take on this project for anyone wanting to step up
        their software engineering skills into cloud engineering. It was fun to
        do and see the application come to life on the internet. Moving forward,
        I decided to use the application as a basis to also include my blog (the
        thing you&apos;re reading right now). If you have any questions or
        comments, feel free to reach out via any of my socials in the header.
        Thanks for taking the time to read!
      </p>
      <h3>Appendix: Weird quirks</h3>
      <p>
        Even though the project seemed really simple I still learned a lot about
        the quirks of AWS:
      </p>
      <ul>
        <li>
          To make sure that CloudFront supports HTTPS, it needs of course a
          certificate. AWS has a nice service for that of course, AWS
          Certificate Manager. However, to make the certificate work with
          CloudFront, the certificate needs to be in the Virginia region. It
          took me more hours than I want to admit to find that one line in the
          documentation specifying this requirement.
        </li>
        <li>
          The CDK pipeline itself does not cost you any money within the free
          tier. However to make it work connect with Github (which is almost
          always the case), you need to store a Github Access token in Secrets
          Manager. This costs you 40 cents per month. Not a big price, but it
          felt like wasted money when I was not actively working on the project.
          I soon turned the pipeline off and removed the secret.
        </li>
        <li>
          CDK pipeline makes use of AWS Codebuild. A compute solution
          specifically for compute steps in the pipeline. You get around 100
          minutes of free compute time per month. This felt like a lot and
          sufficient. However, by default CDK creates two <i>action</i> per
          stack. One to create the artifact and one to deploy it. With the cold
          startup time of the EC2 compute and the long deployment time of
          CloudFormation I spent about 20 minutes of CloudBuild per code change.
          When you are an aggressive git committer like me, those 100 minutes go
          by fast. Then when you are out of the free tier, you pay 0.5 cents per
          minute (rounded up). This would be 15 cent per deployment (note that
          with all of these actions rounding up to the nearest minute you go
          even faster through the usage). Doable for a company, but not
          something I wanted to spend my money on as it didn&apos;t improve my
          learning.
        </li>
      </ul>
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
