import React, {useCallback, useContext, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamType, routesEnum} from '../types/rootStackParam';
import {ContextType, GlobalContext} from '../contexts/GlobalState';
import {PostType} from '../types/post';

const IconBlock = require('../assets/block.png');
const IconComment = require('../assets/comment.png');
const IconDownvoteInactive = require('../assets/downvote_inactive.png');
const IconShare = require('../assets/share.png');
const IconUpvoteInactive = require('../assets/upvote_inactive.png');

function FeedScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamType>>();
  const {data, updateVote} = useContext(GlobalContext) as ContextType;

  const [showMore, setShowMore] = useState(false);
  const onTextLayout = useCallback((e: any) => {
    setShowMore(e.nativeEvent.lines.length > 3);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {data.map((value: PostType, index: number) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate(routesEnum.POST_DETAIL_PAGE, {id: value.id})
              }
              key={String(index)}>
              <View style={styles.container}>
                <View style={styles.row}>
                  <Image
                    source={{
                      uri: 'https://picsum.photos/200',
                    }}
                    width={48}
                    height={48}
                    style={styles.imgProfile}
                    resizeMode="cover"
                  />
                  <View style={styles.gapLeft}>
                    <Text style={styles.textName}>{value.name}</Text>
                    <Text style={styles.textDate}>{value.date}</Text>
                  </View>
                </View>
                <View style={styles.lineProfile} />
                <View>
                  <Text
                    style={styles.textDesc}
                    numberOfLines={3}
                    onTextLayout={onTextLayout}>
                    {value.desc}
                  </Text>
                  {showMore && <Text style={styles.textMore}>More</Text>}
                  <Image
                    source={{
                      uri: 'https://picsum.photos/200',
                    }}
                    resizeMode="cover"
                    height={200}
                  />
                </View>
                <View style={styles.footer}>
                  <View style={styles.footerRow}>
                    <Image
                      source={IconShare}
                      height={18}
                      width={18}
                      style={styles.footerGapLeftStart}
                    />
                    <Image
                      source={IconComment}
                      height={18}
                      width={18}
                      style={styles.footerGapLeftEnd}
                    />
                    <Text style={styles.footerComment}>
                      {value.comment.length}
                    </Text>
                  </View>
                  <View style={styles.footerRow}>
                    <Image
                      source={IconBlock}
                      height={18}
                      width={18}
                      style={styles.footerGapLeftStart}
                    />
                    <Pressable onPress={() => updateVote(value.id, 'down')}>
                      <Image
                        source={IconDownvoteInactive}
                        height={18}
                        width={18}
                        style={styles.footerGapLeftEnd}
                      />
                    </Pressable>
                    <Text style={styles.footerVote}>{value.vote}</Text>
                    <Pressable onPress={() => updateVote(value.id, 'up')}>
                      <Image
                        source={IconUpvoteInactive}
                        height={18}
                        width={18}
                        style={styles.footerGapRight}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
              <View style={styles.footerLine} />
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    height: 547,
  },
  row: {
    height: 64,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imgProfile: {
    borderRadius: 24,
    marginLeft: 24,
  },
  gapLeft: {
    marginLeft: 16,
  },
  textName: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16.94,
  },
  textDate: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
  },
  lineProfile: {
    height: 0.5,
    backgroundColor: '#C4C4C4',
  },
  textDesc: {
    margin: 24,
    marginBottom: 0,
  },
  textMore: {
    marginHorizontal: 24,
    color: '#0000ff',
  },
  footer: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerGapLeftStart: {
    marginLeft: 22,
  },
  footerGapLeftEnd: {
    marginLeft: 24,
  },
  footerGapRight: {
    marginRight: 22,
  },
  footerComment: {
    width: 24,
    marginHorizontal: 4,
    textAlign: 'center',
  },
  footerVote: {
    width: 24,
    marginHorizontal: 11,
    textAlign: 'center',
  },
  footerLine: {
    height: 4,
    backgroundColor: '#C4C4C4',
  },
});
