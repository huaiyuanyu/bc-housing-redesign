import JobIcon from '@/assets/icons/jobicon.svg'
import UserIcon from '@/assets/icons/usericon.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function NavBar({content}: {content: string}) {
  //page name varies and will be in the center. On the right side will be two Icons for navigational purposes.
  return (
    <div className="bg-secondary p-2 flex items-center justify-between text-white">
      <div className="flex-1"></div>
      <div className="flex-none flex items-end justify-center self-stretch">
        <h1 className="text-lg font-bold">
          {content}
        </h1>
      </div>
      <div className="flex-1 flex justify-end space-x-4">
        <Link href="/">
          <Image
            src={JobIcon}
            alt="Jobs Page"
            height={30}
            className="relative -translate-y-10 md:translate-y-0"
          />
        </Link>
        <Image
          src={UserIcon}
          alt="User Profile"
          height={30}
          className="relative -translate-y-10 md:translate-y-0"
        />
      </div>
    </div>
  )
}