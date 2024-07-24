import { ReactNode } from 'react';

const HomeLayout = ({ children }: { children: ReactNode }) => {
	return <div className='min-h-screen container pt-14'>{children}</div>;
};

export default HomeLayout;
