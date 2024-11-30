import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  //just need BC Housing Logo on the left side.
  return (
    <div className="bg-gradient-to-r from-lime-300 to-sky-300 pt-1">
      <div className="bg-secondary px-2 py-1 md:py-2">
        <Link href="/">
          <Image
            src="/images/BCHousingHeaderLogo.PNG"
            alt="BC Housing"
            width={150}
            height={75}
            className="md:w-[200px] md:h=[100px]"
          />
        </Link>
      </div>
    </div>
  )
}