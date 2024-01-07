import React from 'react';

const template = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-background text-primary">
			{children}
		</div>
	);
};

export default template;
