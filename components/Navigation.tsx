"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Navigation = () => {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = async () => {
            const authenticated = session.status === 'authenticated';
            if (!authenticated) {
                router.push('/signin');
            }
        };
        checkAuthentication();
    }, [session]);
    console.log(session);

    return (
        <>
            {session?.data ? (
                <Link href="#" onClick={() => signOut({ callbackUrl: "/" })}>
                    Sign Out
                </Link>
            ) :
               null
            }
        </>
    );
};

export { Navigation };