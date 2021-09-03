import { supabase } from '@lib/supabase';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const createReaction = async (slug: string, reaction: string, value: number) => {
  const { data: updateReaction } = await supabase
    .from('reactions')
    .update({ [reaction]: value })
    .eq('slug', slug)
    .single();
  if (!updateReaction) {
    throw new Error('sth went wrong');
  }
  return updateReaction;
};

export default function useCreateReaction(slug: string, reaction: string, value: number) {
  const queryClient = useQueryClient();

  return useMutation(() => createReaction(slug, reaction, value), {
    onSuccess: () => queryClient.refetchQueries(`getReactions-${slug}`),
  });
}
