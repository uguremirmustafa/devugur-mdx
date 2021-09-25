import { supabase } from '@lib/supabase';
import { useQuery } from 'react-query';

const getAllReactions = async () => {
  const { data: postReactions } = await supabase.from('reactions').select('*');

  //   if (!postReactions) {
  //     // throw new Error('Post not found');
  //     await supabase.from('reactions').insert({ slug });
  //   }
  return postReactions;
};

export default function useGetAllReactions() {
  return useQuery(`getAllReactions`, () => getAllReactions());
}
