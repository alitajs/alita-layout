import React from 'react';
import { router } from 'alita';

const Page: React.FC = () => (
  <div onClick={() => router.goBack()}>Hello Alita Layout:List</div>
);

export default Page;
