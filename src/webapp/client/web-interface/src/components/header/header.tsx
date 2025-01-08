import { Link, useLocation } from '@tanstack/react-router'

export const Header = () => {
  const pathname = useLocation().pathname

  return (
    <header>
      <menu>
        <li>
          Navigate to
          <menu>
            <li className={pathname == '/' ? 'selected' : ''}>
              <Link to='/' title='Home'>
                Home
              </Link>
            </li>
            <li className={pathname == '/to-do-list' ? 'selected' : ''}>
              <Link to='/to-do-list' title='To do list'>
                To do list
              </Link>
            </li>
            <li className={pathname == '/blog' ? 'selected' : ''}>
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
              <a
                href='https://github.com/lennard0011'
                target='_blank'
                rel='noreferrer'
              >
                🐙
              </a>
            </li>
            <li title='Linkedin'>
              <a
                href='https://www.linkedin.com/in/lennardvanderplas/'
                target='_blank'
                rel='noreferrer'
              >
                🇱
              </a>
            </li>
          </menu>
        </li>
      </menu>
    </header>
  )
}
