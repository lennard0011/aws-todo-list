import { Link } from '@tanstack/react-router'

export const Header = () => {
  return (
    <header>
      <menu>
        <li>
          Navigate to
          <menu>
            <li>
              <Link to='/' title='Home'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/to-do-list' title='To do list'>
                To do list
              </Link>
            </li>
            <li>
              <Link to='/blog' title='Blog'>
                Blog
              </Link>
            </li>
          </menu>
        </li>
        <li>
          Socials
          <menu>
            <li title='Github'>
              <a href='https://github.com/lennard0011'>🐙</a>
            </li>
            <li title='Linkedin'>
              <a href='https://www.linkedin.com/in/lennardvanderplas/'>🇱</a>
            </li>
          </menu>
        </li>
      </menu>
    </header>
  )
}
