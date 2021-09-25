import Image from 'next/image';
import CustomLink from './CustomLink';
import dynamic from 'next/dynamic';

// import ProsCard from '@/components/ProsCard';
// import ConsCard from '@/components/ConsCard';
// import Gumroad from '@/components/metrics/Gumroad';
// import Unsplash from '@/components/metrics/Unsplash';
// import Analytics from '@/components/metrics/Analytics';
// import YouTube from '@/components/metrics/Youtube';
import Step from '@components/Utils/Step';
import ImageWithTheme from '@components/Utils/ImageWithTheme';
import ProTip from '@components/Utils/ProTip';
import BlurImage from '@components/Utils/BlurImage';
import JumpingBall from '@components/Animations/JumpingBall';
import Chart from '@components/Sections/Reactions/Chart';
const MDXComponents = {
  Image,
  ImageWithTheme,
  BlurImage,
  JumpingBall,
  a: CustomLink,
  Chart,
  //   Analytics,
  //   ConsCard,
  //   Gumroad,
  //   ProsCard,
  Step,
  ProTip,
  //   Unsplash,
  //   YouTube,
};

export default MDXComponents;
