import React, {useContext, useState} from 'react';
import {
  Button,
  Image,
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamType, routesEnum} from '../types/rootStackParam';
import {ContextType, GlobalContext} from '../contexts/GlobalState';
import {CommentType} from '../types/post';

const IconBack = require('../assets/back.png');
const IconBlock = require('../assets/block.png');
const IconComment = require('../assets/comment.png');
const IconDownvoteInactive = require('../assets/downvote_inactive.png');
const IconShare = require('../assets/share.png');
const IconUpvoteInactive = require('../assets/upvote_inactive.png');

type Props = {
  route: {
    params: RootStackParamType[routesEnum.POST_DETAIL_PAGE];
  };
};

function PostDetailScreen({route}: Props) {
  const navigation = useNavigation();
  const [comment, setComment] = useState<string>('');
  const {data, updateVote, addedComment} = useContext(
    GlobalContext,
  ) as ContextType;
  const {id} = route.params;
  const state = data.find(value => value.id === id);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={IconBack}
                height={18}
                width={18}
                style={styles.marginLeft22}
              />
            </Pressable>
            <Image
              source={{
                uri: 'https://picsum.photos/200',
              }}
              resizeMode="cover"
              width={48}
              height={48}
              style={styles.imgProfile}
            />
            <View style={styles.marginLeft16}>
              <Text style={styles.textName}>{state?.name}</Text>
              <Text style={styles.textDate}>{state?.date}</Text>
            </View>
          </View>
          <View style={styles.headerLine} />
          <View>
            <Text style={styles.textDesc}>{state?.desc}</Text>
            <Image
              source={{
                uri: 'https://picsum.photos/200',
              }}
              height={200}
            />
          </View>
          <View style={styles.footer}>
            <View style={styles.footerRow}>
              <Image
                source={IconShare}
                height={18}
                width={18}
                style={styles.marginLeft22}
              />
              <Image
                source={IconComment}
                height={18}
                width={18}
                style={styles.marginLeft22}
              />
              <Text style={styles.footerComment}>{state?.comment?.length}</Text>
            </View>
            <View style={styles.footerRow}>
              <Image
                source={IconBlock}
                height={18}
                width={18}
                style={styles.marginLeft22}
              />
              <Pressable onPress={() => updateVote(id, 'down')}>
                <Image
                  source={IconDownvoteInactive}
                  height={18}
                  width={18}
                  style={styles.footerGapLeftEnd}
                />
              </Pressable>
              <Text style={styles.footerVote}>{state?.vote}</Text>
              <Pressable onPress={() => updateVote(id, 'up')}>
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
        {state?.comment?.map((value: CommentType, index: number) => {
          return (
            <View key={String(index)}>
              <View style={styles.commentContainer}>
                <Image
                  source={{
                    uri: 'https://picsum.photos/200',
                  }}
                  resizeMode="cover"
                  width={36}
                  height={36}
                  style={styles.commentImgProfile}
                />
                <View style={styles.commentRow}>
                  <Text style={styles.commentName}>{value.name}</Text>
                  <Text style={styles.commentDesc}>{value.comment}</Text>
                </View>
              </View>
              <View style={styles.commentLine} />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.enterComment}>
        <View style={styles.enterCommentLine} />
        <TextInput
          placeholder="Enter Comment"
          style={styles.flex1}
          value={comment}
          onChangeText={value => setComment(value)}
        />
        <Button
          title="Comment"
          onPress={() => {
            if (comment.length > 0) {
              addedComment(comment, id);
              setComment('');
              Keyboard.dismiss();
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default PostDetailScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 48,
  },
  header: {
    height: 64,
    alignItems: 'center',
    flexDirection: 'row',
  },
  marginLeft22: {
    marginLeft: 22,
  },
  marginLeft16: {
    marginLeft: 16,
  },
  imgProfile: {
    borderRadius: 24,
    marginLeft: 24,
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
  headerLine: {
    height: 0.5,
    backgroundColor: '#C4C4C4',
  },
  textDesc: {
    margin: 24,
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
  commentContainer: {
    flexDirection: 'row',
    minHeight: 72,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  commentImgProfile: {
    borderRadius: 24,
    marginRight: 16,
  },
  commentRow: {
    width: '90%',
  },
  commentName: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 14.52,
    color: '#828282',
  },
  commentDesc: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19.36,
  },
  commentLine: {
    height: 0.5,
    backgroundColor: '#C4C4C4',
  },
  enterComment: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  enterCommentLine: {
    height: 0.5,
    backgroundColor: '#C4C4C4',
  },
  flex1: {
    flex: 1,
  },
});
