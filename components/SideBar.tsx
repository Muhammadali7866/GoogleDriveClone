"use client"
import Link from "next/link";
import Image from "next/image"
import { avatarPlaceholderUrl, navItems } from "@/constants";
import { usePathname } from "next/navigation";
import clsx from "clsx"; // Import clsx

interface Props {
    fullName:string,
    avatar:string,
    email:string
}
export default function SideBar ({fullName,avatar,email}:Props){
    const pathname = usePathname()
    return (
        <aside className="sidebar">
            <Link href="/">
            <Image src="/assets/icons/logo-full-brand.svg" alt="logo" width={150} height={60} className="hidden h-auto lg:block"/>
            <Image src="/assets/icons/logo-brand.svg" alt="logo" width={52} height={52} className="lg:hidden"/>
            </Link>
            <nav className="sidebar-nav">
                <ul className="flex flex-1 flex-col gap-6">
                    {
                        navItems.map(({url,name,icon})=>(
                            <Link key={name} href={url} className="lg:w-full">
                                <li className={clsx("sidebar-nav-item", pathname === url && "shad-active")}>
                                    <Image src={icon} alt={name} width={24} height={24} className={clsx("nav-icon",pathname === url && "nav-icon-active" )} />
                                    <p className="hidden lg:block">{name}</p>
                                </li>
                            </Link>
                        ))
                    }
                </ul>
            </nav>
            <Image src="/assets/images/files-2.png" alt="logo" width={506} height={418} className="w-full" />
            <div className="sidebar-user-info">
                <Image src={avatarPlaceholderUrl} alt="Avatar" width={44} height={44} className="sidebar-user-avatar" />
                <div className="hidden lg:block">
                <p className="subtitle-2 captalize">{fullName}</p>
                <p className="caption">{email}</p>
            </div>
            </div>
            
        </aside>
    )
}