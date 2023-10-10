import * as React from 'react';
import {PostType} from '../types/post';
import {MOCK_DATA} from '../mocks/data';

export type ContextType = {
  data: PostType[];
  addedComment: (comment: string, id: number) => void;
  updateVote: (id: number, type: 'up' | 'down') => void;
};

export const GlobalContext = React.createContext<ContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const GlobalProvider = ({children}: Props) => {
  const [data, setData] = React.useState<PostType[]>(MOCK_DATA);

  const updateVote = (id: number, type: 'up' | 'down') => {
    data.filter((value: PostType) => {
      if (value.id === id) {
        value.vote = type === 'up' ? value.vote + 1 : value.vote - 1;
        setData([...data]);
      }
    });
  };

  const addedComment = (comment: string, id: number) => {
    data.filter((value: PostType) => {
      if (value.id === id) {
        value.comment.push({
          name: 'Usup Suparma',
          comment,
        });
        setData([...data]);
      }
    });
  };

  return (
    <GlobalContext.Provider value={{data, updateVote, addedComment}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
