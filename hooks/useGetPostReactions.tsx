import { supabase } from '@lib/supabase';
import { useQuery } from 'react-query';

const getPostReactions = async (slug: string) => {
  const { data: postReactions } = await supabase
    .from('reactions')
    .select('*')
    .eq('slug', slug)
    .single();
  if (!postReactions) {
    // throw new Error('Post not found');
    await supabase.from('reactions').insert({ slug });
  }
  return postReactions;
};

export default function useGetPostReactions(slug: string) {
  return useQuery(`getReactions-${slug}`, () => getPostReactions(slug));
}
