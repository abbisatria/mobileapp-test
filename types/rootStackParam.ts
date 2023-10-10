export enum routesEnum {
  FEED_PAGE = 'feed',
  POST_DETAIL_PAGE = 'post-detail',
}

export type RootStackParamType = {
  [routesEnum.FEED_PAGE]: undefined;
  [routesEnum.POST_DETAIL_PAGE]: {
    id: number;
  };
};
