import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter'
import TelegramIcon from '@mui/icons-material/Telegram'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import LanguageIcon from '@mui/icons-material/Language'

const RouteIcon: React.FC<{ value: string }> = ({ value }) => {
  const iconsList = [
    <InstagramIcon />,
    <FacebookIcon />,
    <TelegramIcon />,
    <TwitterIcon />,
    <LinkedInIcon />,
    <LanguageIcon />,
  ]
  return <>{iconsList[+value - 1]}</>
}

export default RouteIcon
