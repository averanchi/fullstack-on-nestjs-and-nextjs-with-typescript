import Navbar from '@/components/Navbar';
import React, { ReactNode } from 'react';
import { Container } from '@mui/material';

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="main-layout">
            <Navbar />
            <Container className='mx-auto'>
                {children}
            </Container>

        </div>
    );
};

export default MainLayout;