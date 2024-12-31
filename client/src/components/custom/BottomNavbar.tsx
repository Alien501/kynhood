import { Button } from '@/components/ui/button';
import { BookmarkIconOutline, BookmarkIconSolid, FireIconeSolid, FireIconOutline, HomeIconOutline, HomeIconSolid, UserIconOutline, UserIconSolid } from './icon';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BottomNavbar = () => {
    const [currentPath, setCurrentPath] = useState('/');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
        const handlePathChange = () => setCurrentPath(window.location.pathname);
        window.addEventListener('popstate', handlePathChange);
        return () => window.removeEventListener('popstate', handlePathChange);
    }, []);

    const handleNavigation = (path) => {
        window.history.pushState({}, '', path);
        setCurrentPath(path);
    };

    const buttonVariants = {
        active: {
            scale: 1.1,
            transition: { type: "spring", stiffness: 300, damping: 17 }
        },
        inactive: {
            scale: 1,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="fixed flex justify-evenly items-center h-16 bottom-0 left-0 right-0 z-50 bg-background border text-foreground">
            {[
                { path: '/', icons: [HomeIconSolid, HomeIconOutline] },
                { path: '/trending', icons: [FireIconeSolid, FireIconOutline] },
                { path: '/bookmarks', icons: [BookmarkIconSolid, BookmarkIconOutline] },
                { path: '/profile', icons: [UserIconSolid, UserIconOutline] }
            ].map(({ path, icons: [SolidIcon, OutlineIcon] }) => (
                <motion.div
                    key={path}
                    variants={buttonVariants}
                    animate={currentPath === path ? 'active' : 'inactive'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button 
                        onClick={() => handleNavigation(path)}
                        className="bg-transparent text-black rounded-full hover:bg-slate-200/50 h-[50px] w-[50px]"
                    >
                        {currentPath === path ? <SolidIcon /> : <OutlineIcon />}
                    </Button>
                </motion.div>
            ))}
        </div>
    );
};

export default BottomNavbar;