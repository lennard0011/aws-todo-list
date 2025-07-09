import type { Article } from '../article.type'
import summitAwsCardImage from './../../assets/summit-aws-card.jpg'
import summitAwsCakeImage from './../../assets/summit-aws-cake.jpg'
import summitSlidesLessonsLearnedImage from './../../assets/summit-slides-lessons-learned.jpg'

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
        life in Pygame, faster and more efficiently than I imagined. Here's how!
      </p>
      <h2>Why Frogger? A Timeless Challenge</h2>
      <p>
        I picked Frogger for its simple mechanics but rich potential for AI
        assistance. It covers core game dev concepts: player movement, collision
        detection, scoring, and level design perfect for a quick AI-driven
        project.
      </p>
      <h2>Prompting Perfection: My AI Interaction Playbook</h2>
      <p>
        My journey started with a clear prompt: "We are going to create a game
        in PyGame. The game is a retro game where the user controls a frog. The
        goal of the frog is to move across the street. Over the street cars are
        driving. If you get hit by the car, you are reset to the start and lose
        a life. The frog has three lives. The time it takes is the score."
      </p>
      <p>From there, I learned to use:</p>
      <ul>
        <li>
          <strong>Iterative Development:</strong> Building feature by feature,
          not all at once.
        </li>
        <li>
          <strong>Specific Requests:</strong> "Add sound effects for car
          collisions," not "make it better."
        </li>
        <li>
          <strong>Contextual Reminders:</strong> Guiding AI based on existing
          code.
        </li>
        <li>
          <strong>Debugging & Refinement:</strong> Asking AI to fix errors or
          optimize code.
        </li>
      </ul>

      <h2>AI Tackles Classic Programming Challenges</h2>
      <p>AI proved highly capable with fundamental game dev tasks:</p>
      <ul>
        <li>
          <strong>Collision Detection:</strong> Generating precise `pygame.Rect`
          logic.
        </li>
        <li>
          <strong>Game Loop Management:</strong> Structuring the main game loop
          flawlessly.
        </li>
        <li>
          <strong>Asset Handling:</strong> Loading and displaying images
          efficiently.
        </li>
        <li>
          <strong>Game State Management:</strong> Implementing lives, scores,
          and game over conditions smoothly.
        </li>
      </ul>

      <h2>Development Automation: My Time-Saving Partner</h2>
      <p>AI significantly sped up development by:</p>
      <ul>
        <li>
          <strong>Generating Boilerplate:</strong> Quick Pygame setup.
        </li>
        <li>
          <strong>Accelerating Features:</strong> Rapidly adding scores, lives,
          and menus.
        </li>
        <li>
          <strong>Suggesting Refactoring:</strong> Providing cleaner, more
          modular code.
        </li>
        <li>
          <strong>
            On-Demand Debugging: Regaining a lost life or identifying errors and
            suggesting fixes.
          </strong>
        </li>
      </ul>

      <h2>Interesting AI-Generated Solutions</h2>
      <h3>1. Dynamic Car Movement</h3>
      <p>
        AI easily handled varied car speeds and screen wrapping for cars moving
        in different directions.
      </p>
      <h3>2. Simple Sound Effect Integration</h3>
      <p>
        It seamlessly integrated audio cues, like collision sounds and success
        sounds, into the game at key events.
      </p>
      <h3>3. Implementing Difficulty Levels</h3>
      <p>
        AI's simple functions allowed for quick adjustments to gameplay
        difficulty by modifying car speeds and densities.
      </p>

      <h2>My Frogger Creation!</h2>
      <p>
        Imagine a retro-inspired Pygame window showing the frog at the start,
        navigating through car chaos, and finally reaching safety, along with a
        "Game Over" screen.
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

      <h2>The Future of Game Dev is Collaborative</h2>
      <p>
        AI isn't replacing creativity; it's enhancing it. It streamlined my
        Frogger project, letting me focus on design. Ready to try AI-assisted
        game development?
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
