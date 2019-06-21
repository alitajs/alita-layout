import React from 'react';
import { router } from 'alita';

const Page: React.FC = () => (
  <div onClick={() => router.push('/list')}>Hello Alita Layout:Home</div>
);

export default Page;
