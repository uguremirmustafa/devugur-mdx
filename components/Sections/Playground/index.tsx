import React, { useEffect } from 'react';
import gsap from 'gsap';

const ProjectList = () => {
  const t1 = gsap.timeline();
  useEffect(() => {
    t1.fromTo('.kutucuk', { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.5 });
  }, []);
  return (
    <div className="flex gap-4 my-40">
      {[1, 2, 3, 4, 5].map((item, index) => (
        //bunlar sadece tailwind classları,
        //kırmızı renkli 5 adet kutu oluşturuyoruz.
        //sondaki 'kutucuk' className'i ise componenti seçmek için
        <div
          key={index}
          className={`w-12 h-12 
            rounded-sm flex justify-center items-center bg-red-500 kutucuk`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
export default ProjectList;
