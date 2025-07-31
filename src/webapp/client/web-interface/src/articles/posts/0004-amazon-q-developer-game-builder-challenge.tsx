import type { Article } from '../article.type'

export const Blog: () => Article = () => {
  const url = '/blog/posts/0004-amazon-q-developer-game-builder-challenge'
  const title = 'Hop Into the Future'
  const summary = ' How AI Helped Me Build a Pygame Frogger Clone'
  const releaseDate = new Date('2025-07-09')
  const content = (
    <>
      <p>
        Ever thought about building a classic arcade game, but felt daunted by
        the coding? I used AI to bring a retro favorite like <b>Frogger</b> to
        life in Pygame, faster and more efficiently than I imagined. Here&apos;s
        how!
      </p>
      <h2>Why Frogger?</h2>
      <p>
        I picked Frogger for its simple mechanics but rich potential for AI
        assistance. Next to that, it felt like all the games like Space Invaders
        and Tetris were already done by other people. It covers core game dev
        concepts: player movement, collision detection, scoring, and level
        design perfect for a quick AI-driven project.
      </p>
      <h2>Breaking the ice with Amazon Q</h2>
      <p>
        My journey started with a clear prompt: "We are going to create a game
        in PyGame. The game is a retro game where the user controls a frog. The
        goal of the frog is to move across the street. Over the street cars are
        driving. If you get hit by the car, you are reset to the start and lose
        a life. The frog has three lives. The time it takes is the score.
      </p>
      <p>From there, I went through the following phases:</p>
      <ul>
        <li>
          <strong>Iterative Development:</strong> Building feature by feature,
          not all at once. Aggressively committing to GitHub is a great tip
          here.
        </li>
        <li>
          <strong>Specific Requests:</strong> "Add sound effects for car
          collisions," not "make it better.". This helped AI focus on delivering
          exactly what I needed.
        </li>
        <li>
          <strong>Debugging & Refinement:</strong> Asking AI to fix errors or
          optimize code. Here the AI didn't do well. I asked it to add sound
          effects. After three attempts, it still couldn't get it right.
        </li>
      </ul>

      <h2>My Frogger Creation!</h2>
      <p>
        Ultimately Amazon Q created the Frogger clone. Please check out the
        video here:
        <iframe
          width='560'
          height='315'
          src='https://www.youtube.com/embed/sMeauU7ZArk?si=OyRVGRYsW84Yt4gE'
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
        ></iframe>
      </p>

      <h2>Lessons learned</h2>
      <p>
        Amazon Q (and other AI tools) can be powerful allies in coding. I
        noticed it is not able to debug very well, so I had to do that myself.
        But it can help you with the initial code and even with some of the
        debugging. However, I did find a good way to use it. Namely, while doing
        non coding tasks, I will give it a small refactoring task. For example,
        at work (where we use Java) I ask it to remove utility classes
        constructors and use the Lombok @UtilityClass annotation. It is very
        good in this. This allows me to squeeze in a little bit more of
        refactoring every sprint, a task which is often neglected.
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
