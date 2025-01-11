import { useEffect } from 'react'

type Props = {
  durationInSeconds: number
  child: React.JSX.Element
  onClose: () => void
}

export const TemporaryRender = (props: Props) => {
  const { durationInSeconds, child, onClose } = props

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, durationInSeconds * 1000)
    return () => clearTimeout(timer)
  }, [durationInSeconds, onClose])

  return child
}
