"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
 import Image from "next/image" 
import { useState } from "react"
import {usePathname} from "next/navigation"
import { Separator } from "@radix-ui/react-separator"
import { navItems } from "@/constants"
import Link from "next/link";
import clsx from "clsx"
import { Button } from "./ui/button"
import FileUploader from "./FileUploader"

interface Props {
    accountId:string,
    email:string,
    avatar:string,
    fullName:string

}

export default function MobileNavigation ({avatar,accountId,email,fullName}:Props){
    const [open, setOpen] = useState(false) 
    const pathname = usePathname()
    return (
        <header className="mobile-header">
<Image src="/assets/icons/logo-full-brand.svg" alt="logo" width={120} height={52} className="h-auto" />
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Image src="/assets/icons/menu.svg" alt="menu" width={30} height={30} />
            </SheetTrigger>
            <SheetContent className="shad-sheet h-screen px-3">
                <SheetTitle>
                    <div className="header-user">
                        <Image src={avatar} alt="avatar" width={44} height={44} className="header-user-avatar" />
                        <div className="sm:hidden lg:block">
                        <p className="subtitle-2 capitalize">{fullName}</p>
                        <p className="caption">{email}</p>
                    </div>
                    </div>
                    <Separator className="mb-4 bg-light-100/20" />
                   
                </SheetTitle>
                <nav className="mobile-nav">
                <ul className="mobile-nav-list">
                {
                        navItems.map(({url,name,icon})=>(
                            <Link key={name} href={url} className="lg:w-full">
                                <li className={clsx("mobile-nav-item", pathname === url && "shad-active")}>
                                    <Image src={icon} alt={name} width={24} height={24} className={clsx("nav-icon",pathname === url && "nav-icon-active" )} />
                                    <p >{name}</p>
                                </li>
                            </Link>
                        ))
                    }
                </ul>

                </nav>
                <Separator className="my-4 bg-light-100/20" />
                <div className="flex flex-col justify-between gap-5">
                <FileUploader />
                    <Button className="mobile-sign-out-button" type="submit">
                        <Image src="/assets/icons/logout.svg" alt="logo" className="w-6" width={24} height={24} />
                    </Button>

                </div>

            </SheetContent>

       </Sheet>
        </header>

    )
}