import { Link } from '@tanstack/react-router'

export const Header = () => {
  return (
    <>
      <Link to='/' title='Home'>
        🏠
      </Link>
      <a href='https://github.com/lennard0011' title='Github'>
        🐙
      </a>
      <a href='https://www.linkedin.com/in/lennardvanderplas/' title='Linkedin'>
        🇱
      </a>
    </>
  )
}
