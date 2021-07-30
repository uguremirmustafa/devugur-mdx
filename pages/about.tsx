import Container from '@components/Container';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {}

const About = (props: Props) => {
  const { locale } = useRouter();
  return (
    <Container>
      <div>me</div>
    </Container>
  );
};

export default About;
