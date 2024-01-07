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
	return <div>안녕</div>;
};

export default Page;
