'use client';

import { getCurrentUrl } from '@/util/getCurrentUrl';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const fetchText = async () => {
	const data = await axios.get('/api/v1/message/a0');
	console.log(data);
	return data.data;
};

const Page = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['emotion'],
		queryFn: fetchText,
	});
	return <div>HOME</div>;
};

export default Page;
