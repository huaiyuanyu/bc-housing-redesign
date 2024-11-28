import BCHousingHeaderLogo from '@/assets/images/BCHousingHeaderLogo.png'
import Image from 'next/image'

export default function Header() {
  //just need BC Housing Logo on the left side.
  return (
    <div className="bg-gradient-to-r from-lime-300 to-sky-300 pt-1">
      <div className="bg-secondary p-2">
        <a href="/">
          <Image src={BCHousingHeaderLogo} alt="BC Housing" />
        </a>
      </div>
    </div>
  )
}